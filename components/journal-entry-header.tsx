import type { JournalEntry } from "@/lib/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// The Modern House entry-page header pattern: centred serif title on
// white, right-aligned date on the next row. No breadcrumb, no kicker
// badge, no read-time estimate — the page reads as editorial, not as
// a reference entry.
export function JournalEntryHeader({ entry }: { entry: JournalEntry }) {
  return (
    <header className="mx-auto max-w-page px-6 pt-16 pb-10 md:pt-24">
      <h1 className="mx-auto max-w-[900px] text-center font-serif text-section leading-[1.15] text-ink md:text-[3rem]">
        {entry.title}
      </h1>
      <p className="mt-10 text-right font-serif text-meta text-ink">
        {formatDate(entry.publishedAt)}
      </p>
    </header>
  );
}
