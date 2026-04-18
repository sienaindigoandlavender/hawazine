import Link from "next/link";
import { EditorialHero } from "@/components/editorial-hero";
import { PropertyCard } from "@/components/property-card";
import { JournalCard } from "@/components/journal-card";
import { getFeaturedProperties } from "@/lib/content/properties";
import { getPublishedJournalEntries } from "@/lib/content/journal";

export default function HomePage() {
  const featured = getFeaturedProperties();
  const journal = getPublishedJournalEntries().slice(0, 3);

  return (
    <>
      <EditorialHero
        kicker="Hawazine — Marrakech"
        title="An agency that writes about the medina, and happens to sell houses in it."
        subtitle="Riads, dars, and land in Laksour and Mouassine. Chosen slowly, on melkia or titre foncier, held to a standard worth defending."
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
            <h2 className="font-serif text-section text-ink">From the journal</h2>
            <Link
              href="/journal"
              className="font-ui text-meta uppercase tracking-[0.14em] text-quiet hover:text-accent"
            >
              All writing
            </Link>
          </div>
          <div className="mt-10 grid gap-12 md:grid-cols-2">
            {journal.map((entry) => (
              <JournalCard key={entry.slug} entry={entry} />
            ))}
          </div>
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
