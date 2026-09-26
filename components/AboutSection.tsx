import { Award, Wine, Users } from "lucide-react";

const PILLARS = [
  {
    icon: Award,
    title: "Ethical British Produce",
    body: "Direct relationships with UK estates and local family farms ensuring 100% traceability.",
  },
  {
    icon: Wine,
    title: "Curated Cellar",
    body: "Extensive wine menu highlighting English sparkling wines along with international classics.",
  },
  {
    icon: Users,
    title: "Private Dining",
    body: "Bespoke private event rooms for corporate dinners, family gatherings, and tasting events.",
  },
];

export default function AboutSection() {
  return (
    <div className="py-16 space-y-20">
      <section className="max-w-5xl mx-auto px-4 text-center">
        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
          Our Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-2">
          Culinary Integrity &amp; Sourcing
        </h1>
        <p className="text-slate-300 mt-4 text-base leading-relaxed max-w-3xl mx-auto">
          Dedicated to celebrating Britain&apos;s rich agricultural heritage. Sourcing high-grade
          British beef, wild sea life, and artisan cheeses from independent suppliers across the
          UK.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {PILLARS.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-4"
          >
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mx-auto border border-amber-500/20">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">{title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed">{body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
