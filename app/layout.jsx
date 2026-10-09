
import { Inter } from "next/font/google";
import "./globals.css";
import { ReservationProvider } from "@/components/ReservationContext";
import ReservationModal from "@/components/ReservationModal";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "UK Dining — Modern British Restaurant (Demo)",
  description:
    "A demo restaurant website for a modern British restaurant in London, built with Next.js, Tailwind CSS, and Framer Motion. Not a real business.",
};

export default function RootLayout({ children,}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950`}>
        <ReservationProvider>
        
          <Navbar />
          {children}
          <Footer />
          <ReservationModal />
        </ReservationProvider>
      </body>
    </html>
  );
}
