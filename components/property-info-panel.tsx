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

function typeLine(property: Property): string {
  const type = PROPERTY_TYPE_LABEL[property.propertyType];
  const quarter = quarterLabel(property);
  return quarter ? `${type} · ${quarter}` : type;
}

// Featured panel — landing page top entry. Follows the Modern House rhythm:
// small eyebrow label, substantial serif title, then a tight stack of
// area / price / tenure lines with no gaps between them. One hairline
// rule before the stats row, another before the CTA.
function FeaturedPanel({ property }: { property: Property }) {
  const stats = statsLine(property);
  const price = formatPriceDh(property.askingPriceDh);

  return (
    <div className="font-sans">
      <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-quiet">
        {typeLine(property)}
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
        {property.titleStatus && (
          <p>{TITLE_STATUS_LABEL[property.titleStatus]}</p>
        )}
      </div>
      {stats && (
        <>
          <div className="my-5 border-t border-rule" />
          <p className="text-meta text-ink">{stats}</p>
        </>
      )}
      <div className="my-5 border-t border-rule" />
      <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink transition-colors group-hover:text-accent">
        View property →
      </p>
    </div>
  );
}

// Card panel — grid card. A stripped-down featured panel: eyebrow, title,
// price, title status, stats. No CTA (the whole card is the link).
function CardPanel({ property }: { property: Property }) {
  const stats = statsLine(property);
  const price = formatPriceDh(property.askingPriceDh);

  return (
    <div className="font-sans">
      <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-quiet">
        {typeLine(property)}
      </p>
      <h3 className="mt-3 font-serif text-[1.2rem] leading-[1.25] text-ink transition-colors group-hover:text-accent">
        {property.title}
      </h3>
      <div className="mt-2 text-meta text-ink">
        {property.subLocation && (
          <p className="font-serif text-body text-ink-soft">
            {property.subLocation}
          </p>
        )}
        {price && <p className="pt-2">{price}</p>}
        {property.titleStatus && (
          <p>{TITLE_STATUS_LABEL[property.titleStatus]}</p>
        )}
      </div>
      {stats && (
        <>
          <div className="my-4 border-t border-rule" />
          <p className="text-meta text-ink">{stats}</p>
        </>
      )}
    </div>
  );
}

// Hero panel — individual property page. Carries the most metadata:
// quarter + walking description, price + note, title status + note,
// then a bordered contact action (matches Modern House's REQUEST VIEWING).
function HeroPanel({ property }: { property: Property }) {
  const quarter = quarterLabel(property);
  const price = formatPriceDh(property.askingPriceDh);

  return (
    <div className="font-sans">
      {quarter && (
        <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-quiet">
          {quarter}
        </p>
      )}
      {property.subLocation && (
        <p className="mt-3 font-serif text-body text-ink-soft">
          {property.subLocation}
        </p>
      )}

      {(price || property.priceNote) && (
        <div className="mt-4">
          {price && <p className="text-meta text-ink">{price}</p>}
          {property.priceNote && (
            <p className="mt-0.5 text-meta text-quiet">{property.priceNote}</p>
          )}
        </div>
      )}

      {property.titleStatus && (
        <div className="mt-3">
          <p className="text-meta text-ink">
            {TITLE_STATUS_LABEL[property.titleStatus]}
          </p>
          {property.titleNotes && (
            <p className="mt-0.5 text-meta text-quiet">
              Chain of ownership verified.
            </p>
          )}
        </div>
      )}

      <a
        href="/contact"
        className="mt-6 block border border-ink px-6 py-3 text-center text-[0.6875rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        Contact us
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
