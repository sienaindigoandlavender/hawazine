import Link from "next/link";
import type { JournalEntry } from "@/lib/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function JournalPreview({ entry }: { entry: JournalEntry }) {
  return (
    <Link
      href={`/journal/${entry.slug}`}
      className="group block border-b border-rule py-5"
    >
      <h3 className="font-serif text-subtitle leading-[1.2] text-ink transition-colors group-hover:text-accent">
        {entry.title}
      </h3>
      {entry.subtitle && (
        <p className="mt-2 line-clamp-1 font-serif text-body text-ink-soft">
          {entry.subtitle}
        </p>
      )}
      <time
        dateTime={entry.publishedAt}
        className="mt-3 block font-sans text-meta text-quiet"
      >
        {formatDate(entry.publishedAt)}
      </time>
    </Link>
  );
}
