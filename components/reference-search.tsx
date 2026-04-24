"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import type { SearchResult } from "@/lib/search";

export type ReferenceSearchMode = "unified" | "glossary";

interface ReferenceSearchProps {
  corpus: SearchResult[];
  mode: ReferenceSearchMode;
  placeholder: string;
  ariaLabel: string;
  children: ReactNode;
}

export function ReferenceSearch({
  corpus,
  mode,
  placeholder,
  ariaLabel,
  children,
}: ReferenceSearchProps) {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();
  const isSearching = trimmed.length >= 2;

  const results = useMemo<SearchResult[]>(() => {
    if (trimmed.length < 2) return [];
    const q = trimmed.toLowerCase();

    const scored = corpus
      .map((item, originalIndex) => {
        const primary = item.searchableText.toLowerCase();
        const secondary = item.secondaryText.toLowerCase();

        if (item.title.toLowerCase() === q) return { item, tier: 1, originalIndex };
        if (primary.startsWith(q)) return { item, tier: 2, originalIndex };
        if (primary.includes(q)) return { item, tier: 3, originalIndex };
        if (secondary.includes(q)) return { item, tier: 4, originalIndex };
        return null;
      })
      .filter(
        (r): r is { item: SearchResult; tier: number; originalIndex: number } =>
          r !== null,
      );

    scored.sort((a, b) => {
      if (a.tier !== b.tier) return a.tier - b.tier;
      return a.originalIndex - b.originalIndex;
    });

    return scored.map((r) => r.item);
  }, [corpus, trimmed]);

  return (
    <>
      <div className="mx-auto max-w-page px-6 my-12">
        <input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border-0 border-b border-ink px-0 py-3 font-serif text-body text-ink placeholder:text-quiet placeholder:italic focus:outline-none focus:border-accent transition-colors"
          aria-label={ariaLabel}
        />
      </div>

      {isSearching ? (
        <div className="mx-auto max-w-page px-6">
          {results.length === 0 ? (
            <NoResults mode={mode} query={trimmed} />
          ) : (
            <>
              <p className="mb-6 font-sans text-meta text-quiet">
                {results.length} {results.length === 1 ? "result" : "results"} for
                {" "}&ldquo;{trimmed}&rdquo;
              </p>
              <ol>
                {results.map((result) => (
                  <ResultRow key={result.id} mode={mode} result={result} />
                ))}
              </ol>
            </>
          )}
        </div>
      ) : (
        children
      )}
    </>
  );
}

function ResultRow({
  mode,
  result,
}: {
  mode: ReferenceSearchMode;
  result: SearchResult;
}) {
  const content = (
    <>
      {mode === "unified" && (
        <span className="font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-quiet min-w-[4.5rem]">
          {result.type}
        </span>
      )}
      <div className="flex-1">
        <h3 className="font-serif text-subtitle text-ink transition-colors group-hover:text-accent">
          {result.title}
        </h3>
        <p className="mt-1 line-clamp-1 font-sans text-meta text-quiet">
          {result.snippet}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="font-sans text-meta text-quiet transition-colors group-hover:text-accent"
      >
        →
      </span>
    </>
  );

  const className =
    "group flex items-baseline gap-6 py-6 transition-colors hover:bg-paper-deep";

  return (
    <li className="border-b border-rule last:border-b-0">
      {mode === "glossary" ? (
        <a href={result.href} className={className}>
          {content}
        </a>
      ) : (
        <Link href={result.href} className={className}>
          {content}
        </Link>
      )}
    </li>
  );
}

function NoResults({
  mode,
  query,
}: {
  mode: ReferenceSearchMode;
  query: string;
}) {
  if (mode === "glossary") {
    return (
      <p className="font-sans text-meta text-quiet">
        No results for &ldquo;{query}&rdquo;. If something belongs in the
        Glossary,{" "}
        <Link
          href="/contact"
          className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
        >
          let us know
        </Link>
        .
      </p>
    );
  }

  return (
    <p className="font-sans text-meta text-quiet">
      No results for &ldquo;{query}&rdquo;. Try the{" "}
      <Link
        href="/glossary"
        className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
      >
        Glossary
      </Link>{" "}
      for specific terms, or{" "}
      <Link
        href="/contact"
        className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
      >
        contact us
      </Link>{" "}
      if something is missing.
    </p>
  );
}
