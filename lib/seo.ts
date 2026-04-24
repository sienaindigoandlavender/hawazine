import { siteConfig } from "@/lib/site";

// Shared SEO + AI-GEO helpers. Keeps JSON-LD construction in one place so
// pages stay focused on layout and copy.

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = siteConfig.url.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logoPath),
    image: absoluteUrl(siteConfig.logoPath),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: siteConfig.email,
    foundingDate: siteConfig.founded,
    priceRange: siteConfig.priceRange,
    areaServed: [
      {
        "@type": "City",
        name: "Marrakech",
        containedInPlace: { "@type": "Country", name: "Morocco" },
      },
      { "@type": "Country", name: "Morocco" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    knowsAbout: [...siteConfig.knowsAbout],
    knowsLanguage: ["en", "fr", "ar"],
    sameAs: [...siteConfig.sameAs],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      availableLanguage: ["English", "French", "Arabic"],
      areaServed: "MA",
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    name: siteConfig.name,
    alternateName: "Hawazine Marrakech",
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": `${siteConfig.url}#organization` },
  };
}

// Shared keyword sets used across page metadata. Keep these tight and
// genuinely descriptive — keyword stuffing is counter-productive both for
// classical SEO and for LLM grounding.
export const SEO_KEYWORDS = {
  base: [
    "Marrakech medina",
    "Marrakech real estate",
    "Marrakech property",
    "buy a riad in Marrakech",
    "Moroccan property",
    "Morocco real estate",
    "riad for sale",
    "dar for sale",
    "Marrakech medina property agency",
    "Hawazine",
  ],
  buying: [
    "buying a riad in Morocco",
    "melkia",
    "titre foncier",
    "foreign property ownership Morocco",
    "buying property in Marrakech",
    "Moroccan property law",
    "adoul",
    "notaire",
    "compromis de vente",
    "acte de vente",
  ],
  glossary: [
    "Moroccan property glossary",
    "riad terminology",
    "tadelakt",
    "bejmat",
    "zellige",
    "darija property terms",
    "melkia definition",
    "titre foncier definition",
  ],
  journal: [
    "Marrakech medina journal",
    "Moroccan architecture writing",
    "riad restoration",
    "Marrakech market intelligence",
  ],
} as const;
