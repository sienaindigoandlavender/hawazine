import type { JournalEntry } from "@/lib/types";
import { siteConfig } from "@/lib/site";

// Default editorial credits for journal pieces. If individual entries
// later need their own bylines, lift these into JournalEntry as
// `wordsBy` / `photographyBy` columns and fall back to these defaults.
const DEFAULT_WORDS = "Jacqueline Ng";
const DEFAULT_PHOTOGRAPHY = "Jacqueline Ng, Mouad Hawazine";

function ShareIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      rel="noopener noreferrer"
      target="_blank"
      className="text-quiet transition-colors hover:text-accent"
    >
      {children}
    </a>
  );
}

function ShareIcons({ entry }: { entry: JournalEntry }) {
  const url = `${siteConfig.url}/journal/${entry.slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(entry.title);

  const iconClass = "h-4 w-4";

  return (
    <div className="mt-5 flex items-center justify-center gap-5">
      <ShareIcon
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        label="Share by email"
      >
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </ShareIcon>
      <ShareIcon
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        label="Share on Facebook"
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.3-1.5 1.6-1.5H17V4.3a22 22 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1V10.5H8v3h2.6V21h2.9z" />
        </svg>
      </ShareIcon>
      <ShareIcon
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        label="Share on X"
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 3h2.7l-5.9 6.7L21.5 21h-5.5l-4.3-5.7L6.7 21H4l6.3-7.2L3.5 3H9l3.9 5.2L17.5 3zm-1 16.4h1.5L7.6 4.5H6L16.5 19.4z" />
        </svg>
      </ShareIcon>
      <ShareIcon
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        label="Share on LinkedIn"
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 3.5A1.8 1.8 0 1 1 5 7a1.8 1.8 0 0 1 0-3.5zM3.5 8.5h3v12h-3v-12zM10 8.5h2.9v1.7h.1c.4-.7 1.4-1.5 2.9-1.5 3.1 0 3.6 2 3.6 4.6v7.2h-3v-6.4c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3v6.5h-3v-12z" />
        </svg>
      </ShareIcon>
    </div>
  );
}

// Magazine-style byline that sits below the hero image: words /
// photography credits, then a row of share icons. Centred, quiet, and
// constrained to the reading width so it lines up with the body.
export function JournalEntryByline({ entry }: { entry: JournalEntry }) {
  return (
    <div className="mx-auto max-w-page px-6 mb-12 md:mb-16">
      <div className="mx-auto max-w-reading flex flex-col items-center gap-1 font-sans text-meta text-quiet">
        <p>
          <span className="text-quiet">Words </span>
          <span className="text-ink">{DEFAULT_WORDS}</span>
        </p>
        <p>
          <span className="text-quiet">Photography </span>
          <span className="text-ink">{DEFAULT_PHOTOGRAPHY}</span>
        </p>
      </div>
      <ShareIcons entry={entry} />
    </div>
  );
}
