import type { Property } from "@/lib/types";
import { PROPERTY_TYPE_LABEL, TITLE_STATUS_LABEL } from "@/lib/types";
import { getQuarterBySlug } from "@/lib/content/quarters";

interface SpecRow {
  label: string;
  value: string;
}

function buildRows(property: Property): SpecRow[] {
  const rows: SpecRow[] = [];
  rows.push({ label: "Type", value: PROPERTY_TYPE_LABEL[property.propertyType] });
  if (typeof property.sizeM2 === "number") {
    rows.push({ label: "Size", value: `${property.sizeM2} m²` });
  }
  if (typeof property.bedrooms === "number") {
    rows.push({ label: "Bedrooms", value: String(property.bedrooms) });
  }
  if (typeof property.bathrooms === "number") {
    rows.push({ label: "Bathrooms", value: String(property.bathrooms) });
  }
  if (typeof property.floors === "number") {
    rows.push({ label: "Floors", value: String(property.floors) });
  }
  if (property.hasTerrace !== undefined) {
    rows.push({ label: "Terrace", value: property.hasTerrace ? "Yes" : "No" });
  }
  const quarter = property.quarterSlug
    ? getQuarterBySlug(property.quarterSlug)
    : undefined;
  if (quarter) {
    rows.push({ label: "Quarter", value: quarter.name });
  }
  if (property.titleStatus) {
    rows.push({
      label: "Title",
      value: TITLE_STATUS_LABEL[property.titleStatus],
    });
  }
  return rows;
}

// Specs grid on individual property pages. Two columns on small screens,
// four on wide. Each row is label (sans, quiet, uppercase) above value
// (sans, ink), with a hairline rule separating rows in the same column.
export function PropertySpecsBlock({ property }: { property: Property }) {
  const rows = buildRows(property);
  if (rows.length === 0) return null;

  return (
    <dl className="grid grid-cols-2 gap-x-10 gap-y-0 border-t border-rule font-sans md:grid-cols-4">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-col gap-1 border-b border-rule py-5"
        >
          <dt className="text-meta uppercase tracking-[0.18em] text-quiet">
            {row.label}
          </dt>
          <dd className="text-meta text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
