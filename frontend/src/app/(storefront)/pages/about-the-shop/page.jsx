import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "About Our Shop",
  description:
    "Grandad's Cards started with a simple love for the hobby and the people in it. Sealed Pokémon, One Piece, Magic and more in English, Japanese, and Chinese.",
  alternates: { canonical: "/pages/about-the-shop" },
};

export default function AboutPage() {
  return (
    <div>
      <Breadcrumbs items={[{ text: "Home", href: "/" }, { text: "About Our Shop" }]} />
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-4 text-center text-4xl font-bold">About Our Shop</h1>
        <div className="space-y-4 text-center text-[15px] leading-[22.5px] text-foreground">
          <p>A Card Shop Built for Collectors and Players</p>
          <p>
            Grandad&apos;s Cards started with a simple love for the hobby and the people in it.
            Today we bring that same passion to every order, from sealed booster boxes to the
            single card that finishes your set.
          </p>
          <p>
            We carry Pok&eacute;mon, One Piece, Magic, and more, in English, Japanese, and
            Chinese, with new releases landing as they drop. Every product is authentic,
            carefully handled, and shipped fast from our US store.
          </p>
          <p>
            Whether you are chasing a grail, building a deck, or just here to rip some packs, you
            are in the right place.
          </p>
        </div>
      </div>
    </div>
  );
}
