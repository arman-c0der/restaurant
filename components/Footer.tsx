"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Instagram, Facebook } from "lucide-react";
import BrandLogo from "./BrandLogo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <BrandLogo className="w-12 h-12" />
            <p className="text-slate-400 leading-relaxed">
              Elevated Modern British Gastronomy in the heart of London.
            </p>
            <div className="flex space-x-3 pt-2">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-amber-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Hours
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex justify-between">
                <span>Mon - Thu:</span>
                <span className="text-slate-200">12:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat:</span>
                <span className="text-slate-200">12:00 - 23:30</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday Roast:</span>
                <span className="text-slate-200">12:00 - 22:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Newsletter
            </h4>
            {subscribed ? (
              <p className="text-emerald-400 text-xs">
                Subscribed — thanks for joining our list.
              </p>
            ) : (
              <>
                <p className="text-slate-400 mb-3">
                  Join our list for seasonal tasting menu invites.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-lg transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Dining Experience Ltd. Demo project — not a real
            business, all rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:text-slate-300">
              Allergen Information
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
