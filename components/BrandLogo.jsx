import Image from "next/image";

export default function BrandLogo({ className = "w-14 h-14" }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/asset/logo.jpg"
        alt="Restaurant logo"
        fill
        sizes="72px"
        className="object-contain rounded-full"
        priority
      />
    </div>
  );
}