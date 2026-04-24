import type { Metadata } from "next";
import { EditorialHero } from "@/components/editorial-hero";
import { PropertyCard } from "@/components/property-card";
import { getPublishedProperties } from "@/lib/content/properties";

export const metadata: Metadata = {
  title: "Properties",
  description: "Current listings — riads, dars, and land in the Marrakech medina.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesIndex() {
  const properties = getPublishedProperties();

  return (
    <>
      <EditorialHero
        kicker="Properties"
        title="Current listings"
        subtitle="Riads, dars, and land. Each one walked before it is offered."
      />
      <section className="mx-auto max-w-page px-6 py-8 md:py-12">
        {properties.length === 0 ? (
          <p className="max-w-reading font-serif text-body text-quiet">
            No listings are currently published. New properties go up as they are mandated and photographed.
          </p>
        ) : (
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
