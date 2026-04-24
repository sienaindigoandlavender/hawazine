import { ImageWithPanel } from "@/components/image-with-panel";
import { PropertyInfoPanel } from "@/components/property-info-panel";
import type { Property } from "@/lib/types";

// Grid card for /properties and /marrakech/[quarter]. Image with a compact
// white info panel floating bottom-left on desktop. The whole card is the
// clickable link — no separate CTA in the panel.
export function PropertyCard({ property }: { property: Property }) {
  return (
    <ImageWithPanel
      imageUrl={property.heroImageUrl}
      imageAlt={property.heroImageAlt}
      size="card"
      href={`/properties/${property.slug}`}
      aspectRatio="aspect-[4/3]"
    >
      <PropertyInfoPanel property={property} variant="card" />
    </ImageWithPanel>
  );
}
