import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialHero } from "@/components/editorial-hero";
import { EssayBody } from "@/components/essay-body";
import {
  INDEX_CATEGORY_LABEL,
  getIndexEntryBySlug,
  getPublishedIndexEntries,
} from "@/lib/content/the-index";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getPublishedIndexEntries().map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const entry = getIndexEntryBySlug(params.slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.glossLine,
    alternates: { canonical: `/the-index/${entry.slug}` },
  };
}

export default function IndexEntryPage({ params }: Params) {
  const entry = getIndexEntryBySlug(params.slug);
  if (!entry) notFound();

  return (
    <>
      <EditorialHero
        kicker={`The Index — ${INDEX_CATEGORY_LABEL[entry.category]}`}
        title={entry.title}
        subtitle={entry.glossLine}
      />
      <section className="mx-auto max-w-page px-6 py-12 md:py-16">
        <EssayBody markdown={entry.bodyMarkdown} />
      </section>
    </>
  );
}
