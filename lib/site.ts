export const siteConfig = {
  name: "Hawazine",
  domain: "hawazine.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hawazine.com",
  tagline: "Courtyards and terraces in the Marrakech medina.",
  description:
    "Riads, dars, and land in the Marrakech medina — courtyards, terraces, and the Atlas in the distance. An editorial publication that happens to sell houses in it.",
  email: "morocco@hawazine.com",
} as const;

export const primaryNav = [
  { href: "/marrakech", label: "Marrakech" },
  { href: "/buying", label: "Buying" },
  { href: "/journal", label: "The Index" },
  { href: "/properties", label: "Properties" },
] as const;
