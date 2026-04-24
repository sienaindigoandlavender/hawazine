import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import type { JournalEntry, JournalFormat } from "@/lib/types";
import {
  JOURNAL_FORMATS,
  JOURNAL_FORMAT_LABEL,
  getPublishedJournalEntries,
} from "@/lib/content/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Writing from Hawazine on the Marrakech medina — its quarters, its titles, its prices, its buildings.",
  alternates: { canonical: "/journal" },
};

interface JournalIndexProps {
  searchParams: { format?: string };
}

const FORMAT_SLUGS = new Set<string>(JOURNAL_FORMATS);

function isJournalFormat(value: string | undefined): value is JournalFormat {
  return typeof value === "string" && FORMAT_SLUGS.has(value);
}

function prioritizeMedinaHero(entries: JournalEntry[]): JournalEntry[] {
  const idx = entries.findIndex((e) => e.format === "the-medina");
  if (idx <= 0) return entries;
  return [entries[idx], ...entries.slice(0, idx), ...entries.slice(idx + 1)];
}

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

export default function JournalIndex({ searchParams }: JournalIndexProps) {
  const activeFormat: JournalFormat | null = isJournalFormat(searchParams.format)
    ? searchParams.format
    : null;

  const allEntries = getPublishedJournalEntries();
  const entries = activeFormat
    ? allEntries.filter((e) => e.format === activeFormat)
    : prioritizeMedinaHero(allEntries);

  const hero = entries[0];
  const secondary = entries.slice(1, 3);
  const list = entries.slice(3);

  const filters: { key: string; label: string; href: string }[] = [
    { key: "all", label: "All", href: "/journal" },
    ...JOURNAL_FORMATS.map((f) => ({
      key: f,
      label: JOURNAL_FORMAT_LABEL[f],
      href: `/journal?format=${f}`,
    })),
  ];

  const activeKey = activeFormat ?? "all";

  return (
    <section className="mx-auto max-w-page px-6 py-12 md:py-16">
      <nav
        aria-label="Journal formats"
        className="flex flex-wrap items-center gap-x-4 gap-y-2 font-ui text-meta uppercase tracking-[0.18em]"
      >
        {filters.map((f, i) => (
          <Fragment key={f.key}>
            {i > 0 && (
              <span aria-hidden="true" className="text-quiet/50">
                ·
              </span>
            )}
            <Link
              href={f.href}
              className={
                activeKey === f.key
                  ? "text-ink"
                  : "text-quiet transition-colors hover:text-accent"
              }
            >
              {f.label}
            </Link>
          </Fragment>
        ))}
      </nav>

      {!hero ? (
        <p className="mt-16 max-w-reading font-serif text-body text-quiet">
          {activeFormat
            ? `Nothing in ${JOURNAL_FORMAT_LABEL[activeFormat]} yet.`
            : "The first pieces are being written. Check back shortly."}
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

function FormatLabel({ format }: { format?: JournalFormat }) {
  if (!format) return null;
  return (
    <p className="font-ui text-meta uppercase tracking-[0.18em] text-quiet">
      {JOURNAL_FORMAT_LABEL[format]}
    </p>
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
          <FormatLabel format={entry.format} />
          <h2 className="mt-3 font-serif text-section leading-[1.08] text-ink transition-colors group-hover:text-accent">
            {entry.title}
          </h2>
          <p className="mt-4 font-serif text-subtitle text-ink/80">
            {excerpt(entry, 240)}
          </p>
        </div>
      </Link>
    </article>
  );
}

function SecondaryRow({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="mt-16 grid gap-10 border-t border-ink/10 pt-12 md:grid-cols-2 md:gap-12">
      {entries.map((entry) => (
        <article key={entry.slug}>
          <Link href={`/journal/${entry.slug}`} className="group block">
            <FormatLabel format={entry.format} />
            <h3 className="mt-3 font-serif text-subtitle leading-[1.15] text-ink transition-colors group-hover:text-accent">
              {entry.title}
            </h3>
            <p className="mt-3 line-clamp-1 font-serif text-body text-ink/70">
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
    <ul className="mt-16 border-t border-ink/10">
      {entries.map((entry) => (
        <li key={entry.slug} className="border-b border-ink/10">
          <Link
            href={`/journal/${entry.slug}`}
            className="group grid grid-cols-[7rem_minmax(0,1fr)_auto] items-baseline gap-4 py-5 md:grid-cols-[12rem_minmax(0,1fr)_auto] md:gap-6"
          >
            <span className="font-ui text-meta uppercase tracking-[0.18em] text-quiet">
              {entry.format ? JOURNAL_FORMAT_LABEL[entry.format] : ""}
            </span>
            <span className="font-serif text-body text-ink transition-colors group-hover:text-accent">
              {entry.title}
            </span>
            <time
              dateTime={entry.publishedAt}
              className="font-ui text-meta text-quiet"
            >
              {formatDate(entry.publishedAt)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
