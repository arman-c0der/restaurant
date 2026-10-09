
"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Utensils,
  Award,
  Heart,
  Wine,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useReservation } from "../../../components/ReservationContext";

export default function Hero() {
  const { openReservation } = useReservation();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"
    alt="Restaurant Interior"
    className="w-full h-full object-cover opacity-70"
    style={{ scale: 1.25 }}
    initial={{ x: "-10%" }}
    animate={{ x: ["-10%", "10%"] }}
    transition={{
      duration: 20,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
       
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-slate-950/70 backdrop-blur-md border border-amber-400/60 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          <span>Modern Australian Cuisine</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6"
        >
          A Taste Above the Rest
          <span className="block text-amber-400 italic font-normal">
            Served with a Smile
          </span>
        </motion.h1>

      
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
>
  {/* Primary: Reserve */}
  <motion.button
    onClick={openReservation}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.97 }}
    className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-9 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-slate-950 shadow-[0_10px_30px_-8px_rgba(245,158,11,0.6)] ring-1 ring-inset ring-white/40 transition-shadow duration-300 hover:shadow-[0_14px_40px_-8px_rgba(245,158,11,0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
  >
    {/* shine effect */}
    <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/50 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[400%]" />

    <span className="relative flex items-center justify-center gap-3">
      <Calendar className="h-5 w-5" />
      Reserve a Table
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  </motion.button>

  {/* Secondary: Menu */}
  <Link
    href="/menu"
    className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-white/25 bg-white/5 px-9 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/70 hover:bg-white/10 hover:shadow-[0_10px_30px_-10px_rgba(251,191,36,0.4)] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
  >
    <Utensils className="h-5 w-5 text-amber-400 transition-transform duration-300 group-hover:rotate-12" />
    Explore Menu
    <ArrowRight className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
</motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16 pt-8 border-t border-white/20 text-white text-xs sm:text-sm font-medium">
  <div className="flex items-center justify-center space-x-2 bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-xl py-3 px-2">
    <Award className="w-4 h-4 text-amber-400" />
    <span>Modern Australian</span>
  </div>

  <div className="flex items-center justify-center space-x-2 bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-xl py-3 px-2">
    <Heart className="w-4 h-4 text-amber-400" />
    <span>Made with Care</span>
  </div>

  <div className="flex items-center justify-center space-x-2 bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-xl py-3 px-2">
    <Wine className="w-4 h-4 text-amber-400" />
    <span>Great Food & Drinks</span>
  </div>

  <div className="flex items-center justify-center space-x-2 bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-xl py-3 px-2">
    <Users className="w-4 h-4 text-amber-400" />
    <span>Breakfast to Dinner</span>
  </div>
</div>
      </div>
    </section>
  );
}

