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
  {
    slug: "should-i-buy-a-riad-as-an-investment",
    number: 2,
    category: "the-basics",
    question: "Should I buy a riad as an investment?",
    preview:
      "Probably not. Riads rarely make money as pure investments. Buy one because you want to own it.",
    lastUpdated: "2026-04-24",
    body: `Short answer: probably not. Riads in Marrakech can produce yield as short-term rentals, but the economics are harder than they look on paper and the risks are specific.

The headline rental figures sometimes quoted in foreign property press (8% to 12% gross yield on a well-located riad) are achievable but rest on assumptions that often don't hold. They assume 60%+ occupancy year-round, professional management, tight renovation quality, and no structural surprises. In practice, a foreign owner managing remotely through a local contact typically nets far less — often breaking even or modestly positive once vacancy, platform fees, maintenance, utilities, staff, and local taxes are accounted for.

The capital appreciation story is stronger. A well-bought riad in Laksour or Mouassine, renovated to a reasonable standard, has historically held value well and in many cases appreciated substantially since 2020. But the liquidity is poor — selling a riad in Marrakech takes months, not weeks, and requires the right buyer with the right budget. This is not a trade you enter for a two-year exit.

The buyers who do best with Moroccan property are generally the ones who want to spend time there themselves — the riad is a second home, a project, a reason to come back. If short-term rental income helps cover costs, that's a bonus. If the numbers have to justify themselves purely, the math is harder than it looks.`,
    seeAlso: [
      { term: "Can foreigners buy property in Morocco?", slug: "can-foreigners-buy-property-in-morocco" },
      { term: "What does a Marrakech riad renovation actually cost?", slug: "what-does-a-marrakech-riad-renovation-actually-cost" },
      { term: "Can I rent out my riad as a guesthouse?", slug: "can-i-rent-out-my-riad-as-a-guesthouse" },
    ],
    glossaryTerms: [
      { term: "Riad", anchor: "riad" },
      { term: "Frais de notaire", anchor: "frais-de-notaire" },
      { term: "Plus-value", anchor: "plus-value" },
    ],
  },
  {
    slug: "whats-the-difference-between-a-riad-and-a-dar",
    number: 3,
    category: "the-basics",
    question: "What's the difference between a riad and a dar?",
    preview:
      "Both are traditional Moroccan houses organised around a courtyard. A riad has a garden with a fountain; a dar has a simpler light well.",
    lastUpdated: "2026-04-24",
    body: `A **riad** (from the Arabic word for garden) is a traditional Moroccan house built around a central courtyard that contains a garden — typically fruit trees, a fountain, and ornamental planting. The rooms of the house open onto the courtyard through arched galleries; the courtyard is the social and thermal heart of the building.

A **dar** (Arabic for house) is the more modest cousin. It's organised around the same central-courtyard logic but with a smaller, simpler central space — often just a patio with a skylight or a wst ad-dar (courtyard with a light well), without the garden planting. Dars are typically smaller in overall footprint and more common than true riads in the medina.

In practice, the property market uses "riad" loosely. Any medina house with a courtyard is often listed as a riad, even when strictly it's a dar. For a buyer, the distinction matters less than what the property actually contains: square metreage, number of courtyards, light quality, structural condition. Look at the building, not the label.`,
    seeAlso: [
      { term: "Should I buy a riad as an investment?", slug: "should-i-buy-a-riad-as-an-investment" },
      { term: "What does a Marrakech riad renovation actually cost?", slug: "what-does-a-marrakech-riad-renovation-actually-cost" },
    ],
    glossaryTerms: [
      { term: "Riad", anchor: "riad" },
      { term: "Douiria", anchor: "douiria" },
      { term: "Derb", anchor: "derb" },
    ],
  },
  {
    slug: "do-i-need-to-speak-french-or-arabic-to-buy-property",
    number: 4,
    category: "the-basics",
    question: "Do I need to speak French or Arabic to buy property in Morocco?",
    preview:
      "No. But the contracts are in French, and the culture runs on relationships built in Darija or French. A local agent or lawyer translates both.",
    lastUpdated: "2026-04-24",
    body: `Legally, no. You do not need to speak French or Arabic to buy property in Morocco. Foreign buyers complete transactions in English every week. The formal documents — the compromis de vente, the acte de vente — are drafted in French and Arabic, and a sworn translator can produce certified English translations where required.

Practically, the language situation shapes how smooth or friction-heavy the experience is. Most notaires in Marrakech speak French at a professional level and will conduct meetings in French without difficulty. Some also speak English well, particularly those who regularly handle foreign buyers. Conversations with sellers, workers, maalems, and administrative officials are more often in Darija (Moroccan Arabic), where English rarely helps.

The practical answer for most foreign buyers: work with a bilingual agent or lawyer who can bridge the language and the culture. They translate the documents when needed, interpret the conversations, and handle the parts where cultural fluency matters more than linguistic fluency. Trying to do the transaction yourself in English alone is possible but leaves you dependent on whoever happens to be available to interpret, which is a weak position.`,
    seeAlso: [
      { term: "What does the notaire actually do?", slug: "what-does-the-notaire-actually-do" },
      { term: "How do I verify ownership before I pay anything?", slug: "how-do-i-verify-ownership-before-i-pay-anything" },
    ],
    glossaryTerms: [
      { term: "Notaire", anchor: "notaire" },
      { term: "Compromis de vente", anchor: "compromis-de-vente" },
      { term: "Acte de vente", anchor: "acte-de-vente" },
    ],
  },
  {
    slug: "can-i-buy-a-riad-on-melkia",
    number: 4,
    category: "legal-title",
    question: "Can I buy a riad on melkia?",
    preview:
      "Yes. Most medina riads are on melkia. The purchase is routed through the réquisition procedure to give you a clear title on completion.",
    lastUpdated: "2026-04-24",
    body: `Yes. Most traditional riads in the Marrakech medina have always been held under melkia — the customary title system that predates the modern cadastre. Foreign buyers routinely purchase melkia properties; the process is different from buying a titled property, but it's well-established.

In 2026 Moroccan practice, a notaire handling a melkia sale for a foreign buyer will typically route the transaction through an immatriculation procedure. This starts with a réquisition filing with the ANCFCC, which effectively converts the melkia into a titled property during the sale process itself. The buyer signs the compromis de vente, the réquisition gets filed, due diligence completes, and the acte de vente is signed against a property that is in the process of becoming titled.

The cost implications are real. Total notaire and administrative fees for a melkia property routed through réquisition typically run 10% to 15% of the sale price, compared to 5.5% to 6.5% for an already-titled property. The timeline from compromis to acte is longer — often four to six months instead of two to three. And the risk of unresolved claims (an heir who surfaces, a boundary dispute with a neighbour) is higher than with a property that already has a clean cadastre entry.

This is what a good notaire is for. They perform the title search, publish the réquisition, wait out the objection period, and bring the transaction to closing only once the title chain is clean. Cutting corners on the notaire — using an unfamiliar practitioner, or worse, closing without one through a samsar arrangement — is how melkia purchases go wrong.`,
    seeAlso: [
      { term: "What is melkia?", slug: "what-is-melkia" },
      { term: "How does immatriculation work in 2026?", slug: "how-does-immatriculation-work-in-2026" },
      { term: "What is habous property and why can't I buy it?", slug: "what-is-habous-property-and-why-cant-i-buy-it" },
      { term: "What does the notaire actually do?", slug: "what-does-the-notaire-actually-do" },
    ],
    glossaryTerms: [
      { term: "Melkia", anchor: "melkia" },
      { term: "Réquisition", anchor: "requisition" },
      { term: "Immatriculation", anchor: "immatriculation" },
      { term: "Notaire", anchor: "notaire" },
      { term: "Frais de notaire", anchor: "frais-de-notaire" },
    ],
  },
  {
    slug: "what-is-habous-property-and-why-cant-i-buy-it",
    number: 5,
    category: "legal-title",
    question: "What is habous property and why can't I buy it?",
    preview:
      "Habous is property held in Islamic religious trust. It cannot be sold, only leased.",
    lastUpdated: "2026-04-24",
    body: `Habous — sometimes spelled hubous, and internationally known as waqf — is property held permanently in Islamic religious trust, typically for the upkeep of a mosque, madrasa, zaouia, or other charitable institution. The title is inalienable: the property cannot be sold to anyone, Moroccan or foreign, under any conditions. This has been the legal situation for centuries and is unlikely to change.

In the Marrakech medina, habous property is more common than foreign buyers realise. Sections of derbs near major mosques, shrines, and madrasas are partly or entirely habous. These properties can be occupied, often through very long-term leases (30 to 99 years in some cases) managed by the Ministry of Habous, but the underlying title cannot be transferred.

What this means in practice: during due diligence, the notaire checks whether the property is habous. If it is, the sale cannot proceed. A property that looks available on Mubawab, has a motivated seller, and an apparent clean chain of documentation can still turn out to be habous once the title search runs. This is one of the reasons due diligence takes the time it does, and why the deposit on the compromis is held in escrow by the notaire rather than handed to the seller directly.

If you encounter a habous property that's being informally leased and the seller suggests they can "arrange something," the answer is to walk away. There is no legitimate way to acquire habous title, and arrangements that promise to work around the restriction are either scams or highly precarious.`,
    seeAlso: [
      { term: "Can foreigners buy property in Morocco?", slug: "can-foreigners-buy-property-in-morocco" },
      { term: "Can I buy a riad on melkia?", slug: "can-i-buy-a-riad-on-melkia" },
      { term: "What does the notaire actually do?", slug: "what-does-the-notaire-actually-do" },
    ],
    glossaryTerms: [
      { term: "Habous", anchor: "habous" },
      { term: "Melkia", anchor: "melkia" },
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Notaire", anchor: "notaire" },
    ],
  },
  {
    slug: "what-is-a-compromis-de-vente",
    number: 1,
    category: "transaction-process",
    question: "What is a compromis de vente?",
    preview:
      "The preliminary sale contract. Both parties commit, the buyer pays a deposit (usually 10%), and the notaire begins due diligence.",
    lastUpdated: "2026-04-24",
    body: `The compromis de vente is the first binding contract in a Moroccan property purchase. It's signed by the buyer and seller — typically in the notaire's office, though signatures can be collected remotely — and sets out the essential terms: the property being sold, the agreed price, the deposit amount, the closing deadline, and any conditions the buyer requires before final signature.

Standard practice is a 10% deposit at compromis, held in escrow by the notaire. The deposit is not handed to the seller; it's held in the notaire's client account until either the sale completes (at which point it counts toward the purchase price) or the deal falls through without fault of the buyer (at which point it's returned). This protects the buyer from sellers who might otherwise take the deposit and disappear.

The period between compromis and acte de vente — usually two to six months depending on the property's title situation — is when the notaire completes due diligence. Title search, habous check, cadastre verification, any required réquisition filing, confirmation that the seller has authority to sell (particularly for inherited or shared-ownership situations). The compromis will typically include conditions like "clear title verified by notaire" that give the buyer exit routes if serious problems surface during this period.

If the buyer walks away without a valid condition being triggered, the deposit is usually forfeited. If the seller walks away, they typically owe the buyer twice the deposit as damages. These clauses are standard but worth reading carefully in your specific compromis.`,
    seeAlso: [
      { term: "What does the notaire actually do?", slug: "what-does-the-notaire-actually-do" },
      { term: "How long does buying a property take?", slug: "how-long-does-buying-a-property-take" },
      { term: "What should I check before signing a compromis?", slug: "what-should-i-check-before-signing-a-compromis" },
    ],
    glossaryTerms: [
      { term: "Compromis de vente", anchor: "compromis-de-vente" },
      { term: "Acte de vente", anchor: "acte-de-vente" },
      { term: "Notaire", anchor: "notaire" },
      { term: "Frais de notaire", anchor: "frais-de-notaire" },
    ],
  },
  {
    slug: "how-long-does-buying-a-property-take",
    number: 2,
    category: "transaction-process",
    question: "How long does buying a property take?",
    preview:
      "Two to three months for a titled property. Four to six months for a melkia routed through immatriculation. First viewing to keys.",
    lastUpdated: "2026-04-24",
    body: `From first viewing to keys in hand, expect two to three months for an already-titled property and four to six months for a melkia routed through the immatriculation procedure. The variable is mostly title-side work; the logistical and financial parts of the transaction are fast.

A typical titled-property timeline: viewing and negotiation take one to three weeks depending on how decisive buyer and seller are. Once price is agreed, the notaire opens the file and drafts the compromis. Signing the compromis can happen within days if both parties are available. Then the notaire completes title search, cadastre verification, and any required formalities — typically four to six weeks. The acte de vente is signed once the title is confirmed clean, and the buyer receives keys on signature.

A melkia timeline extends the middle section. The notaire files the réquisition with the ANCFCC, which triggers a four-month publication period during which any competing claims must surface. Once the publication closes without objection, the conversion to titre foncier completes, and the acte de vente can be signed against a now-titled property. In practice, experienced notaires can overlap some of this work with other due diligence so the total timeline is manageable — but a melkia purchase is genuinely a longer commitment than a titled one.

Foreign buyers who travel in for the compromis and then return home for the due diligence period, flying back only for the acte, should plan two trips minimum. Attempting to complete everything in one visit works only if every document lines up perfectly, which is rare.`,
    seeAlso: [
      { term: "What is a compromis de vente?", slug: "what-is-a-compromis-de-vente" },
      { term: "How does immatriculation work in 2026?", slug: "how-does-immatriculation-work-in-2026" },
      { term: "Can I buy remotely without flying to Morocco?", slug: "can-i-buy-remotely-without-flying-to-morocco" },
    ],
    glossaryTerms: [
      { term: "Compromis de vente", anchor: "compromis-de-vente" },
      { term: "Acte de vente", anchor: "acte-de-vente" },
      { term: "Réquisition", anchor: "requisition" },
      { term: "Immatriculation", anchor: "immatriculation" },
    ],
  },
  {
    slug: "can-i-buy-remotely-without-flying-to-morocco",
    number: 3,
    category: "transaction-process",
    question: "Can I buy remotely without flying to Morocco?",
    preview:
      "Yes, through a procuration (power of attorney). You'll still want to visit the property first.",
    lastUpdated: "2026-04-24",
    body: `Yes. A foreign buyer can complete a Moroccan property purchase entirely remotely, using a procuration (power of attorney) granted to a trusted agent — typically a lawyer, a representative of the agency handling the sale, or a family member. The procuration is itself notarised, either in Morocco or at a Moroccan consulate abroad, and authorises the holder to sign the compromis and the acte de vente on the buyer's behalf.

This is legal and used routinely. Diaspora buyers living in Paris, Montreal, or Dubai complete transactions this way all the time.

The practical caveat: a remote purchase without any physical visit to the property is not recommended for first-time foreign buyers. The listings photography, video walkthroughs, and inspection reports can be good, but they cannot substitute for the experience of walking the derb, feeling the light in the courtyard, hearing what the street sounds like. Every buyer who has regretted a Moroccan property purchase has typically skipped the visit.

A workable middle path: visit the property (and the neighbourhood, and the quarter) at least once. Agree to proceed. Return home. Then grant a procuration for the signing work so you don't need to fly back twice. This gives you the physical grounding you need for a good decision and the logistical flexibility of not tying your calendar to Moroccan notarial scheduling.`,
    seeAlso: [
      { term: "How long does buying a property take?", slug: "how-long-does-buying-a-property-take" },
      { term: "What should I check before signing a compromis?", slug: "what-should-i-check-before-signing-a-compromis" },
    ],
    glossaryTerms: [
      { term: "Compromis de vente", anchor: "compromis-de-vente" },
      { term: "Acte de vente", anchor: "acte-de-vente" },
      { term: "Notaire", anchor: "notaire" },
    ],
  },
  {
    slug: "what-does-the-notaire-actually-do",
    number: 4,
    category: "transaction-process",
    question: "What does the notaire actually do?",
    preview:
      "Title search, contract drafting, escrow, registration with ANCFCC. The notaire is the legal authority on the transaction — not the agent, not the seller.",
    lastUpdated: "2026-04-24",
    body: `In Moroccan property, the notaire is the central legal figure in the transaction. They are not advocates for the buyer or the seller — they represent the legality of the transaction itself. Their signature and registration of the acte de vente is what transfers ownership under Moroccan law.

Specifically, the notaire:

- **Verifies title.** Checks the cadastre records for titled property, traces the ownership chain for melkia, verifies that the property is not habous, identifies any encumbrances (mortgages, servitudes, disputed boundaries) that might affect the sale.
- **Drafts the contracts.** Both the compromis de vente and the acte de vente are drafted by the notaire, in French and Arabic, following standard legal forms. The buyer and seller can negotiate specific clauses, but the notaire ensures the document is legally sound.
- **Holds funds in escrow.** The buyer's deposit at compromis and the balance at acte are held in the notaire's client account, not passed directly to the seller. This protects both parties.
- **Calculates and collects taxes.** Frais de notaire (notary fees, registration tax, cadastre fees) are calculated and collected by the notaire and remitted to the tax authority.
- **Registers the sale.** The acte de vente is filed with the ANCFCC, the cadastre is updated, and the buyer eventually receives a new titre foncier with their name on it.

A good notaire takes several weeks on this work for a titled property and longer for a melkia. Attempting to speed them up by cutting corners is a sign that you have the wrong notaire. If your notaire is consistently telling you the title search needs more time, believe them.

Foreign buyers sometimes ask if they need both an agent and a notaire. The answer is yes — they serve different functions. The agent finds the property and negotiates the price. The notaire secures the title and completes the legal transaction. Neither replaces the other.`,
    seeAlso: [
      { term: "What is a compromis de vente?", slug: "what-is-a-compromis-de-vente" },
      { term: "How do I verify ownership before I pay anything?", slug: "how-do-i-verify-ownership-before-i-pay-anything" },
      { term: "What should I check before signing a compromis?", slug: "what-should-i-check-before-signing-a-compromis" },
    ],
    glossaryTerms: [
      { term: "Notaire", anchor: "notaire" },
      { term: "Compromis de vente", anchor: "compromis-de-vente" },
      { term: "Acte de vente", anchor: "acte-de-vente" },
      { term: "Frais de notaire", anchor: "frais-de-notaire" },
      { term: "ANCFCC", anchor: "ancfcc" },
    ],
  },
  {
    slug: "total-costs-of-buying-beyond-sale-price",
    number: 1,
    category: "costs-taxes",
    question: "What are the total costs of buying a property beyond the sale price?",
    preview:
      "Titled property: add 5.5% to 6.5%. Melkia property: add 10% to 15%. Plus ongoing annual taxes once you own.",
    lastUpdated: "2026-04-24",
    body: `Three layers of cost beyond the sale price.

**One-time transaction costs (frais de notaire).** For a titled property, total fees — notaire's professional fee, registration tax, cadastre fees, and various administrative charges — run 5.5% to 6.5% of the sale price. For a melkia property routed through the réquisition procedure, the figure is 10% to 15%, reflecting the additional immatriculation work the notaire handles. Always assume the higher end of the range when budgeting.

**Agency commission.** Typically 2% to 3% of the sale price, paid by the buyer. Some agreements split the commission between buyer and seller, which is negotiable; most foreign buyers end up paying it themselves. Samsars sometimes charge less but without the professional accountability of a licensed agency — the savings are usually not worth the risk.

**Annual ownership costs.** Once you own, you pay the taxe d'habitation (residence tax) annually if the property is your primary residence or used as a second home. For a rented property you also pay the taxe de services communaux. Combined, these run a few thousand dirhams per year for a typical medina riad — modest by European standards. You'll also pay for utilities (water, electricity, gas), and if you use the property for short-term rentals, there are additional declaration and tax obligations.

**Optional but real costs.** Most foreign buyers budget for ongoing property management (keyholder, cleaner, maintenance coordinator) because a medina riad left unattended degrades quickly. Expect 500 to 1,500 dirhams per month for a reliable local presence.

When budgeting, take the sale price, add 8% to 15% for transaction costs depending on title status, add 2% to 3% for agency commission, and reserve 5,000 to 15,000 dirhams per year for ongoing running costs. The budget that only accounts for the sale price itself is not a real budget.`,
    seeAlso: [
      { term: "What taxes do I pay as a foreign property owner?", slug: "what-taxes-do-i-pay-as-a-foreign-property-owner" },
      { term: "What does the notaire actually do?", slug: "what-does-the-notaire-actually-do" },
      { term: "What does a Marrakech riad renovation actually cost?", slug: "what-does-a-marrakech-riad-renovation-actually-cost" },
    ],
    glossaryTerms: [
      { term: "Frais de notaire", anchor: "frais-de-notaire" },
      { term: "Notaire", anchor: "notaire" },
      { term: "Plus-value", anchor: "plus-value" },
    ],
  },
  {
    slug: "what-taxes-do-i-pay-as-a-foreign-property-owner",
    number: 2,
    category: "costs-taxes",
    question: "What taxes do I pay as a foreign property owner?",
    preview:
      "Annual residence and services taxes while you own. Capital gains (plus-value) when you sell. Rental income tax if you rent.",
    lastUpdated: "2026-04-24",
    body: `Three kinds of tax to be aware of, depending on how you use the property.

**Annual holding taxes.** Every property owner in Morocco pays the taxe d'habitation (residence tax) and the taxe de services communaux (municipal services tax) annually. These are calculated on the rateable value of the property — typically a few thousand dirhams total for a medina riad. The taxes are low by European standards and are collected by the commune. Foreign owners pay the same rates as Moroccan owners.

**Capital gains tax when you sell (plus-value).** When you sell a Moroccan property for more than you paid for it, the gain is subject to an income tax called the plus-value immobilière. Rates in 2026 are 20% to 30% depending on how long you held the property, with allowances that reduce the effective rate after five years of ownership and exemptions available for primary residences after six years. The notaire handling your sale withholds and remits this tax at closing.

**Rental income tax.** If you rent your property, the rental income is subject to Moroccan income tax. For short-term rentals (Airbnb, Booking.com-style), the declaration is annual and the rate depends on your total annual rental revenue. For long-term rentals, a simpler declaration applies. Most foreign owners work with a local accountant or property manager who handles these filings; the cost is modest and the consequences of missing filings are not.

**What you do not pay.** There is no annual wealth tax, no foreign-owner surcharge, no recurring capital tax. The Moroccan tax system is relatively straightforward for a foreign property owner. The notaire and a competent local accountant handle nearly all of it on your behalf.`,
    seeAlso: [
      { term: "What are the total costs of buying a property beyond the sale price?", slug: "total-costs-of-buying-beyond-sale-price" },
      { term: "Can I rent out my riad as a guesthouse?", slug: "can-i-rent-out-my-riad-as-a-guesthouse" },
    ],
    glossaryTerms: [
      { term: "Plus-value", anchor: "plus-value" },
      { term: "IR sur profit immobilier", anchor: "ir-sur-profit-immobilier" },
      { term: "Frais de notaire", anchor: "frais-de-notaire" },
    ],
  },
  {
    slug: "how-long-does-a-full-riad-renovation-take",
    number: 2,
    category: "renovation-reality",
    question: "How long does a full riad renovation take?",
    preview:
      "Twelve to twenty-four months for a medina riad done properly. Longer if you're replacing zellige, tadelakt, or cedar work at scale.",
    lastUpdated: "2026-04-24",
    body: `A full restoration of a medina riad — structural, plumbing, electrical, finishes, and craft work — typically takes twelve to twenty-four months in Marrakech when done to a traditional standard. Faster timelines exist but usually compromise on the craft work; longer timelines are common when the building throws up structural surprises or when the craft specification is ambitious.

The phases run roughly as follows. **Structural and building permit work** — demolition of any unsalvageable elements, structural repairs, updating foundations where needed, and securing the permis d'habiter process — typically takes three to four months on a well-planned project. **Systems work** — plumbing, electrical, drainage, water supply — runs four to six months and overlaps with the structural phase. **Surface and finish work** — tadelakt, zellige, bejmat flooring, cedar ceilings, gebs plaster, painting — runs six to ten months depending on scope and the number of maalems working simultaneously. **Furnishing and commissioning** adds another month or two.

Craft work is usually the critical path. A good tadelakt maalem applies the plaster over weeks, not days, and the work cannot be rushed — the lime needs time to cure. A zellige installation for a full riad's courtyard, fountain, and wall details can take two to three months with a team of three maalems working steadily. Gebs and zouak add further time. The buildings that restore fastest are the ones with smaller craft scopes; the buildings that take longest are the ones that restore original elements to a proper standard.

Foreign owners managing renovation remotely should expect delays beyond the plan. Monthly visits or a reliable on-ground project manager are essential. A renovation that runs 30% over the original timeline is not a failure; it's typical. A renovation that doubles the timeline is a sign of a mismanaged project, and the causes usually have names — a contractor stretched too thin, an architect who lost engagement, an owner who kept changing the specification.`,
    seeAlso: [
      { term: "What does a Marrakech riad renovation actually cost?", slug: "what-does-a-marrakech-riad-renovation-actually-cost" },
      { term: "What are the most common renovation disasters?", slug: "what-are-the-most-common-renovation-disasters" },
    ],
    glossaryTerms: [
      { term: "Tadelakt", anchor: "tadelakt" },
      { term: "Zellige", anchor: "zellige" },
      { term: "Bejmat", anchor: "bejmat" },
      { term: "Gebs", anchor: "gebs" },
      { term: "Zouak", anchor: "zouak" },
      { term: "Maalem", anchor: "maalem" },
      { term: "Permis d'habiter", anchor: "permis-d-habiter" },
    ],
  },
  {
    slug: "what-are-the-most-common-renovation-disasters",
    number: 3,
    category: "renovation-reality",
    question: "What are the most common renovation disasters?",
    preview:
      "Four recurring patterns: contractor disappears, budget doubles, craft work fails, compliance blocks the occupancy permit.",
    lastUpdated: "2026-04-24",
    body: `Four failure modes come up again and again in foreign-owner renovations in Marrakech. All four are avoidable, but avoiding them requires the right team and active management.

**The vanishing contractor.** An owner pays a substantial deposit — sometimes 40% or 50% of the total renovation cost — to a contractor recommended informally. Work proceeds for a few months. Then the contractor runs into cash flow problems on another project, or simply loses engagement, and the work slows, then stops. The owner is left with a half-renovated building, unpaid subcontractors, and no clear path to recovery. The defence is to never pay more than 20% upfront, to make payments against completed milestones documented by an architect, and to use contractors with a verifiable track record and bank references.

**The doubling budget.** The initial quote is 800,000 dirhams. By month twelve it's 1.4 million. By month eighteen it's 2.1 million. The causes are usually a combination of scope creep (the owner keeps adding finishes), hidden structural problems (rotten beams behind a wall that the initial survey missed), and quote inflation on items specified loosely. The defence is a rigorous pre-renovation survey, a fixed-scope contract with a clear change-order process, and a 15% to 20% contingency budget held in reserve from day one.

**Failed craft work.** Tadelakt that cracks after one winter. Zellige that comes loose in the courtyard. Gebs that dissolves in a rainy season. These are symptoms of shortcut craft work — maalems who worked too fast, lime that wasn't given time to cure, sub-specification materials. The defence is to use specific maalems of known quality, pay them proper rates rather than the lowest quote, and insist on appropriate curing and drying periods even when they slow the project.

**Compliance failure at the conformité.** The building is done. The owner is ready to occupy. The commune inspector arrives for the certificat de conformité and finds that the as-built property doesn't match the approved plans. The permis d'habiter is blocked until corrections are made and plans resubmitted — a process that can take months. The defence is to only make changes during construction through formal permit modifications, never informally, and to have the architect file any necessary plan updates in real time.

None of these failure modes require bad luck. They require a team that cares about the project as much as the owner does. That team usually costs more than the cheapest available option and is almost always worth it.`,
    seeAlso: [
      { term: "What does a Marrakech riad renovation actually cost?", slug: "what-does-a-marrakech-riad-renovation-actually-cost" },
      { term: "How long does a full riad renovation take?", slug: "how-long-does-a-full-riad-renovation-take" },
    ],
    glossaryTerms: [
      { term: "Tadelakt", anchor: "tadelakt" },
      { term: "Zellige", anchor: "zellige" },
      { term: "Gebs", anchor: "gebs" },
      { term: "Maalem", anchor: "maalem" },
      { term: "Permis d'habiter", anchor: "permis-d-habiter" },
      { term: "Certificat de conformité", anchor: "certificat-de-conformite" },
    ],
  },
  {
    slug: "what-should-i-check-before-signing-a-compromis",
    number: 1,
    category: "due-diligence",
    question: "What should I check before signing a compromis?",
    preview:
      "Title status, surface area, habous status, seller's authority, building condition, any encumbrances. The notaire handles most of it, but you watch.",
    lastUpdated: "2026-04-24",
    body: `The compromis is binding. Once it's signed, your deposit is committed and your options narrow substantially. Checks before signature are worth real care.

**Title and ownership.** Is the property titled or melkia? If melkia, is the réquisition procedure already started or will it start after the compromis? Does the seller have clean ownership, or is the property held jointly with siblings, parents, or other heirs whose consent is needed? For melkia properties particularly, multi-owner situations are common and can delay or block the sale. The notaire investigates all of this; insist on seeing the title search conclusions before signing.

**Habous status.** Confirmed not habous. This is a simple check but a critical one. Any property that turns out to be habous after compromis will need to be unwound, with real friction.

**Surface area and boundaries.** The stated surface area of the property should match the cadastre (for titled properties) or the géomètre's recent survey (for properties in requisition). Discrepancies between the stated and the actual area are common, especially in older medina buildings where measurements were never formally recorded. These discrepancies need to be resolved before signing, not after.

**Encumbrances.** Mortgages, servitudes (rights of passage for neighbours, shared wall obligations, water rights), unresolved inheritance claims. All of these need to be named and either cleared before signing or explicitly accepted as part of the deal.

**Physical condition.** Structural survey by a qualified architect, ideally independent of the seller. Focus on foundations, beams, roof, and any external walls exposed to rain. A cosmetic walkthrough by a property manager is not sufficient for a medina riad — the important problems hide behind surfaces.

**Seller's identity and authority.** Valid CIN (Moroccan national ID) for Moroccan sellers, or valid passport for foreign sellers. Confirmation that the person signing actually has authority to sell — particularly important for inherited properties where the full set of heirs may need to sign, and for properties owned through a company where the signatory's authority comes from corporate documents.

The notaire handles most of this investigation. Your role is to request the results in writing, read them carefully, and raise questions where anything is unclear. A good notaire welcomes the scrutiny; a bad one treats it as an inconvenience. Which one yours is becomes obvious in this phase.`,
    seeAlso: [
      { term: "What does the notaire actually do?", slug: "what-does-the-notaire-actually-do" },
      { term: "How do I verify ownership before I pay anything?", slug: "how-do-i-verify-ownership-before-i-pay-anything" },
      { term: "Can I buy a riad on melkia?", slug: "can-i-buy-a-riad-on-melkia" },
    ],
    glossaryTerms: [
      { term: "Compromis de vente", anchor: "compromis-de-vente" },
      { term: "Notaire", anchor: "notaire" },
      { term: "Habous", anchor: "habous" },
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Melkia", anchor: "melkia" },
      { term: "Géomètre", anchor: "geometre" },
    ],
  },
  {
    slug: "how-do-i-verify-ownership-before-i-pay-anything",
    number: 2,
    category: "due-diligence",
    question: "How do I verify ownership before I pay anything?",
    preview:
      "Through the notaire's title search. Do not transfer money until the search is complete and the seller's authority is confirmed.",
    lastUpdated: "2026-04-24",
    body: `Verification of ownership is the notaire's core job, and in Moroccan practice nearly all meaningful checks happen through them. Trying to verify ownership yourself, as a foreign buyer, is impractical — the relevant records are in French and Arabic, held across multiple agencies, and readable only with professional training.

The sequence that matters: you identify a property, you negotiate a price, you engage a notaire, you sign a compromis. At this point your deposit goes into the notaire's escrow — not to the seller. The notaire then runs the full title search: cadastre records, ANCFCC files, habous check, heirs check, encumbrances check. This typically takes two to eight weeks depending on whether the property is titled (faster) or melkia routed through requisition (slower).

**You do not transfer any money directly to the seller at any point.** All funds flow through the notaire. The deposit at compromis, the balance at acte de vente — both land in the notaire's escrow account, and the notaire pays the seller only when title has legally transferred. This is the fundamental protection that Moroccan property law provides to buyers, and it is the reason using a notaire is not optional.

If at any stage someone — an agent, a samsar, a family friend, the seller themselves — suggests that a payment should go directly to the seller "to secure the deal" or "because the notaire is slow" or "to save on fees," the answer is no. Every foreign-buyer horror story in Morocco has some version of this moment in it. The notaire route is slower, and sometimes frustrating, but it is the only route that protects the buyer's money.

The one exception worth naming: small deposits (5,000 to 10,000 dirhams, for example) sometimes get paid to agencies as signs of serious intent before the compromis is formally opened. These are legitimate but should be paid to a licensed agency, documented with a receipt, and refundable if the sale doesn't proceed to compromis.`,
    seeAlso: [
      { term: "What should I check before signing a compromis?", slug: "what-should-i-check-before-signing-a-compromis" },
      { term: "What does the notaire actually do?", slug: "what-does-the-notaire-actually-do" },
      { term: "What is a compromis de vente?", slug: "what-is-a-compromis-de-vente" },
    ],
    glossaryTerms: [
      { term: "Notaire", anchor: "notaire" },
      { term: "Compromis de vente", anchor: "compromis-de-vente" },
      { term: "Acte de vente", anchor: "acte-de-vente" },
      { term: "ANCFCC", anchor: "ancfcc" },
    ],
  },
  {
    slug: "can-i-rent-out-my-riad-as-a-guesthouse",
    number: 1,
    category: "after-the-sale",
    question: "Can I rent out my riad as a guesthouse?",
    preview:
      "Yes, with a maison d'hôtes classification from the Ministry of Tourism. Informal short-term rental is technically not compliant.",
    lastUpdated: "2026-04-24",
    body: `Yes. Short-term rental of a privately owned riad to tourists is legal in Morocco, but there's a formal classification that distinguishes a compliant operation from a grey-market one.

A **maison d'hôtes** (guesthouse) is a riad or villa formally classified by the Ministry of Tourism for tourist accommodation. Classification involves an inspection of the property against a published standards list, registration of the owner or operator, and ongoing obligations around tax declaration, guest registration, and tourist tax collection. Classified maisons d'hôtes appear on Booking.com and Airbnb as legitimate listings and can be marketed openly.

An uncertified property rented short-term to tourists is technically operating outside the formal framework. In practice, enforcement varies — many riads rent this way without issues — but the risks are real. The maison d'hôtes next door can report you. Tax authorities can review platform-reported income. A dispute with a guest can trigger legal exposure. For foreign owners who want to rent seriously, pursuing the classification is the cleaner path.

The classification process takes several months and involves standards the building must meet: a minimum number of rooms, private bathrooms, safety compliance, and so on. Operating a registered maison d'hôtes comes with tax obligations — income tax declarations, guest registration (the fiche de police filed nightly), tourist tax collection and remittance.

Most foreign riad owners who let to tourists seriously work with a local property manager or tourism agency who handles the compliance side. The cost is modest (typically 10% to 20% of gross revenue for full management, less for more limited services) and the peace of mind is worth it. Trying to run a compliant operation remotely from abroad without local help is possible but difficult.`,
    seeAlso: [
      { term: "Should I buy a riad as an investment?", slug: "should-i-buy-a-riad-as-an-investment" },
      { term: "What taxes do I pay as a foreign property owner?", slug: "what-taxes-do-i-pay-as-a-foreign-property-owner" },
    ],
    glossaryTerms: [
      { term: "Riad", anchor: "riad" },
      { term: "Douiria", anchor: "douiria" },
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
