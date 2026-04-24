export type TitleStatus =
  | "melkia"
  | "titre_foncier"
  | "requisition"
  | "melkia_in_process";

export type PropertyType = "riad" | "land" | "dar" | "other";

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export type LandmarkType =
  | "market"
  | "pharmacy"
  | "school"
  | "hammam"
  | "transport"
  | "hospital"
  | "mosque"
  | "parking"
  | "landmark";

export interface Landmark {
  type: LandmarkType;
  label: string;
  note: string;
}

export interface Quarter {
  slug: string;
  name: string;
  subtitle?: string;
  essay: string;
  heroImageUrl: string;
  heroImageAlt: string;
  mapCenter: { lat: number; lng: number };
  mapZoom?: number;
  landmarks?: Landmark[];
  published: boolean;
}

export interface Property {
  slug: string;
  title: string;
  subtitle?: string;
  propertyType: PropertyType;
  quarterSlug?: string;
  subLocation?: string;
  sizeM2?: number;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  hasTerrace?: boolean;
  titleStatus?: TitleStatus;
  titleNotes?: string;
  conditionSummary?: string;
  renovationNotes?: string;
  descriptionMarkdown: string;
  askingPriceDh?: number;
  priceNote?: string;
  heroImageUrl: string;
  heroImageAlt: string;
  galleryImages?: GalleryImage[];
  featured?: boolean;
  published: boolean;
  updatedAt: string;
}

export type JournalFormat =
  | "the-medina"
  | "the-market"
  | "the-house"
  | "the-record";

export interface JournalEntry {
  slug: string;
  title: string;
  subtitle?: string;
  bodyMarkdown: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  publishedAt: string;
  published: boolean;
  format?: JournalFormat;
}

export interface Page {
  slug: string;
  title: string;
  subtitle?: string;
  bodyMarkdown: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  updatedAt: string;
}

export const TITLE_STATUS_LABEL: Record<TitleStatus, string> = {
  melkia: "Melkia",
  titre_foncier: "Titre foncier",
  requisition: "Réquisition",
  melkia_in_process: "Melkia in process",
};

export const PROPERTY_TYPE_LABEL: Record<PropertyType, string> = {
  riad: "Riad",
  land: "Land",
  dar: "Dar",
  other: "Property",
};
