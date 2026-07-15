import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "Buylist",
  description: "Submit your cards to Grandad's Cards buylist: fill out the list, ship your cards, we check them, and you get paid.",
  alternates: { canonical: "/pages/buylist" },
};

const STEPS = [
  "Fill Out The Buylist",
  "Prepare & Ship",
  "We Check Your Cards",
  "Get Paid",
];

export default function BuylistPage() {
  return (
    <div>
      <Breadcrumbs items={[{ text: "Home", href: "/" }, { text: "Buylist" }]} />
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-2 text-center text-4xl font-bold">Buylist</h1>
        <p className="mb-10 text-center text-neutral-600">Submitting Cards Instructions</p>

        <ol className="mb-10 grid gap-4 sm:grid-cols-2">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-4 border border-border p-5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="font-semibold">{step}</span>
            </li>
          ))}
        </ol>

        <div className="border-t border-border pt-6 text-center">
          <h2 className="mb-2 text-xl font-bold">Where Do I Ship To?</h2>
          <p className="text-neutral-600">
            Contact <a href="mailto:support@grandadscards.shop" className="text-link underline">support@grandadscards.shop</a> for shipping instructions once your buylist submission is ready.
          </p>
        </div>
      </div>
    </div>
  );
}
