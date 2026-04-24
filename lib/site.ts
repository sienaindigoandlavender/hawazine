export const siteConfig = {
  name: "Hawazine",
  domain: "hawazine.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hawazine.com",
  tagline: "Riads, dars, and land in the Marrakech medina.",
  description:
    "A licensed Moroccan real estate agency specialising in melkia-titled riads, dars, and land in Laksour and Mouassine. An editorial publication that happens to sell property.",
  email: "morocco@hawazine.com",
  carteProfessionnelle: "[carte professionnelle — number TK]",
} as const;

export const primaryNav = [
  { href: "/marrakech", label: "Marrakech" },
  { href: "/buying", label: "Buying" },
  { href: "/journal", label: "Journal" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
