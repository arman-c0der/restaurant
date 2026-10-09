"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Philosophy({
  image = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1400",
  imageAlt = "Dining room at The Cheeky Chef",
  storyHref = "/about",
}) {
  const reduce = useReducedMotion();

  // direction: -1 = left theke ashbe, 1 = right theke ashbe
  const reveal = (direction = 1, delay = 0) => ({
    initial: reduce ? false : { opacity: 0, x: direction * 80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: "easeOut" },
  });

  return (
    <section
      aria-labelledby="philosophy-heading"
      className="relative overflow-hidden border-b border-slate-800 bg-slate-950 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image: left theke */}
          <motion.div {...reveal(-1)} className="relative lg:col-span-5">
            {/* offset amber frame */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-amber-400/40 sm:-bottom-5 sm:-right-5"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-white/10 sm:aspect-[5/4] lg:aspect-[4/5]">
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Text: right theke */}
          <motion.div {...reveal(1, 0.15)} className="lg:col-span-7 lg:pl-6">
            <p className="mb-5 flex items-center gap-4 text-sm font-medium tracking-[0.2em] text-amber-400">
              <span aria-hidden="true" className="h-px w-10 bg-amber-400/60" />
              OUR PHILOSOPHY
            </p>

            <h2
              id="philosophy-heading"
              className="font-serif text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Where every meal becomes a memory
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Our restaurant combines exceptional ingredients with timeless
              technique. Every plate is made with care, so breakfast, lunch or
              dinner feels worth coming back for.
            </p>

            <Link
              href={storyHref}
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-amber-400/70 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Our story
              <ArrowRight className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}