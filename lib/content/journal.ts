import type { JournalEntry, JournalFormat } from "@/lib/types";
import { getSupabaseClient } from "@/lib/supabase";

// Journal content is the one piece of site data stored in Supabase —
// specifically so Cloudinary image URLs can be pasted via Supabase Studio
// rather than committed to the repo. Glossary, The Index, Properties,
// Quarters, and Pages remain flat files in lib/content/.
//
// Fallback contract: when Supabase env vars are missing, every getter
// returns an empty result. Pages must render their empty-state paths
// without crashing.

const TABLE = "journal_entries";

export const JOURNAL_FORMATS: readonly JournalFormat[] = [
  "the-medina",
  "the-market",
  "the-house",
  "the-record",
] as const;

const FORMAT_SET = new Set<string>(JOURNAL_FORMATS);

function coerceFormat(value: unknown): JournalFormat | undefined {
  if (typeof value !== "string") return undefined;
  return FORMAT_SET.has(value) ? (value as JournalFormat) : undefined;
}

// hero_image_prompt + inline_image_{1,2}_prompt are stored for editorial
// workflow (copy → paste into MJ → regenerate) and round-tripped through
// the type so a future feature could surface them in an internal tool —
// they are never rendered on the public entry page.
interface JournalRow {
  slug: string;
  title: string;
  subtitle: string | null;
  body_markdown: string;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  hero_image_prompt: string | null;
  inline_image_1_url: string | null;
  inline_image_1_alt: string | null;
  inline_image_1_prompt: string | null;
  inline_image_2_url: string | null;
  inline_image_2_alt: string | null;
  inline_image_2_prompt: string | null;
  published_at: string;
  published: boolean;
  format: string | null;
}

// Image URLs in Supabase may carry a `PLACEHOLDER_*` sentinel during the
// editorial workflow (hero/inline placeholders that the editor will swap
// for real Cloudinary URLs). Strip those at the row-mapping layer so every
// downstream consumer — entry-page hero, featured, card, JSON-LD — sees
// `undefined` and degrades cleanly instead of trying to render a broken
// image.
function usable(value: string | null): string | undefined {
  if (!value) return undefined;
  if (value.startsWith("PLACEHOLDER_")) return undefined;
  return value;
}

function rowToEntry(row: JournalRow): JournalEntry {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    bodyMarkdown: row.body_markdown,
    heroImageUrl: usable(row.hero_image_url),
    heroImageAlt: row.hero_image_alt ?? undefined,
    heroImagePrompt: row.hero_image_prompt ?? undefined,
    inlineImage1Url: usable(row.inline_image_1_url),
    inlineImage1Alt: row.inline_image_1_alt ?? undefined,
    inlineImage1Prompt: row.inline_image_1_prompt ?? undefined,
    inlineImage2Url: usable(row.inline_image_2_url),
    inlineImage2Alt: row.inline_image_2_alt ?? undefined,
    inlineImage2Prompt: row.inline_image_2_prompt ?? undefined,
    publishedAt: row.published_at,
    published: row.published,
    format: coerceFormat(row.format),
  };
}

// Inline image rule for journal entry bodies:
// - paragraphs are split on blank lines (\n\n)
// - inline 1 inserts after paragraph 3 (idx 2)
// - inline 2 inserts after paragraph 7 (idx 6)
// - if body has fewer than 4 paragraphs, neither image renders
// - if body has 4-7 paragraphs, only inline 1 renders
// Placeholder URLs are already stripped to `undefined` by `usable()` in
// rowToEntry, so the helper just checks for presence.
function escapeMarkdownAlt(alt: string): string {
  return alt.replace(/]/g, "\\]");
}

export function injectInlineImages(entry: JournalEntry): string {
  const paragraphs = entry.bodyMarkdown.split("\n\n");
  if (paragraphs.length < 4) return entry.bodyMarkdown;

  const useInline1 = Boolean(entry.inlineImage1Url);
  const useInline2 =
    Boolean(entry.inlineImage2Url) && paragraphs.length >= 8;

  if (!useInline1 && !useInline2) return entry.bodyMarkdown;

  const result: string[] = [];
  paragraphs.forEach((para, idx) => {
    result.push(para);
    if (idx === 2 && useInline1) {
      const alt = escapeMarkdownAlt(entry.inlineImage1Alt ?? "");
      result.push(`![${alt}](${entry.inlineImage1Url})`);
    }
    if (idx === 6 && useInline2) {
      const alt = escapeMarkdownAlt(entry.inlineImage2Alt ?? "");
      result.push(`![${alt}](${entry.inlineImage2Url})`);
    }
  });

  return result.join("\n\n");
}

export async function getPublishedJournalEntries(): Promise<JournalEntry[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[journal] Supabase fetch error:", error);
    return [];
  }

  return (data as JournalRow[]).map(rowToEntry);
}

export async function getJournalEntryBySlug(
  slug: string,
): Promise<JournalEntry | undefined> {
  const supabase = getSupabaseClient();
  if (!supabase) return undefined;

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("[journal] Supabase fetch error:", error);
    return undefined;
  }

  return data ? rowToEntry(data as JournalRow) : undefined;
}
