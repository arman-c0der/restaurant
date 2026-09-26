"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const CATEGORY_CARDS = [
  {
    title: "Traditional Sunday Roast",
    cat: "Sunday Roast",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    desc: "Prime cuts served with giant Yorkshire puddings and duck-fat potatoes.",
  },
  {
    title: "British Classic Mains",
    cat: "Mains",
    img: "https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&q=80&w=800",
    desc: "Beef Wellington, Ale-Battered Haddock, and Slow-Braised Shepherd's Pie.",
  },
  {
    title: "Afternoon Tea & Desserts",
    cat: "Afternoon Tea",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
    desc: "Finger sandwiches, freshly baked scones, and iconic Sticky Toffee Pudding.",
  },
];

export default function FoodCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
          Our Menu Highlights
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
          Explore Culinary Categories
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATEGORY_CARDS.map((item) => (
          <motion.div
            key={item.cat}
            whileHover={{ y: -6 }}
            className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mt-2 mb-6">{item.desc}</p>
              <Link
                href={`/menu?category=${encodeURIComponent(item.cat)}`}
                className="text-amber-400 font-semibold text-xs flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
              >
                <span>View All {item.cat}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
