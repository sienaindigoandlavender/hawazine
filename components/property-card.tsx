import Image from "next/image";
import Link from "next/link";
import { heroImageFor } from "@/lib/content/properties";
import { formatPriceDh } from "@/lib/sitemap-helpers";
import {
  PROPERTY_TYPE_LABEL,
  TITLE_STATUS_LABEL,
  type Property,
} from "@/lib/types";

const NEW_BADGE_DAYS = 30;

function isNew(property: Property): boolean {
  if (!property.publishedAt) return false;
  const published = new Date(property.publishedAt).getTime();
  if (Number.isNaN(published)) return false;
  const ageDays = (Date.now() - published) / (1000 * 60 * 60 * 24);
  return ageDays <= NEW_BADGE_DAYS;
}

// Modern House Sales-register grid card. Image at 3:2 with an optional
// "NEW" badge top-left; below the image, title + sub-location stacked
// left, price + title status stacked right. No card border, no shadow,
// no panel. Sits transparently on the page's off-white canvas.
export function PropertyCard({ property }: { property: Property }) {
  const heroUrl = heroImageFor(property);
  const price = formatPriceDh(property.priceDh);
  const titleLabel = property.titleStatus
    ? TITLE_STATUS_LABEL[property.titleStatus]
    : null;
  const subLocation =
    property.subLocation ?? PROPERTY_TYPE_LABEL[property.propertyType];

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink/5">
        {heroUrl && (
          <Image
            src={heroUrl}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-opacity duration-300 group-hover:opacity-95"
          />
        )}
        {isNew(property) && (
          <span className="absolute left-2 top-2 bg-ink/35 px-2 py-1 font-sans text-[0.625rem] uppercase tracking-[0.18em] text-paper backdrop-blur-sm">
            New
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-serif text-[1.05rem] leading-[1.25] text-ink transition-colors group-hover:text-accent">
            {property.title}
          </h3>
          <p className="mt-1 font-sans text-meta text-quiet">
            {subLocation}
          </p>
        </div>
        <div className="shrink-0 text-right">
          {price && (
            <p className="font-sans text-[1.05rem] leading-[1.25] text-ink">
              {price}
            </p>
          )}
          {titleLabel && (
            <p className="mt-1 font-sans text-meta text-quiet">
              {titleLabel}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
