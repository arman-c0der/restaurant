import { Star } from "lucide-react";
import { REVIEWS_DATA } from "@/lib/data";

export default function ReviewsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
          Guest Experiences
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
          Diner Reviews &amp; Ratings
        </h2>
        <div className="flex items-center justify-center space-x-2 mt-3 text-amber-400 text-sm font-semibold">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span className="text-slate-300">4.9 / 5.0 (500+ Verified Diners)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS_DATA.map((rev) => (
          <div
            key={rev.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-1 text-amber-400 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm italic mb-6">&quot;{rev.comment}&quot;</p>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-800">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
              />
              <div>
                <h4 className="text-white font-semibold text-sm">{rev.name}</h4>
                <p className="text-slate-400 text-xs">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
