import type { Metadata } from "next";
import { EditorialHero } from "@/components/editorial-hero";

export const metadata: Metadata = {
  title: "Craft",
  description:
    "Architecture, restoration, and the trades — the making and remaking of Marrakech medina houses.",
  alternates: { canonical: "/craft" },
};

export default function CraftPage() {
  return (
    <>
      <EditorialHero
        kicker="Craft"
        title="Architecture, restoration, the trades."
        subtitle="The making and remaking of medina houses."
      />
      <section className="mx-auto max-w-page px-6 py-12 md:py-16">
        <p className="max-w-reading font-serif text-body text-ink-soft">
          Content in preparation.
        </p>
      </section>
    </>
  );
}
