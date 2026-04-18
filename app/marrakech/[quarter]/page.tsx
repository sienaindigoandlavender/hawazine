import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { EditorialHero } from "@/components/editorial-hero";
import { EssayBody } from "@/components/essay-body";
import { PropertyCard } from "@/components/property-card";
import {
  getPublishedQuarters,
  getQuarterBySlug,
} from "@/lib/content/quarters";

const QuarterMap = dynamic(
  () => import("@/components/quarter-map").then((m) => m.QuarterMap),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-[16/9] w-full bg-ink/5" aria-hidden="true" />
    ),
  },
);
import { getPropertiesByQuarter } from "@/lib/content/properties";

interface Params {
  params: { quarter: string };
}

export function generateStaticParams() {
  return getPublishedQuarters().map((q) => ({ quarter: q.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const quarter = getQuarterBySlug(params.quarter);
  if (!quarter) return {};
  return {
    title: quarter.name,
    description: quarter.subtitle,
    alternates: { canonical: `/marrakech/${quarter.slug}` },
  };
}

export default function QuarterPage({ params }: Params) {
  const quarter = getQuarterBySlug(params.quarter);
  if (!quarter) notFound();

  const properties = getPropertiesByQuarter(quarter.slug);

  return (
    <>
      <EditorialHero
        kicker={`Marrakech — the medina`}
        title={quarter.name}
        subtitle={quarter.subtitle}
        imageUrl={quarter.heroImageUrl}
        imageAlt={quarter.heroImageAlt}
      />

      <section className="mx-auto max-w-page px-6 py-12 md:py-16">
        <EssayBody markdown={quarter.essay} />
      </section>

      <section className="mx-auto max-w-page px-6 py-12">
        <h2 className="font-serif text-section text-ink">Where {quarter.name} is</h2>
        <p className="mt-3 max-w-reading font-ui text-meta text-quiet">
          General indication only. We never map specific addresses — that stays between us and our buyers.
        </p>
        <div className="mt-8">
          <QuarterMap center={quarter.mapCenter} zoom={quarter.mapZoom} />
        </div>
      </section>

      {properties.length > 0 && (
        <section className="mx-auto max-w-page px-6 py-16 md:py-24">
          <h2 className="font-serif text-section text-ink">
            Currently in {quarter.name}
          </h2>
          <div className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
