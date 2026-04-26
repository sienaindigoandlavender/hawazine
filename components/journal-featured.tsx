import Image from "next/image";
import Link from "next/link";
import type { JournalEntry } from "@/lib/types";

const FORMAT_DISPLAY: Record<string, string> = {
  "the-medina": "The Medina",
  "the-market": "The Market",
  "the-house": "The House",
  "the-record": "The Record",
};

// Modern House-style torn-paper edge: a few gentle waves that fill from
// below in paper, breaking the rectangle of the hero on its way into the
// grid below. Drawn with an SVG so it scales with viewport width.
function TornPaperEdge() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-12 w-full md:h-16"
    >
      <path
        d="M0,80 L0,42 C160,12 320,62 540,38 C760,14 980,64 1180,32 C1300,16 1380,46 1440,36 L1440,80 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// The Modern House pattern: full-bleed hero image with centred overlay
// text (small underlined eyebrow, large white serif title, thin-bordered
// READ MORE button) and a torn-paper edge on its way into the grid below.
export function JournalFeatured({ entry }: { entry: JournalEntry }) {
  const kicker = entry.format
    ? FORMAT_DISPLAY[entry.format] ?? "Latest"
    : "Latest";

  return (
    <Link
      href={`/journal/${entry.slug}`}
      className="group relative block w-full overflow-hidden"
    >
      {entry.heroImageUrl ? (
        <>
          <div className="relative aspect-[16/9] w-full bg-ink/5 md:aspect-[2.2/1]">
            <Image
              src={entry.heroImageUrl}
              alt={entry.heroImageAlt ?? entry.title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent"
            />
            <TornPaperEdge />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-[14%] text-center md:pb-[16%]">
            <p className="pb-2 font-sans text-[0.6875rem] uppercase tracking-[0.24em] text-paper">
              <span className="border-b border-paper/80 pb-1">{kicker}</span>
            </p>
            <h2 className="mt-6 max-w-3xl font-serif text-[1.75rem] leading-[1.15] text-paper md:text-[2.5rem]">
              {entry.title}
            </h2>
            <span className="mt-8 inline-block border border-paper/90 px-8 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.24em] text-paper transition-colors group-hover:bg-paper group-hover:text-ink">
              Read more
            </span>
          </div>
        </>
      ) : (
        <div className="mx-auto flex min-h-[60vh] max-w-[900px] flex-col items-center justify-center px-6 py-24 text-center">
          <p className="pb-2 font-sans text-[0.6875rem] uppercase tracking-[0.24em] text-quiet">
            <span className="border-b border-quiet pb-1">{kicker}</span>
          </p>
          <h2 className="mt-6 font-serif text-section leading-[1.15] text-ink md:text-[2.5rem]">
            {entry.title}
          </h2>
          {entry.subtitle && (
            <p className="mt-6 max-w-reading font-serif text-subtitle text-ink-soft">
              {entry.subtitle}
            </p>
          )}
          <span className="mt-8 inline-block border border-ink px-8 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.24em] text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
            Read more
          </span>
        </div>
      )}
    </Link>
  );
}
