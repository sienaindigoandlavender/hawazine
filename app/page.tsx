import Link from "next/link";
import { EditorialHero } from "@/components/editorial-hero";
import { JournalPreview } from "@/components/journal-preview";
import { PropertyFeatured } from "@/components/property-featured";
import { getPublishedJournalEntries } from "@/lib/content/journal";
import { getPublishedProperties } from "@/lib/content/properties";
import type { Property } from "@/lib/types";

export const revalidate = 3600;

function pickFeatured(list: Property[]): Property | undefined {
  if (list.length === 0) return undefined;
  const sorted = [...list].sort((a, b) => {
    const ap = a.publishedAt ?? "";
    const bp = b.publishedAt ?? "";
    return ap < bp ? 1 : ap > bp ? -1 : 0;
  });
  return sorted.find((p) => p.featured) ?? sorted[0];
}

export default async function HomePage() {
  const journalEntries = (await getPublishedJournalEntries()).slice(0, 3);
  const properties = getPublishedProperties();
  const featuredProperty = pickFeatured(properties);
  const remainingPropertyCount = featuredProperty
    ? properties.length - 1
    : 0;

  return (
    <>
      <EditorialHero
        kicker="Hawazine — Marrakech"
        title="A courtyard, a terrace, the Atlas in the distance."
        subtitle="Marrakech medina, behind plain doors."
      />

      <section className="mx-auto max-w-page px-6 py-12 md:py-20">
        <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
          Begin here
        </p>
        <ul className="mt-6 border-t border-rule md:max-w-[680px]">
          {BEGIN_HERE.map((item) => (
            <li key={item.href} className="border-b border-rule">
              <Link
                href={item.href}
                className="group grid grid-cols-[8rem_minmax(0,1fr)] items-baseline gap-6 py-5"
              >
                <span className="font-serif text-subtitle text-ink transition-colors group-hover:text-accent">
                  {item.label}
                </span>
                <span className="font-serif text-body text-ink-soft">
                  {item.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-page px-6 pb-10 md:pb-12">
          <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
            Currently representing
          </p>
        </div>

        {featuredProperty ? (
          <>
            <PropertyFeatured property={featuredProperty} />
            <div className="mx-auto max-w-page px-6 pt-8">
              {remainingPropertyCount > 0 ? (
                <p className="font-sans text-meta">
                  <Link
                    href="/properties"
                    className="uppercase tracking-[0.18em] text-quiet transition-colors hover:text-accent"
                  >
                    {remainingPropertyCount}{" "}
                    {remainingPropertyCount === 1
                      ? "more property"
                      : "more properties"}{" "}
                    →
                  </Link>
                </p>
              ) : (
                <p className="font-sans text-meta">
                  <Link
                    href="/properties"
                    className="uppercase tracking-[0.18em] text-quiet transition-colors hover:text-accent"
                  >
                    All properties →
                  </Link>
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-page px-6">
            <p className="max-w-reading font-serif text-body text-ink-soft">
              Listings not yet published on hawazine.com. Current inventory is
              represented via Mouad on{" "}
              <a
                href="https://www.mubawab.ma/"
                rel="noopener noreferrer"
                target="_blank"
                className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
              >
                Mubawab
              </a>
              {" "}— contact for current availability.
            </p>
            <p className="mt-6 font-sans text-meta">
              <Link
                href="/contact"
                className="uppercase tracking-[0.18em] text-quiet transition-colors hover:text-accent"
              >
                Contact →
              </Link>
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-page px-6 py-16 md:py-24">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="font-serif text-section text-ink">The Index</h2>
          <Link
            href="/buying"
            className="font-sans text-meta uppercase tracking-[0.18em] text-quiet transition-colors hover:text-accent"
          >
            Continue reading →
          </Link>
        </div>
        <p className="mt-6 max-w-reading font-serif text-body text-ink-soft">
          Legal structure, procedure, and cost as they actually work in the
          Marrakech medina. Written for buyers who want to understand the
          ground before they stand on it.
        </p>
      </section>

      {journalEntries.length > 0 && (
        <section className="mx-auto max-w-page px-6 py-16 md:py-24">
          <div className="flex items-baseline justify-between gap-6">
            <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
              From the Journal
            </p>
            <Link
              href="/journal"
              className="font-sans text-meta uppercase tracking-[0.18em] text-quiet transition-colors hover:text-accent"
            >
              Read all entries →
            </Link>
          </div>
          <ul className="mt-8 border-t border-rule">
            {journalEntries.map((entry) => (
              <li key={entry.slug}>
                <JournalPreview entry={entry} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

const BEGIN_HERE: { href: string; label: string; blurb: string }[] = [
  {
    href: "/properties",
    label: "Buy",
    blurb: "Riads, dars, and land currently represented.",
  },
  {
    href: "/journal",
    label: "Learn",
    blurb: "Journal, The Index, and the Glossary.",
  },
  {
    href: "/build",
    label: "Build",
    blurb: "Renovation done with the medina, not against it.",
  },
];
