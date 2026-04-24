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

interface JournalRow {
  slug: string;
  title: string;
  subtitle: string | null;
  body_markdown: string;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  published_at: string;
  published: boolean;
  format: string | null;
}

function rowToEntry(row: JournalRow): JournalEntry {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    bodyMarkdown: row.body_markdown,
    heroImageUrl: row.hero_image_url ?? undefined,
    heroImageAlt: row.hero_image_alt ?? undefined,
    publishedAt: row.published_at,
    published: row.published,
    format: coerceFormat(row.format),
  };
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
