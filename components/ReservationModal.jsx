"use client";

import { useState, useEffect, useRef, useId, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, Check, Loader2 } from "lucide-react";
import { useReservation } from "./ReservationContext";
import ReservationCalendar from "./ReservationCalender";
import { getBookedSlots, createReservation } from "@/app/action/reservation.actions";
import { TIME_SLOTS, MAX_GUESTS } from "@/lib/reservationConfig";

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

const pad = (n) => String(n).padStart(2, "0");

// User er local date (YYYY-MM-DD)
function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatDate(key) {
  if (!key) return "";
  return new Date(key + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ReservationModal() {
  const { isOpen, closeReservation } = useReservation();
  const [step, setStep] = useState(1);
  const [refNum, setRefNum] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Calendar state
  const [view, setView] = useState(() => {
    const n = new Date();
    return { y: n.getFullYear(), m: n.getMonth() };
  });
  const [bookedByMonth, setBookedByMonth] = useState({}); // { "2026-10": { date: [slots] } }
  const [loadingAvail, setLoadingAvail] = useState(false);

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
    time: `${uid}-time`,
  };

  const today = getToday();
  const monthKey = `${view.y}-${pad(view.m + 1)}`;
  const selectedMonthKey = formData.date.slice(0, 7);
  const takenSlots = bookedByMonth[selectedMonthKey]?.[formData.date] ?? [];
  const takenKey = takenSlots.join(",");
  const dateFullyBooked = formData.date && takenSlots.length >= TIME_SLOTS.length;

  // Server theke ei month er full slot gulo ana
  const loadAvailability = useCallback(async () => {
    const last = new Date(view.y, view.m + 1, 0).getDate();
    const from = `${monthKey}-01`;
    const to = `${monthKey}-${pad(last)}`;
    setLoadingAvail(true);
    try {
      const data = await getBookedSlots(from, to);
      setBookedByMonth((prev) => ({ ...prev, [monthKey]: data }));
    } catch {
      /* availability na ashle-o form kaj korbe, server abar check kore */
    } finally {
      setLoadingAvail(false);
    }
  }, [view.y, view.m, monthKey]);

  useEffect(() => {
    if (isOpen) loadAvailability();
  }, [isOpen, loadAvailability]);

  // Selected time full hoye gele prothom khali slot e shoriye dao
  useEffect(() => {
    if (!formData.date) return;
    if (takenSlots.includes(formData.time) || !formData.time) {
      const free = TIME_SLOTS.find((t) => !takenSlots.includes(t));
      setFormData((f) => ({ ...f, time: free || "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.date, takenKey]);

  function navigate(delta) {
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formData.date) return setError("Please select a date from the calendar.");
    if (!formData.time)
      return setError("This date is fully booked. Please choose another date.");

    setSubmitting(true);
    try {
      const res = await createReservation(formData);
      if (res?.ok) {
        setRefNum(res.reference);
        setStep(2);
        loadAvailability();
      } else {
        setError(res?.error || "Booking failed. Please try again.");
        loadAvailability(); // slot full hole calendar update hoye jabe
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    closeReservation();
  }

  function resetForm() {
    const n = new Date();
    setStep(1);
    setFormData(INITIAL_FORM);
    setRefNum("");
    setError("");
    setView({ y: n.getFullYear(), m: n.getMonth() });
  }

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") closeReservation();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeReservation]);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

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
                <h2 id={ids.title} className="text-2xl font-serif font-bold text-white mb-2">
                  Reserve Your Table
                </h2>
                <p id={ids.desc} className="text-sm text-slate-400 mb-6">
                  Pick an available date from the calendar to secure your table.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={ids.name} className="block text-slate-300 font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        id={ids.name}
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label htmlFor={ids.email} className="block text-slate-300 font-medium mb-1">
                        Email Address *
                      </label>
                      <input
                        id={ids.email}
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={ids.phone} className="block text-slate-300 font-medium mb-1">
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
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label htmlFor={ids.guests} className="block text-slate-300 font-medium mb-1">
                        Number of Guests
                      </label>
                      <select
                        id={ids.guests}
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className={INPUT_CLASS}
                      >
                        {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Calendar */}
                  <div>
                    <p className="block text-slate-300 font-medium mb-1">Date *</p>
                    <ReservationCalendar
                      year={view.y}
                      month={view.m}
                      booked={bookedByMonth[monthKey] || {}}
                      selected={formData.date}
                      today={today}
                      loading={loadingAvail}
                      onSelect={(key) => setFormData({ ...formData, date: key })}
                      onNavigate={navigate}
                    />
                    {formData.date && (
                      <p className="mt-2 text-xs text-amber-300">
                        Selected: {formatDate(formData.date)}
                      </p>
                    )}
                  </div>

                  {/* Time slots */}
                  <div>
                    <p id={ids.time} className="block text-slate-300 font-medium mb-1">
                      Time Slot *
                    </p>
                    <div role="group" aria-labelledby={ids.time} className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((t) => {
                        const taken = takenSlots.includes(t);
                        const active = formData.time === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            disabled={taken}
                            aria-pressed={active}
                            onClick={() => setFormData({ ...formData, time: t })}
                            className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors disabled:cursor-not-allowed ${
                              active
                                ? "border-amber-500 bg-amber-500 text-slate-950 font-bold"
                                : taken
                                ? "border-red-500/20 bg-red-500/10 text-red-400/70 line-through"
                                : "border-slate-800 bg-slate-950 text-slate-200 hover:border-amber-500/50"
                            }`}
                          >
                            {t}
                            {taken && <span className="block text-[10px] no-underline">Full</span>}
                          </button>
                        );
                      })}
                    </div>
                    {dateFullyBooked && (
                      <p className="mt-2 text-xs text-red-400">
                        This date is fully booked. Please choose another date.
                      </p>
                    )}
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-400"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || dateFullyBooked}
                    className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-lg mt-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {submitting ? "Booking..." : "Confirm Booking Request"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4" role="status" aria-live="polite">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 id={ids.title} className="text-2xl font-serif font-bold text-white mb-2">
                  Booking Request Received
                </h3>
                <p id={ids.desc} className="text-slate-300 text-sm mb-2">
                  Thank you {formData.name}. Your booking reference is:
                </p>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl mb-4 font-mono text-amber-400 font-bold text-lg">
                  {refNum}
                </div>
                <p className="text-slate-300 text-sm mb-1">
                  {formatDate(formData.date)} at {formData.time}
                </p>
                <p className="text-slate-300 text-sm mb-6">
                  {formData.guests} {Number(formData.guests) === 1 ? "guest" : "guests"}
                </p>
                <p className="text-slate-500 text-xs mb-6">
                  Our team will confirm your booking shortly. Please keep your reference number.
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