import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialHero } from "@/components/editorial-hero";
import { EssayBody } from "@/components/essay-body";
import {
  getJournalEntryBySlug,
  getPublishedJournalEntries,
} from "@/lib/content/journal";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  const entries = await getPublishedJournalEntries();
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const entry = await getJournalEntryBySlug(params.slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.subtitle,
    alternates: { canonical: `/journal/${entry.slug}` },
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.subtitle,
      publishedTime: entry.publishedAt,
      images: entry.heroImageUrl ? [entry.heroImageUrl] : undefined,
    },
  };
}

export default async function JournalEntryPage({ params }: Params) {
  const entry = await getJournalEntryBySlug(params.slug);
  if (!entry) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.subtitle,
    datePublished: entry.publishedAt,
    image: entry.heroImageUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/journal/${entry.slug}`,
  };

  const date = new Date(entry.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EditorialHero
        kicker={`Journal · ${date}`}
        title={entry.title}
        subtitle={entry.subtitle}
        imageUrl={entry.heroImageUrl}
        imageAlt={entry.heroImageAlt}
      />
      <section className="mx-auto max-w-page px-6 py-12 md:py-16">
        <EssayBody markdown={entry.bodyMarkdown} />
      </section>
    </>
  );
}
