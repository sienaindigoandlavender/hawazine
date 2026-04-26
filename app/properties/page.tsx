import type { Metadata } from "next";
import { PropertyCard } from "@/components/property-card";
import { getPublishedProperties } from "@/lib/content/properties";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, buildBreadcrumbJsonLd, SEO_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Properties — riads, dars, and land in the Marrakech medina",
  description:
    "Riads, dars, and land currently represented by Hawazine in the Marrakech medina.",
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
      "Riads, dars, and land currently represented by Hawazine in the Marrakech medina.",
    url: absoluteUrl("/properties"),
  },
};

const FILTER_LABELS = ["Price", "Location", "Type", "Bedrooms", "Status"];

const ORDER_OPTIONS = [
  "Date added (newest first)",
  "Price (low to high)",
  "Price (high to low)",
];

// Filter labels and the order-by dropdown render as visual placeholders
// for v1; functional filters arrive once inventory crosses ~8 listings
// and real browse patterns emerge. The visual presence matches The
// Modern House Sales register and signals where filtering will live.

export default function PropertiesIndex() {
  const properties = getPublishedProperties();
  const mostRecent = properties.reduce<string | null>(
    (acc, p) => (acc && (p.publishedAt ?? "") <= acc ? acc : p.publishedAt),
    null,
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

      <header className="mx-auto max-w-page px-6 pt-12 md:pt-16">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          <div className="md:justify-self-start">
            <form
              role="search"
              aria-label="Search properties"
              action="/properties"
              className="flex w-full max-w-[18rem] items-center gap-2 border-b border-ink/40 pb-1"
            >
              <input
                type="text"
                name="q"
                placeholder="Search…"
                aria-label="Search"
                className="flex-1 bg-transparent font-sans text-meta text-ink placeholder:text-quiet focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="text-quiet transition-colors hover:text-accent"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </form>
          </div>

          <h1 className="text-center font-serif text-[2rem] leading-[1.1] text-ink md:text-[2.5rem]">
            Properties
          </h1>

          <nav
            aria-label="Filters"
            className="md:justify-self-end"
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-quiet md:justify-end">
              {FILTER_LABELS.map((label) => (
                <li key={label}>
                  <button
                    type="button"
                    className="transition-colors hover:text-accent"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 border-t border-ink/15" />

        <div className="flex flex-col items-start justify-between gap-3 py-4 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-quiet">
            <span>
              <span className="text-ink underline underline-offset-4 decoration-ink/40">
                {properties.length}
              </span>{" "}
              {properties.length === 1
                ? "Property for sale"
                : "Properties for sale"}
            </span>
            <span className="flex items-center gap-2">
              <span>Order by</span>
              <select
                aria-label="Order properties by"
                className="bg-transparent font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-ink focus:outline-none"
                defaultValue={ORDER_OPTIONS[0]}
              >
                {ORDER_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </span>
          </div>
          <button
            type="button"
            className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-quiet transition-colors hover:text-accent"
          >
            × Clear filters
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-page px-6 pb-24">
        {properties.length === 0 ? (
          <p className="mx-auto max-w-reading py-16 text-center font-serif text-body text-quiet">
            No properties currently listed. Contact us for off-market
            inventory.
          </p>
        ) : (
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
