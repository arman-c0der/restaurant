export default function MenuBanner() {
  return (
    <section className="relative py-20 bg-slate-900 border-b border-slate-800 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600"
          alt="Menu Banner"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
          Seasonal Selection
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-2">
          The British Menu
        </h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mt-3">
          Prices in GBP (£). All items include VAT. Discretionary 12.5% service charge added to
          final bill.
        </p>
      </div>
    </section>
  );
}
