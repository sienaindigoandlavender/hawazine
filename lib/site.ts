export const siteConfig = {
  name: "Hawazine",
  domain: "hawazine.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hawazine.com",
  tagline: "Courtyards and terraces in the Marrakech medina.",
  wordmarkTagline: "Marrakech · Property · Architecture",
  description:
    "Riads, dars, and land in the Marrakech medina — courtyards, terraces, and the Atlas in the distance. An editorial publication that happens to sell houses in it.",
  email: "morocco@hawazine.com",
} as const;

export const primaryNav = [
  { href: "/marrakech", label: "Marrakech" },
  { href: "/buying", label: "Buying" },
  { href: "/craft", label: "Craft" },
  { href: "/properties", label: "Properties" },
  { href: "/contact", label: "Contact" },
] as const;

export const secondaryNav = [
  { href: "/buying", label: "The Index" },
  { href: "/glossary", label: "Glossary" },
  { href: "/journal", label: "Journal" },
] as const;
