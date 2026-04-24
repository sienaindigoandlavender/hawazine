import { EditorialHero } from "@/components/editorial-hero";
import { EssayBody } from "@/components/essay-body";
import type { Page } from "@/lib/types";

type StaticPageProps =
  | {
      page: Page;
      kicker?: string;
      children?: React.ReactNode;
    }
  | {
      title: string;
      subtitle?: string;
      kicker?: string;
      children: React.ReactNode;
    };

export function StaticPage(props: StaticPageProps) {
  if ("page" in props) {
    const { page, kicker, children } = props;
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

  const { title, subtitle, kicker, children } = props;
  return (
    <>
      <EditorialHero kicker={kicker} title={title} subtitle={subtitle} />
      <section className="mx-auto max-w-page px-6 py-12 md:py-16">
        <div className="prose-hawazine mx-auto">{children}</div>
      </section>
    </>
  );
}
