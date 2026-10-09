"use client";

import Link from "next/link";
import { useState, useId } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import BrandLogo from "./BrandLogo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

// TODO: replace "#" with your real social media URLs.
const SOCIAL_LINKS = [
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com" },
  { Icon: FaFacebook, label: "Facebook", href: "https://www.facebook.com" },
];

const HOURS = [
  { days: "Mon - Thu:", time: "12:00 - 23:00" },
  { days: "Fri - Sat:", time: "12:00 - 23:30" },
  { days: "Sunday Roast:", time: "12:00 - 22:00" },
];

// TODO: replace "#" with real pages when you create them
// (for example /privacy, /terms, /allergens).
const LEGAL_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms & Conditions" },
  { href: "#", label: "Allergen Information" },
];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const emailId = useId();

  function handleSubscribe(e) {
    e.preventDefault();

    // TODO: send the email to your newsletter service / API here.
    setSubscribed(true);
  }

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <BrandLogo className="w-16 h-16" />
            <p className="text-slate-400 leading-relaxed">
           188 Ryrie st, Geelong, VIC, Australia, 3220
            </p>
            <div className="flex space-x-3 pt-2">
              {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Hours
            </h4>
            <ul className="space-y-2 text-slate-400">
              {HOURS.map((row) => (
                <li key={row.days} className="flex justify-between gap-4">
                  <span>{row.days}</span>
                  <span className="text-slate-200">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Newsletter
            </h4>
            <div aria-live="polite">
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
                    <label htmlFor={emailId} className="sr-only">
                      Email address
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="Your email address"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/40"
                    />
                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    >
                      Subscribe
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Dining Experience Ltd. Demo project —
            not a real business, all rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-slate-300 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}