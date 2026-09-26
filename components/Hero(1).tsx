"use client";

import { motion } from "framer-motion";
import { Calendar, Utensils, Award, Heart, Wine, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import { useReservation } from "./ReservationContext";

export default function Hero() {
  const { openReservation } = useReservation();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"
          alt="Restaurant Interior"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>AA Rosette Awarded Gastronomy</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6"
        >
          Modern British Cuisine &amp;{" "}
          <span className="text-amber-400 italic font-normal">Authentic Hospitality</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed"
        >
          Savor locally sourced British meats dry-aged in-house, day-boat seafood from Cornish
          waters, and hand-crafted traditional desserts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={openReservation}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 text-base"
          >
            <Calendar className="w-5 h-5" />
            <span>Reserve Table</span>
          </button>
          <Link
            href="/menu"
            className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800 text-slate-100 font-semibold px-8 py-4 rounded-xl border border-slate-700 transition-all flex items-center justify-center space-x-2 text-base backdrop-blur-sm"
          >
            <Utensils className="w-5 h-5 text-amber-400" />
            <span>Explore Menu</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-800/80 text-slate-300 text-xs sm:text-sm">
          <div className="flex items-center justify-center space-x-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Michelin Recommended</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4 text-amber-400" />
            <span>100% British Produce</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Wine className="w-4 h-4 text-amber-400" />
            <span>Artisanal Wine Cellar</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Private Event Space</span>
          </div>
        </div>
      </div>
    </section>
  );
}
