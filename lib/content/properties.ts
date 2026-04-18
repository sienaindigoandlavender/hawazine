import type { Property } from "@/lib/types";

export const properties: Property[] = [
  {
    slug: "riad-derb-el-hajra",
    title: "Riad, derb el-Hajra",
    subtitle: "A four-bedroom riad on a quiet lane, Laksour",
    propertyType: "riad",
    quarterSlug: "laksour",
    subLocation: "Northern Laksour, seven minutes on foot from Jemaa el-Fna",
    sizeM2: 240,
    bedrooms: 4,
    bathrooms: 4,
    floors: 3,
    hasTerrace: true,
    titleStatus: "melkia",
    titleNotes:
      "Single-family melkia, clean chain of ownership verified with the adoul. No co-owners, no disputes on record.",
    conditionSummary:
      "Habitable. Recent electrical and plumbing work; original tadelakt in good order. Kitchen and two bathrooms would benefit from replacement on a five-year horizon.",
    renovationNotes:
      "No structural work required. Light cosmetic refresh (paint, lighting, two bathrooms) would bring the house to a long-let standard within a modest budget.",
    descriptionMarkdown: `The house is quieter than its location suggests. From the derb you pass through a short, low entry and emerge into a patio paved in bejmat, with an orange tree set slightly off-centre and a stone fountain that still runs.

The ground floor holds the patio, a salon with its original cedar ceiling, a dining room, a small service kitchen, and a guest bathroom. The first floor holds three bedrooms each with an ensuite; the second holds a fourth bedroom and a reading room. The roof terrace is shaded at one end by a pergola; the rest is open, with a long view west across the medina.

The house last traded in 2011 and has been in careful private hands since. It is being offered because the owner is moving back to Europe.`,
    askingPriceDh: 3_200_000,
    priceNote: "Asking 3.2M dh. Open to an informed offer.",
    heroImageUrl: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg",
    heroImageAlt: "Patio of the riad at derb el-Hajra, afternoon light",
    galleryImages: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg",
        alt: "Salon with original cedar ceiling",
      },
      {
        url: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg",
        alt: "Roof terrace looking west",
      },
    ],
    featured: true,
    published: true,
    updatedAt: "2026-04-12",
  },
  {
    slug: "dar-mouassine-north",
    title: "Dar near Mouassine fountain",
    subtitle: "A two-bedroom dar with a rare west-facing terrace",
    propertyType: "dar",
    quarterSlug: "mouassine",
    subLocation: "Three minutes on foot from the Mouassine fountain",
    sizeM2: 120,
    bedrooms: 2,
    bathrooms: 2,
    floors: 2,
    hasTerrace: true,
    titleStatus: "melkia_in_process",
    titleNotes:
      "Melkia currently being consolidated by the adoul. Expected to complete within eight weeks of an offer being accepted.",
    conditionSummary:
      "Renovated in 2019 to a high domestic standard. Systems in good order. No works outstanding.",
    descriptionMarkdown: `A compact, well-run dar on one of the busier arteries in Mouassine — the building itself is set back enough from the lane that street noise does not carry into the patio.

Two floors, two bedrooms, one reception, a working kitchen, and a terrace whose best moment is the late afternoon light on the Koutoubia. The house is better suited to a couple or a small family than a rental operator.`,
    askingPriceDh: 2_400_000,
    priceNote: "Asking 2.4M dh.",
    heroImageUrl: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg",
    heroImageAlt: "West-facing terrace, Mouassine",
    featured: true,
    published: true,
    updatedAt: "2026-04-02",
  },
];

export function getPublishedProperties(): Property[] {
  return properties.filter((p) => p.published);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.published && p.featured);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug && p.published);
}

export function getPropertiesByQuarter(quarterSlug: string): Property[] {
  return properties.filter((p) => p.published && p.quarterSlug === quarterSlug);
}
