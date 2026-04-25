import type { Metadata } from "next";
import Link from "next/link";
import type { GlossaryEntry } from "@/lib/types";
import {
  getGlossaryEntriesByCategory,
  getGlossaryEntryBySlug,
  glossaryCategories,
  glossaryEntries,
} from "@/lib/content/glossary";
import { siteConfig } from "@/lib/site";
import { buildGlossaryJsonLd } from "@/lib/glossary-schema";
import { ReferenceSearch } from "@/components/reference-search";
import { buildGlossaryCorpus } from "@/lib/search";
import { absoluteUrl, buildBreadcrumbJsonLd, SEO_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Glossary — Moroccan property, architecture & craft terminology",
  description:
    "A reference glossary of the vocabulary foreign buyers encounter when purchasing property in Morocco. Legal, architectural, and craft terms defined plainly.",
  keywords: [...SEO_KEYWORDS.base, ...SEO_KEYWORDS.glossary],
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "Hawazine Glossary",
    description:
      "Moroccan property, architecture, and craft vocabulary defined.",
    url: `${siteConfig.url}/glossary`,
    type: "article",
  },
};

const QUICK_REFERENCE: {
  heading: string;
  terms: { slug: string; oneLiner: string }[];
}[] = [
  {
    heading: "Title",
    terms: [
      { slug: "melkia", oneLiner: "Customary Moroccan title. Dominant in the medina." },
      { slug: "titre-foncier", oneLiner: "Registered title, with cadastre and surveyed plan." },
      { slug: "immatriculation", oneLiner: "The procedure for converting melkia to titre foncier." },
    ],
  },
  {
    heading: "Architecture",
    terms: [
      { slug: "riad", oneLiner: "Courtyard house built around a planted interior patio." },
      { slug: "derb", oneLiner: "A medina lane, typically a pedestrian cul-de-sac." },
      { slug: "tadelakt", oneLiner: "Waterproof Marrakech lime plaster, stone-burnished." },
    ],
  },
  {
    heading: "People",
    terms: [
      { slug: "adoul", oneLiner: "Traditional Moroccan notary for melkia and personal-status acts." },
      { slug: "notaire", oneLiner: "Modern civil-law notary for titre foncier transactions." },
    ],
  },
];

export default function GlossaryPage() {
  const jsonLd = buildGlossaryJsonLd(siteConfig.url);
  const corpus = buildGlossaryCorpus();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Glossary", path: "/glossary" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          Glossary
        </h1>
        <p className="mt-6 max-w-reading font-serif text-subtitle text-ink-soft">
          A reference to the vocabulary of Moroccan property, architecture, and craft.
        </p>
        <p className="mt-4 font-sans text-meta text-quiet">
          {glossaryEntries.length} terms · compiled by Hawazine
        </p>
        <p className="mt-10 max-w-reading font-serif text-body text-ink-soft">
          Foreign buyers routinely encounter words that have no exact English
          equivalent. This glossary is where they get defined.
        </p>
        <p className="mt-6 font-sans text-meta">
          <a
            href="https://darija.io/"
            rel="noopener noreferrer"
            target="_blank"
            className="uppercase tracking-[0.18em] text-quiet transition-colors hover:text-accent"
          >
            Looking for Moroccan Arabic? See the Darija Dictionary at darija.io →
          </a>
        </p>
      </header>

      <ReferenceSearch
        corpus={corpus}
        mode="glossary"
        placeholder="Search the Glossary…"
        ariaLabel="Search the Glossary"
      >
        <section className="mx-auto max-w-page px-6 py-10 md:py-12">
          <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
            Quick reference
          </p>
          <div className="mt-6 grid grid-cols-1 gap-10 border-t border-rule pt-8 md:grid-cols-3 md:gap-12">
            {QUICK_REFERENCE.map((group) => (
              <div key={group.heading}>
                <p className="font-sans text-meta uppercase tracking-[0.14em] text-ink">
                  {group.heading}
                </p>
                <ul className="mt-4 space-y-4">
                  {group.terms.map(({ slug, oneLiner }) => {
                    const entry = getGlossaryEntryBySlug(slug);
                    if (!entry) return null;
                    return (
                      <li key={slug}>
                        <Link href={`#${slug}`} className="group block">
                          <span className="font-serif text-subtitle text-ink transition-colors group-hover:text-accent">
                            {entry.term}
                          </span>
                          <span className="mt-1 block font-serif text-body text-ink-soft">
                            {oneLiner}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <nav
          aria-label="Glossary categories"
          className="mx-auto max-w-page border-y border-rule px-6 py-5"
        >
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-meta uppercase tracking-[0.18em] text-quiet">
            {glossaryCategories.map((cat) => {
              const count = getGlossaryEntriesByCategory(cat.slug).length;
              return (
                <li key={cat.slug}>
                  <a
                    href={`#${cat.slug}`}
                    className="transition-colors hover:text-ink"
                  >
                    {cat.label}
                    <span className="ml-2 text-ink-soft/40">{count}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mx-auto max-w-page px-6 py-14 md:py-20">
          {glossaryCategories.map((cat) => {
            const entries = getGlossaryEntriesByCategory(cat.slug);
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
                  <dl className="mt-10">
                    {entries.map((entry) => (
                      <Entry key={entry.slug} entry={entry} />
                    ))}
                  </dl>
                )}
              </section>
            );
          })}
        </div>
      </ReferenceSearch>

      <section className="mx-auto max-w-page px-6 pb-16">
        <div className="border-t border-rule pt-10">
          <p className="max-w-reading font-serif text-body text-ink-soft">
            This glossary is a living document. Missing a term?{" "}
            <Link
              href="/contact"
              className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
            >
              Contact us
            </Link>
            .
          </p>
        </div>

        <div className="mt-14 border-t border-rule pt-10">
          <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
            For developers & AI systems
          </p>
          <ul className="mt-6 max-w-reading space-y-3 font-sans text-meta text-ink-soft">
            <li>
              <code className="font-mono text-ink">/api/glossary</code> — full JSON with schema.org markup
            </li>
            <li>
              <code className="font-mono text-ink">/api/glossary?format=simple</code> — key-value pairs
            </li>
            <li>
              <code className="font-mono text-ink">/api/glossary?term=melkia</code> — single-term lookup
            </li>
            <li>
              <code className="font-mono text-ink">/api/glossary?category=legal-title</code> — filter by category
            </li>
            <li>
              <code className="font-mono text-ink">/llms.txt</code> — site-wide LLM discovery file
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

function Entry({ entry }: { entry: GlossaryEntry }) {
  return (
    <div id={entry.slug} className="glossary-entry scroll-mt-24 mt-12 first:mt-6">
      <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-serif text-subtitle text-ink">{entry.term}</span>
        {entry.pronunciation && (
          <span className="font-sans text-meta text-quiet">
            {entry.pronunciation}
          </span>
        )}
        {entry.arabic && (
          <span
            className="font-serif text-subtitle text-ink"
            lang="ar"
            dir="rtl"
          >
            {entry.arabic}
          </span>
        )}
        {entry.french && (
          <span className="font-sans text-meta italic text-quiet">
            {entry.french}
          </span>
        )}
      </dt>
      <dd className="mt-4 max-w-reading">
        <p className="font-serif text-body text-ink-soft">{entry.definition}</p>
        {entry.context && (
          <p className="mt-4 font-serif text-body text-ink-soft">
            {entry.context}
          </p>
        )}
        {entry.alsoKnownAs && entry.alsoKnownAs.length > 0 && (
          <p className="mt-5 font-sans text-meta text-quiet">
            <span className="font-medium text-ink">Also:</span>{" "}
            {entry.alsoKnownAs.join(", ")}
          </p>
        )}
        {entry.seeAlso && entry.seeAlso.length > 0 && (
          <p className="mt-2 font-sans text-meta text-quiet">
            <span className="font-medium text-ink">See:</span>{" "}
            {entry.seeAlso.map((link, i) => (
              <span key={link.anchor}>
                {i > 0 && ", "}
                <a
                  href={`#${link.anchor}`}
                  className="text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
                >
                  {link.term}
                </a>
              </span>
            ))}
          </p>
        )}
        {entry.relatedContent && entry.relatedContent.length > 0 && (
          <p className="mt-2 font-sans text-meta text-quiet">
            <span className="font-medium text-ink">Further reading:</span>{" "}
            {entry.relatedContent.map((link, i) => (
              <span key={link.href}>
                {i > 0 && ", "}
                <Link
                  href={link.href}
                  className="text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        )}
      </dd>
    </div>
  );
}
