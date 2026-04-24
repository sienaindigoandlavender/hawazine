"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import type { SearchResult } from "@/lib/search";

interface IndexSearchProps {
  corpus: SearchResult[];
  children: ReactNode;
}

export function IndexSearch({ corpus, children }: IndexSearchProps) {
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
          placeholder="Search the Index and Glossary…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border-0 border-b border-ink px-0 py-3 font-serif text-body text-ink placeholder:text-quiet placeholder:italic focus:outline-none focus:border-accent transition-colors"
          aria-label="Search the Index and Glossary"
        />
      </div>

      {isSearching ? (
        <div className="mx-auto max-w-page px-6">
          {results.length === 0 ? (
            <p className="font-sans text-meta text-quiet">
              No results for &ldquo;{trimmed}&rdquo;. Try the{" "}
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
          ) : (
            <>
              <p className="mb-6 font-sans text-meta text-quiet">
                {results.length} {results.length === 1 ? "result" : "results"} for
                {" "}&ldquo;{trimmed}&rdquo;
              </p>
              <ol>
                {results.map((result) => (
                  <li key={result.id} className="border-b border-rule last:border-b-0">
                    <Link
                      href={result.href}
                      className="group flex items-baseline gap-6 py-6 transition-colors hover:bg-paper-deep"
                    >
                      <span className="font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-quiet min-w-[4.5rem]">
                        {result.type}
                      </span>
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
                    </Link>
                  </li>
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
