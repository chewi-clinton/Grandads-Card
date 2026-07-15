import Image from "next/image";
import Link from "next/link";

export function SinglesBanner() {
  return (
    <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden">
      <Image
        src="/images/site/singles-instore-banner.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(26,26,26,0.8)" }} />
      <div className="relative z-10 px-6 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Singles. In-Store &amp; Online.</h2>
        <p className="mb-6">Hundreds of new single cards uploaded weekly!</p>
        <Link
          href="/collections/pokemon-singles"
          className="inline-block rounded bg-accent px-6 py-3 text-sm font-bold hover:opacity-90"
        >
          Shop Singles
        </Link>
      </div>
    </section>
  );
}
