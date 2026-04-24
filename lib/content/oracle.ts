// The Oracle — market intelligence data layer.
//
// Public / private boundary (enforced by convention, not the type system):
//
//   Private (internal intelligence)   →   Public (Oracle output)
//   ─────────────────────────────────────────────────────────────
//   Raw transaction prices            →   Aggregated ranges by quarter
//   Individual deal notes             →   Pattern observations
//   Portal tracking                   →   Published MarketNotes
//   Reads on seller motive            →   Never published
//
// Rule: `transactions` is never rendered row-by-row in the UI. It feeds
// `aggregatePriceByQuarter()` and nothing else. Only `marketNotes` with
// `published: true` are intended for public surfaces.

import type {
  MarketNote,
  PriceAggregate,
  TransactionRecord,
} from "@/lib/types";

// Private: raw observations. Never render these directly.
export const transactions: TransactionRecord[] = [];

// Public: curated market observations. Surfaced via /journal when ready.
export const marketNotes: MarketNote[] = [];

const AGGREGATE_MIN_SAMPLES = 3;

export function getPublishedMarketNotes(): MarketNote[] {
  return [...marketNotes]
    .filter((n) => n.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getMarketNotesByQuarter(slug: string): MarketNote[] {
  return getPublishedMarketNotes().filter((n) => n.quarter === slug);
}

export function getMarketNotesByFormat(
  format: MarketNote["format"],
): MarketNote[] {
  return getPublishedMarketNotes().filter((n) => n.format === format);
}

interface AggregateWindow {
  from?: string; // YYYY-MM inclusive
  to?: string; // YYYY-MM inclusive
}

export function aggregatePriceByQuarter(
  slug: string,
  window: AggregateWindow = {},
): PriceAggregate {
  const inWindow = transactions.filter((t) => {
    if (t.quarter !== slug) return false;
    if (window.from && t.date < window.from) return false;
    if (window.to && t.date > window.to) return false;
    return true;
  });

  const priced = inWindow.filter(
    (t): t is TransactionRecord & {
      surfaceM2: number;
      transactionPriceDh: number;
    } =>
      typeof t.surfaceM2 === "number" &&
      t.surfaceM2 > 0 &&
      typeof t.transactionPriceDh === "number",
  );

  const count = priced.length;

  if (count < AGGREGATE_MIN_SAMPLES) {
    // Sample is too thin to publish a number. Return shape without prices.
    return { quarter: slug, count };
  }

  const perM2 = priced
    .map((t) => t.transactionPriceDh / t.surfaceM2)
    .sort((a, b) => a - b);

  const min = perM2[0];
  const max = perM2[perM2.length - 1];
  const mid = Math.floor(perM2.length / 2);
  const median =
    perM2.length % 2 === 0 ? (perM2[mid - 1] + perM2[mid]) / 2 : perM2[mid];

  const dates = priced.map((t) => t.date).sort();

  return {
    quarter: slug,
    count,
    medianDhPerM2: Math.round(median),
    rangeDhPerM2: { min: Math.round(min), max: Math.round(max) },
    observedRange: { from: dates[0], to: dates[dates.length - 1] },
  };
}
