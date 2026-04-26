import Image from "next/image";
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

// Simpler grid-card pattern for /journal beneath the featured entry:
// hero image on top, typography below. No overlays, no floating panels.
export function JournalCard({ entry }: { entry: JournalEntry }) {
  const kicker = entry.format ? FORMAT_DISPLAY[entry.format] : undefined;

  return (
    <Link href={`/journal/${entry.slug}`} className="group block">
      {entry.heroImageUrl && (
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink/5">
          <Image
            src={entry.heroImageUrl}
            alt={entry.heroImageAlt ?? entry.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className={entry.heroImageUrl ? "mt-6" : "py-6"}>
        {kicker && (
          <p className="pb-2 font-sans text-[0.6875rem] uppercase tracking-[0.24em] text-quiet">
            <span className="border-b border-quiet pb-1">{kicker}</span>
          </p>
        )}
        <h3 className="mt-4 font-serif text-subtitle leading-[1.2] text-ink transition-colors group-hover:text-accent">
          {entry.title}
        </h3>
        <time
          dateTime={entry.publishedAt}
          className="mt-3 block font-sans text-meta text-quiet"
        >
          {formatDate(entry.publishedAt)}
        </time>
      </div>
    </Link>
  );
}
