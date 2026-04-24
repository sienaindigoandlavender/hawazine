import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { JournalEntry } from "@/lib/types";
import { getPublishedJournalEntries } from "@/lib/content/journal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Writing from Hawazine on the Marrakech medina — its quarters, its titles, its prices, its buildings.",
  alternates: { canonical: "/journal" },
};

function excerpt(entry: JournalEntry, maxLength = 200): string {
  if (entry.subtitle) return entry.subtitle;
  const firstPara = entry.bodyMarkdown.split(/\n{2,}/)[0] ?? "";
  const clean = firstPara.replace(/[*_`~>#]/g, "").replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength).trimEnd() + "…";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function JournalIndex() {
  const entries = await getPublishedJournalEntries();

  const hero = entries[0];
  const secondary = entries.slice(1, 3);
  const list = entries.slice(3);

  return (
    <section className="mx-auto max-w-page px-6 py-12 md:py-16">
      <header>
        <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
          Journal
        </p>
        <h1 className="mt-4 font-serif text-display leading-[1.05] text-ink md:text-[4.25rem]">
          Writing from Hawazine
        </h1>
        <p className="mt-6 max-w-reading font-serif text-subtitle text-ink-soft">
          The thinking behind every mandate, published as we do it.
        </p>
      </header>

      {!hero ? (
        <p className="mt-16 max-w-reading font-serif text-body text-quiet">
          The first pieces are being written. Check back shortly.
        </p>
      ) : (
        <>
          <HeroFeature entry={hero} />
          {secondary.length > 0 && <SecondaryRow entries={secondary} />}
          {list.length > 0 && <IndexList entries={list} />}
        </>
      )}
    </section>
  );
}

function HeroFeature({ entry }: { entry: JournalEntry }) {
  return (
    <article className="mt-12 md:mt-16">
      <Link href={`/journal/${entry.slug}`} className="group block">
        {entry.heroImageUrl && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5">
            <Image
              src={entry.heroImageUrl}
              alt={entry.heroImageAlt ?? ""}
              fill
              sizes="(min-width: 1200px) 1200px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        )}
        <div className={entry.heroImageUrl ? "mt-8 max-w-reading" : "mt-4 max-w-reading"}>
          <h2 className="font-serif text-section leading-[1.08] text-ink transition-colors group-hover:text-accent">
            {entry.title}
          </h2>
          <p className="mt-4 font-serif text-subtitle text-ink-soft">
            {excerpt(entry, 240)}
          </p>
          <p className="mt-4 font-sans text-meta text-quiet">
            {formatDate(entry.publishedAt)}
          </p>
        </div>
      </Link>
    </article>
  );
}

function SecondaryRow({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="mt-16 grid gap-10 border-t border-rule pt-12 md:grid-cols-2 md:gap-12">
      {entries.map((entry) => (
        <article key={entry.slug}>
          <Link href={`/journal/${entry.slug}`} className="group block">
            <h3 className="font-serif text-subtitle leading-[1.15] text-ink transition-colors group-hover:text-accent">
              {entry.title}
            </h3>
            <p className="mt-3 line-clamp-1 font-serif text-body text-ink-soft">
              {excerpt(entry, 120)}
            </p>
          </Link>
        </article>
      ))}
    </div>
  );
}

function IndexList({ entries }: { entries: JournalEntry[] }) {
  return (
    <ul className="mt-16 border-t border-rule">
      {entries.map((entry) => (
        <li key={entry.slug} className="border-b border-rule">
          <Link
            href={`/journal/${entry.slug}`}
            className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-5 md:gap-6"
          >
            <span className="font-serif text-body text-ink transition-colors group-hover:text-accent">
              {entry.title}
            </span>
            <time
              dateTime={entry.publishedAt}
              className="font-sans text-meta text-quiet"
            >
              {formatDate(entry.publishedAt)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
