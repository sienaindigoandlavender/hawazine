import { EditorialHero } from "@/components/editorial-hero";
import { EssayBody } from "@/components/essay-body";
import type { Page } from "@/lib/types";

interface StaticPageProps {
  page: Page;
  kicker?: string;
  children?: React.ReactNode;
}

export function StaticPage({ page, kicker, children }: StaticPageProps) {
  return (
    <>
      <EditorialHero
        kicker={kicker}
        title={page.title}
        subtitle={page.subtitle}
        imageUrl={page.heroImageUrl}
        imageAlt={page.heroImageAlt}
      />
      <section className="mx-auto max-w-page px-6 py-12 md:py-16">
        <EssayBody markdown={page.bodyMarkdown} />
      </section>
      {children}
    </>
  );
}
