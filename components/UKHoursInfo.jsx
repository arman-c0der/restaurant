"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone, Award } from "lucide-react";

export default function UKHoursInfo() {
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setIsOpenNow(currentHour >= 12 && currentHour < 23);
  }, []);

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>188 Ryrie st, Geelong, VIC, Australia, 3220</span>
          </span>
          <span className="hidden md:inline text-slate-700">|</span>
          <span className="hidden md:flex items-center space-x-1.5 text-slate-300">
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span>+61 431 464 422</span>
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
              isOpenNow
                ? "bg-emerald-950/80 text-emerald-400 border-emerald-800/60"
                : "bg-rose-950/80 text-rose-400 border-rose-800/60"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                isOpenNow ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
              }`}
            ></span>
            {isOpenNow ? "Open Today: 12:00 - 23:00 GMT" : "Closed - Opening 12:00 GMT"}
          </span>
          <div className="flex items-center space-x-1 text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-800/40">
            <Award className="w-3.5 h-3.5" />
            <span className="font-semibold text-[11px]">Hygiene Rating 5/5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
