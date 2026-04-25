import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Components } from "react-markdown";
import { EssayBody } from "@/components/essay-body";
import { JournalEntryHeader } from "@/components/journal-entry-header";
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
        <div className="mx-auto max-w-page px-6 mb-16 md:mb-20">
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
          markdown={processedBody}
          className="prose-hawazine-lead"
          components={journalMarkdownComponents}
        />
      </section>

      <footer className="mx-auto max-w-page px-6 mt-24 mb-24">
        <div className="mx-auto max-w-reading border-t border-rule pt-8 text-center">
          <p className="font-sans text-meta">
            <Link
              href="/journal"
              className="uppercase tracking-[0.2em] text-quiet transition-colors hover:text-accent"
            >
              ← Back to the Journal
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
