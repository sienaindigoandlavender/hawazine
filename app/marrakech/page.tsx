import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { EditorialHero } from "@/components/editorial-hero";
import { EssayBody } from "@/components/essay-body";
import { QuarterCard } from "@/components/quarter-card";
import { getPageBySlug } from "@/lib/content/pages";
import { getPublishedQuarters } from "@/lib/content/quarters";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, buildBreadcrumbJsonLd, SEO_KEYWORDS } from "@/lib/seo";

const QuarterMap = dynamic(
  () => import("@/components/quarter-map").then((m) => m.QuarterMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full bg-ink/5"
        style={{ height: "480px" }}
        aria-hidden="true"
      />
    ),
  },
);

const page = getPageBySlug("marrakech")!;

export const metadata: Metadata = {
  title: `${page.title} — the medina and its quarters`,
  description: page.subtitle,
  keywords: [
    ...SEO_KEYWORDS.base,
    "Marrakech medina quarters",
    "Laksour",
    "Mouassine",
    "Bab Doukkala",
    "Kasbah Marrakech",
    "Mellah Marrakech",
  ],
  alternates: { canonical: "/marrakech" },
  openGraph: {
    type: "website",
    title: `${page.title} — the medina and its quarters`,
    description: page.subtitle,
    url: absoluteUrl("/marrakech"),
  },
};

export default function MarrakechPage() {
  const quarters = getPublishedQuarters();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/marrakech")}#collection`,
    name: page.title,
    description: page.subtitle,
    url: absoluteUrl("/marrakech"),
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}#website` },
    about: {
      "@type": "Place",
      name: "Marrakech medina",
      containedInPlace: {
        "@type": "City",
        name: "Marrakech",
        containedInPlace: { "@type": "Country", name: "Morocco" },
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: quarters.length,
      itemListElement: quarters.map((q, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/marrakech/${q.slug}`),
        name: q.name,
      })),
    },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Marrakech", path: "/marrakech" },
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

      <EditorialHero
        kicker="Marrakech"
        title={page.title}
        subtitle={page.subtitle}
      />

      <section className="mx-auto max-w-page px-6 py-8 md:py-12">
        <EssayBody markdown={page.bodyMarkdown} />
      </section>

      <section className="mx-auto max-w-page px-6 py-8 md:py-12">
        <QuarterMap />
      </section>

      <section className="mx-auto max-w-page px-6 py-16 md:py-24">
        <h2 className="font-serif text-section text-ink">The quarters we cover</h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          {quarters.map((quarter) => (
            <QuarterCard key={quarter.slug} quarter={quarter} />
          ))}
        </div>

        <p className="mt-12 font-sans text-sm text-ink/60">
          Practical questions about Marrakech?{" "}
          <a
            href="https://derb.so"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink transition-colors"
          >
            Derb has 57 answers →
          </a>
        </p>
      </section>
    </>
  );
}
