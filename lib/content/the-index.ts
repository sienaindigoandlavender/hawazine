import type {
  IndexCategory,
  IndexCategoryMeta,
  IndexEntry,
} from "@/lib/types";

// The Index content lives in this flat file — not Supabase — for v1.
// Same reasoning as the Glossary: entries change rarely, render statically,
// deploy on git push. Within each category, entries are ordered curatorially
// via the `number` field.

export const indexCategories: IndexCategoryMeta[] = [
  {
    slug: "the-basics",
    label: "The Basics",
    description: "The questions every foreign buyer asks first.",
  },
  {
    slug: "legal-title",
    label: "Legal & Title",
    description:
      "What you're actually buying, under which title system, and why it matters.",
  },
  {
    slug: "transaction-process",
    label: "The Transaction",
    description:
      "How a property purchase moves from first viewing to signed deed.",
  },
  {
    slug: "costs-taxes",
    label: "Costs & Taxes",
    description: "What you pay, to whom, and when — beyond the sale price.",
  },
  {
    slug: "renovation-reality",
    label: "Renovation Reality",
    description:
      "What restoration actually takes in Marrakech. Budgets, timelines, common failure modes.",
  },
  {
    slug: "due-diligence",
    label: "Due Diligence",
    description: "What to verify before you sign anything.",
  },
  {
    slug: "after-the-sale",
    label: "After The Sale",
    description: "Ongoing costs, taxes, management, and resale realities.",
  },
];

export const indexEntries: IndexEntry[] = [
  {
    slug: "can-foreigners-buy-property-in-morocco",
    number: 1,
    category: "the-basics",
    question: "Can foreigners buy property in Morocco?",
    preview:
      "Yes — with three exceptions. Urban property is freely available; agricultural land requires Moroccan nationality.",
    lastUpdated: "2026-04-24",
    body: `Yes. Foreigners can buy, sell, and inherit urban property in Morocco with the same rights as Moroccan nationals. There is no residency requirement, no holding period, no approval needed from any ministry. The transaction is handled by a notaire and registered the same way a sale between two Moroccans would be.

Three exceptions apply.

**1. Agricultural land.** Land classified as agricultural — including olive groves, farms, and rural parcels outside urban perimeters — cannot be purchased by non-Moroccan individuals. This classification is legal, not geographic. A parcel on the Ourika road is agricultural by classification even if it looks residential. Foreign buyers who want agricultural land typically route the purchase through a Moroccan company in which they hold shares. This is legal and common; a notaire arranges it.

**2. Border zones.** Specific security-sensitive zones near Morocco's borders are restricted. Relevant for the north near Ceuta and Melilla, the eastern Algerian border, and parts of the south. Not relevant for Marrakech or any major city.

**3. Religious properties.** Property classified as *habous* — held in Islamic religious trust — cannot be sold to anyone, Moroccan or foreign. This is a title classification, not a use classification; a habous property is identified during the notarial due diligence before a sale can proceed.

Everything else is open. Riads, villas, apartments, commercial buildings, urban land, and buildings classified as residential can be purchased by any foreigner regardless of nationality or residency status.`,
    seeAlso: [
      { term: "What is titre foncier?", slug: "what-is-titre-foncier" },
      {
        term: "How does immatriculation work in 2026?",
        slug: "how-does-immatriculation-work-in-2026",
      },
    ],
    glossaryTerms: [
      { term: "Notaire", anchor: "notaire" },
      { term: "Titre foncier", anchor: "titre-foncier" },
    ],
  },
  {
    slug: "what-is-melkia",
    number: 1,
    category: "legal-title",
    question: "What is melkia?",
    preview:
      "A customary Moroccan title drawn up by adouls. The dominant form of title in the Marrakech medina.",
    lastUpdated: "2026-04-24",
    body: `A melkia is a form of customary Moroccan title, drawn up by adouls, that records ownership of a property through a chain of witnessed acts. It is the older of the two title systems in Morocco today and coexists with the modern registered system.

Unlike a titre foncier, a melkia has no central registry, no cadastre number, and no surveyed plan attached at the moment of issuance. The document is a legal statement authenticated by two adouls, referencing the property by neighbour boundaries ("bounded to the north by the house of X, to the south by the derb of Y") and recording each successive transfer on the same document or in a connected chain.

Most of the Marrakech medina is held on melkia. Most of the medina changes hands, year after year, on melkia, without drama. The system works because it is embedded in a local context — families, adouls, and neighbours who together know whose house is whose.

What matters at the moment of purchase is not whether the property has "a title" in the abstract but whether the melkia is clean: one or a small number of named owners, a continuous chain of transfers, and no registered disputes. The adoul establishes this before the sale; a careful buyer asks the adoul to produce the chain and reads it with their agent.

A melkia can be converted to a titre foncier through the procedure of immatriculation. Many medina owners do not bother; the melkia system is sufficient for their purposes. Foreign buyers sometimes choose to immatriculate after purchase to simplify resale or financing, but this is optional, not required.`,
    seeAlso: [
      { term: "What is titre foncier?", slug: "what-is-titre-foncier" },
      {
        term: "How does immatriculation work in 2026?",
        slug: "how-does-immatriculation-work-in-2026",
      },
    ],
    glossaryTerms: [
      { term: "Melkia", anchor: "melkia" },
      { term: "Adoul", anchor: "adoul" },
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Immatriculation", anchor: "immatriculation" },
    ],
  },
  {
    slug: "what-is-titre-foncier",
    number: 2,
    category: "legal-title",
    question: "What is titre foncier?",
    preview:
      "A registered Moroccan title with a cadastre number and surveyed plan, held in the Land Conservation registry.",
    lastUpdated: "2026-04-24",
    body: `A titre foncier (TF) is a registered property title held in the Moroccan Land Conservation registry — the Conservation foncière. It carries a unique cadastre number, a surveyed plan, and a full legal record of the property's history that can be searched and updated by any authorised party.

The system was introduced under the French Protectorate, codified in the Dahir of 12 August 1913, and maintained and reformed under the independent Moroccan state, most recently through Law 39-08 on the Code of Real Rights (2011). A titre foncier is generated either by new development (where a registered plan is produced at the start) or by immatriculation of an existing melkia property.

A titre foncier is not universally superior to a melkia. They are different instruments serving different purposes. Many medina houses trade on melkia at prices equal to or above nearby titrés, because the title form follows the property, not the other way around.

Where a titre foncier does matter in practice:

- **New development or subdivision.** Any newly built or subdivided property enters the system as a titre foncier. Villas outside the medina, apartments in Guéliz or Hivernage, and land in urbanised plotted zones are almost always TF.
- **Multiple heirs.** When a property has passed through several generations without clear title work, immatriculation can resolve heirship and produce a single clean title, making sale simpler.
- **Bank financing.** A Moroccan bank lending against a property will require the property to be registered (or to be immatriculated as part of the transaction). Melkia alone is usually not sufficient collateral.

For a foreign buyer, the practical question at the moment of purchase is not "melkia or TF?" but "is the title clean?" — whichever system it sits under.`,
    seeAlso: [
      { term: "What is melkia?", slug: "what-is-melkia" },
      {
        term: "How does immatriculation work in 2026?",
        slug: "how-does-immatriculation-work-in-2026",
      },
    ],
    glossaryTerms: [
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Melkia", anchor: "melkia" },
      { term: "Immatriculation", anchor: "immatriculation" },
    ],
  },
  {
    slug: "how-does-immatriculation-work-in-2026",
    number: 3,
    category: "legal-title",
    question: "How does immatriculation work in 2026?",
    preview:
      "A legal procedure that converts a melkia property into a registered titre foncier. Months to years, not weeks.",
    lastUpdated: "2026-04-24",
    body: `Immatriculation is the legal procedure by which a property held on melkia is registered with the Conservation foncière and converted into a titre foncier. It is not a formality — it is a full legal process with a surveyed plan, a public notice period, and a window open to opposition by anyone claiming an interest in the property.

The procedure is governed by the Dahir of 12 August 1913 as amended, and by Law 39-08 on the Code of Real Rights (2011).

The standard sequence runs like this:

1. **Request for registration.** The owner files a request with the Conservation foncière, accompanied by the melkia and related documents establishing ownership.
2. **Survey.** A licensed surveyor (géomètre) produces a plan of the property, establishing exact boundaries, areas, and position within the larger parcel fabric.
3. **Public notice.** The request is published in the official bulletin and posted locally. A period — historically three months, though extended in practice for properties with complicated histories — is opened during which any third party may file an opposition.
4. **Opposition phase.** If no opposition is filed, the registration proceeds. If opposition is filed, the matter moves to the courts, where boundaries, heirships, and adverse claims are adjudicated before registration can complete.
5. **Issuance.** Once uncontested or resolved, the Conservation foncière issues a new titre foncier, carrying a cadastre number, the surveyed plan, and the registered owner.

Timeline in practice for a clean medina property with a straightforward melkia and no opposition: six to eighteen months from filing to issuance. For properties with contested boundaries, multiple heirs, or unclear transfer history, immatriculation can take several years or stall indefinitely.

Most medina owners do not immatriculate. The melkia system works for the way they use the property. Immatriculation becomes worthwhile in three situations: (a) when the property is being sold to a buyer who requires TF (usually a buyer taking bank financing), (b) when heirship needs to be resolved across several generations before sale, or (c) when the property is being subdivided.

For a foreign buyer considering whether to immatriculate after purchase: it is a personal choice, not a legal requirement. The common reasons are resale liquidity (a future TF sale is slightly simpler) and the psychological comfort of registered ownership. The cost and time involved are real.`,
    seeAlso: [
      { term: "What is melkia?", slug: "what-is-melkia" },
      { term: "What is titre foncier?", slug: "what-is-titre-foncier" },
    ],
    glossaryTerms: [
      { term: "Immatriculation", anchor: "immatriculation" },
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Melkia", anchor: "melkia" },
    ],
  },
  {
    slug: "what-does-a-marrakech-riad-renovation-actually-cost",
    number: 1,
    category: "renovation-reality",
    question: "What does a Marrakech riad renovation actually cost?",
    preview:
      "For a full renovation, plan on 4,000–8,000 DH per m² depending on scope, standard, and how much original fabric is retained.",
    lastUpdated: "2026-04-24",
    body: `For a full renovation of a medina riad in Marrakech, plan on a construction cost of roughly **4,000 to 8,000 DH per square metre**, depending on the scope, the finish standard, and how much of the original fabric is retained. These figures are for the work itself, in 2026 dirhams, delivered by a credible maalem-led crew with a project architect. They exclude the purchase price, taxes, and professional fees.

That is a wide range because the variables are genuinely wide.

**The lower end (around 4,000 DH/m²)** applies when the structure is sound, the roof does not need replacement, original floors, doors, and ceilings survive and can be restored rather than rebuilt, and the standard is domestic — good, not high-end-hotel. A small riad of 120 m² in this range works out to roughly 500,000 DH of construction cost.

**The upper end (around 8,000 DH/m²)** applies when there is significant structural work, a roof rebuild, full re-plumbing and electrical, heritage-grade restoration of zellige, carved plaster, or painted cedar ceilings, air conditioning, a swimming pool, and a hotel-standard finish throughout. A larger riad of 300 m² in this range runs to about 2.4M DH of construction.

What drives cost up:

- **Structural work.** Original walls in a medina riad are rammed earth, stone, or brick, and often moved over decades. Any significant structural intervention — adding a floor, opening large spans, stabilising a leaning wall — multiplies cost.
- **Water.** Swimming pools, hammams, full bathroom count. Plumbing retrofits in a medina house are slow and expensive.
- **Heritage restoration.** Authentic zellige, carved tadelakt, painted cedar, stucco — each requires a specialised maalem and cannot be accelerated. A full restoration of a painted cedar ceiling can run a single crew for weeks.
- **Access.** A property deep on a derb with no cart access adds meaningfully to the effective cost of every material moved in.

What keeps cost down: keeping the original plan, restoring rather than replacing, limiting bathroom count, accepting seasonal comfort rather than year-round air conditioning, and retaining a maalem crew for long enough that they learn the house.

**Timelines** are the other axis buyers underestimate. A serious renovation of an average medina riad takes twelve to twenty-four months. Half that is optimistic; half again is realistic when structural surprises are uncovered mid-project.

Two practical notes for any buyer budgeting: (a) hold a 15–20% contingency against what the scope doc says, because the scope doc will change, and (b) the single biggest predictor of a renovation staying on budget is choosing an architect and maalem who have worked together before in the medina. A crew that is learning on your house is a crew you are paying to learn.`,
    seeAlso: [{ term: "What is melkia?", slug: "what-is-melkia" }],
    glossaryTerms: [
      { term: "Riad", anchor: "riad" },
      { term: "Tadelakt", anchor: "tadelakt" },
      { term: "Derb", anchor: "derb" },
    ],
  },
];

export function getIndexEntryBySlug(slug: string): IndexEntry | undefined {
  return indexEntries.find((e) => e.slug === slug);
}

export function getIndexEntriesByCategory(
  category: IndexCategory,
): IndexEntry[] {
  return indexEntries
    .filter((e) => e.category === category)
    .sort((a, b) => a.number - b.number);
}

export function getMostRecentIndexUpdate(): string | undefined {
  const sorted = [...indexEntries].sort((a, b) =>
    b.lastUpdated.localeCompare(a.lastUpdated),
  );
  return sorted[0]?.lastUpdated;
}
