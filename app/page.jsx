import Hero from "@/components/Hero";
import SpecialOffers from "@/components/SpecialOffers";
import FoodCategories from "@/components/FoodCategories";
import ReviewsSection from "@/components/ReviewsSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SpecialOffers />
      <FoodCategories />
      <ReviewsSection />
    </main>
  );
}
