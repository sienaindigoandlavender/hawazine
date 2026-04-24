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

// Scaffold-empty: Journal is not launching with editorial content. Entries
// arrive when there is something actually worth publishing under one of the
// four formats (the-medina / the-market / the-house / the-record).
export const journalEntries: JournalEntry[] = [];

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
