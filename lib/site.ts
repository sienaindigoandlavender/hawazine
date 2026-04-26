export const siteConfig = {
  name: "Hawazine",
  legalName: "Hawazine — Marrakech medina property",
  domain: "hawazine.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hawazine.com",
  tagline: "Courtyards and terraces in the Marrakech medina.",
  wordmarkTagline: "Marrakech · Property · Architecture",
  description:
    "Riads, dars, and land in the Marrakech medina — courtyards, terraces, and the Atlas in the distance. An editorial publication that happens to sell houses in it.",
  shortDescription:
    "Marrakech medina real estate agency. Riads, dars, and land — with the editorial and legal context to buy them well.",
  email: "morocco@hawazine.com",
  locale: "en_GB",
  language: "en",
  founded: "2024",
  // Used for the organization-level JSON-LD address. The agency operates
  // inside the medina; we publish the city, region, and country only.
  address: {
    locality: "Marrakech",
    region: "Marrakesh-Safi",
    countryCode: "MA",
    countryName: "Morocco",
  },
  // Approximate geo for Marrakech medina centre (Jemaa el-Fna). Not a
  // street address — the agency does not publish one.
  geo: { lat: 31.6258, lng: -7.9891 },
  // Pricing range across published inventory — useful for RealEstateAgent
  // schema. Updated when inventory changes meaningfully.
  priceRange: "1.5M dh – 8M dh",
  areaServed: ["Marrakech medina", "Marrakech", "Morocco"],
  // What the agency is authoritative about. Drives Organization.knowsAbout
  // and feeds AI/GEO grounding signals.
  knowsAbout: [
    "Marrakech medina real estate",
    "Riads",
    "Dars",
    "Moroccan property law",
    "Melkia title",
    "Titre foncier",
    "Adoul",
    "Notaire",
    "Riad renovation",
    "Tadelakt",
    "Bejmat",
    "Moroccan architecture",
    "Foreign property ownership in Morocco",
  ],
  // External profiles — keep this list authoritative; Schema.org sameAs
  // anchors the entity across the open web for both search and LLM
  // grounding. Update or extend as profiles come online.
  sameAs: ["https://www.mubawab.ma/"],
  // Logo URL used by JSON-LD publishers. Keep in sync with /app/icon.svg
  // until we ship a dedicated wordmark.
  logoPath: "/icon.svg",
} as const;

// April 2026 nav restructure: four-verb primary (Buy / Learn / Build /
// Contact). Secondary nav has been retired. LEARN exposes the three
// reference / editorial destinations as a submenu. The Marrakech
// overview sits in the footer.
export interface NavItem {
  href: string;
  label: string;
  submenu?: ReadonlyArray<{ href: string; label: string }>;
}

export const primaryNav: ReadonlyArray<NavItem> = [
  { href: "/properties", label: "Buy" },
  {
    href: "/journal",
    label: "Learn",
    submenu: [
      { href: "/journal", label: "Journal" },
      { href: "/buying", label: "The Index" },
      { href: "/glossary", label: "Glossary" },
    ],
  },
  { href: "/build", label: "Build" },
  { href: "/contact", label: "Contact" },
];

// Reference link(s) surfaced from the site footer rather than top nav.
// The medina overview sits here; The Index and Glossary live under the
// LEARN submenu in the primary nav.
export const footerReferenceNav: ReadonlyArray<NavItem> = [
  { href: "/marrakech", label: "Marrakech" },
];
