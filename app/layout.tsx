import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReservationProvider } from "@/components/ReservationContext";
import ReservationModal from "@/components/ReservationModal";
import UKHoursInfo from "@/components/UKHoursInfo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "UK Dining — Modern British Restaurant (Demo)",
  description:
    "A demo restaurant website for a modern British restaurant in London, built with Next.js, Tailwind CSS, and Framer Motion. Not a real business.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950`}>
        <ReservationProvider>
          <UKHoursInfo />
          <Navbar />
          {children}
          <Footer />
          <ReservationModal />
        </ReservationProvider>
      </body>
    </html>
  );
}
