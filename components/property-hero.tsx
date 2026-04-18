import Image from "next/image";
import type { Property } from "@/lib/types";
import { PROPERTY_TYPE_LABEL } from "@/lib/types";

export function PropertyHero({ property }: { property: Property }) {
  return (
    <section className="mx-auto max-w-page px-6 pt-12 md:pt-16">
      <p className="font-ui text-meta uppercase tracking-[0.18em] text-quiet">
        {PROPERTY_TYPE_LABEL[property.propertyType]}
        {property.subLocation ? ` · ${property.subLocation}` : ""}
      </p>
      <h1 className="mt-4 max-w-reading font-serif text-display leading-[1.05] text-ink md:text-[3.75rem]">
        {property.title}
      </h1>
      {property.subtitle && (
        <p className="mt-4 max-w-reading font-serif text-subtitle text-ink/80">
          {property.subtitle}
        </p>
      )}

      <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden bg-ink/5">
        <Image
          src={property.heroImageUrl}
          alt={property.heroImageAlt}
          fill
          priority
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
