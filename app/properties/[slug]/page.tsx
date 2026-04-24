import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EssayBody } from "@/components/essay-body";
import { ImageWithPanel } from "@/components/image-with-panel";
import { PropertyInfoPanel } from "@/components/property-info-panel";
import { PropertySpecsBlock } from "@/components/property-specs-block";
import {
  getPropertyBySlug,
  getPublishedProperties,
} from "@/lib/content/properties";
import { getQuarterBySlug } from "@/lib/content/quarters";
import { siteConfig } from "@/lib/site";
import {
  PROPERTY_TYPE_LABEL,
  TITLE_STATUS_LABEL,
  type Property,
  type TitleStatus,
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
  return {
    title: property.title,
    description: property.subtitle,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      type: "website",
      title: property.title,
      description: property.subtitle,
      images: [property.heroImageUrl],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface CrossLink {
  href: string;
  label: string;
}

const TITLE_LINKS: Record<TitleStatus, CrossLink[]> = {
  melkia: [
    { href: "/buying/what-is-melkia", label: "What is melkia?" },
    {
      href: "/buying/can-i-buy-a-riad-on-melkia",
      label: "Can I buy a riad on melkia?",
    },
  ],
  melkia_in_process: [
    { href: "/buying/what-is-melkia", label: "What is melkia?" },
    {
      href: "/buying/can-i-buy-a-riad-on-melkia",
      label: "Can I buy a riad on melkia?",
    },
  ],
  requisition: [
    { href: "/buying/what-is-melkia", label: "What is melkia?" },
  ],
  titre_foncier: [
    { href: "/buying/what-is-titre-foncier", label: "What is titre foncier?" },
  ],
};

const RENOVATION_LINK: CrossLink = {
  href: "/buying/what-does-a-marrakech-riad-renovation-actually-cost",
  label: "What does a Marrakech riad renovation actually cost?",
};

function gatherCrossLinks(property: Property): CrossLink[] {
  const links: CrossLink[] = [];
  if (property.titleStatus) {
    links.push(...TITLE_LINKS[property.titleStatus]);
  }
  if (property.renovationNotes) {
    links.push(RENOVATION_LINK);
  }
  const seen = new Set<string>();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

export default function PropertyPage({ params }: Params) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const quarter = property.quarterSlug
    ? getQuarterBySlug(property.quarterSlug)
    : undefined;

  const breadcrumbTail = quarter
    ? `${PROPERTY_TYPE_LABEL[property.propertyType]} · ${quarter.name}`
    : PROPERTY_TYPE_LABEL[property.propertyType];

  const crossLinks = gatherCrossLinks(property);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.subtitle ?? property.title,
    url: `${siteConfig.url}/properties/${property.slug}`,
    image: property.heroImageUrl,
    category: PROPERTY_TYPE_LABEL[property.propertyType],
    areaServed: quarter ? quarter.name : "Marrakech medina",
    ...(property.sizeM2 && {
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.sizeM2,
        unitCode: "MTK",
      },
    }),
    ...(property.askingPriceDh && {
      offers: {
        "@type": "Offer",
        price: property.askingPriceDh,
        priceCurrency: "MAD",
      },
    }),
    address: {
      "@type": "PostalAddress",
      addressLocality: quarter ? `${quarter.name}, Marrakech` : "Marrakech",
      addressCountry: "MA",
    },
  };

  const hasDetailBlock = Boolean(
    property.titleNotes ||
      property.conditionSummary ||
      property.renovationNotes,
  );

  const galleryImages = property.galleryImages ?? [];
  const showGallery = galleryImages.length > 1;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-page px-6 pt-12 md:pt-16"
      >
        <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
          <Link
            href="/properties"
            className="transition-colors hover:text-accent"
          >
            Properties
          </Link>
          <span className="px-2 text-quiet">/</span>
          <span>{breadcrumbTail}</span>
        </p>
      </nav>

      <header className="mx-auto max-w-page px-6 pt-6 pb-12 md:pt-8 md:pb-16">
        <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
          Property
        </p>
        <h1 className="mt-4 max-w-reading font-serif text-display leading-[1.04] text-ink md:text-[4rem]">
          {property.title}
        </h1>
        {property.subtitle && (
          <p className="mt-6 max-w-reading font-serif text-subtitle text-ink-soft">
            {property.subtitle}
          </p>
        )}
        <p className="mt-6 font-sans text-meta text-quiet">
          Updated {formatDate(property.updatedAt)}
        </p>
      </header>

      <section className="mb-16 md:mb-24">
        <ImageWithPanel
          imageUrl={property.heroImageUrl}
          imageAlt={property.heroImageAlt}
          size="featured"
          tone="paper-deep"
          priority
          aspectRatio="aspect-[16/9] md:aspect-[2.2/1]"
        >
          <PropertyInfoPanel property={property} variant="hero" />
        </ImageWithPanel>
      </section>

      <section className="mx-auto max-w-page px-6 mb-20 md:mb-28">
        <PropertySpecsBlock property={property} />
      </section>

      <section className="mx-auto max-w-page px-6 mb-20 md:mb-28">
        <EssayBody
          markdown={property.descriptionMarkdown}
          className="prose-hawazine-lead"
        />
      </section>

      {showGallery && (
        <section className="mx-auto max-w-page px-6 mb-20 md:mb-28">
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {galleryImages.map((img, i) => (
              <figure key={i}>
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink/5">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {img.caption && (
                  <figcaption className="mt-3 font-sans text-meta text-quiet">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {hasDetailBlock && (
        <section className="mx-auto max-w-page px-6 mb-20 md:mb-28">
          <div className="mx-auto max-w-reading space-y-10">
            {property.titleNotes && (
              <div>
                <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
                  Title notes
                </p>
                <p className="mt-3 font-serif text-body text-ink">
                  {property.titleStatus && (
                    <span className="text-ink">
                      {TITLE_STATUS_LABEL[property.titleStatus]}.{" "}
                    </span>
                  )}
                  {property.titleNotes}
                </p>
              </div>
            )}
            {property.conditionSummary && (
              <div>
                <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
                  Condition
                </p>
                <p className="mt-3 font-serif text-body text-ink">
                  {property.conditionSummary}
                </p>
              </div>
            )}
            {property.renovationNotes && (
              <div>
                <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
                  Renovation
                </p>
                <p className="mt-3 font-serif text-body text-ink">
                  {property.renovationNotes}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {crossLinks.length > 0 && (
        <section className="mx-auto max-w-page px-6 mb-20 md:mb-28">
          <div className="mx-auto max-w-reading">
            <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
              Read more
            </p>
            <ul className="mt-6 border-t border-rule">
              {crossLinks.map((l) => (
                <li key={l.href} className="border-b border-rule">
                  <Link
                    href={l.href}
                    className="block py-4 font-serif text-body text-ink transition-colors hover:text-accent"
                  >
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <footer className="mx-auto max-w-page px-6 mt-20 mb-24">
        <div className="mx-auto max-w-reading border-t border-rule pt-8">
          <p className="font-sans text-meta text-quiet">
            Updated {formatDate(property.updatedAt)}
          </p>
          <p className="mt-4 font-sans text-meta">
            <Link
              href="/properties"
              className="uppercase tracking-[0.18em] text-quiet transition-colors hover:text-accent"
            >
              ← Back to Properties
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
