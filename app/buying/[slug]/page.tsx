import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { siteConfig } from "@/lib/site";
import {
  getIndexEntryBySlug,
  indexCategories,
  indexEntries,
} from "@/lib/content/the-index";

interface Params {
  params: { slug: string };
}

// NB: `/buying/melkia`, `/buying/the-process`, `/buying/costs`, and
// `/buying/what-to-ask` continue to resolve to their existing static pages —
// Next.js prefers specific segments over a dynamic [slug] catch-all. This
// route only serves Index entries defined in lib/content/the-index.ts.

export function generateStaticParams() {
  return indexEntries.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const entry = getIndexEntryBySlug(params.slug);
  if (!entry) return { title: "Not found" };
  return {
    title: `${entry.question} — The Index`,
    description: entry.preview,
    alternates: { canonical: `/buying/${entry.slug}` },
    openGraph: {
      title: entry.question,
      description: entry.preview,
      url: `${siteConfig.url}/buying/${entry.slug}`,
      type: "article",
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

const markdownComponents: Components = {
  a({ href, children, ...rest }) {
    if (href && href.startsWith("/")) {
      return (
        <Link href={href} {...(rest as Record<string, unknown>)}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" {...rest}>
        {children}
      </a>
    );
  },
};

export default function IndexEntryPage({ params }: Params) {
  const entry = getIndexEntryBySlug(params.slug);
  if (!entry) notFound();

  const category = indexCategories.find((c) => c.slug === entry.category);
  const jsonLd =
    entry.body.length < 1500
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: entry.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${entry.preview} ${entry.body}`,
              },
            },
          ],
        }
      : {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: entry.question,
          description: entry.preview,
          datePublished: entry.lastUpdated,
          dateModified: entry.lastUpdated,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: { "@type": "Organization", name: siteConfig.name },
          mainEntityOfPage: `${siteConfig.url}/buying/${entry.slug}`,
        };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-page px-6 pt-12 pb-16 md:pt-16">
        <nav
          aria-label="Breadcrumb"
          className="font-sans text-meta uppercase tracking-[0.18em] text-quiet"
        >
          <Link href="/buying" className="transition-colors hover:text-accent">
            The Index
          </Link>
          {category && (
            <>
              <span aria-hidden="true" className="mx-3 text-quiet/50">
                /
              </span>
              <Link
                href={`/buying#${category.slug}`}
                className="transition-colors hover:text-accent"
              >
                {category.label}
              </Link>
            </>
          )}
        </nav>

        <header className="mt-8">
          <h1 className="font-serif text-section text-ink md:text-[2.75rem] md:leading-[1.08]">
            {entry.question}
          </h1>
          <p className="mt-6 max-w-reading font-serif text-subtitle text-ink-soft">
            {entry.preview}
          </p>
          <p className="mt-6 font-sans text-meta text-quiet">
            Updated {formatDate(entry.lastUpdated)}
          </p>
        </header>

        <div className="prose-hawazine mt-10 max-w-reading">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {entry.body}
          </ReactMarkdown>
        </div>

        {entry.glossaryTerms && entry.glossaryTerms.length > 0 && (
          <section className="mt-12 max-w-reading border-t border-rule pt-6">
            <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
              Terms in this entry
            </p>
            <p className="mt-3 font-serif text-body text-ink-soft">
              {entry.glossaryTerms.map((link, i) => (
                <span key={link.anchor}>
                  {i > 0 && ", "}
                  <Link
                    href={`/glossary#${link.anchor}`}
                    className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
                  >
                    {link.term}
                  </Link>
                </span>
              ))}
            </p>
          </section>
        )}

        {entry.seeAlso && entry.seeAlso.length > 0 && (
          <section className="mt-12 max-w-reading border-t border-rule pt-6">
            <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
              Related
            </p>
            <ul className="mt-4 border-t border-rule">
              {entry.seeAlso.map((link) => {
                const target = getIndexEntryBySlug(link.slug);
                if (!target) return null;
                return (
                  <li key={link.slug} className="border-b border-rule">
                    <Link
                      href={`/buying/${link.slug}`}
                      className="group flex items-baseline gap-4 py-4"
                    >
                      <span className="flex-1 font-serif text-body text-ink transition-colors group-hover:text-accent">
                        {link.term}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-sans text-meta text-quiet transition-colors group-hover:text-accent"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <footer className="mt-14 border-t border-rule pt-8">
          <p className="font-sans text-meta text-quiet">
            <Link
              href="/buying"
              className="uppercase tracking-[0.18em] transition-colors hover:text-accent"
            >
              ← Back to The Index
            </Link>
          </p>
          <p className="mt-3 max-w-reading font-serif text-body text-ink-soft">
            Was something missing or wrong?{" "}
            <Link
              href="/contact"
              className="underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
            >
              Contact us
            </Link>
            .
          </p>
        </footer>
      </article>
    </>
  );
}
