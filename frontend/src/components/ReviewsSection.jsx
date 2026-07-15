import Link from "next/link";
import { ProductReviewsCarousel } from "./ProductReviewsCarousel";
import reviewsCarousel from "@/data/reviews-carousel.json";

export function ReviewsSection() {
  return (
    <section className="container mx-auto px-4 py-14">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">We really appreciate our customers!</h2>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span aria-label="4.98 stars" role="img" className="text-accent">
            ★★★★★
          </span>
          <Link href="/pages/reviews" className="text-link underline">
            from 1443 reviews
          </Link>
        </div>
      </div>

      <ProductReviewsCarousel reviews={reviewsCarousel} />
    </section>
  );
}
