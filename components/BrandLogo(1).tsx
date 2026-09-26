export default function BrandLogo({
  className = "w-10 h-10",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 rounded-full p-2 shadow-lg shadow-amber-500/20 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950 fill-current">
        <path d="M50 10 C30 10 15 25 15 45 C15 60 25 72 38 78 L38 90 L62 90 L62 78 C75 72 85 60 85 45 C85 25 70 10 50 10 Z M50 20 C63 20 73 30 73 43 C73 53 66 62 56 65 L56 82 L44 82 L44 65 C34 62 27 53 27 43 C27 30 37 20 50 20 Z" />
        <circle cx="50" cy="42" r="10" className="fill-amber-300" />
      </svg>
    </div>
  );
}
