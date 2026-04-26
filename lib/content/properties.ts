import type { Property } from "@/lib/types";

// Properties stay flat-file for v1 (per CLAUDE.md). Each entry is a
// real listing represented by Hawazine; image URLs currently point at
// Mubawab's CDN until the photography pass moves them to Cloudinary
// (`imagesSource` flips from "mubawab" to "cloudinary" at that point).
//
// To add a property: paste a new object into the array. Run-of-mill
// edits ship on the next git push — there is no admin UI.

const RIAD_LAKSOUR_XVIIIE_IMAGES = [
  "https://www.mubawab-media.com/ad/8/132/078F/h/16_80168013.jpg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/1_80168014.jpeg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/2_80168015.jpeg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/3_80168016.jpeg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/4_80168017.jpeg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/5_80168018.jpeg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/6_80168019.jpeg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/7_80168020.jpeg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/8_80168021.jpeg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/9_80168022.jpeg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/10_80168023.jpg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/11_80168024.jpeg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/12_80168025.jpeg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/13_80168026.jpg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/14_80168027.jpg",
  "https://www.mubawab-media.com/ad/8/132/078F/h/15_80168028.jpg",
];

const RIAD_JEMAA_EL_FNA_IMAGES = [
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-3_79862256.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-7_79862257.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-4_79862258.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-5_79862259.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-6_79862260.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-8_79862261.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-9_79862262.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-10_79862263.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-11_79862264.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-12_79862265.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-13_79862266.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-14_79862267.jpeg",
  "https://www.mubawab-media.com/ad/8/101/700F/h/Laksour-280205-15_79862268.jpeg",
];

export const properties: Property[] = [
  {
    slug: "riad-laksour-xviiie",
    title: "Riad XVIIIe — Laksour",
    quarterSlug: "laksour",
    subLocation: "Mouassine",
    city: "Marrakech",
    priceDh: 3_000_000,
    priceEur: null,
    propertyType: "riad",
    sizeM2: 116,
    bedrooms: 5,
    bathrooms: 2,
    roomsTotal: 8,
    floors: 1,
    hasTerrace: true,
    hasCourtyard: true,
    hasWell: false,
    orientation: "south",
    floorType: "carrelage",
    ageBracket: "300+",
    approximateYear: "XVIIIe siècle",
    conditionSummary: "Requires renovation",
    titleStatus: "melkia",
    titleNotes: null,
    descriptionShort:
      "An eighteenth-century riad in Laksour, two minutes from Jemaa el Fna. Original walls, simple arches, open volumes — to be restored, not redecorated.",
    descriptionLong:
      "In the heart of Laksour and Mouassine, a few steps from Jemaa el Fna, an authentic eighteenth-century riad stands intact in its essential form. The thick walls, the simple arches, the open volumes belong to another era. Seven principal rooms — five bedrooms — surround a traditional patio open to the sky. The property is held in melkia. Renovation work is required. For those who can read stone, this is an invitation: to restore, to preserve, to carry forward what has become rare. A riad with a soul. Not a decoration project. For seekers of authenticity, not bargain hunters. Walking distance from Jemaa el Fna and Bab Laksour.",
    descriptionFrench: null,
    galleryImageUrls: RIAD_LAKSOUR_XVIIIE_IMAGES,
    heroImageIndex: 0,
    imagesSource: "mubawab",
    latitude: null,
    longitude: null,
    walkingLandmarks: [
      "2 min walk from Jemaa el Fna",
      "Bab Laksour parking adjacent",
      "Mouassine souks within minutes",
    ],
    agentName: "Hawazine",
    agentRefMubawab: "8132078",
    agentUrlMubawab:
      "https://www.mubawab.ma/fr/a/8132078/laksour-%E2%80%93-riad-xviiie-si%C3%A8cle-proche-jemaa-el-fna",
    relatedJournalSlugs: [],
    relatedIndexSlugs: [],
    published: true,
    publishedAt: "2026-04-27",
    status: "available",
    featured: true,
  },
  {
    slug: "riad-jemaa-el-fna",
    title: "Riad on Jemaa el Fna",
    quarterSlug: "laksour",
    subLocation: "Mouassine",
    city: "Marrakech",
    priceDh: 2_300_000,
    priceEur: null,
    propertyType: "riad",
    sizeM2: 50,
    bedrooms: 4,
    bathrooms: 1,
    roomsTotal: 5,
    floors: 1,
    hasTerrace: true,
    hasCourtyard: true,
    hasWell: false,
    orientation: null,
    floorType: "carrelage",
    ageBracket: "50-70",
    approximateYear: null,
    conditionSummary: "Requires renovation",
    titleStatus: "melkia",
    titleNotes: "2 heirs (brother and sister) in agreement on the sale.",
    descriptionShort:
      "A riad on Jemaa el Fna itself, with direct access to the souks and Bab Laksour. Renovation required. A pergola on the terrace would frame the square directly.",
    descriptionLong:
      "This riad sits a few metres from Jemaa el Fna, with direct access to the souks and to the parking at Bab Laksour and rue Koutoubia — a rarity in the medina. The ground floor holds two bedrooms, a kitchen, and a bathroom. Upstairs, two further bedrooms and a second bathroom. A pergola on the terrace would frame the square directly. Held in melkia, with two heirs in agreement on the sale. Dossier available to direct buyers only.",
    descriptionFrench: null,
    galleryImageUrls: RIAD_JEMAA_EL_FNA_IMAGES,
    heroImageIndex: 0,
    imagesSource: "mubawab",
    latitude: null,
    longitude: null,
    walkingLandmarks: [
      "Directly on Jemaa el Fna",
      "Souks accessible from front door",
      "Bab Laksour and rue Koutoubia parking nearby",
    ],
    agentName: "Hawazine",
    agentRefMubawab: "8101700",
    agentUrlMubawab:
      "https://www.mubawab.ma/fr/a/8101700/riad-%C3%A0-r%C3%A9nover-%E2%80%93-sur-la-place-jemaa-el-fna",
    relatedJournalSlugs: [],
    relatedIndexSlugs: [],
    published: true,
    publishedAt: "2026-04-27",
    status: "available",
    featured: false,
  },
];

export function getPublishedProperties(): Property[] {
  return properties
    .filter((p) => p.published)
    .sort((a, b) => {
      const ap = a.publishedAt ?? "";
      const bp = b.publishedAt ?? "";
      return ap < bp ? 1 : ap > bp ? -1 : 0;
    });
}

export function getFeaturedProperties(): Property[] {
  return getPublishedProperties().filter((p) => p.featured);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug && p.published);
}

export function getPropertiesByQuarter(quarterSlug: string): Property[] {
  return getPublishedProperties().filter(
    (p) => p.quarterSlug === quarterSlug,
  );
}

// Convenience helper: returns the resolved hero image URL for a property,
// guarding against a stale heroImageIndex past the end of the gallery.
export function heroImageFor(property: Property): string | undefined {
  if (property.galleryImageUrls.length === 0) return undefined;
  const idx = Math.min(
    Math.max(property.heroImageIndex, 0),
    property.galleryImageUrls.length - 1,
  );
  return property.galleryImageUrls[idx];
}
