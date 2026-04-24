export const siteConfig = {
  name: "Hawazine",
  domain: "hawazine.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hawazine.com",
  tagline: "Houses inside the wall of the Marrakech medina.",
  description:
    "Riads, dars, and land across every quarter of the Marrakech medina. An editorial publication that happens to sell houses in it.",
  email: "morocco@hawazine.com",
} as const;

export const primaryNav = [
  { href: "/marrakech", label: "Marrakech" },
  { href: "/buying", label: "Buying" },
  { href: "/journal", label: "Journal" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
