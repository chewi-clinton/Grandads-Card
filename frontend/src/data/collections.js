export const collections = [
  {
    handle: "all-products",
    title: "All Products",
    description:
      "Browse sealed booster boxes, singles, and accessories from Grandad's Cards.",
    image: "/images/site/hero-dream.png",
    categories: [
      "pokemon-japanese",
      "pokemon-chinese",
      "pokemon-english",
      "pokemon-singles",
      "one-piece-sealed",
      "one-piece-singles",
      "mtg-sealed",
      "mtg-singles",
      "riftbound-sealed",
      "riftbound-singles",
      "accessories",
    ],
  },
  {
    handle: "japanese-pokemon",
    title: "Japanese Pokémon",
    description:
      "Factory-sealed Japanese Pokémon booster boxes, straight from the source.",
    image: "/images/categories/japanese-pokemon.png",
    categories: ["pokemon-japanese"],
  },
  {
    handle: "chinese-pokemon",
    title: "Chinese Pokémon",
    description: "Sealed Chinese Pokémon booster boxes and collector packs.",
    image: "/images/categories/chinese-pokemon.png",
    categories: ["pokemon-chinese"],
  },
  {
    handle: "english-pokemon",
    title: "English Pokémon",
    description: "English-language Pokémon TCG sealed products and decks.",
    image: "/images/categories/english-pokemon.png",
    categories: ["pokemon-english"],
  },
  {
    handle: "pokemon-singles",
    title: "Pokémon Singles",
    description: "Graded and raw Pokémon singles, checked and securely packed.",
    image: "/images/categories/japanese-pokemon.png",
    categories: ["pokemon-singles"],
  },
  {
    handle: "one-piece",
    title: "One Piece",
    description: "Sealed Japanese One Piece Card Game booster boxes.",
    image: "/images/categories/one-piece.png",
    categories: ["one-piece-sealed"],
  },
  {
    handle: "one-piece-singles",
    title: "One Piece Singles",
    description: "One Piece Card Game singles.",
    image: "/images/categories/one-piece.png",
    categories: ["one-piece-singles"],
  },
  {
    handle: "magic-the-gathering",
    title: "Magic: The Gathering",
    description: "Commander decks and sealed Magic: The Gathering product.",
    image: "/images/categories/magic-the-gathering.png",
    categories: ["mtg-sealed"],
  },
  {
    handle: "magic-the-gathering-singles",
    title: "Magic: The Gathering Singles",
    description: "Magic: The Gathering singles.",
    image: "/images/categories/magic-the-gathering.png",
    categories: ["mtg-singles"],
  },
  {
    handle: "riftbound",
    title: "Riftbound Singles",
    description: "Riftbound: League of Legends Trading Card Game singles.",
    image: "/images/categories/magic-the-gathering.png",
    categories: ["riftbound-singles"],
  },
  {
    handle: "riftbound-sealed",
    title: "Sealed Riftbound",
    description: "Sealed Riftbound: League of Legends Trading Card Game product.",
    image: "/images/categories/magic-the-gathering.png",
    categories: ["riftbound-sealed"],
  },
  {
    handle: "accessories",
    title: "Accessories",
    description: "Sleeves, toploaders, and storage for protecting your cards.",
    image: "/images/categories/accessories.png",
    categories: ["accessories"],
  },
];

export function getCollectionByHandle(handle) {
  return collections.find((c) => c.handle === handle);
}

export const homepageCategoryTiles = collections.filter((c) =>
  ["japanese-pokemon", "chinese-pokemon", "english-pokemon", "one-piece", "magic-the-gathering", "accessories"].includes(
    c.handle
  )
);
