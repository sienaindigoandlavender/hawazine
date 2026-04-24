import type { GlossaryCategoryMeta, GlossaryEntry } from "@/lib/types";
import { glossaryCategories, glossaryEntries } from "@/lib/content/glossary";

interface DefinedTermPropertyValue {
  "@type": "PropertyValue";
  name: string;
  value: string;
}

interface DefinedTermSchema {
  "@type": "DefinedTerm";
  name: string;
  alternateName?: string[];
  description: string;
  inDefinedTermSet: string;
  url: string;
  additionalProperty?: DefinedTermPropertyValue[];
}

interface CategoryGroup {
  slug: string;
  label: string;
  description: string;
  terms: DefinedTermSchema[];
}

export interface GlossaryJsonLd {
  "@context": "https://schema.org";
  "@type": "DefinedTermSet";
  name: string;
  description: string;
  url: string;
  termCount: number;
  categories: CategoryGroup[];
}

export function termToSchema(
  entry: GlossaryEntry,
  setUrl: string,
): DefinedTermSchema {
  const fullDescription = entry.context
    ? `${entry.definition} ${entry.context}`
    : entry.definition;

  const props: DefinedTermPropertyValue[] = [];
  if (entry.pronunciation) {
    props.push({ "@type": "PropertyValue", name: "pronunciation", value: entry.pronunciation });
  }
  if (entry.arabic) {
    props.push({ "@type": "PropertyValue", name: "arabic", value: entry.arabic });
  }
  if (entry.french) {
    props.push({ "@type": "PropertyValue", name: "french", value: entry.french });
  }
  props.push({ "@type": "PropertyValue", name: "category", value: entry.category });

  return {
    "@type": "DefinedTerm",
    name: entry.term,
    ...(entry.alsoKnownAs && entry.alsoKnownAs.length > 0
      ? { alternateName: entry.alsoKnownAs }
      : {}),
    description: fullDescription,
    inDefinedTermSet: setUrl,
    url: `${setUrl}#${entry.slug}`,
    additionalProperty: props,
  };
}

export function buildGlossaryJsonLd(origin: string): GlossaryJsonLd {
  const setUrl = `${origin}/glossary`;
  const categories: CategoryGroup[] = glossaryCategories.map(
    (cat: GlossaryCategoryMeta) => ({
      slug: cat.slug,
      label: cat.label,
      description: cat.description,
      terms: glossaryEntries
        .filter((entry) => entry.category === cat.slug)
        .map((entry) => termToSchema(entry, setUrl)),
    }),
  );

  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Hawazine Glossary",
    description:
      "Reference glossary of Moroccan property, architecture, and craft terminology.",
    url: setUrl,
    termCount: glossaryEntries.length,
    categories,
  };
}
