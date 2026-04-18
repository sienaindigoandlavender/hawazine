import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/static-page";
import { getPageBySlug } from "@/lib/content/pages";

const page = getPageBySlug("how-we-work")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.subtitle,
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  return (
    <StaticPage page={page} kicker="How we work">
      <section className="mx-auto max-w-page px-6 pb-16 md:pb-24">
        <div className="max-w-reading">
          <p className="font-ui text-meta uppercase tracking-[0.14em] text-quiet">
            Next
          </p>
          <p className="mt-4 font-serif text-subtitle text-ink">
            If what you have read so far sounds like the right fit, the{" "}
            <Link
              href="/contact"
              className="underline decoration-quiet underline-offset-4 hover:decoration-accent hover:text-accent"
            >
              contact page
            </Link>{" "}
            is where to write.
          </p>
        </div>
      </section>
    </StaticPage>
  );
}
