import type { Quarter } from "@/lib/types";

export const quarters: Quarter[] = [
  {
    slug: "laksour",
    name: "Laksour",
    subtitle: "Quiet lanes a short walk from Jemaa el-Fna",
    essay: `Laksour sits in the northern medina, bordered by the souks to the east and the ramparts to the west. The quarter is residential in character; its lanes are narrower and quieter than the commercial arteries nearby, which is exactly why it has drawn buyers looking for a real house in a real neighbourhood rather than a hotel on a postcard street.

Most of what we list in Laksour sits on a derb (a dead-end lane) rather than a through route. This matters in practice: night-time noise is near zero, deliveries are on foot, and the social texture of the street is families, not tour groups.

The building stock is mostly nineteenth- and early twentieth-century dars and riads, with the occasional twentieth-century rebuild behind an older façade. Titles are predominantly melkia. Prices per square metre are lower than Mouassine and noticeably lower than the Kasbah.`,
    heroImageUrl: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg",
    heroImageAlt: "A narrow derb in Laksour, late afternoon light on ochre walls",
    mapCenter: { lat: 31.6314, lng: -7.9925 },
    mapZoom: 15,
    published: true,
  },
  {
    slug: "mouassine",
    name: "Mouassine",
    subtitle: "The medina's most watched address",
    essay: `Mouassine is the quarter most people picture when they picture Marrakech: the fountain, the mosque, the tightly wound lanes around the Dar el Bacha. It is the quarter most often compared, rightly or wrongly, to the Marais or Trastevere.

The stock here is older on average than Laksour, and the best houses hold their value unusually well. Titled properties (melkia or titre foncier) trade at a premium against comparables in lesser-known quarters, and renovation-grade riads remain scarce.

Mouassine is not for every buyer. Lanes can be busy by day, and the lowest tier of the rental market leans heavily on short-let. We are most useful to buyers who want a primary or secondary residence here and who understand that the quarter's density is the point, not a problem to solve.`,
    heroImageUrl: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg",
    heroImageAlt: "Mouassine at dusk, rooftops stepping toward the Atlas",
    mapCenter: { lat: 31.6298, lng: -7.9888 },
    mapZoom: 15,
    published: true,
  },
];

export function getQuarterBySlug(slug: string): Quarter | undefined {
  return quarters.find((q) => q.slug === slug && q.published);
}

export function getPublishedQuarters(): Quarter[] {
  return quarters.filter((q) => q.published);
}
