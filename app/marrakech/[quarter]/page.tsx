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
      <div
        className="w-full bg-ink/5"
        style={{ height: "480px" }}
        aria-hidden="true"
      />
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

      {quarter.landmarks && quarter.landmarks.length > 0 && (
        <section className="mx-auto max-w-page px-6 py-12">
          <p className="font-ui text-meta uppercase tracking-[0.18em] text-quiet mb-6">
            In the quarter
          </p>
          <div className="border-t border-ink/10">
            {quarter.landmarks.map((landmark, i) => (
              <div
                key={`${landmark.type}-${i}`}
                className="grid grid-cols-[1fr_2fr] gap-4 border-b border-ink/10 py-3"
              >
                <span className="font-ui text-meta uppercase tracking-[0.14em] text-quiet">
                  {landmark.type}
                </span>
                <span className="font-serif text-body text-ink">
                  {landmark.label}
                  <span className="text-quiet"> — {landmark.note}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-page px-6 py-12">
        <h2 className="font-serif text-section text-ink">Where {quarter.name} is</h2>
        <p className="mt-3 max-w-reading font-ui text-meta text-quiet">
          General indication only. We never map specific addresses — that stays between us and our buyers.
        </p>
        <div className="mt-8">
          <QuarterMap activeQuarter={quarter.slug} />
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
