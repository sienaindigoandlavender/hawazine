import type { IndexCategory, IndexEntry } from "@/lib/types";

// Scaffold: empty until the first entry is written. Each Index entry is
// a 300-800 word piece on a single topic. Content follows in the next pass.
export const indexEntries: IndexEntry[] = [];

export const INDEX_CATEGORY_LABEL: Record<IndexCategory, string> = {
  legal: "Legal & title",
  procedure: "Procedure",
  costs: "Costs & taxation",
  questions: "Questions to ask",
  ownership: "Ownership & management",
};

export const INDEX_CATEGORY_ORDER: IndexCategory[] = [
  "legal",
  "procedure",
  "costs",
  "questions",
  "ownership",
];

export function getPublishedIndexEntries(): IndexEntry[] {
  return [...indexEntries]
    .filter((e) => e.published)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getIndexEntryBySlug(slug: string): IndexEntry | undefined {
  return indexEntries.find((e) => e.slug === slug && e.published);
}

export function getIndexEntriesByCategory(category: IndexCategory): IndexEntry[] {
  return getPublishedIndexEntries()
    .filter((e) => e.category === category)
    .sort((a, b) => a.title.localeCompare(b.title));
}
