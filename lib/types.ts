export type TitleStatus = "melkia" | "titre_foncier" | "requisition" | "mixed";

export type PropertyType =
  | "riad"
  | "dar"
  | "douaria"
  | "fondouk"
  | "palace"
  | "kasbah"
  | "land";

export type Orientation = "north" | "south" | "east" | "west";

export type FloorType = "carrelage" | "tadelakt" | "bejmat" | "mixed";

export type PropertyStatus =
  | "available"
  | "under_offer"
  | "sold"
  | "archived";

export type PropertyImagesSource = "mubawab" | "cloudinary";

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

// Modern House Sales register property record. Stays flat-file in
// lib/content/properties.ts. Database-only fields (id, createdAt,
// updatedAt) are intentionally absent — git history is the audit log.
// `featured` is a Hawazine-specific extension used by the homepage's
// "Currently representing" pick logic; not in the underlying schema.
export interface Property {
  // Identity
  slug: string;

  // Headline
  title: string;
  quarterSlug: string;
  subLocation: string | null;
  city: string;
  priceDh: number;
  priceEur: number | null;

  // Specs
  propertyType: PropertyType;
  sizeM2: number;
  bedrooms: number | null;
  bathrooms: number | null;
  roomsTotal: number | null;
  floors: number | null;
  hasTerrace: boolean;
  hasCourtyard: boolean;
  hasWell: boolean;
  orientation: Orientation | null;
  floorType: FloorType | null;

  // Heritage / legal
  ageBracket: string | null;
  approximateYear: string | null;
  conditionSummary: string | null;
  titleStatus: TitleStatus;
  titleNotes: string | null;

  // Description
  descriptionShort: string;
  descriptionLong: string;
  descriptionFrench: string | null;

  // Gallery
  galleryImageUrls: string[];
  heroImageIndex: number;
  imagesSource: PropertyImagesSource | null;

  // Geo
  latitude: number | null;
  longitude: number | null;
  walkingLandmarks: string[];

  // Source
  agentName: string;
  agentRefMubawab: string | null;
  agentUrlMubawab: string | null;

  // Cross-links
  relatedJournalSlugs: string[];
  relatedIndexSlugs: string[];

  // Status
  published: boolean;
  publishedAt: string | null;
  status: PropertyStatus;

  // Hawazine-specific (not in the agency schema)
  featured?: boolean;
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
  heroImagePrompt?: string;
  inlineImage1Url?: string;
  inlineImage1Alt?: string;
  inlineImage1Prompt?: string;
  inlineImage2Url?: string;
  inlineImage2Alt?: string;
  inlineImage2Prompt?: string;
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

// --- The Oracle (market intelligence) ---
// Public/private boundary: TransactionRecord is always private and feeds
// aggregates only. MarketNote is the published surface.

export interface TransactionRecord {
  id: string;
  date: string; // YYYY-MM
  quarter: string; // quarter slug
  type: "riad" | "dar" | "land" | "apartment";
  titleType?: TitleStatus; // omit when unknown
  surfaceM2?: number;
  askingPriceDh?: number;
  transactionPriceDh?: number;
  daysOnMarket?: number;
  source: "hawazine" | "observed" | "reported";
  notes?: string; // private, never published
}

export interface MarketNote {
  id: string;
  date: string;
  quarter?: string; // omit for medina-wide notes
  headline: string;
  body: string;
  dataPoints?: string[];
  format: "the-record" | "the-market";
  published: boolean;
}

export type IndexCategory =
  | "the-basics"
  | "legal-title"
  | "transaction-process"
  | "costs-taxes"
  | "renovation-reality"
  | "due-diligence"
  | "after-the-sale";

export interface IndexCrossLink {
  term: string;
  slug: string;
}

export interface IndexGlossaryLink {
  term: string;
  anchor: string;
}

export interface IndexEntry {
  slug: string;
  number: number;
  question: string;
  preview: string;
  category: IndexCategory;
  body: string;
  seeAlso?: IndexCrossLink[];
  glossaryTerms?: IndexGlossaryLink[];
  lastUpdated: string;
}

export interface IndexCategoryMeta {
  slug: IndexCategory;
  label: string;
  description: string;
}

export type GlossaryCategory =
  | "legal-title"
  | "transaction-taxation"
  | "urban-planning-land"
  | "architecture-built"
  | "craft-materials"
  | "people-roles";

export interface GlossaryCrossLink {
  term: string;
  anchor: string;
}

export interface GlossaryExternalLink {
  label: string;
  href: string;
}

export interface GlossaryEntry {
  slug: string; // same-page anchor target, kebab-case
  term: string;
  pronunciation?: string;
  arabic?: string;
  french?: string;
  category: GlossaryCategory;
  definition: string;
  context?: string;
  alsoKnownAs?: string[];
  seeAlso?: GlossaryCrossLink[];
  relatedContent?: GlossaryExternalLink[];
}

export interface GlossaryCategoryMeta {
  slug: GlossaryCategory;
  label: string;
  description: string;
}

export interface PriceAggregate {
  quarter: string;
  count: number;
  medianDhPerM2?: number;
  rangeDhPerM2?: { min: number; max: number };
  observedRange?: { from: string; to: string };
}

export const TITLE_STATUS_LABEL: Record<TitleStatus, string> = {
  melkia: "Melkia",
  titre_foncier: "Titre foncier",
  requisition: "Réquisition",
  mixed: "Mixed title",
};

export const PROPERTY_TYPE_LABEL: Record<PropertyType, string> = {
  riad: "Riad",
  dar: "Dar",
  douaria: "Douaria",
  fondouk: "Fondouk",
  palace: "Palace",
  kasbah: "Kasbah",
  land: "Land",
};
