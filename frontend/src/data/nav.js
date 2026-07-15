export const primaryNav = [
  { text: "Home", href: "/" },
  {
    text: "Pokémon",
    href: "/collections/all-sealed-pokemon",
    columns: [
      {
        heading: "Featured",
        links: [
          { text: "All Sealed Pokémon", href: "/collections/all-sealed-pokemon" },
          { text: "Pokémon Singles", href: "/collections/pokemon-singles" },
        ],
      },
      {
        heading: "Shop By Language",
        links: [
          { text: "Japanese Sealed", href: "/collections/japanese-pokemon" },
          { text: "Chinese Sealed", href: "/collections/chinese-pokemon" },
          { text: "English Sealed", href: "/collections/english-pokemon" },
        ],
      },
    ],
  },
  {
    text: "Singles",
    href: "/collections/pokemon-singles",
    columns: [
      {
        heading: "Shop by Game",
        links: [
          { text: "Pokémon Singles", href: "/collections/pokemon-singles" },
          { text: "One Piece Singles", href: "/collections/one-piece-singles" },
          { text: "Magic the Gathering Singles", href: "/collections/magic-the-gathering-singles" },
          { text: "Riftbound", href: "/collections/riftbound" },
        ],
      },
    ],
  },
  {
    text: "One Piece",
    href: "/collections/one-piece",
    columns: [
      {
        links: [
          { text: "Sealed Japanese One Piece", href: "/collections/one-piece" },
          { text: "One Piece Singles", href: "/collections/one-piece-singles" },
        ],
      },
    ],
  },
  {
    text: "Magic: The Gathering",
    href: "/collections/magic-the-gathering",
    columns: [
      {
        links: [
          { text: "Sealed Magic the Gathering", href: "/collections/magic-the-gathering" },
          { text: "Magic the Gathering Singles", href: "/collections/magic-the-gathering-singles" },
        ],
      },
    ],
  },
  {
    text: "Riftbound",
    href: "/collections/riftbound",
    columns: [
      {
        links: [
          { text: "Sealed Chinese Riftbound", href: "/collections/riftbound-sealed" },
          { text: "Riftbound Singles", href: "/collections/riftbound" },
        ],
      },
    ],
  },
  { text: "Buylist", href: "/pages/buylist" },
  { text: "Accessories", href: "/collections/accessories" },
  { text: "Retail Store", href: "/pages/retail-store" },
];

export const siteConfig = {
  name: "Grandad's Cards",
  domain: "grandadscards.shop",
  url: "https://grandadscards.shop",
  description:
    "Family-run trading card shop with sealed Pokémon, Japanese & Chinese sets, One Piece, MTG, graded cards and singles. Real store, real inventory, fast shipping.",
  address: "709 Allendale Drive, Lexington KY 40503",
  email: "support@grandadscards.shop",
  social: {
    facebook: "https://www.facebook.com/GrandadsCardsShop",
    instagram: "https://www.instagram.com/grandads_cards/",
    twitter: "https://x.com/GrandadsCards",
  },
};
