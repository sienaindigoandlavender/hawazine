import type { Property } from "@/lib/types";
import { TITLE_STATUS_LABEL } from "@/lib/types";
import { formatPriceDh } from "@/lib/sitemap-helpers";
import { getQuarterBySlug } from "@/lib/content/quarters";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-b border-ink/10 py-3 last:border-b-0">
      <p className="font-ui text-meta uppercase tracking-[0.14em] text-quiet">
        {label}
      </p>
      <p className="mt-1 font-serif text-base text-ink">{value}</p>
    </div>
  );
}

export function PropertyMeta({ property }: { property: Property }) {
  const quarter = property.quarterSlug
    ? getQuarterBySlug(property.quarterSlug)
    : undefined;
  const price = property.priceNote ?? formatPriceDh(property.askingPriceDh);

  return (
    <aside className="font-ui">
      <div className="sticky top-8">
        {price && <Row label="Price" value={price} />}
        {quarter && <Row label="Quarter" value={quarter.name} />}
        {property.subLocation && (
          <Row label="Location" value={property.subLocation} />
        )}
        {property.sizeM2 && <Row label="Size" value={`${property.sizeM2} m²`} />}
        {typeof property.bedrooms === "number" && (
          <Row label="Bedrooms" value={property.bedrooms} />
        )}
        {typeof property.bathrooms === "number" && (
          <Row label="Bathrooms" value={property.bathrooms} />
        )}
        {typeof property.floors === "number" && (
          <Row label="Floors" value={property.floors} />
        )}
        {property.hasTerrace !== undefined && (
          <Row label="Terrace" value={property.hasTerrace ? "Yes" : "No"} />
        )}
        {property.titleStatus && (
          <Row label="Title" value={TITLE_STATUS_LABEL[property.titleStatus]} />
        )}
        {property.titleNotes && (
          <Row label="Title notes" value={property.titleNotes} />
        )}
        {property.conditionSummary && (
          <Row label="Condition" value={property.conditionSummary} />
        )}
      </div>
    </aside>
  );
}
