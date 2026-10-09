"use client";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { TIME_SLOTS } from "@/lib/reservationConfig";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MAX_MONTHS_AHEAD = 6;

const pad = (n) => String(n).padStart(2, "0");

export default function ReservationCalendar({
  year,
  month, // 0-11
  booked = {}, // { "YYYY-MM-DD": ["19:00", ...] }
  selected,
  today, // "YYYY-MM-DD"
  loading,
  onSelect,
  onNavigate, // (delta) => void
}) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday start
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const todayY = Number(today.slice(0, 4));
  const todayM = Number(today.slice(5, 7)) - 1;
  const diff = (year - todayY) * 12 + (month - todayM);
  const canPrev = diff > 0;
  const canNext = diff < MAX_MONTHS_AHEAD;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate(-1)}
          disabled={!canPrev}
          aria-label="Previous month"
          className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <p className="flex items-center gap-2 text-sm font-semibold text-white">
          {MONTHS[month]} {year}
          {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />}
        </p>

        <button
          type="button"
          onClick={() => onNavigate(1)}
          disabled={!canNext}
          aria-label="Next month"
          className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-slate-500">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;

          const key = `${year}-${pad(month + 1)}-${pad(day)}`;
          const past = key < today;
          const fullSlots = booked[key]?.length || 0;
          const isFull = fullSlots >= TIME_SLOTS.length;
          const partial = fullSlots > 0 && !isFull;
          const isSelected = selected === key;
          const disabled = past || isFull;

          let cls = "bg-slate-900 text-slate-200 hover:bg-amber-500/20 hover:text-amber-300";
          if (past) cls = "text-slate-700";
          else if (isFull) cls = "bg-red-500/10 text-red-400/70 line-through";
          else if (partial) cls = "bg-slate-900 text-amber-300 hover:bg-amber-500/20";
          if (isSelected) cls = "bg-amber-500 font-bold text-slate-950";

          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(key)}
              aria-label={`${day} ${MONTHS[month]}${isFull ? ", fully booked" : ""}`}
              aria-pressed={isSelected}
              title={isFull ? "Fully booked" : partial ? "Some slots booked" : ""}
              className={`relative aspect-square rounded-lg text-xs transition-colors disabled:cursor-not-allowed ${cls}`}
            >
              {day}
              {partial && !isSelected && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-800 pt-3 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded bg-slate-700" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Few slots booked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded bg-red-500/40" /> Fully booked
        </span>
      </div>
    </div>
  );
}