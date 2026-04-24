import type { Property } from "@/lib/types";
import { PROPERTY_TYPE_LABEL, TITLE_STATUS_LABEL } from "@/lib/types";
import { formatPriceDh } from "@/lib/sitemap-helpers";
import { getQuarterBySlug } from "@/lib/content/quarters";

export type PropertyInfoPanelVariant = "featured" | "card" | "hero";

interface PropertyInfoPanelProps {
  property: Property;
  variant: PropertyInfoPanelVariant;
}

function statsLine(property: Property): string | null {
  const parts: string[] = [];
  if (typeof property.bedrooms === "number") {
    parts.push(
      `${property.bedrooms} ${property.bedrooms === 1 ? "bedroom" : "bedrooms"}`,
    );
  }
  if (typeof property.bathrooms === "number") {
    parts.push(
      `${property.bathrooms} ${property.bathrooms === 1 ? "bathroom" : "bathrooms"}`,
    );
  }
  if (typeof property.sizeM2 === "number") {
    parts.push(`${property.sizeM2} m²`);
  }
  if (property.hasTerrace) {
    parts.push("terrace");
  }
  return parts.length > 0 ? parts.join(" · ") : null;
}

function quarterLabel(property: Property): string | null {
  if (!property.quarterSlug) return null;
  const q = getQuarterBySlug(property.quarterSlug);
  return q?.name ?? null;
}

function formatLabel(property: Property): string {
  const type = PROPERTY_TYPE_LABEL[property.propertyType];
  const quarter = quarterLabel(property);
  return quarter ? `${type} · ${quarter}` : type;
}

function priceLine(property: Property): string | null {
  const formatted = formatPriceDh(property.askingPriceDh);
  if (!formatted) return null;
  if (property.titleStatus) {
    return `${formatted} · ${TITLE_STATUS_LABEL[property.titleStatus]}`;
  }
  return formatted;
}

// Featured panel — landing page top entry. Format / title / sub-location /
// price + status / stats / CTA. Maximum density that still reads as quiet.
function FeaturedPanel({ property }: { property: Property }) {
  const stats = statsLine(property);
  const price = priceLine(property);

  return (
    <div className="font-sans">
      <p className="text-meta uppercase tracking-[0.18em] text-quiet">
        Property · {formatLabel(property)}
      </p>
      <h2 className="mt-3 font-serif text-subtitle leading-[1.25] text-ink">
        {property.title}
      </h2>
      {property.subLocation && (
        <p className="mt-2 font-serif text-body text-ink-soft">
          {property.subLocation}
        </p>
      )}
      {price && <p className="mt-4 text-meta text-ink">{price}</p>}
      {(stats || price) && <div className="my-5 border-t border-rule" />}
      {stats && <p className="text-meta text-ink">{stats}</p>}
      <div className="my-5 border-t border-rule" />
      <p className="text-meta uppercase tracking-[0.18em] text-ink transition-colors group-hover:text-accent">
        View property →
      </p>
    </div>
  );
}

// Card panel — grid card. Lighter version of the featured panel without the
// CTA (the whole card is the link). Stats sit alongside the price line.
function CardPanel({ property }: { property: Property }) {
  const stats = statsLine(property);
  const price = priceLine(property);

  return (
    <div className="font-sans">
      <p className="text-meta uppercase tracking-[0.18em] text-quiet">
        {formatLabel(property)}
      </p>
      <h3 className="mt-3 font-serif text-[1.25rem] leading-[1.25] text-ink transition-colors group-hover:text-accent">
        {property.title}
      </h3>
      {property.subLocation && (
        <p className="mt-2 font-serif text-body text-ink-soft">
          {property.subLocation}
        </p>
      )}
      {(price || stats) && <div className="my-4 border-t border-rule" />}
      {price && <p className="text-meta text-ink">{price}</p>}
      {stats && <p className="mt-1 text-meta text-ink">{stats}</p>}
    </div>
  );
}

// Hero panel — individual property page. Carries the most metadata: full
// location, price + note, title status + note, contact action.
function HeroPanel({ property }: { property: Property }) {
  const quarter = quarterLabel(property);
  const price = formatPriceDh(property.askingPriceDh);

  return (
    <div className="font-sans">
      {(quarter || property.subLocation) && (
        <>
          {quarter && <p className="text-meta text-ink">{quarter}</p>}
          {property.subLocation && (
            <p className="mt-2 font-serif text-body text-ink-soft">
              {property.subLocation}
            </p>
          )}
        </>
      )}

      {(price || property.priceNote) && (
        <>
          <div className="my-5 border-t border-rule" />
          {price && <p className="text-meta text-ink">{price}</p>}
          {property.priceNote && (
            <p className="mt-1 text-meta text-quiet">{property.priceNote}</p>
          )}
        </>
      )}

      {property.titleStatus && (
        <>
          <div className="my-5 border-t border-rule" />
          <p className="text-meta text-ink">
            {TITLE_STATUS_LABEL[property.titleStatus]}
          </p>
          {property.titleNotes && (
            <p className="mt-1 font-serif text-body text-ink-soft">
              {property.titleNotes}
            </p>
          )}
        </>
      )}

      <div className="my-5 border-t border-rule" />
      <a
        href="/contact"
        className="inline-block text-meta uppercase tracking-[0.18em] text-ink transition-colors hover:text-accent"
      >
        Contact us →
      </a>
    </div>
  );
}

export function PropertyInfoPanel({
  property,
  variant,
}: PropertyInfoPanelProps) {
  if (variant === "featured") return <FeaturedPanel property={property} />;
  if (variant === "card") return <CardPanel property={property} />;
  return <HeroPanel property={property} />;
}
