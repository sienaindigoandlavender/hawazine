import type { Metadata } from "next";
import Link from "next/link";
import { PropertyCard } from "@/components/property-card";
import { PropertyFeatured } from "@/components/property-featured";
import { getPublishedProperties } from "@/lib/content/properties";
import type { Property } from "@/lib/types";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, buildBreadcrumbJsonLd, SEO_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Properties — riads, dars, and land in the Marrakech medina",
  description:
    "Riads, dars, and land in the Marrakech medina and beyond. Each property considered, verified, and presented with the information a serious buyer needs.",
  keywords: [
    ...SEO_KEYWORDS.base,
    "riad for sale Marrakech",
    "dar for sale Marrakech",
    "land for sale Marrakech",
    "Marrakech medina property listings",
  ],
  alternates: { canonical: "/properties" },
  openGraph: {
    type: "website",
    title: "Properties — riads, dars, and land in the Marrakech medina",
    description:
      "Riads, dars, and land in the Marrakech medina and beyond.",
    url: absoluteUrl("/properties"),
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function pickFeatured(list: Property[]): {
  featured: Property | undefined;
  rest: Property[];
} {
  const sorted = [...list].sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0,
  );
  const flagged = sorted.find((p) => p.featured);
  const featured = flagged ?? sorted[0];
  const rest = sorted.filter((p) => p.slug !== featured?.slug);
  return { featured, rest };
}

export default function PropertiesIndex() {
  const properties = getPublishedProperties();
  const { featured, rest } = pickFeatured(properties);

  const mostRecent = properties.reduce<string | undefined>(
    (acc, p) => (acc && acc > p.updatedAt ? acc : p.updatedAt),
    undefined,
  );

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/properties")}#collection`,
    name: "Properties — Hawazine",
    description:
      "Riads, dars, and land currently represented by Hawazine in the Marrakech medina.",
    url: absoluteUrl("/properties"),
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}#website` },
    publisher: { "@id": `${siteConfig.url}#organization` },
    ...(mostRecent && { dateModified: mostRecent }),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: properties.length,
      itemListElement: properties.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/properties/${p.slug}`),
        name: p.title,
      })),
    },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="mx-auto max-w-page px-6 pt-16 pb-16 md:pt-24">
        <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
          Properties
        </p>
        <h1 className="mt-4 font-serif text-display leading-[1.04] text-ink md:text-[4.25rem]">
          Riads, dars, and land in the Marrakech medina and beyond.
        </h1>
        <p className="mt-6 max-w-reading font-serif text-subtitle text-ink-soft">
          Each property considered, verified, and presented with the
          information a serious buyer needs.
        </p>
        {properties.length > 0 && mostRecent && (
          <p className="mt-6 font-sans text-meta text-quiet">
            {properties.length}{" "}
            {properties.length === 1 ? "property" : "properties"} · updated{" "}
            {formatDate(mostRecent)}
          </p>
        )}
      </header>

      {!featured ? (
        <section className="mx-auto max-w-page px-6 pb-24">
          <p className="max-w-reading font-serif text-body text-quiet">
            No properties currently listed.{" "}
            <Link
              href="/contact"
              className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
            >
              Contact us
            </Link>{" "}
            for off-market inventory.
          </p>
        </section>
      ) : (
        <>
          <section className="mb-24">
            <PropertyFeatured property={featured} priority />
          </section>

          {rest.length > 0 && (
            <section className="mx-auto max-w-page px-6 mb-24">
              <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
                {rest.map((p) => (
                  <PropertyCard key={p.slug} property={p} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
