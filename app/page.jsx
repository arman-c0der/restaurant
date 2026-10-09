import Hero from "@/app/(main)/components/Hero";
import SpecialOffers from "@/app/(main)/components/SpecialOffers";
import FoodCategories from "@/app/(main)/components/FoodCategories";
import ReviewsSection from "@/app/(main)/components/ReviewsSection";
import Philosophy from "@/app/(main)/components/Philosophy";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components


export default function HomePage() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <SpecialOffers />
      <FoodCategories />
      <ReviewsSection />
    </main>
  );
}
