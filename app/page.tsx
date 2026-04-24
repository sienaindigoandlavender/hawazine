import Link from "next/link";
import { EditorialHero } from "@/components/editorial-hero";
import { PropertyCard } from "@/components/property-card";
import { getFeaturedProperties } from "@/lib/content/properties";
import {
  JOURNAL_FORMAT_LABEL,
  getPublishedJournalEntries,
} from "@/lib/content/journal";

export default function HomePage() {
  const featured = getFeaturedProperties();
  const journal = getPublishedJournalEntries().slice(0, 3);

  return (
    <>
      <EditorialHero
        kicker="Hawazine — Marrakech"
        title="A courtyard, a terrace, the Atlas in the distance."
        subtitle="Marrakech medina, behind plain doors."
      />

      <section className="mx-auto max-w-page px-6 py-8 md:py-16">
        <div className="max-w-reading">
          <p className="font-ui text-meta uppercase tracking-[0.18em] text-quiet">
            Where to start
          </p>
          <p className="mt-6 font-serif text-subtitle text-ink">
            If you are new to the medina as a place to own property, the{" "}
            <Link href="/marrakech" className="underline decoration-quiet underline-offset-4 hover:decoration-accent hover:text-accent">
              Marrakech
            </Link>{" "}
            and{" "}
            <Link href="/buying" className="underline decoration-quiet underline-offset-4 hover:decoration-accent hover:text-accent">
              Buying
            </Link>{" "}
            sections are the right way in. The writing there answers most of the questions a careful buyer arrives with.
          </p>
        </div>
      </section>

      {journal.length > 0 && (
        <section className="mx-auto max-w-page px-6 py-16 md:py-24">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-section text-ink">From The Index</h2>
            <Link
              href="/journal"
              className="font-ui text-meta uppercase tracking-[0.14em] text-quiet hover:text-accent"
            >
              The Index →
            </Link>
          </div>
          <ul className="mt-10 border-t border-ink/10">
            {journal.map((entry) => (
              <li key={entry.slug} className="border-b border-ink/10">
                <Link
                  href={`/journal/${entry.slug}`}
                  className="group grid grid-cols-[7rem_minmax(0,1fr)_auto] items-baseline gap-4 py-5 md:grid-cols-[12rem_minmax(0,1fr)_auto] md:gap-6"
                >
                  <span className="font-ui text-meta uppercase tracking-[0.18em] text-quiet">
                    {entry.format ? JOURNAL_FORMAT_LABEL[entry.format] : ""}
                  </span>
                  <span className="font-serif text-body text-ink transition-colors group-hover:text-accent">
                    {entry.title}
                  </span>
                  <time
                    dateTime={entry.publishedAt}
                    className="font-ui text-meta text-quiet"
                  >
                    {new Date(entry.publishedAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {featured.length > 0 && (
        <section className="mx-auto max-w-page px-6 py-16 md:py-24">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-section text-ink">Current listings</h2>
            <Link
              href="/properties"
              className="font-ui text-meta uppercase tracking-[0.14em] text-quiet hover:text-accent"
            >
              All properties
            </Link>
          </div>
          <div className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
