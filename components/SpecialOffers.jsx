"use client";

import { useReservation } from "./ReservationContext";

export default function SpecialOffers() {
  const { openReservation } = useReservation();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="text-amber-400 font-mono text-xs uppercase font-bold tracking-widest">
            Sunday Dining Tradition
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Classic British Sunday Roast
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Served every Sunday from 12:00 PM. Includes dry-aged sirloin, giant Yorkshire
            puddings, duck-fat roast potatoes, and rich gravy.
          </p>
        </div>
        <button
          onClick={openReservation}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-xl transition-all flex-shrink-0"
        >
          Book Sunday Roast Table
        </button>
      </div>
    </section>
  );
}
