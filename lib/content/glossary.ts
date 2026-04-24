import type { GlossaryCategory, GlossaryTerm } from "@/lib/types";

// Scaffold: three seed terms so the page structure renders end-to-end.
// Remaining 60-100 terms land in the content pass that follows this one.
export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "melkia",
    term: "Melkia",
    pronunciation: "mel-KEE-ya",
    arabic: "ملكية",
    category: "legal-title",
    definition:
      "A form of customary Moroccan title drawn up by adouls, recording ownership through a chain of witnessed acts. The dominant form of title inside the Marrakech medina.",
    context:
      "A melkia is not a deed in the French sense; there is no single registry, no cadastre number, no plan attached at the moment of issuance. What matters at the moment of purchase is whether the chain of transfers is clean.",
    also: ["moulkia", "milkiya"],
    see: ["titre-foncier", "adoul"],
    quickReference: true,
  },
  {
    slug: "titre-foncier",
    term: "Titre foncier",
    pronunciation: "TEE-truh fon-SYAY",
    category: "legal-title",
    definition:
      "A registered title held in the Moroccan land registry, with a cadastre number and surveyed plan. Coexists with melkia across the medina; not universally superior.",
    context:
      "Titre foncier is the French-introduced registry system. A titre foncier property trades at a premium in some comparables and makes no difference in others — the melkia / titre-foncier boundary is not a proxy for quality.",
    see: ["melkia", "requisition"],
    quickReference: true,
  },
  {
    slug: "derb",
    term: "Derb",
    pronunciation: "DARB",
    arabic: "درب",
    category: "urban-planning-land",
    definition:
      "A lane or alley within the medina fabric, often a dead end. The unit of address most houses in the medina sit on.",
    context:
      "A derb is not a street in the grid sense — no cars, no through-traffic, social texture visible from any doorway. Living on a derb is the characteristic medina experience.",
    quickReference: true,
  },
];

export const GLOSSARY_CATEGORY_LABEL: Record<GlossaryCategory, string> = {
  "legal-title": "Legal & Title",
  "transaction-taxation": "Transaction & Taxation",
  "urban-planning-land": "Urban Planning & Land",
  architecture: "Architecture",
  "people-roles": "People & Roles",
};

export const GLOSSARY_CATEGORY_ORDER: GlossaryCategory[] = [
  "legal-title",
  "transaction-taxation",
  "urban-planning-land",
  "architecture",
  "people-roles",
];

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function getGlossaryTermsByCategory(
  category: GlossaryCategory,
): GlossaryTerm[] {
  return glossaryTerms
    .filter((t) => t.category === category)
    .sort((a, b) => a.term.localeCompare(b.term));
}

export function getQuickReferenceTerms(): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.quickReference);
}
