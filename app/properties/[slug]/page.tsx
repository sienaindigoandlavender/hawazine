import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PropertyHero } from "@/components/property-hero";
import { PropertyMeta } from "@/components/property-meta";
import { EssayBody } from "@/components/essay-body";
import { ContactForm } from "@/components/contact-form";
import {
  getPropertyBySlug,
  getPublishedProperties,
} from "@/lib/content/properties";
import { siteConfig } from "@/lib/site";
import { formatPriceDh } from "@/lib/sitemap-helpers";
import { PROPERTY_TYPE_LABEL } from "@/lib/types";

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

export default function PropertyPage({ params }: Params) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const price = property.priceNote ?? formatPriceDh(property.askingPriceDh);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.subtitle,
    url: `${siteConfig.url}/properties/${property.slug}`,
    image: property.heroImageUrl,
    category: PROPERTY_TYPE_LABEL[property.propertyType],
    ...(property.sizeM2 && {
      floorSize: { "@type": "QuantitativeValue", value: property.sizeM2, unitCode: "MTK" },
    }),
    ...(property.askingPriceDh && {
      offers: {
        "@type": "Offer",
        price: property.askingPriceDh,
        priceCurrency: "MAD",
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyHero property={property} />

      <section className="mx-auto max-w-page px-6 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-3">
            <EssayBody markdown={property.descriptionMarkdown} />
            {property.renovationNotes && (
              <div className="prose-hawazine mx-auto mt-12 border-t border-ink/10 pt-10">
                <h2>Renovation notes</h2>
                <p>{property.renovationNotes}</p>
              </div>
            )}
          </div>
          <div className="md:col-span-2">
            <PropertyMeta property={property} />
          </div>
        </div>
      </section>

      {property.galleryImages && property.galleryImages.length > 0 && (
        <section className="mx-auto max-w-page px-6 py-12 md:py-16">
          <h2 className="font-serif text-section text-ink">Gallery</h2>
          <div className="no-scrollbar mt-10 flex gap-4 overflow-x-auto">
            {property.galleryImages.map((img, i) => (
              <figure
                key={i}
                className="relative aspect-[4/3] w-[85%] shrink-0 bg-ink/5 md:w-[60%] lg:w-[45%]"
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, 85vw"
                  className="object-cover"
                />
                {img.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-ink/60 px-4 py-2 font-ui text-meta text-paper">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-page px-6 py-16 md:py-24">
        <div className="max-w-reading">
          <h2 className="font-serif text-section text-ink">
            Enquire about {property.title}
          </h2>
          <p className="mt-4 font-serif text-body text-ink/80">
            The first visit is with Mouad, in person. A short, honest note about who you are and what you are looking for helps us reply well.
            {price && ` Asking ${price}.`}
          </p>
          <div className="mt-10">
            <ContactForm
              propertySlug={property.slug}
              source="property_page"
              defaultMessage={`I would like to know more about ${property.title}.`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
