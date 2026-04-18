import type { JournalEntry } from "@/lib/types";

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
    title: "Why we do not list prices first",
    bodyMarkdown: `If you scroll through a conventional listings site, the price is the first thing you see. Square metres are second. Photographs are third. The house, in whatever way it actually exists, is somewhere around fourth or fifth.

We have inverted this on Hawazine, deliberately. The photograph comes first because the photograph is the house. The description comes second because a house has things to say about itself. The specifications come third, as a reference. Price is on the page, in the sidebar, but it is not the headline — because a price without the context of what you are buying is the least useful number in real estate.

This is also, we think, more honest about how serious buyers actually look. Nobody buys a riad because it is 3.2M dh. People buy a particular riad, at a particular price, because the house itself is the right thing.`,
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
