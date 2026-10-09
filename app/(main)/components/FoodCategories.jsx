"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CATEGORY_CARDS = [
  {
    title: "Chicken Parma",
    cat: "Items",
    img: "https://nishkitchen.com/wp-content/uploads/2024/05/Spicy-Chicken-parmesan-3.jpg",
    desc: "Crispy golden chicken breast topped with rich tomato sauce, melted mozzarella cheese, and fresh herbs, served with chips and a crisp salad.",
  },
  {
    title: "Beef Lasagna",
    cat: "Mains",
    img: "https://www.allrecipes.com/thmb/J-IdbeLekaqvKl98d6vGuM-yU_s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/19344-homemade-lasagna-VAT-Beauty-4x3-439ea61fe84048a4a4aacc7f7a275a4b.jpg",
    desc: "Layers of tender pasta, rich slow-cooked beef and tomato sauce, creamy béchamel, and melted cheese, baked until golden and bubbling.",
  },
  {
    title: "Sourdough French Toast",
    cat: "Breakfast",
    img: "https://www.thelastfoodblog.com/wp-content/uploads/2020/01/Sourdough-French-Toast-side-on.jpg",
    desc: "Thick-cut sourdough soaked in vanilla custard and pan-fried until golden, finished with fresh berries, maple syrup, and a dusting of sugar.",
  },
];

export default function FoodCategories() {
  const reduce = useReducedMotion();

  // index 0 = left, 1 = middle, 2 = right
  const getReveal = (i) => {
    const start = reduce
      ? false
      : i === 0
      ? { opacity: 0, x: -120 } // left card: left theke
      : i === 2
      ? { opacity: 0, x: 120 } // right card: right theke
      : { opacity: 0, scale: 0.9 }; // middle card: jekhane ache sekhanei fade

    return {
      initial: start,
      whileInView: { opacity: 1, x: 0, scale: 1 },
      viewport: { once: true, margin: "-100px" },
      transition: {
        duration: 0.8,
        delay: reduce ? 0 : i === 1 ? 0.2 : 0,
        ease: [0.22, 1, 0.36, 1],
      },
    };
  };

  return (
    <section
      aria-labelledby="categories-heading"
      className="mx-auto max-w-7xl overflow-x-clip px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      {/* Heading */}
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="flex items-center justify-center gap-4 text-xs font-semibold tracking-[0.25em] text-amber-400">
          <span aria-hidden="true" className="h-px w-8 bg-amber-400/60" />
          OUR MENU HIGHLIGHTS
          <span aria-hidden="true" className="h-px w-8 bg-amber-400/60" />
        </p>
        <h2
          id="categories-heading"
          className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Explore Culinary Categories
        </h2>
        <motion.div
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 h-0.5 w-20 origin-center rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        />
      </div>

      {/* Cards */}
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {CATEGORY_CARDS.map((card, i) => (
          <motion.li key={card.title} {...getReveal(i)} className="list-none">
            <motion.article
              whileHover={reduce ? undefined : { y: -8 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl transition-[border-color,box-shadow] duration-500 hover:border-amber-400/50 hover:shadow-[0_20px_50px_-15px_rgba(251,191,36,0.25)] focus-within:border-amber-400/50"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />

                {/* Category badge */}
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-md">
                  {card.cat}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-400 sm:text-2xl">
                  {card.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {card.desc}
                </p>

                <div className="mt-6 border-t border-slate-800 pt-5">
                  <Link
                    href={`/menu?category=${encodeURIComponent(card.cat)}`}
                    className="flex items-center justify-between text-sm font-semibold text-amber-400 outline-none after:absolute after:inset-0 after:content-[''] focus-visible:text-amber-300"
                  >
                    <span>View all {card.cat}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/40 transition-all duration-300 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950">
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}