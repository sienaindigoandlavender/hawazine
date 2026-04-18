import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatPriceDh } from "@/lib/sitemap-helpers";
import { PROPERTY_TYPE_LABEL } from "@/lib/types";

export function PropertyCard({ property }: { property: Property }) {
  const price = property.priceNote ?? formatPriceDh(property.askingPriceDh);

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5">
        <Image
          src={property.heroImageUrl}
          alt={property.heroImageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-5">
        <p className="font-ui text-meta uppercase tracking-[0.14em] text-quiet">
          {PROPERTY_TYPE_LABEL[property.propertyType]}
          {property.subLocation ? ` · ${property.subLocation}` : ""}
        </p>
        <h3 className="mt-2 font-serif text-xl text-ink transition-colors group-hover:text-accent">
          {property.title}
        </h3>
        {property.subtitle && (
          <p className="mt-1 font-serif text-base text-ink/70">
            {property.subtitle}
          </p>
        )}
        {price && (
          <p className="mt-3 font-ui text-meta text-ink">{price}</p>
        )}
      </div>
    </Link>
  );
}
