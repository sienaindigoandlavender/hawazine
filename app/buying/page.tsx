import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/static-page";
import { getPageBySlug } from "@/lib/content/pages";

const page = getPageBySlug("buying")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.subtitle,
  alternates: { canonical: "/buying" },
};

const sections = [
  { href: "/buying/melkia", label: "The melkia" },
  { href: "/buying/the-process", label: "The process" },
  { href: "/buying/costs", label: "Costs" },
  { href: "/buying/what-to-ask", label: "What to ask" },
];

export default function BuyingIndex() {
  return (
    <StaticPage page={page} kicker="Buying">
      <section className="mx-auto max-w-page px-6 pb-16 md:pb-24">
        <h2 className="font-serif text-section text-ink">Read in order</h2>
        <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {sections.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="flex items-center justify-between py-5 font-serif text-xl text-ink transition-colors hover:text-accent"
              >
                <span>{s.label}</span>
                <span className="font-ui text-meta uppercase tracking-[0.14em] text-quiet">
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </StaticPage>
  );
}
