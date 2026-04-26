import type { JournalEntry } from "@/lib/types";

// Centred serif title only. The byline (words / photography / share)
// renders below the hero image as JournalEntryByline so the credits sit
// alongside the article body rather than wedged between the title and
// the photograph.
export function JournalEntryHeader({ entry }: { entry: JournalEntry }) {
  return (
    <header className="mx-auto max-w-page px-6 pt-16 pb-10 md:pt-24">
      <h1 className="mx-auto max-w-[900px] text-center font-serif text-section leading-[1.15] text-ink md:text-[3rem]">
        {entry.title}
      </h1>
    </header>
  );
}
