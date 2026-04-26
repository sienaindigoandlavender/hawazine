import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuarterMap } from "@/components/quarter-map";
import {
  getPropertyBySlug,
  getPublishedProperties,
  heroImageFor,
} from "@/lib/content/properties";
import { getQuarterBySlug } from "@/lib/content/quarters";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, buildBreadcrumbJsonLd, SEO_KEYWORDS } from "@/lib/seo";
import { formatPriceDh } from "@/lib/sitemap-helpers";
import {
  PROPERTY_TYPE_LABEL,
  TITLE_STATUS_LABEL,
  type Property,
} from "@/lib/types";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getPublishedProperties().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const property = getPropertyBySlug(params.slug);
  if (!property) return {};
  const quarter = getQuarterBySlug(property.quarterSlug);
  const typeLabel = PROPERTY_TYPE_LABEL[property.propertyType];
  const locationSuffix = quarter
    ? `${quarter.name}, Marrakech medina`
    : "Marrakech medina";
  const seoTitle = `${property.title} — ${typeLabel} for sale in ${locationSuffix}`;
  const description = property.descriptionShort;
  const heroUrl = heroImageFor(property);
  return {
    title: seoTitle,
    description,
    keywords: [
      ...SEO_KEYWORDS.base,
      `${typeLabel.toLowerCase()} for sale`,
      quarter ? `${quarter.name} riad for sale` : "Marrakech riad for sale",
      "buy a riad in Marrakech",
    ],
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      type: "website",
      title: seoTitle,
      description,
      url: absoluteUrl(`/properties/${property.slug}`),
      ...(heroUrl && { images: [{ url: heroUrl, alt: property.title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description,
      ...(heroUrl && { images: [heroUrl] }),
    },
  };
}

interface CrossLink {
  href: string;
  label: string;
}

// Default reference reading per quarter — the small "Reading on this
// property" block at the bottom uses these when the property carries no
// hand-curated relatedJournalSlugs / relatedIndexSlugs. Keep as a small
// curated set; expand the entry list as more quarter / topic pages land.
function defaultReadingFor(property: Property): CrossLink[] {
  const quarter = getQuarterBySlug(property.quarterSlug);
  const links: CrossLink[] = [];

  if (property.titleStatus === "melkia") {
    links.push({
      href: "/buying/what-is-melkia",
      label: "What is melkia?",
    });
    links.push({
      href: "/buying/can-i-buy-a-riad-on-melkia",
      label: "Can I buy a riad on melkia?",
    });
  } else if (property.titleStatus === "titre_foncier") {
    links.push({
      href: "/buying/what-is-titre-foncier",
      label: "What is titre foncier?",
    });
  }

  if (quarter) {
    links.push({
      href: `/marrakech/${quarter.slug}`,
      label: `${quarter.name} — the quarter and its history`,
    });
  }

  if (
    property.conditionSummary &&
    /renovat/i.test(property.conditionSummary)
  ) {
    links.push({
      href: "/buying/what-does-a-marrakech-riad-renovation-actually-cost",
      label: "What does a Marrakech riad renovation actually cost?",
    });
  }

  // Dedupe by href, cap at 4
  const seen = new Set<string>();
  return links
    .filter((l) => {
      if (seen.has(l.href)) return false;
      seen.add(l.href);
      return true;
    })
    .slice(0, 4);
}

interface MetaRow {
  label: string;
  value: string;
}

function buildMetaRows(property: Property): MetaRow[] {
  const quarter = getQuarterBySlug(property.quarterSlug);
  const rows: MetaRow[] = [];

  rows.push({
    label: "Property type",
    value: PROPERTY_TYPE_LABEL[property.propertyType],
  });
  rows.push({ label: "Size", value: `${property.sizeM2} m²` });
  if (typeof property.bedrooms === "number") {
    rows.push({ label: "Bedrooms", value: String(property.bedrooms) });
  }
  if (typeof property.bathrooms === "number") {
    rows.push({ label: "Bathrooms", value: String(property.bathrooms) });
  }
  if (typeof property.roomsTotal === "number") {
    rows.push({ label: "Rooms total", value: String(property.roomsTotal) });
  }
  if (typeof property.floors === "number") {
    rows.push({ label: "Floors", value: String(property.floors) });
  }
  if (property.hasTerrace) rows.push({ label: "Terrace", value: "Yes" });
  if (property.hasCourtyard) rows.push({ label: "Courtyard", value: "Yes" });
  if (property.hasWell) rows.push({ label: "Well", value: "Yes" });
  if (property.orientation) {
    const o = property.orientation;
    rows.push({ label: "Orientation", value: o[0].toUpperCase() + o.slice(1) });
  }
  if (property.floorType) {
    const f = property.floorType;
    rows.push({ label: "Floor type", value: f[0].toUpperCase() + f.slice(1) });
  }
  if (property.approximateYear) {
    rows.push({ label: "Approximate year", value: property.approximateYear });
  } else if (property.ageBracket) {
    rows.push({ label: "Age bracket", value: property.ageBracket });
  }
  if (property.conditionSummary) {
    rows.push({ label: "Condition", value: property.conditionSummary });
  }
  rows.push({
    label: "Title status",
    value: TITLE_STATUS_LABEL[property.titleStatus],
  });
  if (property.titleNotes) {
    rows.push({ label: "Title notes", value: property.titleNotes });
  }
  if (quarter) {
    rows.push({ label: "Quarter", value: quarter.name });
  }
  if (property.walkingLandmarks.length > 0) {
    rows.push({
      label: "Walking distance",
      value: property.walkingLandmarks.join(" · "),
    });
  }

  return rows;
}

export default function PropertyPage({ params }: Params) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const quarter = getQuarterBySlug(property.quarterSlug);
  const heroIdx = Math.min(
    Math.max(property.heroImageIndex, 0),
    Math.max(property.galleryImageUrls.length - 1, 0),
  );
  const heroUrl = property.galleryImageUrls[heroIdx];
  const restImages = property.galleryImageUrls.filter(
    (_, i) => i !== heroIdx,
  );

  const price = formatPriceDh(property.priceDh);
  const titleLabel = TITLE_STATUS_LABEL[property.titleStatus];
  const typeLabel = PROPERTY_TYPE_LABEL[property.propertyType];
  const summarySpec = [
    `${property.sizeM2} m²`,
    typeof property.bedrooms === "number"
      ? `${property.bedrooms} ${property.bedrooms === 1 ? "bedroom" : "bedrooms"}`
      : null,
    typeof property.bathrooms === "number"
      ? `${property.bathrooms} ${property.bathrooms === 1 ? "bathroom" : "bathrooms"}`
      : null,
  ]
    .filter(Boolean)
    .join("  ·  ");

  const reading = defaultReadingFor(property);
  const metaRows = buildMetaRows(property);

  const additionalProperty = [
    {
      "@type": "PropertyValue",
      name: "Title status",
      value: titleLabel,
    },
    typeof property.floors === "number" && {
      "@type": "PropertyValue",
      name: "Floors",
      value: property.floors,
    },
    {
      "@type": "PropertyValue",
      name: "Terrace",
      value: property.hasTerrace ? "yes" : "no",
    },
    {
      "@type": "PropertyValue",
      name: "Courtyard",
      value: property.hasCourtyard ? "yes" : "no",
    },
  ].filter(Boolean);

  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${absoluteUrl(`/properties/${property.slug}`)}#listing`,
    name: property.title,
    headline: property.title,
    description: property.descriptionShort,
    url: absoluteUrl(`/properties/${property.slug}`),
    image: property.galleryImageUrls,
    category: typeLabel,
    datePosted: property.publishedAt ?? undefined,
    dateModified: property.publishedAt ?? undefined,
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    provider: { "@id": `${siteConfig.url}#organization` },
    publisher: { "@id": `${siteConfig.url}#organization` },
    areaServed: quarter ? quarter.name : "Marrakech medina",
    ...(property.bedrooms && { numberOfRooms: property.bedrooms }),
    ...(property.bathrooms && {
      numberOfBathroomsTotal: property.bathrooms,
    }),
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.sizeM2,
      unitCode: "MTK",
    },
    offers: {
      "@type": "Offer",
      price: property.priceDh,
      priceCurrency: "MAD",
      url: absoluteUrl(`/properties/${property.slug}`),
      availability:
        property.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      seller: { "@id": `${siteConfig.url}#organization` },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: quarter
        ? `${quarter.name}, ${property.city}`
        : property.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.countryCode,
    },
    ...(quarter && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: property.latitude ?? quarter.mapCenter.lat,
        longitude: property.longitude ?? quarter.mapCenter.lng,
      },
    }),
    additionalProperty,
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    ...(quarter
      ? [{ name: quarter.name, path: `/marrakech/${quarter.slug}` }]
      : []),
    { name: property.title, path: `/properties/${property.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-page px-6 pt-8 md:pt-10"
      >
        <p className="font-sans text-meta text-quiet">
          <Link href="/" className="transition-colors hover:text-accent">
            Hawazine
          </Link>
          <span className="px-2">/</span>
          <Link
            href="/properties"
            className="transition-colors hover:text-accent"
          >
            Properties
          </Link>
          {quarter && (
            <>
              <span className="px-2">/</span>
              <Link
                href={`/marrakech/${quarter.slug}`}
                className="transition-colors hover:text-accent"
              >
                {quarter.name}
              </Link>
            </>
          )}
          <span className="px-2">/</span>
          <span className="text-ink">{property.title}</span>
        </p>
      </nav>

      <header className="mx-auto max-w-page px-6 pt-8 pb-10 md:pt-10 md:pb-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="min-w-0">
            <h1 className="font-serif text-[1.875rem] leading-[1.15] text-ink md:text-[2.25rem]">
              {property.title}
            </h1>
            <p className="mt-2 font-sans text-meta text-quiet">
              {[
                quarter ? `${quarter.name}, ${property.city}` : property.city,
                summarySpec,
              ]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
          </div>
          <div className="md:text-right">
            <p className="font-serif text-[1.5rem] leading-[1.2] text-ink md:text-[1.75rem]">
              {price}
            </p>
            <p className="mt-1 font-sans text-meta text-quiet">{titleLabel}</p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-page px-6 pb-12 md:pb-16">
        {heroUrl && (
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink/5 md:aspect-[16/9]">
            <Image
              src={heroUrl}
              alt={property.title}
              fill
              priority
              sizes="(min-width: 1200px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        )}
        {restImages.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {restImages.map((url, i) => (
              <div
                key={url}
                className="relative aspect-[3/2] w-full overflow-hidden bg-ink/5"
              >
                <Image
                  src={url}
                  alt={`${property.title} — photograph ${i + 2}`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-page px-6 pb-12 md:pb-16">
        <dl className="mx-auto grid max-w-3xl grid-cols-1 gap-x-12 gap-y-3 border-t border-ink/15 pt-8 md:grid-cols-2">
          {metaRows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-2"
            >
              <dt className="font-sans text-meta text-quiet">{row.label}</dt>
              <dd className="text-right font-sans text-meta text-ink">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-page px-6 pb-12 md:pb-16">
        <p className="mx-auto max-w-2xl font-serif text-body leading-relaxed text-ink md:text-[1.0625rem]">
          {property.descriptionLong}
        </p>
      </section>

      <section className="mx-auto max-w-page px-6 pb-16 md:pb-24">
        <div className="flex justify-center">
          <Link
            href={`/contact?property=${property.slug}`}
            className="inline-block border border-ink px-10 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.24em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Enquire
          </Link>
        </div>
      </section>

      {quarter && (
        <section className="mx-auto max-w-page px-6 pb-16 md:pb-20">
          <div className="mx-auto max-w-3xl border-t border-ink/15 pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="font-sans text-[0.6875rem] uppercase tracking-[0.24em] text-quiet">
                Where in the medina
              </p>
              <Link
                href={`/marrakech/${quarter.slug}`}
                className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-quiet transition-colors hover:text-accent"
              >
                {quarter.name} →
              </Link>
            </div>
            <div className="mt-6">
              <QuarterMap
                activeQuarter={property.quarterSlug}
                height="380px"
              />
            </div>
            <p className="mt-3 font-sans text-meta text-quiet">
              The property sits inside the {quarter.name} quarter. Hawazine
              does not publish street-level locations; exact directions are
              shared with serious enquiries.
            </p>
          </div>
        </section>
      )}

      {reading.length > 0 && (
        <section className="mx-auto max-w-page px-6 pb-20 md:pb-24">
          <div className="mx-auto max-w-2xl border-t border-ink/15 pt-8">
            <p className="font-sans text-[0.6875rem] uppercase tracking-[0.24em] text-quiet">
              Reading on this property
            </p>
            <ul className="mt-4 space-y-2 font-sans text-meta">
              {reading.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
