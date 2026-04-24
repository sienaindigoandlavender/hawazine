import Link from "next/link";
import type { JournalEntry } from "@/lib/types";

const FORMAT_DISPLAY: Record<string, string> = {
  "the-medina": "The Medina",
  "the-market": "The Market",
  "the-house": "The House",
  "the-record": "The Record",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function JournalEntryHeader({ entry }: { entry: JournalEntry }) {
  const kicker = entry.format ? FORMAT_DISPLAY[entry.format] : null;
  const read = estimateReadTime(entry.bodyMarkdown);

  return (
    <header className="mx-auto max-w-page px-6 pt-16 pb-8 md:pt-24">
      <nav
        aria-label="Breadcrumb"
        className="font-sans text-meta uppercase tracking-[0.18em] text-quiet"
      >
        <Link href="/journal" className="transition-colors hover:text-accent">
          Journal
        </Link>
        {kicker && (
          <>
            <span aria-hidden="true" className="mx-3 text-quiet/50">
              /
            </span>
            <span className="text-quiet">{kicker}</span>
          </>
        )}
      </nav>

      <h1 className="mt-10 max-w-reading font-serif text-display leading-[1.04] text-ink md:text-[4.25rem]">
        {entry.title}
      </h1>

      {entry.subtitle && (
        <p className="mt-6 max-w-reading font-serif text-subtitle text-ink-soft">
          {entry.subtitle}
        </p>
      )}

      <p className="mt-6 font-sans text-meta text-quiet">
        Published {formatDate(entry.publishedAt)} · {read} min read
      </p>
    </header>
  );
}
