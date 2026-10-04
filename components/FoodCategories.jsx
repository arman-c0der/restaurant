"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const CATEGORY_CARDS = [
  {
    title: "Chicken Parma",
    cat: "Items",
    img: "https://nishkitchen.com/wp-content/uploads/2024/05/Spicy-Chicken-parmesan-3.jpg",
    desc: "Crispy golden chicken breast topped with rich tomato sauce, melted mozzarella cheese, and fresh herbs, served with chips and a crisp salad.",
  },
  {
    title: "Beef lasagna" ,
    cat: "Mains",
    img: "https://www.allrecipes.com/thmb/J-IdbeLekaqvKl98d6vGuM-yU_s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/19344-homemade-lasagna-VAT-Beauty-4x3-439ea61fe84048a4a4aacc7f7a275a4b.jpg",
    desc: "Layers of tender pasta, rich slow-cooked beef and tomato sauce, creamy béchamel, and melted cheese, baked until golden and bubbling.",
  },
  {
    title: "Sourdough French Toast",
    cat: "Breakfast",
    img: "https://www.thelastfoodblog.com/wp-content/uploads/2020/01/Sourdough-French-Toast-side-on.jpg",
    desc: "Layers of tender pasta, rich slow-cooked beef and tomato sauce, creamy béchamel, and melted cheese, baked until golden and bubbling.",
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
