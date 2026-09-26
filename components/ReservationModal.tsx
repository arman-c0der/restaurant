"use client";

import { useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, Check } from "lucide-react";
import { useReservation } from "./ReservationContext";

const TIME_SLOTS = ["12:30", "13:00", "18:00", "19:00", "20:00", "21:00"];

export default function ReservationModal() {
  const { isOpen, closeReservation } = useReservation();
  const [step, setStep] = useState<1 | 2>(1);
  const [refNum, setRefNum] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "19:00",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRefNum("BK-" + Math.floor(100000 + Math.random() * 900000));
    setStep(2);
  }

  function handleClose() {
    closeReservation();
    setTimeout(() => {
      setStep(1);
      setFormData({ name: "", email: "", phone: "", guests: "2", date: "", time: "19:00" });
    }, 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            role="dialog"
            aria-modal="true"
            className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleClose}
              aria-label="Close reservation form"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-2 rounded-lg bg-slate-800/50"
            >
              <X className="w-5 h-5" />
            </button>

            {step === 1 ? (
              <div>
                <div className="flex items-center space-x-2 text-amber-400 mb-1">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Table Booking
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-white mb-2">
                  Reserve Your Table
                </h2>
                <p className="text-sm text-slate-400 mb-6">
                  Complete the details below to secure your dining reservation.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
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
                      <label className="block text-slate-300 font-medium mb-1">Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Time Slot *
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                      >
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-lg mt-4 transition-colors"
                  >
                    Confirm Booking Request
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  Reservation Confirmed!
                </h3>
                <p className="text-slate-300 text-sm mb-6">
                  Thank you {formData.name}. Your booking reference is:
                </p>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl mb-6 font-mono text-amber-400 font-bold text-lg">
                  {refNum}
                </div>
                <p className="text-slate-500 text-xs mb-6">
                  This is a demo booking form — no table has actually been held.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
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
