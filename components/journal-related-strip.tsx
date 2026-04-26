import { JournalCard } from "@/components/journal-card";
import type { JournalEntry } from "@/lib/types";

// "More from the Journal" strip rendered just before the site footer
// on individual entry pages. Reuses JournalCard so the typography and
// portrait thumbnails match the /journal grid. Sits on a full-width
// neutral grey band (Tailwind gray-100, #F3F4F6) — the one place on the
// site where a grey section background is sanctioned, to mark this as
// a separate browsing zone after the article body. Uses gray-100 rather
// than paper-deep because paper-deep has a warm cast that reads beige
// at full-width scale; gray-100 is cleanly neutral. Renders nothing
// when there are no other published entries.
export function JournalRelatedStrip({ entries }: { entries: JournalEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <section
      aria-label="More from the Journal"
      className="mt-20 md:mt-28 bg-gray-100 py-16 md:py-20"
    >
      <div className="mx-auto max-w-page px-6">
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
