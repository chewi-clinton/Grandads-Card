import { ProductCarousel } from "./ProductCarousel";
import { getProductByHandle } from "@/data/products";

const HANDLES = [
  "mega-gengar-ex-284-217-holofoil-me-ascended-heroes",
  "gengar-vmax-alternate-art-secret-271-264-swsh08-fusion-strike",
  "m-rayquaza-ex-shiny-full-art-98-98-xy-ancient-origins",
  "giratina-v-alternate-full-art-186-196-swsh11-lost-origin",
  "mega-charizard-x-ex-125-094-me02-phantasmal-flames",
  "mega-charizard-y-ex-294-217-holofoil-me-ascended-heroes",
  "sylveon-ex-156-131-sv-prismatic-evolutions",
  "mega-darkrai-ex-118-081-holofoil-m5-abyss-eye",
  "team-aquas-kyogre-ex-6-34-double-crisis",
  "umbreon-ex-217-187-sv8a-terastal-fest-ex",
  "charizard-ex-199-165-sv-scarlet-violet-151",
  "team-rockets-mewtwo-ex-281-217-holofoil-me-ascended-heroes",
  "giratina-vstar-secret-gg69-gg70-crown-zenith-galarian-gallery",
  "umbreon-v-alternate-full-art-189-203-swsh07-evolving-skies",
  "mega-darkrai-ex-114-081-holofoil-m5-abyss-eye",
  "blaziken-vmax-alternate-art-secret-201-198-swsh06-chilling-reign",
  "leafeon-ex-144-131-sv-prismatic-evolutions",
  "primal-groudon-ex-shiny-full-art-97-98-xy-ancient-origins",
  "cynthias-garchomp-ex-232-182-sv10-destined-rivals",
  "mega-greninja-ex-116-086-holofoil-me04-chaos-rising",
  "seismitoad-105-086-sv-black-bolt",
  "gengar-034-088-xy4-phantom-gate",
  "rayquaza-vmax-tg20-tg30-swsh12-silver-tempest-trainer-gallery",
  "gardevoir-ex-233-091-sv-paldean-fates",
];

export function SinglesCarouselSection() {
  const products = HANDLES.map((h) => getProductByHandle(h)).filter(Boolean);
  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-14">
      <ProductCarousel products={products} />
    </section>
  );
}
