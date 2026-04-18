import type { Metadata } from "next";
import { EditorialHero } from "@/components/editorial-hero";
import { EssayBody } from "@/components/essay-body";
import { QuarterCard } from "@/components/quarter-card";
import { getPageBySlug } from "@/lib/content/pages";
import { getPublishedQuarters } from "@/lib/content/quarters";

const page = getPageBySlug("marrakech")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.subtitle,
  alternates: { canonical: "/marrakech" },
};

export default function MarrakechPage() {
  const quarters = getPublishedQuarters();

  return (
    <>
      <EditorialHero
        kicker="Marrakech"
        title={page.title}
        subtitle={page.subtitle}
      />

      <section className="mx-auto max-w-page px-6 py-8 md:py-12">
        <EssayBody markdown={page.bodyMarkdown} />
      </section>

      <section className="mx-auto max-w-page px-6 py-16 md:py-24">
        <h2 className="font-serif text-section text-ink">The quarters we cover</h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          {quarters.map((quarter) => (
            <QuarterCard key={quarter.slug} quarter={quarter} />
          ))}
        </div>
      </section>
    </>
  );
}
