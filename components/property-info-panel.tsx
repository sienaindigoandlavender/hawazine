import { getQuarterBySlug } from "@/lib/content/quarters";
import { formatPriceDh } from "@/lib/sitemap-helpers";
import {
  PROPERTY_TYPE_LABEL,
  TITLE_STATUS_LABEL,
  type Property,
} from "@/lib/types";

// Floating info panel for the homepage's "Currently representing" hero.
// The /properties landing and detail pages no longer use a floating
// panel — they switched to the Modern House Sales register, where the
// photograph carries the page on its own. This component is therefore
// homepage-only.
export function PropertyInfoPanel({ property }: { property: Property }) {
  const quarter = getQuarterBySlug(property.quarterSlug);
  const price = formatPriceDh(property.priceDh);
  const typeLabel = PROPERTY_TYPE_LABEL[property.propertyType];
  const titleLabel = TITLE_STATUS_LABEL[property.titleStatus];

  const stats: string[] = [];
  if (typeof property.bedrooms === "number") {
    stats.push(
      `${property.bedrooms} ${property.bedrooms === 1 ? "bedroom" : "bedrooms"}`,
    );
  }
  if (typeof property.bathrooms === "number") {
    stats.push(
      `${property.bathrooms} ${property.bathrooms === 1 ? "bathroom" : "bathrooms"}`,
    );
  }
  stats.push(`${property.sizeM2} m²`);
  if (property.hasTerrace) stats.push("terrace");

  return (
    <div className="font-sans">
      <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-quiet">
        Property · {typeLabel}
        {quarter ? ` · ${quarter.name}` : ""}
      </p>
      <h2 className="mt-4 font-serif text-[1.6rem] leading-[1.2] text-ink">
        {property.title}
      </h2>
      <div className="mt-3 space-y-0.5 text-meta text-ink">
        {property.subLocation && (
          <p className="font-serif text-body text-ink-soft">
            {property.subLocation}
          </p>
        )}
        {price && <p className="pt-2">{price}</p>}
        <p>{titleLabel}</p>
      </div>
      <div className="my-5 border-t border-rule" />
      <p className="text-meta text-ink">{stats.join(" · ")}</p>
      <div className="my-5 border-t border-rule" />
      <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink transition-colors group-hover:text-accent">
        View property →
      </p>
    </div>
  );
}
