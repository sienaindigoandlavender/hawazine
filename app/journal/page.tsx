import type { Metadata } from "next";
import { JournalCard } from "@/components/journal-card";
import { JournalFeatured } from "@/components/journal-featured";
import { getPublishedJournalEntries } from "@/lib/content/journal";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, buildBreadcrumbJsonLd, SEO_KEYWORDS } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Journal — dispatches from the Marrakech medina",
  description:
    "Dispatches from the medina — craft, architecture, and the daily life of a place. Editorial from Hawazine.",
  keywords: [...SEO_KEYWORDS.base, ...SEO_KEYWORDS.journal],
  alternates: { canonical: "/journal" },
  openGraph: {
    type: "website",
    title: "Journal — dispatches from the Marrakech medina",
    description:
      "Dispatches from the medina — craft, architecture, and the daily life of a place.",
    url: absoluteUrl("/journal"),
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function JournalIndex() {
  const entries = await getPublishedJournalEntries();

  const featured = entries[0];
  const grid = entries.slice(1);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/journal")}#blog`,
    name: `${siteConfig.name} Journal`,
    description:
      "Dispatches from the Marrakech medina — craft, architecture, and the daily life of a place.",
    url: absoluteUrl("/journal"),
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}#website` },
    publisher: { "@id": `${siteConfig.url}#organization` },
    blogPost: entries.map((entry) => ({
      "@type": "BlogPosting",
      headline: entry.title,
      description: entry.subtitle,
      url: absoluteUrl(`/journal/${entry.slug}`),
      datePublished: entry.publishedAt,
      dateModified: entry.publishedAt,
      author: { "@id": `${siteConfig.url}#organization` },
      ...(entry.heroImageUrl && { image: entry.heroImageUrl }),
    })),
  };

  const itemListJsonLd =
    entries.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          numberOfItems: entries.length,
          itemListElement: entries.map((entry, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/journal/${entry.slug}`),
            name: entry.title,
          })),
        }
      : null;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Journal", path: "/journal" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="mx-auto max-w-page px-6 pt-16 pb-16 md:pt-24">
        <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
          Journal
        </p>
        <h1 className="mt-4 font-serif text-display leading-[1.04] text-ink md:text-[3.25rem]">
          Dispatches from the medina.
        </h1>
        <p className="mt-6 max-w-reading font-serif text-subtitle text-ink-soft">
          Craft, architecture, and the daily life of a place.
        </p>
        {entries.length > 0 && (
          <p className="mt-6 font-sans text-meta text-quiet">
            {entries.length} {entries.length === 1 ? "entry" : "entries"} · updated{" "}
            {formatDate(entries[0].publishedAt)}
          </p>
        )}
      </header>

      {!featured ? (
        <section className="mx-auto max-w-page px-6 pb-24">
          <p className="max-w-reading font-serif text-body text-quiet">
            The first pieces are being written. Check back shortly.
          </p>
        </section>
      ) : (
        <>
          <section className="mb-16 md:mb-20">
            <JournalFeatured entry={featured} />
          </section>

          {grid.length > 0 && (
            <section className="mx-auto max-w-page px-6 mb-24">
              <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {grid.map((entry) => (
                  <JournalCard key={entry.slug} entry={entry} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
