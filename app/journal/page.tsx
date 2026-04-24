import type { Metadata } from "next";
import { JournalCard } from "@/components/journal-card";
import { JournalFeatured } from "@/components/journal-featured";
import { getPublishedJournalEntries } from "@/lib/content/journal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Dispatches from the medina — craft, architecture, and the daily life of a place.",
  alternates: { canonical: "/journal" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function JournalIndex() {
  const entries = await getPublishedJournalEntries();

  const featured = entries[0];
  const grid = entries.slice(1);

  return (
    <>
      <header className="mx-auto max-w-page px-6 pt-16 pb-16 md:pt-24">
        <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
          Journal
        </p>
        <h1 className="mt-4 font-serif text-display leading-[1.04] text-ink md:text-[4.25rem]">
          Dispatches from the medina.
        </h1>
        <p className="mt-6 max-w-reading font-serif text-subtitle text-ink-soft">
          Craft, architecture, and the daily life of a place.
        </p>
        {entries.length > 0 && (
          <p className="mt-6 font-sans text-meta text-quiet">
            {entries.length} {entries.length === 1 ? "entry" : "entries"} · updated{" "}
            {formatDate(entries[0].publishedAt)}
          </p>
        )}
      </header>

      {!featured ? (
        <section className="mx-auto max-w-page px-6 pb-24">
          <p className="max-w-reading font-serif text-body text-quiet">
            The first pieces are being written. Check back shortly.
          </p>
        </section>
      ) : (
        <>
          <section className="mb-24">
            <JournalFeatured entry={featured} />
          </section>

          {grid.length > 0 && (
            <section className="mx-auto max-w-page px-6 mb-24">
              <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
                {grid.map((entry) => (
                  <JournalCard key={entry.slug} entry={entry} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
