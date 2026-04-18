import type { Metadata } from "next";
import { EditorialHero } from "@/components/editorial-hero";
import { JournalCard } from "@/components/journal-card";
import { getPublishedJournalEntries } from "@/lib/content/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Writing from Hawazine on the Marrakech medina as a place to own property in.",
  alternates: { canonical: "/journal" },
};

export default function JournalIndex() {
  const entries = getPublishedJournalEntries();

  return (
    <>
      <EditorialHero
        kicker="Journal"
        title="Writing from Hawazine"
        subtitle="The thinking that goes into every mandate, published as we do it."
      />
      <section className="mx-auto max-w-page px-6 py-8 md:py-12">
        <div className="grid gap-14 md:grid-cols-2">
          {entries.map((entry) => (
            <JournalCard key={entry.slug} entry={entry} />
          ))}
        </div>
        {entries.length === 0 && (
          <p className="max-w-reading font-serif text-body text-quiet">
            The first pieces are being written. Check back shortly.
          </p>
        )}
      </section>
    </>
  );
}
