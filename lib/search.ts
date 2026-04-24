import { glossaryEntries } from "@/lib/content/glossary";
import { indexEntries } from "@/lib/content/the-index";

export type SearchResult = {
  id: string;
  type: "INDEX" | "GLOSSARY";
  title: string;
  snippet: string;
  href: string;
  searchableText: string;
  secondaryText: string;
};

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export function buildSearchCorpus(): SearchResult[] {
  const fromIndex: SearchResult[] = indexEntries.map((entry) => ({
    id: `index-${entry.slug}`,
    type: "INDEX",
    title: entry.question,
    snippet: entry.preview,
    href: `/buying/${entry.slug}`,
    searchableText: [
      entry.question,
      entry.preview,
      ...(entry.glossaryTerms?.map((t) => t.term) ?? []),
    ].join(" "),
    secondaryText: entry.body,
  }));

  const fromGlossary: SearchResult[] = glossaryEntries.map((entry) => ({
    id: `glossary-${entry.slug}`,
    type: "GLOSSARY",
    title: entry.term,
    snippet: truncate(entry.definition, 120),
    href: `/glossary#${entry.slug}`,
    searchableText: [
      entry.term,
      ...(entry.alsoKnownAs ?? []),
      entry.french ?? "",
    ]
      .filter(Boolean)
      .join(" "),
    secondaryText: [entry.definition, entry.context ?? ""].join(" "),
  }));

  return [...fromIndex, ...fromGlossary];
}
