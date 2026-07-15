import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import reviewsData from "@/data/reviews.json";

export const metadata = {
  title: "Reviews",
  description: "Grandad's Cards has a 4.98 star rating from 1,443 customer reviews.",
  alternates: { canonical: "/pages/reviews" },
};

function Stars({ rating, size = 16 }) {
  return (
    <span className="text-accent" style={{ fontSize: size }} aria-label={`${rating} star review`} role="img">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso.replace(" ", "T").replace(" UTC", "Z")).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ReviewsPage() {
  const { histogram, reviews } = reviewsData;

  return (
    <div>
      <Breadcrumbs items={[{ text: "Home", href: "/" }, { text: "Reviews" }]} />
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-8 text-center text-4xl font-bold">Reviews</h1>

        <div className="mb-10 flex flex-col items-center gap-2 border border-border p-8 text-center">
          <Stars rating={5} size={28} />
          <p className="text-lg font-semibold">
            {histogram.average.toFixed(2)} out of 5
          </p>
          <p className="text-sm text-neutral-600">Based on {histogram.total.toLocaleString()} reviews</p>

          <div className="mt-4 w-full max-w-sm space-y-1">
            {histogram.breakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-2 text-sm">
                <span className="w-10 shrink-0 text-right">{row.stars} star</span>
                <div className="h-2 flex-1 bg-border">
                  <div className="h-2 bg-accent" style={{ width: `${row.pct}%` }} />
                </div>
                <span className="w-16 shrink-0 text-left text-neutral-600">
                  {row.pct}% ({row.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border">
          {reviews.map((r) => (
            <div key={r.id} className="py-6">
              <div className="mb-1 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-white">
                  {r.author.charAt(0).toUpperCase()}
                </span>
                <div>
                  <Stars rating={r.rating} />
                  <p className="text-xs text-neutral-500">{formatDate(r.date)}</p>
                </div>
              </div>
              {r.productHandle && (
                <Link href={`/products/${r.productHandle}`} className="text-link text-xs underline">
                  {r.productTitle}
                </Link>
              )}
              {r.title && <p className="mt-1 font-semibold">{r.title}</p>}
              <p className="mt-1 text-sm text-neutral-700">{r.body}</p>
              <p className="mt-2 text-xs font-semibold">{r.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
