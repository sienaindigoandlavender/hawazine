import type { Metadata } from "next";
import Link from "next/link";
import { ReferenceSearch } from "@/components/reference-search";
import { siteConfig } from "@/lib/site";
import {
  getIndexEntriesByCategory,
  getMostRecentIndexUpdate,
  indexCategories,
  indexEntries,
} from "@/lib/content/the-index";
import { buildSearchCorpus } from "@/lib/search";
import { absoluteUrl, buildBreadcrumbJsonLd, SEO_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Buying a Riad in Morocco — The Index",
  description:
    "A reference for foreign buyers. Legal, procedural, and financial questions about buying property in Morocco, answered plainly.",
  keywords: [...SEO_KEYWORDS.base, ...SEO_KEYWORDS.buying],
  alternates: { canonical: "/buying" },
  openGraph: {
    title: "The Index — Buying a Riad in Morocco",
    description:
      "Answers to the questions foreign buyers ask when purchasing property in Morocco.",
    url: `${siteConfig.url}/buying`,
    type: "website",
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BuyingIndexPage() {
  const mostRecent = getMostRecentIndexUpdate();
  const corpus = buildSearchCorpus();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/buying")}#collection`,
    name: "Buying a Riad in Morocco — The Index",
    alternateName: "The Index",
    description:
      "A reference for foreign buyers. Legal, procedural, and financial questions about buying property in Morocco, answered plainly.",
    url: absoluteUrl("/buying"),
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}#website` },
    publisher: { "@id": `${siteConfig.url}#organization` },
    dateModified: mostRecent,
    about: {
      "@type": "Thing",
      name: "Buying property in Morocco",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: indexEntries.length,
      itemListElement: indexEntries.map((entry, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/buying/${entry.slug}`),
        name: entry.question,
      })),
    },
  };

  // FAQ JSON-LD across the whole index — answer engines pull from this
  // routinely. Keep the answer text grounded in `preview` (not the full
  // body) to match what gets surfaced as a one-shot answer.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: indexEntries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.preview,
        url: absoluteUrl(`/buying/${entry.slug}`),
      },
    })),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Buying", path: "/buying" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="mx-auto max-w-page px-6 pt-16 pb-4 md:pt-24 md:pb-6">
        <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
          Reference
        </p>
        <h1 className="mt-4 font-serif text-display leading-[1.05] text-ink md:text-[4.25rem]">
          Buying a Riad in Morocco
        </h1>
        <p className="mt-6 max-w-reading font-serif text-subtitle text-ink-soft">
          The Index — a reference for foreign buyers.
        </p>
        <p className="mt-4 font-sans text-meta text-quiet">
          {indexEntries.length} questions
          {mostRecent && ` · updated ${formatDate(mostRecent)}`}
        </p>
        <p className="mt-10 max-w-reading font-serif text-body text-ink-soft">
          Answers to the questions foreign buyers ask before, during, and after
          purchasing property in Morocco. Legal, procedural, and financial.
          Plain language, current as of 2026.
        </p>
        <p className="mt-6 max-w-reading font-serif text-body text-ink-soft">
          For vocabulary, see the{" "}
          <Link
            href="/glossary"
            className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
          >
            Glossary
          </Link>
          .
        </p>
      </header>

      <ReferenceSearch
        corpus={corpus}
        mode="unified"
        placeholder="Search the Index and Glossary…"
        ariaLabel="Search the Index and Glossary"
      >
        <div className="mx-auto max-w-page px-6 pb-16 md:pb-24">
          {indexCategories.map((cat) => {
            const entries = getIndexEntriesByCategory(cat.slug);
            return (
              <section
                key={cat.slug}
                id={cat.slug}
                className="scroll-mt-24 mt-16 first:mt-0"
              >
                <h2 className="font-serif text-section text-ink">{cat.label}</h2>
                <p className="mt-3 max-w-reading font-serif text-body text-ink-soft">
                  {cat.description}
                </p>
                {entries.length === 0 ? (
                  <p className="mt-10 max-w-reading font-serif text-body text-quiet">
                    Entries in preparation.
                  </p>
                ) : (
                  <ol className="mt-10 border-t border-rule">
                    {entries.map((entry) => (
                      <li key={entry.slug} className="border-b border-rule">
                        <Link
                          href={`/buying/${entry.slug}`}
                          className="group flex items-baseline gap-6 py-6"
                        >
                          <span className="font-sans text-meta text-quiet tabular-nums min-w-[2rem]">
                            {String(entry.number).padStart(2, "0")}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-serif text-subtitle text-ink transition-colors group-hover:text-accent">
                              {entry.question}
                            </h3>
                            <p className="mt-1 font-sans text-meta text-quiet">
                              {entry.preview}
                            </p>
                          </div>
                          <span
                            aria-hidden="true"
                            className="font-sans text-meta text-quiet transition-colors group-hover:text-accent"
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            );
          })}
        </div>
      </ReferenceSearch>

      <section className="mx-auto max-w-page border-t border-rule px-6 py-10">
        <p className="max-w-reading font-serif text-body text-ink-soft">
          Missing a question?{" "}
          <Link
            href="/contact"
            className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
          >
            Let us know
          </Link>
          .
        </p>
        <p className="mt-4 font-sans text-meta text-quiet">
          <Link
            href="/"
            className="uppercase tracking-[0.18em] transition-colors hover:text-accent"
          >
            ← Back to home
          </Link>
        </p>
      </section>
    </>
  );
}
