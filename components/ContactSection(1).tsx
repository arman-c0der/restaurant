"use client";

import { FormEvent, useState } from "react";
import { MapPin, Phone, Mail, Check } from "lucide-react";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
          Location &amp; Contact
        </span>
        <h1 className="font-serif text-4xl font-bold text-white mt-2">Get in Touch with Us</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-2xl">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">Restaurant Details</h3>
            <div className="flex items-start space-x-3 text-slate-300 text-sm">
              <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">High Street, Mayfair</p>
                <p>London, W1K 2HE, United Kingdom</p>
                <p className="text-xs text-slate-400 mt-1">
                  Nearest Tube: Bond Street &amp; Green Park
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h3 className="font-serif text-xl font-bold text-white">
              Direct Telephone &amp; Email
            </h3>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+44 (0)20 7946 0192</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>reservations@ukdining.co.uk</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-6 border-t border-slate-800">
            <h3 className="font-serif text-xl font-bold text-white">
              Important Dining Policies
            </h3>
            <div className="space-y-2 text-xs text-slate-400">
              <p>• Smart Casual Dress Code applies in the main dining room.</p>
              <p>• Dog-friendly outdoor seating terrace available during summer.</p>
              <p>• Valet parking available on request.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
          <h3 className="font-serif text-2xl font-bold text-white mb-6">Send an Inquiry</h3>

          {sent ? (
            <div className="flex flex-col items-center text-center py-10">
              <div className="w-14 h-14 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full flex items-center justify-center mb-4">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white">Inquiry submitted</h4>
              <p className="text-slate-400 text-xs mt-2 max-w-xs">
                This is a demo form, so nothing was actually sent — a live version would notify
                our team by email.
              </p>
            </div>
          ) : (
            <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-lg transition-colors"
              >
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
