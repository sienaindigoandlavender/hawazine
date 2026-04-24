import type { JournalEntry, JournalFormat } from "@/lib/types";

export const JOURNAL_FORMATS: readonly JournalFormat[] = [
  "the-medina",
  "the-market",
  "the-house",
  "the-record",
] as const;

export const JOURNAL_FORMAT_LABEL: Record<JournalFormat, string> = {
  "the-medina": "The Medina",
  "the-market": "The Market",
  "the-house": "The House",
  "the-record": "The Record",
};

export const JOURNAL_FORMAT_DESCRIPTION: Record<JournalFormat, string> = {
  "the-medina": "A street, a quarter, a derb. Written from inside.",
  "the-market": "Price, pattern, structure. What the data shows.",
  "the-house": "A portrait of a single property. Not a listing.",
  "the-record": "One fact. One paragraph. Published when it matters.",
};

export function formatLabel(format: JournalFormat): string {
  return JOURNAL_FORMAT_LABEL[format];
}

export const journalEntries: JournalEntry[] = [
  {
    slug: "what-a-melkia-actually-is",
    title: "What a melkia actually is",
    subtitle: "And what it is not",
    bodyMarkdown: `A melkia is a form of customary title, drawn up by adouls — notaries working within the Moroccan legal tradition — that records ownership through a chain of witnessed acts. It is not a deed in the French sense; there is no single registry, no cadastre number, no plan attached at the moment of issuance.

This is the first thing buyers from European jurisdictions tend to misread. A melkia is not weaker than a titre foncier because it lacks a plan; it is a different instrument, serving a different purpose, with its own mechanisms for establishing and transferring ownership. Most of the medina is held on melkia. Most of the medina changes hands, year after year, on melkia, without drama.

What matters at the moment of purchase is not whether the property has "a title" but whether the melkia is clean: one or a small number of named owners, a continuous chain of transfers, and no registered disputes. The adoul establishes this before the sale; we ask our own questions alongside.`,
    heroImageUrl: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg",
    heroImageAlt: "A page from a melkia, handwritten",
    publishedAt: "2026-03-30",
    published: true,
  },
  {
    slug: "why-we-do-not-list-prices-first",
    title: "The price is the last thing.",
    bodyMarkdown: `A price without a house in front of it is the least useful number in real estate. It is also, on every portal, the first thing a buyer reads.

On Hawazine the house comes first. The photograph, the rooms, the light, the derb. The number is on the page, in the margin, waiting for the house to make it meaningful.

Nobody buys a riad because it is 3.2M dh. Buyers buy a particular riad, at a particular price, because the house is the right house. The number follows the house. Anything else is a listing.`,
    publishedAt: "2026-03-14",
    published: true,
  },
];

export function getPublishedJournalEntries(): JournalEntry[] {
  return [...journalEntries]
    .filter((j) => j.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getJournalEntryBySlug(slug: string): JournalEntry | undefined {
  return journalEntries.find((j) => j.slug === slug && j.published);
}

export function getJournalEntriesByFormat(
  format: JournalFormat,
  limit = 2,
): JournalEntry[] {
  return getPublishedJournalEntries()
    .filter((e) => e.format === format)
    .slice(0, limit);
}

export function getUnformattedJournalEntries(): JournalEntry[] {
  return getPublishedJournalEntries().filter((e) => !e.format);
}
