import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SinglesBanner } from "@/components/SinglesBanner";
import { SinglesCarouselSection } from "@/components/SinglesCarouselSection";
import { LocalShopSection } from "@/components/LocalShopSection";
import { BackInStockSection } from "@/components/BackInStockSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { getAllProducts } from "@/data/products";

export default function Home() {
  const featured = getAllProducts().slice(0, 8);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <section className="container mx-auto px-4 py-14">
        <h2 className="mb-8 text-center text-3xl font-bold">Featured Products</h2>
        <ProductCarousel products={featured} />
      </section>
      <ReviewsSection />
      <SinglesBanner />
      <SinglesCarouselSection />
      <LocalShopSection />
      <BackInStockSection />
      <NewsletterSection />
    </>
  );
}
