import Image from "next/image";
import Link from "next/link";
import type { JournalEntry } from "@/lib/types";

export function JournalCard({ entry }: { entry: JournalEntry }) {
  const date = new Date(entry.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/journal/${entry.slug}`} className="group block">
      {entry.heroImageUrl && (
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink/5">
          <Image
            src={entry.heroImageUrl}
            alt={entry.heroImageAlt ?? ""}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="mt-5">
        <p className="font-ui text-meta uppercase tracking-[0.14em] text-quiet">
          {date}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-ink transition-colors group-hover:text-accent">
          {entry.title}
        </h3>
        {entry.subtitle && (
          <p className="mt-2 font-serif text-base text-ink/70">{entry.subtitle}</p>
        )}
      </div>
    </Link>
  );
}
