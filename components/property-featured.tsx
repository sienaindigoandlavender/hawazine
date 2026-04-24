import { ImageWithPanel } from "@/components/image-with-panel";
import { PropertyInfoPanel } from "@/components/property-info-panel";
import type { Property } from "@/lib/types";

// Featured property block for /properties (and the homepage). Full-bleed
// image with a white info panel floating bottom-left on desktop.
export function PropertyFeatured({
  property,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  return (
    <ImageWithPanel
      imageUrl={property.heroImageUrl}
      imageAlt={property.heroImageAlt}
      size="featured"
      tone="paper-deep"
      href={`/properties/${property.slug}`}
      priority={priority}
      aspectRatio="aspect-[16/9] md:aspect-[2.2/1]"
    >
      <PropertyInfoPanel property={property} variant="featured" />
    </ImageWithPanel>
  );
}
