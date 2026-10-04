"use client";

import { useState, useId } from "react";
import { MapPin, Phone, Mail, Check } from "lucide-react";

const INPUT_CLASS =
  "w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/40";

const POLICIES = [
  "Smart Casual Dress Code applies in the main dining room.",
  "Dog-friendly outdoor seating terrace available during summer.",
  "Valet parking available on request.",
];

const INITIAL_FORM = { name: "", email: "", message: "" };

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    message: `${uid}-message`,
  };

  function handleChange(field) {
    return (e) => setFormData({ ...formData, [field]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // TODO: send formData to your backend / email service here.
    setSent(true);
  }

  function handleReset() {
    setFormData(INITIAL_FORM);
    setSent(false);
  }

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
          Location &amp; Contact
        </span>

        <h1 className="font-serif text-4xl font-bold text-white mt-2">
          Get in Touch with Us
        </h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Restaurant Details */}
        <div className="space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-2xl">
          {/* Restaurant Details */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-white">
              Restaurant Details
            </h2>

            <div className="flex items-start space-x-3 text-slate-300 text-sm">
              <MapPin
                className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />

              <address className="not-italic">
                <p className="font-semibold text-white">
                  188 Ryrie st, Geelong, VIC, Australia, 3220
                </p>

                <p>Geelong, VIC 3220, Australia</p>

                <p className="text-xs text-slate-400 mt-1">
                  Nearest Train Station: Geelong
                </p>
              </address>
            </div>
          </div>

          {/* Telephone & Email */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="font-serif text-xl font-bold text-white">
              Direct Telephone 
            </h2>

            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-center space-x-3">
                <Phone
                  className="w-4 h-4 text-amber-400"
                  aria-hidden="true"
                />
                <a
                  href="tel:+442079460192"
                  className="hover:text-amber-400 transition-colors"
                >
                  +61 431 464 422
                </a>
              </div>

              <div className="flex items-center space-x-3">
              
               
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="pt-6 border-t border-slate-800">
            <h2 className="font-serif text-xl font-bold text-white mb-4">
              Find Us
            </h2>

            <div className="w-full h-64 rounded-xl overflow-hidden border border-slate-800">
             <iframe
  src="https://www.google.com/maps?q=188%20Ryrie%20St%2C%20Geelong%2C%20VIC%203220%2C%20Australia&output=embed"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Map showing the restaurant location at 188 Ryrie Street, Geelong, Australia"
/>
            </div>
          </div>

          {/* Dining Policies */}
          <div className="space-y-2 pt-6 border-t border-slate-800">
            <h2 className="font-serif text-xl font-bold text-white">
              Important Dining Policies
            </h2>

            <ul className="list-disc pl-4 space-y-2 text-xs text-slate-400 marker:text-slate-600">
              {POLICIES.map((policy) => (
                <li key={policy}>{policy}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl self-start">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Send an Inquiry
          </h2>

          {sent ? (
            <div
              className="flex flex-col items-center text-center py-10"
              role="status"
              aria-live="polite"
            >
              <div className="w-14 h-14 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full flex items-center justify-center mb-4">
                <Check className="w-7 h-7" aria-hidden="true" />
              </div>

              <h3 className="text-lg font-serif font-bold text-white">
                Inquiry submitted
              </h3>

              <p className="text-slate-400 text-xs mt-2 max-w-xs">
                This is a demo form, so nothing was actually sent — a live
                version would notify our team by email.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="mt-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label
                  htmlFor={ids.name}
                  className="block text-slate-300 font-medium mb-1"
                >
                  Full Name
                </label>

                <input
                  id={ids.name}
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange("name")}
                  className={INPUT_CLASS}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor={ids.email}
                  className="block text-slate-300 font-medium mb-1"
                >
                  Email Address
                </label>

                <input
                  id={ids.email}
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange("email")}
                  className={INPUT_CLASS}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor={ids.message}
                  className="block text-slate-300 font-medium mb-1"
                >
                  Message
                </label>

                <textarea
                  id={ids.message}
                  name="message"
                  rows={4}
                  required
                  minLength={10}
                  value={formData.message}
                  onChange={handleChange("message")}
                  className={`${INPUT_CLASS} resize-y`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
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