"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  // Route change hole mobile menu automatic bondho hoye jabe
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center focus:outline-none group" aria-label="Home">
          <BrandLogo className="w-16 h-16 group-hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Navigation (Medium and Large Screens) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
             <Link
  key={link.href}
  href={link.href}
  className={`group relative py-1 transition-colors ${
     "text-slate-300 hover:text-amber-300"
  }`}
>
  {link.label}

  {/* Bottom border: middle theke dui dike expand hobe */}
  <span
    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-amber-400
      origin-center transition-transform duration-300 ease-out
      ${"scale-x-0 group-hover:scale-x-100"}`}
  />
</Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle Button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={openReservation}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/40 flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Book a Table</span>
            <span className="sm:hidden">Book</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 border-b border-slate-800/80 overflow-hidden"
          >
            <nav className="flex flex-col px-4 pt-2 pb-6 space-y-3 text-base font-medium">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      active
                        ? "bg-amber-500/10 text-amber-400 font-semibold border-l-2 border-amber-400"
                        : "text-slate-300 hover:bg-slate-900 hover:text-amber-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}