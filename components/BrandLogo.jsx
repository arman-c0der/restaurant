import Image from "next/image";

export default function BrandLogo({ className = "w-10 h-10" }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/asset/logo.jpg"
        alt="Restaurant logo"
        fill
        sizes="64px"
        className="object-contain rounded-full"
        priority
      />
    </div>
  );
}