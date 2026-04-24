import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHero } from "@/components/editorial-hero";
import type { GlossaryTerm } from "@/lib/types";
import {
  GLOSSARY_CATEGORY_LABEL,
  GLOSSARY_CATEGORY_ORDER,
  getGlossaryTermBySlug,
  getGlossaryTermsByCategory,
  getQuickReferenceTerms,
  glossaryTerms,
} from "@/lib/content/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Marrakech medina real estate vocabulary — legal, architectural, and urban. The terms a careful buyer hears before signing.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const quickRef = getQuickReferenceTerms();
  const categories = GLOSSARY_CATEGORY_ORDER.map((category) => ({
    category,
    entries: getGlossaryTermsByCategory(category),
  }));

  return (
    <>
      <EditorialHero
        kicker="Glossary"
        title="The medina's vocabulary."
        subtitle={`A reference of ${glossaryTerms.length} terms — legal, architectural, urban — used in Marrakech medina real estate. Paragraphs rather than definitions.`}
      />

      {quickRef.length > 0 && (
        <section className="mx-auto max-w-page px-6 py-10 md:py-12">
          <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
            Quick reference
          </p>
          <div className="mt-6 grid gap-6 border-t border-rule pt-6 md:grid-cols-2 lg:grid-cols-3">
            {quickRef.map((term) => (
              <Link
                key={term.slug}
                href={`#${term.slug}`}
                className="group block"
              >
                <p className="font-serif text-subtitle text-ink transition-colors group-hover:text-accent">
                  {term.term}
                </p>
                <p className="mt-1 font-sans text-meta text-quiet">
                  {GLOSSARY_CATEGORY_LABEL[term.category]}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <nav
        aria-label="Glossary categories"
        className="mx-auto max-w-page px-6 py-6 border-y border-rule"
      >
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-meta uppercase tracking-[0.18em] text-quiet">
          {categories.map(({ category, entries }) => (
            <li key={category}>
              <a
                href={`#${category}`}
                className="transition-colors hover:text-accent"
              >
                {GLOSSARY_CATEGORY_LABEL[category]}
                <span className="ml-2 text-ink-soft/50">{entries.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="mx-auto max-w-page px-6 py-12 md:py-16">
        {categories.map(({ category, entries }) => (
          <div key={category} id={category} className="scroll-mt-24 mt-14 first:mt-0">
            <h2 className="font-serif text-section text-ink">
              {GLOSSARY_CATEGORY_LABEL[category]}
            </h2>
            {entries.length === 0 ? (
              <p className="mt-6 max-w-reading font-serif text-body text-quiet">
                Entries in preparation.
              </p>
            ) : (
              <dl className="mt-10 border-t border-rule">
                {entries.map((entry) => (
                  <GlossaryEntry key={entry.slug} entry={entry} />
                ))}
              </dl>
            )}
          </div>
        ))}
      </section>
    </>
  );
}

function GlossaryEntry({ entry }: { entry: GlossaryTerm }) {
  return (
    <div
      id={entry.slug}
      className="scroll-mt-24 border-b border-rule py-8 md:grid md:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] md:gap-10"
    >
      <dt className="font-serif text-subtitle text-ink">
        {entry.term}
        {entry.arabic && (
          <span className="ml-3 font-serif text-body text-quiet" lang="ar" dir="rtl">
            {entry.arabic}
          </span>
        )}
        {entry.pronunciation && (
          <span className="mt-1 block font-sans text-meta text-quiet">
            {entry.pronunciation}
          </span>
        )}
      </dt>
      <dd className="mt-3 max-w-reading font-serif text-body text-ink-soft md:mt-0">
        <p>{entry.definition}</p>
        {entry.context && <p className="mt-4">{entry.context}</p>}
        {entry.also && entry.also.length > 0 && (
          <p className="mt-4 font-sans text-meta text-quiet">
            <em className="not-italic uppercase tracking-[0.14em]">Also:</em>{" "}
            {entry.also.join(", ")}
          </p>
        )}
        {entry.see && entry.see.length > 0 && (
          <p className="mt-2 font-sans text-meta text-quiet">
            <em className="not-italic uppercase tracking-[0.14em]">See:</em>{" "}
            {entry.see.map((s, i) => {
              const target = getGlossaryTermBySlug(s);
              if (!target) return null;
              return (
                <span key={s}>
                  {i > 0 && ", "}
                  <a
                    href={`#${s}`}
                    className="text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
                  >
                    {target.term}
                  </a>
                </span>
              );
            })}
          </p>
        )}
      </dd>
    </div>
  );
}
