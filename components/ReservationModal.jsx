"use client";

import { useState, useEffect, useRef, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, Check } from "lucide-react";
import { useReservation } from "./ReservationContext";

const TIME_SLOTS = ["12:30", "13:00", "18:00", "19:00", "20:00", "21:00"];

// Full time slots per date, e.g. { "2026-10-10": ["19:00", "20:00"] }.
// Later you can fill this from your backend.
const UNAVAILABLE_SLOTS = {};

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  guests: "2",
  date: "",
  time: "19:00",
};

const INPUT_CLASS =
  "w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/40";

// Today's date in the user's LOCAL timezone (YYYY-MM-DD).
// toISOString() uses UTC, which can be off by one day.
function getToday() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ReservationModal() {
  const { isOpen, closeReservation } = useReservation();
  const [step, setStep] = useState(1);
  const [refNum, setRefNum] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM);

  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  const uid = useId();
  const ids = {
    title: `${uid}-title`,
    desc: `${uid}-desc`,
    name: `${uid}-name`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    guests: `${uid}-guests`,
    date: `${uid}-date`,
    time: `${uid}-time`,
  };

  const takenSlots = UNAVAILABLE_SLOTS[formData.date] ?? [];

  function handleSubmit(e) {
    e.preventDefault();

    // Safety check in case the selected slot is full.
    if (takenSlots.includes(formData.time)) return;

    // TODO: send formData to your backend here and use the reference
    // number returned by the server instead of generating one locally.
    setRefNum("BK-" + Math.floor(100000 + Math.random() * 900000));
    setStep(2);
  }

  // Only closes. Form state is reset in onExitComplete,
  // after the exit animation has finished.
  function handleClose() {
    closeReservation();
  }

  function resetForm() {
    setStep(1);
    setFormData(INITIAL_FORM);
    setRefNum("");
  }

  // Esc key closes the modal.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") closeReservation();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeReservation]);

  // Lock background scroll while the modal is open.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Move focus into the modal on open, and restore it on close.
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement;
    const t = setTimeout(() => {
      const first = dialogRef.current?.querySelector("input, select, button");
      first?.focus();
    }, 50);
    return () => {
      clearTimeout(t);
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen]);

  // Focus trap: keep Tab / Shift+Tab inside the dialog.
  function handleDialogKeyDown(e) {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const items = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // Move focus to the Close button on the confirmation step.
  useEffect(() => {
    if (isOpen && step === 2) {
      dialogRef.current?.querySelector("[data-close-main]")?.focus();
    }
  }, [step, isOpen]);

  return (
    <AnimatePresence onExitComplete={resetForm}>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            aria-hidden="true"
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            ref={dialogRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ids.title}
            aria-describedby={ids.desc}
            onKeyDown={handleDialogKeyDown}
            className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close reservation form"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-2 rounded-lg bg-slate-800/50 focus-visible:ring-2 focus-visible:ring-amber-500/60 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {step === 1 ? (
              <div>
                <div className="flex items-center space-x-2 text-amber-400 mb-1">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Table Booking
                  </span>
                </div>
                <h2
                  id={ids.title}
                  className="text-2xl font-serif font-bold text-white mb-2"
                >
                  Reserve Your Table
                </h2>
                <p id={ids.desc} className="text-sm text-slate-400 mb-6">
                  Complete the details below to secure your dining reservation.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={ids.name}
                        className="block text-slate-300 font-medium mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id={ids.name}
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={ids.email}
                        className="block text-slate-300 font-medium mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id={ids.email}
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={ids.phone}
                        className="block text-slate-300 font-medium mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        id={ids.phone}
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        required
                        pattern="[0-9+()\s\-]{7,20}"
                        title="Enter a valid phone number (7-20 digits; + ( ) - allowed)"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={ids.guests}
                        className="block text-slate-300 font-medium mb-1"
                      >
                        Number of Guests
                      </label>
                      <select
                        id={ids.guests}
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({ ...formData, guests: e.target.value })
                        }
                        className={INPUT_CLASS}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={ids.date}
                        className="block text-slate-300 font-medium mb-1"
                      >
                        Date *
                      </label>
                      <input
                        id={ids.date}
                        type="date"
                        required
                        min={getToday()}
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={ids.time}
                        className="block text-slate-300 font-medium mb-1"
                      >
                        Time Slot *
                      </label>
                      <select
                        id={ids.time}
                        required
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        className={INPUT_CLASS}
                      >
                        {TIME_SLOTS.map((t) => {
                          const taken = takenSlots.includes(t);
                          return (
                            <option key={t} value={t} disabled={taken}>
                              {t}
                              {taken ? " (Full)" : ""}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-lg mt-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    Confirm Booking Request
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4" role="status" aria-live="polite">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3
                  id={ids.title}
                  className="text-2xl font-serif font-bold text-white mb-2"
                >
                  Booking Request Received
                </h3>
                <p id={ids.desc} className="text-slate-300 text-sm mb-6">
                  Thank you {formData.name}. Your booking reference is:
                </p>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl mb-6 font-mono text-amber-400 font-bold text-lg">
                  {refNum}
                </div>
                <p className="text-slate-500 text-xs mb-6">
                  This is a demo booking form — no table has actually been held.
                </p>
                <button
                  type="button"
                  data-close-main
                  onClick={handleClose}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}