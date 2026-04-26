import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Components } from "react-markdown";
import { EssayBody } from "@/components/essay-body";
import {
  JournalEntryByline,
  JournalShareRow,
} from "@/components/journal-entry-byline";
import { JournalEntryHeader } from "@/components/journal-entry-header";
import { JournalEntryNav } from "@/components/journal-entry-nav";
import { JournalRelatedStrip } from "@/components/journal-related-strip";
import {
  getJournalEntryBySlug,
  getPublishedJournalEntries,
  injectInlineImages,
} from "@/lib/content/journal";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, buildBreadcrumbJsonLd, SEO_KEYWORDS } from "@/lib/seo";

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
    keywords: [...SEO_KEYWORDS.base, ...SEO_KEYWORDS.journal],
    alternates: { canonical: `/journal/${entry.slug}` },
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.subtitle,
      url: absoluteUrl(`/journal/${entry.slug}`),
      publishedTime: entry.publishedAt,
      modifiedTime: entry.publishedAt,
      images: entry.heroImageUrl ? [entry.heroImageUrl] : undefined,
      authors: [siteConfig.url],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.subtitle,
      images: entry.heroImageUrl ? [entry.heroImageUrl] : undefined,
    },
  };
}

// Inline images come in via injectInlineImages as bare ![alt](url) markdown.
// react-markdown wraps them in <p>, which is invalid HTML once we render the
// image as a <figure>. The `p` override unwraps paragraphs whose only child
// is an image so the figure renders at top level.
const journalMarkdownComponents: Partial<Components> = {
  p({ node, children }) {
    const onlyChild =
      node?.children?.length === 1 &&
      "tagName" in node.children[0] &&
      node.children[0].tagName === "img";
    if (onlyChild) {
      return <>{children}</>;
    }
    return <p>{children}</p>;
  },
  img({ src, alt }) {
    if (!src) return null;
    return (
      <figure className="my-8 md:my-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? ""}
          className="h-auto w-full object-contain"
        />
        {alt && (
          <figcaption className="mt-3 text-center font-sans text-meta italic text-quiet">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
};

export default async function JournalEntryPage({ params }: Params) {
  const entry = await getJournalEntryBySlug(params.slug);
  if (!entry) notFound();

  const allEntries = await getPublishedJournalEntries();
  const currentIndex = allEntries.findIndex((e) => e.slug === entry.slug);
  // allEntries is ordered most-recent-first. "Previous" reads as the
  // older neighbour (index + 1); "Next" as the newer (index - 1).
  const previous =
    currentIndex >= 0 ? allEntries[currentIndex + 1] : undefined;
  const next =
    currentIndex > 0 ? allEntries[currentIndex - 1] : undefined;
  const related = allEntries
    .filter((e) => e.slug !== entry.slug)
    .slice(0, 4);

  const processedBody = injectInlineImages(entry);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.subtitle,
    datePublished: entry.publishedAt,
    dateModified: entry.publishedAt,
    inLanguage: siteConfig.language,
    author: { "@id": `${siteConfig.url}#organization` },
    publisher: { "@id": `${siteConfig.url}#organization` },
    image: entry.heroImageUrl,
    mainEntityOfPage: absoluteUrl(`/journal/${entry.slug}`),
    isPartOf: { "@id": `${absoluteUrl("/journal")}#blog` },
    ...(entry.format && {
      articleSection: entry.format
        .split("-")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(" "),
    }),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Journal", path: "/journal" },
    { name: entry.title, path: `/journal/${entry.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <JournalEntryHeader entry={entry} />

      {entry.heroImageUrl && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5 mb-12 md:mb-16 md:aspect-[2.2/1]">
          <Image
            src={entry.heroImageUrl}
            alt={entry.heroImageAlt ?? entry.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      )}

      <JournalEntryByline entry={entry} />

      <section className="mx-auto max-w-page px-6">
        <EssayBody
          markdown={processedBody}
          className="prose-hawazine-lead"
          components={journalMarkdownComponents}
        />
      </section>

      <div className="mx-auto max-w-page px-6 mt-16 md:mt-20">
        <div className="mx-auto max-w-reading border-t border-rule pt-10">
          <JournalShareRow entry={entry} />
        </div>
      </div>

      <JournalEntryNav previous={previous} next={next} />

      <JournalRelatedStrip entries={related} />
    </>
  );
}
