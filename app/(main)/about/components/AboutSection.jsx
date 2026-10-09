"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Award, ChefHat, Heart, Quote, Calendar, ArrowRight } from "lucide-react";
import { useReservation } from "@/components/ReservationContext";

/* ---------- Content (edit here) ---------- */

// Replace these with your own photos (e.g. "/images/story.jpg").
const RESTAURANT_IMG =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000";

const PILLARS = [
  {
    icon: Award,
    title: "Quality",
    tagline: "Best ingredients",
    body: "Direct relationships with UK estates and local family farms, so every ingredient is fully traceable. High-grade British beef, wild sea life and artisan cheeses from independent suppliers.",
  },
  {
    icon: ChefHat,
    title: "Craft",
    tagline: "Timeless technique",
    body: "Classic methods, done properly. Our curated cellar of English sparkling wines and international classics is chosen to match every plate.",
  },
  {
    icon: Heart,
    title: "Service",
    tagline: "Genuine hospitality",
    body: "From a quiet table for two to bespoke private dining for corporate dinners, family gatherings and tasting events.",
  },
];

const JOURNEY = [
  { year: "1998", title: "Founded", text: "We opened with a handful of tables and a short, honest menu." },
  { year: "2005", title: "First award", text: "Our first recognition for the quality of our cooking." },
  { year: "2015", title: "Expanded", text: "A larger dining room and a cellar to match." },
  { year: "2026", title: "Today", text: "Still cooking with the same care, for a new generation of guests." },
];

const TEAM = [
  { initials: "DL", role: "Executive Chef", name: "Daniel", img: "/asset/Daniel.png"},
  { initials: "S", role: "Sommelier", name: "", img: "/asset/Sommelier.png" },
  { initials: "M", role: "Restaurant Manager", name: "", img: "/asset/Manager.png" },
];

/* ---------- Small helpers ---------- */

function Photo({ src, alt, label, className = "" }) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 ${className}`}
      >
        <span className="font-serif text-5xl text-amber-400/70">{label}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
}

function Reveal({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }) {
  return (
    <p className="mb-4 flex items-center gap-4 text-sm font-medium tracking-[0.2em] text-amber-400">
      <span aria-hidden="true" className="h-px w-10 bg-amber-400/60" />
      {children}
    </p>
  );
}

const SECTION = "mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28";
const H2 = "font-serif text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl";

/* ---------- Page ---------- */

export default function AboutSection() {
  const reduce = useReducedMotion();
  const { openReservation } = useReservation();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <div className="bg-slate-950">
      {/* 1. Our Story */}
      <section className={`${SECTION} text-center`}>
        <Reveal>
          <div className="flex justify-center">
            <Label>OUR STORY</Label>
          </div>
          <h1 className="mx-auto max-w-4xl font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            A passion for food. A tradition of excellence.
          </h1>
        </Reveal>

        <div
          ref={heroRef}
          className="relative mt-14 h-[320px] overflow-hidden rounded-3xl ring-1 ring-white/10 sm:h-[460px] lg:h-[560px]"
        >
          <motion.img
            src={RESTAURANT_IMG}
            alt="The restaurant dining room"
            style={{ y: heroY, scale: 1.2 }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
        </div>
      </section>

      {/* 2. Where it all began */}
      <section className={`${SECTION} border-t border-slate-800/80`}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl border border-amber-400/40"
            />
            <Photo
              src={RESTAURANT_IMG}
              alt="The restaurant in its early days"
              className="relative aspect-[4/3] w-full rounded-2xl ring-1 ring-white/10"
            />
          </Reveal>

          <Reveal delay={0.15}>
            <Label>WHERE IT ALL BEGAN</Label>
            <h2 className={H2}>It started with a simple idea</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Our restaurant began with a simple idea: that exceptional food,
              made honestly and served warmly, brings people together. Dedicated
              to celebrating Britain&apos;s rich agricultural heritage, we have
              built every dish around the people who grow and raise what we cook.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. Our Philosophy */}
      <section className={`${SECTION} border-t border-slate-800/80`}>
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Label>OUR PHILOSOPHY</Label>
          </div>
          <Quote aria-hidden="true" className="mx-auto mb-4 h-8 w-8 text-amber-400/70" />
          <blockquote className={H2}>
            Exceptional food begins with exceptional ingredients.
          </blockquote>
        </Reveal>

        <div className="mt-16 grid divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900/60 md:grid-cols-3 md:divide-x md:divide-y-0">
          {PILLARS.map(({ icon: Icon, title, tagline, body }, i) => (
            <Reveal key={title} delay={i * 0.12} className="p-8 sm:p-10">
              <Icon className="h-7 w-7 text-amber-400" />
              <h3 className="mt-5 font-serif text-2xl font-bold text-white">{title}</h3>
              <p className="mt-1 text-sm font-medium text-amber-300">{tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Meet our chef */}
      <section className={`${SECTION} border-t border-slate-800/80`}>
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <Image
              src="/asset/Daniel.png"
              alt="Chef Daniel Laurent"
              width={400}
              height={500}
              className="aspect-[4/5] w-full rounded-2xl ring-1 ring-white/10 object-cover"
            />
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <Label>MEET OUR CHEF</Label>
            <h2 className={H2}>Chef Daniel Laurent</h2>
            <p className="mt-2 text-lg font-medium text-amber-400">Executive Chef</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300">
              Daniel leads our kitchen with a simple rule: respect the
              ingredient. Trained in classical technique and shaped by years of
              working alongside independent producers, he builds each menu
              around what is best that week. {/* Replace with the real biography. */}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. Our journey */}
      <section className={`${SECTION} border-t border-slate-800/80`}>
        <Reveal className="mb-16 text-center">
          <div className="flex justify-center">
            <Label>OUR JOURNEY</Label>
          </div>
          <h2 className={H2}>Nearly three decades of cooking</h2>
        </Reveal>

        <ol className="relative grid gap-10 md:grid-cols-4">
          <motion.div
            aria-hidden="true"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute bottom-0 left-[6px] top-0 w-px origin-top bg-amber-400/40 md:hidden"
          />
          <motion.div
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[6px] hidden h-px origin-left bg-amber-400/40 md:block"
          />

          {JOURNEY.map((step) => (
            <li key={step.year} className="relative pl-8 md:pl-0 md:pt-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-amber-400 ring-4 ring-slate-950 md:top-0"
              />
              <p className="font-serif text-4xl font-bold text-white">{step.year}</p>
              <p className="mt-2 text-sm font-semibold text-amber-400">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. Our team */}
      <section className={`${SECTION} border-t border-slate-800/80`}>
        <Reveal className="mb-14 text-center">
          <div className="flex justify-center">
            <Label>OUR TEAM</Label>
          </div>
          <h2 className={H2}>The people behind the pass</h2>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.role} delay={i * 0.12}>
              <div className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-colors duration-500 hover:border-amber-400/50">
                <div className="overflow-hidden">
              <Image
  src={m.img || ""}
  alt={m.name || m.role}
  label={m.initials}
  width={800}
  height={1000}
  className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105 object-cover"
/>
                </div>
                <div className="p-5 text-center">
                  {m.name && <p className="font-serif text-lg font-bold text-white">{m.name}</p>}
                  <p className="text-sm font-medium text-amber-400">{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. The art of hospitality */}
      <section className="relative isolate overflow-hidden border-t border-slate-800/80">
        <img
          src={RESTAURANT_IMG}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-slate-950/75" />
        <Reveal className="mx-auto flex min-h-[420px] max-w-4xl flex-col items-center justify-center px-4 py-24 text-center sm:min-h-[520px]">
          <Label>THE ART OF HOSPITALITY</Label>
          <p className="font-serif text-3xl font-bold leading-tight text-white sm:text-5xl">
            Every guest deserves to feel at home.
          </p>
        </Reveal>
      </section>

      {/* 8. Experience it */}
      <section className={`${SECTION} text-center`}>
        <Reveal>
          <div className="flex justify-center">
            <Label>EXPERIENCE IT</Label>
          </div>
          <h2 className={H2}>Discover our menu and join us.</h2>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <motion.button
              onClick={openReservation}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative w-full overflow-hidden rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-9 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-slate-950 shadow-[0_10px_30px_-8px_rgba(245,158,11,0.6)] ring-1 ring-inset ring-white/40 transition-shadow duration-300 hover:shadow-[0_14px_40px_-8px_rgba(245,158,11,0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              <span className="relative flex items-center justify-center gap-3">
                <Calendar className="h-5 w-5" />
                Reserve a Table
              </span>
            </motion.button>

            <Link
              href="/menu"
              className="group flex w-full items-center justify-center gap-3 rounded-full border border-white/25 bg-white/5 px-9 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all duration-300 hover:border-amber-400/70 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              View Menu
              <ArrowRight className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}