import type { Quarter } from "@/lib/types";

const PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg";

export const quarters: Quarter[] = [
  {
    slug: "laksour",
    name: "Laksour",
    subtitle: "5 minutes on foot from Jemaa el-Fna",
    essay: `The most consistently sought quarter for foreign buyers. Dense residential fabric, narrow derbs, high proportion of traditional riads still in family ownership. Bordered by the Agdal gardens to the south. Prices have moved faster here than anywhere in the medina over the past decade. The concentration of melkia titles is high — which means both opportunity and complexity.`,
    heroImageUrl: PLACEHOLDER_IMAGE,
    heroImageAlt: "A narrow derb in Laksour, late afternoon light on ochre walls",
    mapCenter: { lng: -7.991, lat: 31.6262 },
    mapZoom: 15,
    published: true,
  },
  {
    slug: "mouassine",
    name: "Mouassine",
    subtitle: "8–12 minutes on foot from Jemaa el-Fna",
    essay: `The creative quarter. Home to the 16th-century Mouassine mosque and its monumental fountain — one of the four great fountains of the Saadian medina. The streets around it have attracted architects, gallerists, and independent hoteliers since the early 2000s. Property here skews larger than Laksour. The renovation standard is generally higher. Prices reflect both.`,
    heroImageUrl: PLACEHOLDER_IMAGE,
    heroImageAlt: "Mouassine at dusk, rooftops stepping toward the Atlas",
    mapCenter: { lng: -7.9882, lat: 31.6318 },
    mapZoom: 15,
    published: true,
  },
  {
    slug: "kasbah",
    name: "Kasbah",
    subtitle: "15–20 minutes on foot from Jemaa el-Fna",
    essay: `The oldest defended core of the city — the royal kasbah established by Yacoub el-Mansour in the 12th century. Home to the Saadian Tombs and the Kasbah mosque. Less visited by foreign buyers than Laksour or Mouassine, which keeps prices lower and inventory less contested. Properties here tend to be larger plots. The quarter rewards patience and local knowledge.`,
    heroImageUrl: PLACEHOLDER_IMAGE,
    heroImageAlt: "The Kasbah walls at the hush of midday",
    mapCenter: { lng: -7.9864, lat: 31.6187 },
    mapZoom: 15,
    published: true,
  },
  {
    slug: "bab-doukkala",
    name: "Bab Doukkala",
    subtitle: "12–15 minutes on foot from Jemaa el-Fna",
    essay: `Named for the great gate that once opened toward the Doukkala plains. A working residential quarter — less touristic than the central medina, more intact as daily life. The 16th-century Bab Doukkala mosque anchors the quarter. Foreign buyer interest has grown steadily since 2018 as Laksour and Mouassine prices compressed available stock. Value per m² remains the most competitive of the four main quarters.`,
    heroImageUrl: PLACEHOLDER_IMAGE,
    heroImageAlt: "A baker at work near Bab Doukkala in the morning",
    mapCenter: { lng: -7.9957, lat: 31.6338 },
    mapZoom: 15,
    published: true,
  },
  {
    slug: "riad-laarous",
    name: "Riad Laarous",
    subtitle: "North-central, between Mouassine and Bab Doukkala",
    essay: `A quiet, largely residential quarter with a strong local character. Less visible on the international market — which is precisely its appeal to buyers who want the medina without the density of foreign ownership that has changed parts of Mouassine. Some of the best-preserved domestic architecture in the medina sits here, largely unphotographed.`,
    heroImageUrl: PLACEHOLDER_IMAGE,
    heroImageAlt: "A derb in Riad Laarous, unsigned and unhurried",
    mapCenter: { lng: -7.993, lat: 31.6325 },
    mapZoom: 15,
    published: true,
  },
  {
    slug: "arset-el-maach",
    name: "Arset el-Maach",
    subtitle: "5 minutes on foot east of Jemaa el-Fna",
    essay: `Transitional quarter between the commercial heart and the residential fabric. Historically an orchard district — arset means garden or orchard in Darija. Less uniform than Laksour or Mouassine; the housing stock varies considerably. Proximity to the square means noise and foot traffic on the main arteries, with pockets of complete quiet one street back.`,
    heroImageUrl: PLACEHOLDER_IMAGE,
    heroImageAlt: "A courtyard of an old orchard house in Arset el-Maach",
    mapCenter: { lng: -7.9851, lat: 31.6268 },
    mapZoom: 15,
    published: true,
  },
  {
    slug: "mellah",
    name: "Mellah",
    subtitle: "Southeast, adjacent to the Royal Palace and Kasbah",
    essay: `The historic Jewish quarter, established in the 16th century under the Saadians — the only mellah in a Moroccan imperial city located inside the medina walls rather than beside them. Architecturally distinct: taller buildings, smaller internal courtyards, wrought-iron balconies facing the street rather than inward. Undergoing significant change. Title situations here require particular care.`,
    heroImageUrl: PLACEHOLDER_IMAGE,
    heroImageAlt: "A wrought-iron balcony in the Mellah",
    mapCenter: { lng: -7.9833, lat: 31.6218 },
    mapZoom: 15,
    published: true,
  },
  {
    slug: "kennaria",
    name: "Kennaria",
    subtitle: "Southeast of Jemaa el-Fna, between the square and the Mellah",
    essay: `A corridor quarter connecting the tourist spine to the Mellah and Kasbah. Home to the Bahia Palace. Mixed fabric — some fine riads, significant tourist commercial activity on the main routes. The residential streets behind the palace are quieter and less known than their proximity to the centre would suggest.`,
    heroImageUrl: PLACEHOLDER_IMAGE,
    heroImageAlt: "A quiet street behind the Bahia in Kennaria",
    mapCenter: { lng: -7.9847, lat: 31.6238 },
    mapZoom: 15,
    published: true,
  },
  {
    slug: "bab-taghzout",
    name: "Bab Taghzout",
    subtitle: "Northeast, near the northern medina wall",
    essay: `One of the least-visited quarters by foreign buyers — and one of the most intact. The area around the Bab Taghzout gate and the Sidi Ben Slimane mosque retains a daily life that has largely disappeared from the more commercialised quarters. For buyers prepared to work with local intermediaries and navigate a less liquid market, the value proposition is significant.`,
    heroImageUrl: PLACEHOLDER_IMAGE,
    heroImageAlt: "The Bab Taghzout gate at first light",
    mapCenter: { lng: -7.9883, lat: 31.6368 },
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
