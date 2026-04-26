import type { Metadata } from "next";
import { EditorialHero } from "@/components/editorial-hero";
import { EssayBody } from "@/components/essay-body";
import { absoluteUrl, SEO_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Build — riad renovation in the Marrakech medina",
  description:
    "Renovation done with the medina rather than against it. How we work with original fabric, master craftsmen, and the realities of building inside a thousand-year-old quarter.",
  keywords: [
    ...SEO_KEYWORDS.base,
    "riad renovation Marrakech",
    "Marrakech medina restoration",
    "tadelakt",
    "bejmat",
    "moroccan craftsmen",
  ],
  alternates: { canonical: "/build" },
  openGraph: {
    type: "website",
    title: "Build — riad renovation in the Marrakech medina",
    description:
      "Renovation done with the medina rather than against it.",
    url: absoluteUrl("/build"),
  },
};

const BODY = `Renovation in the medina is not the same trade as renovation elsewhere. The walls are older, the lanes are narrower, the labour is specialised in ways that take a generation to learn. A house here has been worked on for centuries, and what survives is what was worth saving.

Our renovation practice begins with the building. Before any drawings, we walk the house. We read what is original, what was added, what should be kept and what is genuinely beyond repair. The judgement is technical and editorial at once: most houses do not need to be transformed, they need to be made habitable on their own terms.

We work with master craftsmen who learned their trades in the medina — tadelakt plasterers, bejmat layers, cedar-ceiling carvers, smiths whose grandfathers wrought the door hinges still in use. The trades are organised around relationships, not contracts. A renovation here is a series of conversations, conducted in Darija, French, and the slow time of careful work.

We do not promise speed. A serious medina renovation takes nine to eighteen months once the title is clean and the budget understood. We do promise a finished result that does not require redoing in five years — and a transparent record of what was done, what cost what, and why.

If you have bought a house and want to talk about how to bring it back, or you are evaluating a property and want a renovation cost honestly assessed before you commit — write to us.`;

export default function BuildPage() {
  return (
    <>
      <EditorialHero
        kicker="Build"
        title="Renovation done with the medina, not against it."
        subtitle="A working renovation practice inside the Marrakech medina."
      />
      <section className="mx-auto max-w-page px-6 py-12 md:py-16">
        <EssayBody markdown={BODY} className="prose-hawazine-lead" />
      </section>
    </>
  );
}
