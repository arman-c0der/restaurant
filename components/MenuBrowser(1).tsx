"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Filter, ShieldAlert, ChevronRight } from "lucide-react";
import { MENU_DATA, CATEGORIES, DIETARY_FILTERS } from "@/lib/data";
import { useReservation } from "./ReservationContext";

export default function MenuBrowser() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState("All");
  const { openReservation } = useReservation();

  const filteredItems = MENU_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDietary = dietaryFilter === "All" || item.dietary.includes(dietaryFilter);

    return matchesCategory && matchesSearch && matchesDietary;
  });

  return (
    <div className="pb-20">
      {/* Interactive Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search British dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs text-slate-400 font-medium mr-2 flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1 text-amber-400" /> Dietary:
              </span>
              {DIETARY_FILTERS.map((diet) => (
                <button
                  key={diet}
                  onClick={() => setDietaryFilter(diet)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    dietaryFilter === diet
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-2 overflow-x-auto pt-2 border-t border-slate-800">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : "bg-slate-950 text-slate-400 border border-transparent hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dishes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <ShieldAlert className="w-10 h-10 text-amber-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white">No dishes matched your criteria</h3>
            <p className="text-slate-400 text-xs mt-1">
              Try resetting search query or dietary filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((dish) => (
              <motion.div
                layout
                key={dish.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 hover:border-slate-700 transition-all shadow-lg"
              >
                <div className="sm:w-36 h-36 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                  {dish.badge && (
                    <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {dish.badge}
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif text-lg font-bold text-white">{dish.name}</h3>
                      <span className="font-mono text-amber-400 font-bold text-base">
                        £{dish.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-1">
                      {dish.dietary.map((d) => (
                        <span
                          key={d}
                          className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-bold"
                        >
                          {d}
                        </span>
                      ))}
                      {dish.allergens.length > 0 && (
                        <span className="text-[10px] text-slate-400">
                          Contains: {dish.allergens.join(", ")}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={openReservation}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                    >
                      <span>Reserve Table</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
