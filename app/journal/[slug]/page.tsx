import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EssayBody } from "@/components/essay-body";
import { JournalEntryHeader } from "@/components/journal-entry-header";
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
    dateModified: entry.publishedAt,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: entry.heroImageUrl,
    mainEntityOfPage: `${siteConfig.url}/journal/${entry.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <JournalEntryHeader entry={entry} />

      {entry.heroImageUrl && (
        <div className="mx-auto max-w-page px-6 mt-8 mb-16 md:mb-20">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5">
            <Image
              src={entry.heroImageUrl}
              alt={entry.heroImageAlt ?? entry.title}
              fill
              sizes="(min-width: 1200px) 1200px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      <section className="mx-auto max-w-page px-6">
        <EssayBody
          markdown={entry.bodyMarkdown}
          className="prose-hawazine-lead"
        />
      </section>

      <footer className="mx-auto max-w-page px-6 mt-24 mb-24">
        <div className="mx-auto max-w-reading border-t border-rule pt-8">
          <p className="font-sans text-meta text-quiet">
            Published {formatDate(entry.publishedAt)}
          </p>
          <p className="mt-6 font-sans text-meta">
            <Link
              href="/journal"
              className="uppercase tracking-[0.18em] text-quiet transition-colors hover:text-accent"
            >
              ← Back to the Journal
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
