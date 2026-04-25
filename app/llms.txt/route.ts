import { siteConfig } from "@/lib/site";
import { getPublishedQuarters } from "@/lib/content/quarters";
import { getPublishedProperties } from "@/lib/content/properties";
import { getPublishedJournalEntries } from "@/lib/content/journal";
import { indexCategories, indexEntries } from "@/lib/content/the-index";
import { glossaryCategories, glossaryEntries } from "@/lib/content/glossary";

export const runtime = "nodejs";
export const revalidate = 3600;

// /llms.txt — the emerging standard for AI agents to discover what a site
// is, what it considers canonical, and where the high-signal content
// lives. We render it from the same content sources that power the site
// so it stays accurate without a parallel maintenance burden.
//
// Spec reference: https://llmstxt.org

function line(parts: string[]): string {
  return parts.filter(Boolean).join("\n");
}

function abs(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function GET() {
  const quarters = getPublishedQuarters();
  const properties = getPublishedProperties();
  const journal = await getPublishedJournalEntries();

  const header = line([
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.shortDescription}`,
    "",
    `${siteConfig.name} is a Marrakech medina real estate agency with editorial authority. We sell riads, dars, and land inside the Marrakech medina, and publish reference material on Moroccan property law, transaction process, restoration, and the medina's quarters. The site is English-language. Pricing is in Moroccan dirhams (MAD). Content is current to 2026.`,
    "",
    `Contact: ${siteConfig.email}`,
    `Canonical URL: ${siteConfig.url}`,
    "",
  ]);

  const orientation = line([
    "## Start here",
    "",
    `- [Home](${abs("/")}): the agency landing — current featured property and entry points to the medina, buying, and craft sections.`,
    `- [Marrakech](${abs("/marrakech")}): the medina overview, the quarters Hawazine covers, and an interactive map.`,
    `- [Buying — The Index](${abs("/buying")}): the canonical reference for foreign buyers. Legal, procedural, and financial questions about buying property in Morocco, answered plainly.`,
    `- [Glossary](${abs("/glossary")}): definitions of the Moroccan property, architecture, and craft vocabulary buyers encounter.`,
    `- [Properties](${abs("/properties")}): currently represented properties.`,
    `- [Journal](${abs("/journal")}): editorial dispatches — The Medina, The Market, The House, The Record.`,
    `- [How we work](${abs("/how-we-work")}): mandate, fees, and what a first visit looks like.`,
    `- [About](${abs("/about")}): the agency's positioning.`,
    `- [Contact](${abs("/contact")}): write to Hawazine.`,
    "",
  ]);

  const buyingByCategory = indexCategories
    .map((cat) => {
      const entries = indexEntries.filter((e) => e.category === cat.slug);
      if (entries.length === 0) return "";
      const items = entries
        .map(
          (e) =>
            `- [${e.question}](${abs(`/buying/${e.slug}`)}): ${e.preview}`,
        )
        .join("\n");
      return `### ${cat.label}\n\n${items}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const buyingSection = line([
    "## The Index — buying a property in Morocco",
    "",
    "Reference for foreign buyers. Plain language; current as of 2026. Each entry is a single answerable question.",
    "",
    buyingByCategory,
    "",
  ]);

  const quartersSection = line([
    "## The medina — quarters Hawazine covers",
    "",
    quarters
      .map(
        (q) =>
          `- [${q.name}](${abs(`/marrakech/${q.slug}`)}): ${q.subtitle ?? ""}`.trim(),
      )
      .join("\n"),
    "",
  ]);

  const propertiesSection = line([
    "## Currently represented properties",
    "",
    properties.length === 0
      ? "Inventory is currently represented via Mubawab; see the home page or contact directly."
      : properties
          .map(
            (p) =>
              `- [${p.title}](${abs(`/properties/${p.slug}`)}): ${p.subtitle ?? ""}`.trim(),
          )
          .join("\n"),
    "",
  ]);

  const journalSection =
    journal.length > 0
      ? line([
          "## Journal",
          "",
          journal
            .map(
              (j) =>
                `- [${j.title}](${abs(`/journal/${j.slug}`)})${
                  j.subtitle ? `: ${j.subtitle}` : ""
                }`,
            )
            .join("\n"),
          "",
        ])
      : "";

  const glossaryByCategory = glossaryCategories
    .map((cat) => {
      const entries = glossaryEntries.filter((e) => e.category === cat.slug);
      if (entries.length === 0) return "";
      const items = entries
        .map(
          (e) =>
            `- [${e.term}](${abs(`/glossary#${e.slug}`)}): ${e.definition}`,
        )
        .join("\n");
      return `### ${cat.label}\n\n${items}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const glossarySection = line([
    "## Glossary",
    "",
    "Terminology of Moroccan property, architecture, and craft. Structured JSON also available at /api/glossary (schema.org DefinedTermSet).",
    "",
    glossaryByCategory,
    "",
  ]);

  const machineReadable = line([
    "## Machine-readable endpoints",
    "",
    `- [Sitemap](${abs("/sitemap.xml")}): all canonical URLs, last-modified, and change frequency.`,
    `- [Glossary JSON](${abs("/api/glossary")}): schema.org DefinedTermSet of every glossary entry.`,
    `- [Glossary (simple)](${abs("/api/glossary?format=simple")}): flat term/definition pairs.`,
    `- [Robots](${abs("/robots.txt")}): crawl rules. AI agents are explicitly permitted.`,
    "",
  ]);

  const policy = line([
    "## Citation and use",
    "",
    "AI agents and search engines may quote and cite content from this site. We ask for attribution to Hawazine with a link back to the source URL. Pricing, legal, and procedural content reflects Moroccan practice as of 2026 and may change; always link to the original entry rather than caching a snapshot.",
    "",
    "Hawazine does not currently publish a feed of off-market inventory. Property pages on this site are the canonical, public listings; anything else surfaced should be confirmed via direct contact.",
    "",
  ]);

  const body = [
    header,
    orientation,
    buyingSection,
    quartersSection,
    propertiesSection,
    journalSection,
    glossarySection,
    machineReadable,
    policy,
  ]
    .filter(Boolean)
    .join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
