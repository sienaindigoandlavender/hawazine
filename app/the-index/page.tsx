import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHero } from "@/components/editorial-hero";
import {
  INDEX_CATEGORY_LABEL,
  INDEX_CATEGORY_ORDER,
  getIndexEntriesByCategory,
  getPublishedIndexEntries,
} from "@/lib/content/the-index";

export const metadata: Metadata = {
  title: "The Index",
  description:
    "Legal structure, procedure, and cost as they actually work in the Marrakech medina. Written for buyers who want to understand the ground before they stand on it.",
  alternates: { canonical: "/the-index" },
};

export default function TheIndexPage() {
  const all = getPublishedIndexEntries();
  const categories = INDEX_CATEGORY_ORDER.map((category) => ({
    category,
    entries: getIndexEntriesByCategory(category),
  }));

  return (
    <>
      <EditorialHero
        kicker="The Index"
        title="The medina as it actually works."
        subtitle="Legal structure, procedure, and cost. Written for buyers who want to understand the ground before they stand on it."
      />

      <section className="mx-auto max-w-page px-6 py-12 md:py-16">
        {all.length === 0 ? (
          <p className="max-w-reading font-serif text-body text-quiet">
            Entries in preparation. The first pieces will appear here shortly.
          </p>
        ) : (
          <div className="space-y-14">
            {categories.map(({ category, entries }) =>
              entries.length === 0 ? null : (
                <div key={category}>
                  <h2 className="font-serif text-section text-ink">
                    {INDEX_CATEGORY_LABEL[category]}
                  </h2>
                  <ul className="mt-8 border-t border-rule">
                    {entries.map((entry) => (
                      <li key={entry.slug} className="border-b border-rule">
                        <Link
                          href={`/the-index/${entry.slug}`}
                          className="group grid grid-cols-[10rem_minmax(0,1fr)] items-baseline gap-6 py-5"
                        >
                          <span className="font-serif text-body text-ink transition-colors group-hover:text-accent">
                            {entry.title}
                          </span>
                          <span className="font-serif text-body text-ink-soft">
                            {entry.glossLine}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        )}
      </section>
    </>
  );
}
