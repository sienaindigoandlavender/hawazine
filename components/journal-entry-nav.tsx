import Link from "next/link";
import type { JournalEntry } from "@/lib/types";

interface JournalEntryNavProps {
  previous?: JournalEntry;
  next?: JournalEntry;
}

// Three-position bottom nav for a journal entry: previous on the left,
// back-to-journal in the centre, next on the right. Each side renders
// only when the neighbour exists; the centre link always renders so a
// reader on the first or last entry can still get back to the index.
export function JournalEntryNav({ previous, next }: JournalEntryNavProps) {
  return (
    <nav
      aria-label="Journal entry navigation"
      className="mx-auto max-w-page px-6 mt-16 md:mt-20"
    >
      <div className="mx-auto max-w-reading grid grid-cols-3 items-center gap-4 border-t border-rule pt-8 font-sans text-meta">
        <div className="text-left">
          {previous && (
            <Link
              href={`/journal/${previous.slug}`}
              className="inline-block uppercase tracking-[0.2em] text-quiet transition-colors hover:text-accent"
              aria-label={`Previous entry: ${previous.title}`}
            >
              ← Previous
            </Link>
          )}
        </div>
        <div className="text-center">
          <Link
            href="/journal"
            className="inline-block uppercase tracking-[0.2em] text-quiet transition-colors hover:text-accent"
          >
            Back to Journal
          </Link>
        </div>
        <div className="text-right">
          {next && (
            <Link
              href={`/journal/${next.slug}`}
              className="inline-block uppercase tracking-[0.2em] text-quiet transition-colors hover:text-accent"
              aria-label={`Next entry: ${next.title}`}
            >
              Next →
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
