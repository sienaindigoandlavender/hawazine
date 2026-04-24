import type { Metadata } from "next";
import { EditorialHero } from "@/components/editorial-hero";
import { JournalCard } from "@/components/journal-card";
import {
  JOURNAL_FORMATS,
  JOURNAL_FORMAT_LABEL,
  JOURNAL_FORMAT_DESCRIPTION,
  getJournalEntriesByFormat,
  getUnformattedJournalEntries,
} from "@/lib/content/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Writing from Hawazine on the Marrakech medina as a place to own property in.",
  alternates: { canonical: "/journal" },
};

export default function JournalIndex() {
  const unformatted = getUnformattedJournalEntries();
  const formatSections = JOURNAL_FORMATS.map((format) => ({
    format,
    entries: getJournalEntriesByFormat(format, 2),
  })).filter((s) => s.entries.length > 0);

  const hasAny = unformatted.length > 0 || formatSections.length > 0;

  return (
    <>
      <EditorialHero
        kicker="Journal"
        title="Writing from Hawazine"
        subtitle="The thinking that goes into every mandate, published as we do it."
      />
      <section className="mx-auto max-w-page px-6 py-8 md:py-12 space-y-16 md:space-y-20">
        {unformatted.length > 0 && (
          <div>
            <p className="font-ui text-meta uppercase tracking-[0.18em] text-quiet">
              From the journal
            </p>
            <div className="mt-8 grid gap-14 md:grid-cols-2">
              {unformatted.map((entry) => (
                <JournalCard key={entry.slug} entry={entry} />
              ))}
            </div>
          </div>
        )}

        {formatSections.map(({ format, entries }) => (
          <div key={format}>
            <p className="font-ui text-meta uppercase tracking-[0.18em] text-quiet">
              {JOURNAL_FORMAT_LABEL[format]}
            </p>
            <p className="mt-2 max-w-reading font-serif text-body text-quiet">
              {JOURNAL_FORMAT_DESCRIPTION[format]}
            </p>
            <div className="mt-8 grid gap-14 md:grid-cols-2">
              {entries.map((entry) => (
                <JournalCard key={entry.slug} entry={entry} />
              ))}
            </div>
          </div>
        ))}

        {!hasAny && (
          <p className="max-w-reading font-serif text-body text-quiet">
            The first pieces are being written. Check back shortly.
          </p>
        )}
      </section>
    </>
  );
}
