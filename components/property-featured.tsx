import { ImageWithPanel } from "@/components/image-with-panel";
import { PropertyInfoPanel } from "@/components/property-info-panel";
import { heroImageFor } from "@/lib/content/properties";
import type { Property } from "@/lib/types";

// Featured property block on the homepage's "Currently representing"
// band. Full-bleed image with a paper-deep info panel floating mid-left.
// The /properties landing page no longer uses this component — it sits
// only on the homepage.
export function PropertyFeatured({
  property,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  const heroUrl = heroImageFor(property);

  return (
    <ImageWithPanel
      imageUrl={heroUrl}
      imageAlt={property.title}
      size="featured"
      tone="paper-deep"
      href={`/properties/${property.slug}`}
      priority={priority}
      aspectRatio="aspect-[16/9] md:aspect-[2.2/1]"
    >
      <PropertyInfoPanel property={property} />
    </ImageWithPanel>
  );
}
