"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useReservation } from "./ReservationContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { openReservation } = useReservation();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center focus:outline-none group" aria-label="Home">
          <BrandLogo className="w-12 h-12 group-hover:scale-105 transition-transform" />
        </Link>

        <nav className="flex items-center space-x-6 sm:space-x-8 text-sm font-medium">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  active ? "text-amber-400 font-semibold" : "text-slate-300 hover:text-amber-300"
                }`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center">
          <button
            onClick={openReservation}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/40 flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Book a Table</span>
            <span className="sm:hidden">Book</span>
          </button>
        </div>
      </div>
    </header>
  );
}
