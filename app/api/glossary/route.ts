import { NextResponse } from "next/server";
import { glossaryCategories, glossaryEntries } from "@/lib/content/glossary";
import { buildGlossaryJsonLd, termToSchema } from "@/lib/glossary-schema";
import { siteConfig } from "@/lib/site";
import type { GlossaryCategory } from "@/lib/types";

export const runtime = "nodejs";

const VALID_CATEGORIES = new Set<string>(glossaryCategories.map((c) => c.slug));

function isValidCategory(value: string): value is GlossaryCategory {
  return VALID_CATEGORIES.has(value);
}

const responseHeaders: HeadersInit = {
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=3600",
  "Access-Control-Allow-Origin": "*",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");
  const term = searchParams.get("term");
  const category = searchParams.get("category");

  const setUrl = `${siteConfig.url}/glossary`;

  if (term) {
    const entry = glossaryEntries.find((e) => e.slug === term);
    if (!entry) {
      return NextResponse.json(
        { error: "Term not found", term },
        { status: 404, headers: responseHeaders },
      );
    }
    return NextResponse.json(termToSchema(entry, setUrl), {
      headers: responseHeaders,
    });
  }

  if (category) {
    if (!isValidCategory(category)) {
      return NextResponse.json(
        { error: "Invalid category", category },
        { status: 400, headers: responseHeaders },
      );
    }
    const meta = glossaryCategories.find((c) => c.slug === category)!;
    const terms = glossaryEntries
      .filter((e) => e.category === category)
      .map((e) => termToSchema(e, setUrl));
    return NextResponse.json(
      {
        slug: meta.slug,
        label: meta.label,
        description: meta.description,
        termCount: terms.length,
        terms,
      },
      { headers: responseHeaders },
    );
  }

  if (format === "simple") {
    return NextResponse.json(
      {
        terms: glossaryEntries.map((e) => ({
          term: e.term,
          slug: e.slug,
          category: e.category,
          definition: e.definition,
        })),
      },
      { headers: responseHeaders },
    );
  }

  return NextResponse.json(buildGlossaryJsonLd(siteConfig.url), {
    headers: responseHeaders,
  });
}
