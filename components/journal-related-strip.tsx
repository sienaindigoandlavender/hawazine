import { JournalCard } from "@/components/journal-card";
import type { JournalEntry } from "@/lib/types";

// "More from the Journal" strip rendered just before the site footer
// on individual entry pages. Reuses JournalCard so the typography and
// portrait thumbnails match the /journal grid. Renders nothing when
// fewer than two other published entries exist.
export function JournalRelatedStrip({ entries }: { entries: JournalEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <section
      aria-label="More from the Journal"
      className="mx-auto max-w-page px-6 mt-20 md:mt-28 mb-20 md:mb-24"
    >
      <div className="border-t border-rule pt-10 md:pt-12">
        <p className="mb-10 text-center font-sans text-meta uppercase tracking-[0.2em] text-quiet">
          More from the Journal
        </p>
        <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map((entry) => (
            <JournalCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
