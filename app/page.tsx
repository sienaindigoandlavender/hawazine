import Link from "next/link";
import { EditorialHero } from "@/components/editorial-hero";

export default function HomePage() {
  return (
    <>
      <EditorialHero
        kicker="Hawazine — Marrakech"
        title="A courtyard, a terrace, the Atlas in the distance."
        subtitle="Marrakech medina, behind plain doors."
      />

      <section className="mx-auto max-w-page px-6 py-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
              Begin here
            </p>
            <ul className="mt-6 border-t border-rule">
              {BEGIN_HERE.map((item) => (
                <li key={item.href} className="border-b border-rule">
                  <Link
                    href={item.href}
                    className="group grid grid-cols-[8rem_minmax(0,1fr)] items-baseline gap-6 py-5"
                  >
                    <span className="font-serif text-subtitle text-ink transition-colors group-hover:text-accent">
                      {item.label}
                    </span>
                    <span className="font-serif text-body text-ink-soft">
                      {item.blurb}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-meta uppercase tracking-[0.18em] text-quiet">
              Currently representing
            </p>
            <p className="mt-6 font-serif text-body text-ink-soft">
              Listings not yet published on hawazine.com. Current inventory is
              represented via Mouad on{" "}
              <a
                href="https://www.mubawab.ma/"
                rel="noopener noreferrer"
                target="_blank"
                className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
              >
                Mubawab
              </a>
              {" "}— contact for current availability.
            </p>
            <p className="mt-6 font-sans text-meta">
              <Link
                href="/contact"
                className="uppercase tracking-[0.18em] text-quiet transition-colors hover:text-accent"
              >
                Contact →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-6 py-16 md:py-24">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="font-serif text-section text-ink">The Index</h2>
          <Link
            href="/the-index"
            className="font-sans text-meta uppercase tracking-[0.18em] text-quiet transition-colors hover:text-accent"
          >
            Continue reading →
          </Link>
        </div>
        <p className="mt-6 max-w-reading font-serif text-body text-ink-soft">
          Legal structure, procedure, and cost as they actually work in the
          Marrakech medina. Written for buyers who want to understand the
          ground before they stand on it.
        </p>
      </section>
    </>
  );
}

const BEGIN_HERE: { href: string; label: string; blurb: string }[] = [
  {
    href: "/marrakech",
    label: "Marrakech",
    blurb: "The medina and its quarters.",
  },
  {
    href: "/buying",
    label: "Buying",
    blurb: "How a house here changes hands.",
  },
  {
    href: "/craft",
    label: "Craft",
    blurb: "Architecture, restoration, the trades.",
  },
];
