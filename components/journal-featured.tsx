import type { JournalEntry } from "@/lib/types";
import { ImageWithPanel } from "@/components/image-with-panel";

const FORMAT_DISPLAY: Record<string, string> = {
  "the-medina": "The Medina",
  "the-market": "The Market",
  "the-house": "The House",
  "the-record": "The Record",
};

export function JournalFeatured({ entry }: { entry: JournalEntry }) {
  const kicker = entry.format
    ? FORMAT_DISPLAY[entry.format] ?? "Today in the Journal"
    : "Today in the Journal";

  return (
    <ImageWithPanel
      imageUrl={entry.heroImageUrl}
      imageAlt={entry.heroImageAlt ?? entry.title}
      size="featured"
      priority
      href={`/journal/${entry.slug}`}
    >
      <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
        {kicker}
      </p>
      <h2 className="mt-4 font-serif text-subtitle leading-[1.15] text-ink transition-colors group-hover:text-accent md:text-[1.75rem]">
        {entry.title}
      </h2>
      {entry.subtitle && (
        <p className="mt-3 font-serif text-body text-ink-soft">
          {entry.subtitle}
        </p>
      )}
      <div className="mt-6 border-t border-rule pt-6">
        <span className="font-sans text-meta uppercase tracking-[0.18em] text-ink transition-colors group-hover:text-accent">
          Read the entry →
        </span>
      </div>
    </ImageWithPanel>
  );
}
