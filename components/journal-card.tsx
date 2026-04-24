import type { JournalEntry } from "@/lib/types";
import { ImageWithPanel } from "@/components/image-with-panel";

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

export function JournalCard({ entry }: { entry: JournalEntry }) {
  const kicker = entry.format ? FORMAT_DISPLAY[entry.format] : undefined;

  return (
    <ImageWithPanel
      imageUrl={entry.heroImageUrl}
      imageAlt={entry.heroImageAlt ?? entry.title}
      size="card"
      href={`/journal/${entry.slug}`}
    >
      {kicker && (
        <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
          {kicker}
        </p>
      )}
      <h3 className="mt-3 font-serif text-body leading-[1.25] text-ink transition-colors group-hover:text-accent md:text-[1.125rem]">
        {entry.title}
      </h3>
      {entry.subtitle && (
        <p className="mt-2 line-clamp-2 font-serif text-meta text-ink-soft">
          {entry.subtitle}
        </p>
      )}
      <div className="mt-5 border-t border-rule pt-3">
        <time
          dateTime={entry.publishedAt}
          className="font-sans text-meta text-quiet"
        >
          {formatDate(entry.publishedAt)}
        </time>
      </div>
    </ImageWithPanel>
  );
}
