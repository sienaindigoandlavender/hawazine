import type {
  GlossaryCategory,
  GlossaryCategoryMeta,
  GlossaryEntry,
} from "@/lib/types";

// Glossary content lives in this flat file — not Supabase — for v1.
// Entries change rarely, render statically, and deploy on git push.
// Within each category, entries are ordered curatorially, not alphabetically.

export const glossaryCategories: GlossaryCategoryMeta[] = [
  {
    slug: "legal-title",
    label: "Legal & Title",
    description:
      "The title systems, notarial procedures, and legal instruments that govern property ownership in Morocco.",
  },
  {
    slug: "transaction-taxation",
    label: "Transaction & Taxation",
    description:
      "The contracts, fees, and taxes involved in buying and selling Moroccan property.",
  },
  {
    slug: "urban-planning-land",
    label: "Urban Planning & Land",
    description:
      "Zoning, permits, surveys, and land classifications that shape what can be built and where.",
  },
  {
    slug: "architecture-built",
    label: "Architecture & Built Form",
    description:
      "Traditional Moroccan building types and architectural elements.",
  },
  {
    slug: "craft-materials",
    label: "Craft & Materials",
    description:
      "The materials, techniques, and decorative traditions that define Moroccan buildings.",
  },
  {
    slug: "people-roles",
    label: "People & Roles",
    description:
      "The professions, craftsmen, and intermediaries involved in Moroccan real estate.",
  },
];

export const glossaryEntries: GlossaryEntry[] = [
  {
    slug: "melkia",
    term: "Melkia",
    pronunciation: "/mel-KEE-ah/",
    arabic: "ملكية",
    french: "propriété coutumière",
    category: "legal-title",
    definition:
      "A melkia is a form of customary Moroccan title, drawn up by adouls, that records ownership through a chain of witnessed acts. It is the older of the two title systems in use in Morocco today and remains the dominant form of title inside the Marrakech medina.",
    context:
      "A melkia is not a deed in the French sense — there is no central registry, no cadastre number, no surveyed plan attached at the moment of issuance. What matters at the moment of purchase is not whether the property has a title in the abstract but whether the melkia is clean: one or a small number of named owners, a continuous chain of transfers, and no registered disputes. Most of the medina changes hands, year after year, on melkia, without drama.",
    alsoKnownAs: ["moulkia", "milkiya", "customary title", "unregistered property"],
    seeAlso: [
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Immatriculation", anchor: "immatriculation" },
      { term: "Adoul", anchor: "adoul" },
    ],
    relatedContent: [{ label: "Buying melkia property", href: "/buying/melkia" }],
  },
  {
    slug: "titre-foncier",
    term: "Titre foncier",
    pronunciation: "/TEE-truh fon-SYAY/",
    french: "titre foncier",
    category: "legal-title",
    definition:
      "A titre foncier is a registered Moroccan title held in the Land Conservation registry (Conservation foncière), with a cadastre number, a surveyed plan, and a legal record that can be searched and updated by any authorised party. It is the modern registered-title system introduced under the French Protectorate and maintained under the independent Moroccan state.",
    context:
      "A titre foncier is not universally superior to a melkia — it is a different instrument serving a different purpose. Many medina houses trade on melkia at prices equal to or above nearby titrés, because the title form follows the house, not the other way around. Where a titre foncier does matter is in new development, in properties with multiple heirs, or where a bank requires registered collateral for financing.",
    alsoKnownAs: ["registered title", "TF"],
    seeAlso: [
      { term: "Melkia", anchor: "melkia" },
      { term: "Immatriculation", anchor: "immatriculation" },
      { term: "Notaire", anchor: "notaire" },
    ],
    relatedContent: [{ label: "Buying: the melkia", href: "/buying/melkia" }],
  },
  {
    slug: "immatriculation",
    term: "Immatriculation",
    pronunciation: "/ee-mah-tree-koo-lah-SYON/",
    french: "immatriculation foncière",
    category: "legal-title",
    definition:
      "Immatriculation is the legal procedure by which a property held on melkia is registered with the Conservation foncière and converted to a titre foncier. The process involves a formal survey, publication of the registration request, a period open to public objection, and — if no opposition succeeds — issuance of a new registered title.",
    context:
      "Immatriculation is governed by the Dahir of 12 August 1913 as amended, and by Law 39-08 on the Code of Real Rights (2011), which codified the rules governing registered property. The process is not a formality — it takes months and can take years where boundary, heirship, or opposition issues surface. For medina property it is often deferred indefinitely because the melkia system already functions for the parties involved.",
    alsoKnownAs: ["land registration", "titling"],
    seeAlso: [
      { term: "Melkia", anchor: "melkia" },
      { term: "Titre foncier", anchor: "titre-foncier" },
    ],
    relatedContent: [{ label: "Buying: the process", href: "/buying/the-process" }],
  },
  {
    slug: "adoul",
    term: "Adoul",
    pronunciation: "/ah-DOOL/",
    arabic: "عدول",
    french: "adoul (notaire traditionnel)",
    category: "people-roles",
    definition:
      "An adoul is a traditional Moroccan notary operating under the Maliki Islamic legal tradition, qualified to witness, authenticate, and draw up acts concerning personal status, inheritance, and property — most notably the melkia. Adouls work in pairs, and an act signed by two adouls carries the authenticating weight of the office.",
    context:
      "The adoul profession is regulated by the Ministry of Justice and has been progressively reformed since the 1980s to require formal legal training alongside religious qualification. For medina property transactions, the adoul is the figure who establishes that a melkia is clean before a sale proceeds — the chain of transfers, the named owners, the absence of registered disputes. The work is slow and deeply local; a good adoul is known to the families of the derb.",
    alsoKnownAs: ["plural: adouls"],
    seeAlso: [
      { term: "Notaire", anchor: "notaire" },
      { term: "Melkia", anchor: "melkia" },
    ],
    relatedContent: [{ label: "Buying: the melkia", href: "/buying/melkia" }],
  },
  {
    slug: "notaire",
    term: "Notaire",
    pronunciation: "/no-TAIR/",
    french: "notaire",
    category: "people-roles",
    definition:
      "A notaire is a modern Moroccan notary operating under the French civil-law tradition, responsible for drafting, authenticating, and executing contracts of sale, corporate formations, and other civil instruments involving registered property. Unlike the adoul, the notaire operates in French as well as Arabic and handles titre foncier transactions directly with the Conservation foncière.",
    context:
      "The profession is governed by Law 32-09 (2011), which replaced the French-era notarial code and reformed fee schedules, training requirements, and professional discipline. For a transaction involving a titre foncier, a notaire is typically required; for a melkia transaction, an adoul alone may suffice. Where the property is transitioning from one title system to the other, both are often involved.",
    seeAlso: [
      { term: "Adoul", anchor: "adoul" },
      { term: "Titre foncier", anchor: "titre-foncier" },
    ],
    relatedContent: [{ label: "Buying: the process", href: "/buying/the-process" }],
  },
  {
    slug: "riad",
    term: "Riad",
    pronunciation: "/ree-AHD/",
    arabic: "رياض",
    french: "maison à patio",
    category: "architecture-built",
    definition:
      "A riad is a traditional Moroccan courtyard house built around an interior garden, typically with a central patio, rooms opening onto galleries on one or more floors, and a rooftop terrace. The word riad comes from the Arabic for garden — the planted interior court is what distinguishes the type.",
    context:
      "Not every courtyard house in the medina is strictly a riad; the dar is a related but distinct type, generally smaller and without the central planted court. In commercial use, the word riad is often applied loosely to any larger medina house with a patio, and buyers should verify the distinction architecturally rather than trusting the listing vocabulary. The best preserved riads sit on interior derbs with plain exteriors — the richness faces inward.",
    alsoKnownAs: ["riyad"],
    seeAlso: [
      { term: "Derb", anchor: "derb" },
      { term: "Tadelakt", anchor: "tadelakt" },
    ],
    relatedContent: [{ label: "Properties", href: "/properties" }],
  },
  {
    slug: "derb",
    term: "Derb",
    pronunciation: "/DARB/",
    arabic: "درب",
    french: "impasse",
    category: "architecture-built",
    definition:
      "A derb is a lane or alley within the medina fabric, typically a dead-end cul-de-sac accessed from a wider arterial street. The derb is the unit of address most medina houses sit on — a property is located at a named derb number rather than a numbered street.",
    context:
      "A derb is not a street in the grid sense: no cars, no through-traffic, pedestrian and handcart scale. Socially, the derb is the intermediate layer between the house and the public thoroughfare — neighbours know one another, doorways sit a few metres apart, and the acoustic texture is dramatically quieter than the souks one turn away. Living on a derb is the characteristic medina experience.",
    alsoKnownAs: ["pl. dourouba"],
    seeAlso: [
      { term: "Riad", anchor: "riad" },
    ],
    relatedContent: [{ label: "Marrakech, quarter by quarter", href: "/marrakech" }],
  },
  {
    slug: "tadelakt",
    term: "Tadelakt",
    pronunciation: "/tah-deh-LAKT/",
    arabic: "تادلاكت",
    french: "tadelakt",
    category: "craft-materials",
    definition:
      "Tadelakt is a traditional lime-based plaster finish native to the Marrakech region, applied in successive layers, burnished with a river stone, and rubbed with a black-olive-oil soap to produce a hard, waterproof, seamless surface. It is used on bathroom walls, hammams, fountain basins, and increasingly on interior walls and floors of restored medina houses.",
    context:
      "Tadelakt is made from Marrakech lime, fired from the limestone of the surrounding Atlas foothills, and is labour-intensive to apply well — a finished wall represents multiple days of burnishing by a maalem and his apprentices. The finish ranges from matte to high polish depending on the number of passes, and accepts mineral pigments, which is why tadelakt walls are often coloured in ochres, reds, and deep greys drawn from the local palette.",
    alsoKnownAs: ["Marrakech plaster"],
    seeAlso: [
      { term: "Riad", anchor: "riad" },
    ],
    relatedContent: [{ label: "Craft", href: "/craft" }],
  },
  {
    slug: "requisition",
    term: "Réquisition",
    pronunciation: "/ray-kee-zee-SYON/",
    arabic: "مطلب التحفيظ",
    french: "réquisition d'immatriculation",
    category: "legal-title",
    definition:
      "The official application that starts the process of converting a melkia property into a registered title. A réquisition is filed with the ANCFCC (the national land conservation agency) and given a reference number. Once filed, the property is said to be \"in requisition\" — the conversion is underway but not yet complete.",
    context:
      "For foreign buyers, the réquisition number is important in practice. Notaires in 2026 typically route melkia sales through the réquisition procedure, meaning the property is already mid-conversion when the sale happens. This gives the buyer a clearer title outcome than a raw melkia transfer, and it lets the sale proceed without waiting the months or years full immatriculation can take.",
    alsoKnownAs: ["requisition", "land registry application"],
    seeAlso: [
      { term: "Immatriculation", anchor: "immatriculation" },
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Melkia", anchor: "melkia" },
      { term: "ANCFCC", anchor: "ancfcc" },
    ],
    relatedContent: [
      {
        label: "How does immatriculation work in 2026?",
        href: "/buying/how-does-immatriculation-work-in-2026",
      },
    ],
  },
  {
    slug: "ancfcc",
    term: "ANCFCC",
    pronunciation: "/A-N-C-F-C-C/",
    category: "legal-title",
    definition:
      "The Agence Nationale de la Conservation Foncière, du Cadastre et de la Cartographie — the state agency that maintains Morocco's land registry, cadastre, and mapping records. Every titled property in Morocco is registered with the ANCFCC, and every immatriculation procedure passes through it.",
    context:
      "ANCFCC offices exist in every major city, including Marrakech. When a foreign buyer receives a copy of their titre foncier, it's issued by the ANCFCC. The agency also holds the cadastre — the official survey records — which means property boundaries and surface areas on a titre foncier are ANCFCC-certified, not just notaire-asserted.",
    alsoKnownAs: ["Land Conservation", "Conservation Foncière", "cadastre agency"],
    seeAlso: [
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Immatriculation", anchor: "immatriculation" },
    ],
  },
  {
    slug: "habous",
    term: "Habous",
    pronunciation: "/ha-BOOS/",
    arabic: "حبوس",
    french: "biens habous",
    category: "legal-title",
    definition:
      "Property held in Islamic religious trust, typically for the upkeep of a mosque, shrine, or charitable institution. Habous property cannot be sold — not to Moroccans, not to foreigners, not under any conditions. It's identified through the notaire's title search during due diligence.",
    context:
      "Substantial portions of the Marrakech medina are habous, particularly around major mosques, madrasas, and saint shrines. Some habous properties can be leased on long-term arrangements managed by the Ministry of Habous, but the underlying title cannot transfer. A buyer who signs for a property without confirming habous status risks losing the deposit and the deal. Every serious notaire checks this first.",
    alsoKnownAs: ["waqf", "religious endowment", "Islamic trust property"],
    seeAlso: [
      { term: "Melkia", anchor: "melkia" },
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Notaire", anchor: "notaire" },
    ],
    relatedContent: [
      {
        label: "What is habous property and why can't I buy it?",
        href: "/buying/what-is-habous-property",
      },
    ],
  },
  {
    slug: "domaine-prive",
    term: "Domaine privé",
    pronunciation: "/do-MEN pree-VAY/",
    french: "domaine privé de l'État",
    category: "legal-title",
    definition:
      "Land owned by the Moroccan state but not classified as public domain. Domaine privé property can be sold, leased, or concession-granted by the state — unlike public domain (beaches, public waterways, military zones), which cannot be privately held at all.",
    context:
      "Foreign buyers occasionally encounter domaine privé land in rural or peri-urban areas — land that the state is selling off under specific development terms. These transactions follow a different procedure than ordinary private sales and often come with development conditions attached (build within X years, maintain agricultural use, etc.). The notaire handling the deal will name the source clearly. It's not a trap, but it's not the same as buying titled private property either.",
    alsoKnownAs: ["state private land", "government-owned private land"],
    seeAlso: [
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Terrain nu", anchor: "terrain-nu" },
    ],
  },
  {
    slug: "compromis-de-vente",
    term: "Compromis de vente",
    pronunciation: "/kom-pro-MEE de vahnt/",
    arabic: "وعد بالبيع",
    french: "compromis de vente",
    category: "transaction-taxation",
    definition:
      "The preliminary sale agreement signed before the final deed. The compromis sets out the price, the deposit amount (typically 10% of the sale price), the closing deadline, and any conditions the buyer requires (clear title, notaire due diligence, immatriculation progress). Both parties commit; withdrawing without cause forfeits the deposit.",
    context:
      "In Moroccan practice, the compromis is usually drafted by the notaire and signed in the notaire's office. The deposit is held by the notaire, not the seller — an important protection. Between the compromis and the final acte de vente, typically two to four months pass while the notaire completes title verification, confirms habous and servitude checks, and coordinates the réquisition if needed. Foreign buyers sign the compromis and then return home with real paperwork; the acte happens when the title is clean.",
    alsoKnownAs: ["preliminary contract", "promise to sell", "sale promise"],
    seeAlso: [
      { term: "Acte de vente", anchor: "acte-de-vente" },
      { term: "Notaire", anchor: "notaire" },
      { term: "Frais de notaire", anchor: "frais-de-notaire" },
    ],
    relatedContent: [
      {
        label: "What is a compromis de vente?",
        href: "/buying/what-is-a-compromis-de-vente",
      },
    ],
  },
  {
    slug: "acte-de-vente",
    term: "Acte de vente",
    pronunciation: "/AKT de vahnt/",
    arabic: "عقد البيع",
    french: "acte de vente",
    category: "transaction-taxation",
    definition:
      "The final deed of sale, signed by buyer and seller in front of the notaire. Once signed, the acte de vente transfers ownership; the buyer becomes the legal owner of the property. The acte is registered with the ANCFCC and entered in the cadastre; the buyer receives a certified copy and eventually a new titre foncier with their name on it.",
    context:
      "The acte is signed only after the notaire has completed the full title search, all payments are in escrow, and the deed is ready for registration. The signing itself is ceremonial but short — typically 30 to 60 minutes, with the notaire reading the key clauses aloud. Foreign buyers who cannot attend in person can sign via a procuration (power of attorney), which must itself be notarised in advance.",
    alsoKnownAs: ["deed of sale", "final contract", "sale deed"],
    seeAlso: [
      { term: "Compromis de vente", anchor: "compromis-de-vente" },
      { term: "Notaire", anchor: "notaire" },
      { term: "Titre foncier", anchor: "titre-foncier" },
    ],
  },
  {
    slug: "frais-de-notaire",
    term: "Frais de notaire",
    pronunciation: "/FRAY de no-TAIR/",
    french: "frais de notaire",
    category: "transaction-taxation",
    definition:
      "The bundle of fees associated with a property transaction — notaire's professional fees, registration tax, cadastre fees, and various administrative charges. Typically paid by the buyer, though the terms are negotiable and written into the compromis.",
    context:
      "For a titled property, total frais de notaire run around 5.5% to 6.5% of the sale price. For a melkia property routed through the réquisition procedure, the figure is higher — 10% to 15% — because the notaire handles the additional immatriculation work. Buyers budgeting for a purchase should add these costs to the sale price upfront rather than treating them as a surprise.",
    alsoKnownAs: ["notary fees", "closing costs"],
    seeAlso: [
      { term: "Notaire", anchor: "notaire" },
      { term: "Acte de vente", anchor: "acte-de-vente" },
      { term: "Compromis de vente", anchor: "compromis-de-vente" },
    ],
    relatedContent: [
      {
        label: "What are the total costs of buying?",
        href: "/buying/total-costs-of-buying",
      },
    ],
  },
  {
    slug: "plus-value",
    term: "Plus-value",
    pronunciation: "/ploo-va-LOO/",
    french: "impôt sur la plus-value immobilière",
    category: "transaction-taxation",
    definition:
      "The capital gains tax paid by the seller on the profit realised from a property sale. Not a tax on the buyer. The plus-value is calculated on the difference between the purchase price (declared on the original acte de vente) and the sale price, with allowances for years held and certain improvements.",
    context:
      "Plus-value rates in 2026 range from 20% to 30% depending on holding period, with reductions after five years and full exemption after ownership of the primary residence for six or more years. Sellers sometimes attempt to declare a lower sale price on the acte to reduce their plus-value liability — a practice the notaire must not facilitate. Buyers should decline any arrangement that involves cash payments off-book; the risks far outweigh the tax savings, which accrue to the seller anyway.",
    alsoKnownAs: ["capital gains tax", "property gains tax", "TPI"],
    seeAlso: [
      { term: "Acte de vente", anchor: "acte-de-vente" },
      { term: "Notaire", anchor: "notaire" },
      { term: "Frais de notaire", anchor: "frais-de-notaire" },
    ],
  },
  {
    slug: "ir-sur-profit-immobilier",
    term: "IR sur profit immobilier",
    pronunciation: "/ee-ERR soor pro-FEE ee-mo-bee-LYAIR/",
    french: "IR sur profit foncier",
    category: "transaction-taxation",
    definition:
      "The income tax applied to property transactions when the seller is an individual (not a company). This is the umbrella tax category under which plus-value is calculated and paid. The seller's notaire withholds and remits this tax directly as part of closing the transaction.",
    context:
      "For foreign sellers in particular, this withholding is consequential — the funds cannot be repatriated until the tax is settled. A foreign seller ending ownership of a Marrakech riad will often wait weeks or months after the acte de vente before the net proceeds are available to transfer abroad, because the IR clearance has to complete first. Foreign buyers becoming owners should understand this is what their eventual sale will involve.",
    alsoKnownAs: ["income tax on property gains", "IRPP"],
    seeAlso: [
      { term: "Plus-value", anchor: "plus-value" },
      { term: "Acte de vente", anchor: "acte-de-vente" },
    ],
  },
  {
    slug: "terrain-nu",
    term: "Terrain nu",
    pronunciation: "/tay-RAN NOO/",
    arabic: "أرض فارغة",
    french: "terrain nu",
    category: "urban-planning-land",
    definition:
      "Unbuilt land. The category covers any parcel without a structure on it, whether urban, peri-urban, or rural. A terrain nu's value and buildability depend on its zoning classification, title status, and distance from existing infrastructure (water, electricity, roads).",
    context:
      "Foreign buyers looking at terrain nu around Marrakech face two immediate questions: is the land classified as agricultural (which restricts foreign ownership), and what can legally be built on it. Both answers come from the commune's urban plan and require verification by a local architect or géomètre before any commitment. Buying terrain nu without this verification is the single most common way foreign buyers lose money in Morocco.",
    alsoKnownAs: ["empty land", "unbuilt land", "vacant plot"],
    seeAlso: [
      { term: "Titre foncier agricole", anchor: "titre-foncier-agricole" },
      { term: "Morcellement", anchor: "morcellement" },
      { term: "Permis d'habiter", anchor: "permis-d-habiter" },
    ],
  },
  {
    slug: "titre-foncier-agricole",
    term: "Titre foncier agricole",
    pronunciation: "/TEE-truh fon-SYAY a-gree-KOL/",
    french: "titre foncier agricole",
    category: "urban-planning-land",
    definition:
      "A registered title for land classified as agricultural. Agricultural land cannot be purchased by non-Moroccan individuals. The classification is legal, not geographic — a parcel can look residential but still be agricultural by title.",
    context:
      "Foreign buyers who want agricultural land typically acquire it through a Moroccan-registered company in which they hold shares. This is legal, commonly used, and arranged by the notaire. The alternative path — vocation non agricole, a formal declassification of the land — is possible but slow, expensive, and requires official justification. Buyers considering either route should budget extra time in the process.",
    alsoKnownAs: ["agricultural title", "farmland title"],
    seeAlso: [
      { term: "Terrain nu", anchor: "terrain-nu" },
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Notaire", anchor: "notaire" },
    ],
  },
  {
    slug: "morcellement",
    term: "Morcellement",
    pronunciation: "/mor-sel-MAHN/",
    french: "morcellement",
    category: "urban-planning-land",
    definition:
      "The legal subdivision of a larger parcel into smaller ones. Each resulting plot receives its own titre foncier. Morcellement requires approval from the urban planning authority and must comply with the local zoning plan.",
    context:
      "Buyers of large parcels sometimes intend to subdivide after purchase — to build multiple houses, or to sell individual plots. The morcellement procedure can take months and is not guaranteed to succeed; the urban plan may block the subdivision, particularly for agricultural land or conservation zones. A buyer relying on future morcellement should confirm feasibility with the commune before signing.",
    alsoKnownAs: ["subdivision", "land division", "lot division"],
    seeAlso: [
      { term: "Terrain nu", anchor: "terrain-nu" },
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Permis d'habiter", anchor: "permis-d-habiter" },
    ],
  },
  {
    slug: "permis-d-habiter",
    term: "Permis d'habiter",
    pronunciation: "/per-MEE da-bee-TAY/",
    arabic: "رخصة السكن",
    french: "permis d'habiter",
    category: "urban-planning-land",
    definition:
      "The occupancy permit issued by the commune after a new construction or major renovation is completed and verified as compliant with the approved plans. Without a permis d'habiter, a building cannot legally be connected to utilities or inhabited.",
    context:
      "Renovating a medina riad in Marrakech requires both a building permit before work starts and a permis d'habiter after it ends. Foreign buyers restoring properties should budget for both the time (weeks to months of commune review) and the possibility that non-compliant changes during construction force costly corrections before the permis is issued. Working with a Moroccan architect familiar with the commune's process is essential.",
    alsoKnownAs: ["occupancy permit", "habitation permit"],
    seeAlso: [
      { term: "Certificat de conformité", anchor: "certificat-de-conformite" },
      { term: "Morcellement", anchor: "morcellement" },
    ],
    relatedContent: [
      {
        label: "What are the most common renovation disasters?",
        href: "/buying/renovation-disasters",
      },
    ],
  },
  {
    slug: "certificat-de-conformite",
    term: "Certificat de conformité",
    pronunciation: "/ser-tee-fee-KA de kon-for-mee-TAY/",
    arabic: "شهادة المطابقة",
    french: "certificat de conformité",
    category: "urban-planning-land",
    definition:
      "The document issued by the commune confirming that a completed construction matches the plans originally approved in the building permit. Required before the permis d'habiter can be issued.",
    context:
      "The certificat de conformité inspection is where improvisations during construction come home to roost. Changes made on-site without formal modification of the building permit — moving a wall, adding a window, extending a terrace — can block the conformité and delay occupancy by months while plans are resubmitted. For foreign buyers overseeing renovation remotely, this is a real risk area; a rigorous local architect prevents it.",
    alsoKnownAs: ["compliance certificate", "conformity certificate"],
    seeAlso: [
      { term: "Permis d'habiter", anchor: "permis-d-habiter" },
      { term: "Morcellement", anchor: "morcellement" },
    ],
  },
  {
    slug: "douiria",
    term: "Douiria",
    pronunciation: "/doo-EER-ya/",
    arabic: "دويرية",
    french: "douiria",
    category: "architecture-built",
    definition:
      "A small auxiliary house adjacent to a riad, typically single-storey, sometimes sharing a wall or a small entrance derb with the main property. Traditionally used for staff quarters, storage, or extended family. Often sold as a separate unit or combined with the riad to create a larger compound.",
    context:
      "A douiria can add substantial value to a riad purchase when the two are combined — a riad plus douiria allows separate guest quarters, a studio, a small second courtyard, or staff space. Many Marrakech medina riads marketed today include a douiria. Buyers should verify whether the douiria shares the riad's title or has its own, because the implications for immatriculation and future resale are different.",
    alsoKnownAs: ["small house", "annexe", "secondary dwelling"],
    seeAlso: [
      { term: "Riad", anchor: "riad" },
      { term: "Derb", anchor: "derb" },
    ],
    relatedContent: [
      {
        label: "What's the difference between a riad and a dar?",
        href: "/buying/riad-vs-dar",
      },
    ],
  },
  {
    slug: "bab",
    term: "Bab",
    pronunciation: "/BAB/",
    arabic: "باب",
    category: "architecture-built",
    definition:
      "The monumental gates of a Moroccan city, the external entrances to its medina and kasbah. Major bab are architectural landmarks with specific names — Bab Doukkala, Bab el Khemis, Bab Agnaou in Marrakech — and are used as navigational reference points throughout the medina.",
    context:
      "For a foreign buyer orientating in the medina, bab matter because they anchor the mental map. A riad described as \"near Bab Doukkala\" sits at a specific point on the medina's western perimeter, close to the vegetable souk; one \"near Bab Aylen\" is in the southeast, quieter, further from the tourist circuits. The bab also mark where cars can enter — beyond them, the medina is pedestrian, handcart, and donkey only.",
    alsoKnownAs: ["gate", "city gate", "door"],
    seeAlso: [{ term: "Derb", anchor: "derb" }],
  },
  {
    slug: "sehrij",
    term: "Sehrij",
    pronunciation: "/seh-REEZH/",
    arabic: "صهريج",
    category: "architecture-built",
    definition:
      "A water basin or pool set into the courtyard floor of a traditional riad. Usually rectangular, tiled in zellige, and often centrally placed. Originally functional — a reservoir connected to the medina's water system — and later decorative.",
    context:
      "A functioning sehrij in a restored riad signals serious restoration. Reconnecting an old sehrij to modern plumbing while preserving the original tile requires a specialised maalem and careful sequencing with the tadelakt and zellige work around it. Buyers looking at unrenovated riads should note whether the sehrij is intact — a broken or filled-in sehrij is common, and restoring it adds to the renovation budget.",
    alsoKnownAs: ["pool", "basin", "courtyard pool"],
    seeAlso: [
      { term: "Riad", anchor: "riad" },
      { term: "Zellige", anchor: "zellige" },
      { term: "Tadelakt", anchor: "tadelakt" },
    ],
  },
  {
    slug: "moucharabieh",
    term: "Moucharabieh",
    pronunciation: "/moo-sha-ra-BEE-yeh/",
    arabic: "مشربية",
    french: "moucharabieh",
    category: "architecture-built",
    definition:
      "The carved wooden lattice screen traditionally fitted to upper-floor windows in Moroccan houses. Allows occupants to see out and air to flow through while preventing outside views in. Historically signalled the separation between public-facing and private interior space.",
    context:
      "In restored riads, moucharabieh can be original (preserved from the building's earlier period) or recreated by a cedar maalem. Original pieces are increasingly rare and command a premium; quality recreations use cedar from the Atlas and take weeks to carve. In listings, the presence of moucharabieh is usually a quality signal — it indicates the renovation respected the vocabulary of the building rather than substituting modern alternatives.",
    alsoKnownAs: ["mashrabiya", "lattice screen", "carved wood screen"],
    seeAlso: [
      { term: "Riad", anchor: "riad" },
      { term: "Cedar", anchor: "cedar" },
    ],
  },
  {
    slug: "kasbah",
    term: "Kasbah",
    pronunciation: "/KAS-bah/",
    arabic: "قصبة",
    french: "casbah",
    category: "architecture-built",
    definition:
      "A fortified compound — historically the residence of a local ruler, sometimes an entire fortified village. Built in pisé (rammed earth and straw) in the Atlas and southern valleys of Morocco. Many kasbahs remain standing but uninhabited, slowly eroding because the pisé requires constant maintenance.",
    context:
      "Kasbahs represent a different category of Moroccan property from medina riads — different title situations, different renovation challenges, different buyer profiles. They sit in rural valleys (Draa, Dadès, Ounila, Ouarzazate region), have surface areas measured in hectares rather than square metres, and often carry uncertain title chains. The Kasbah des Caïds in the Telouet area is a well-known example. Restoration is a project-of-a-lifetime, not a weekend renovation.",
    alsoKnownAs: ["fortified residence", "casbah", "citadel"],
    seeAlso: [{ term: "Titre foncier", anchor: "titre-foncier" }],
  },
  {
    slug: "zellige",
    term: "Zellige",
    pronunciation: "/zel-LEEZH/",
    arabic: "زليج",
    french: "zellige",
    category: "craft-materials",
    definition:
      "The hand-cut glazed terracotta tile tradition of Morocco. Each individual piece is chipped from a larger glazed tile by hand, using a specialised hammer, to create the exact geometric shape needed for the pattern. Assembled face-down into intricate compositions that decorate walls, floors, fountains, and pillars.",
    context:
      "True zellige is distinct from the machine-cut ceramic tile sold in many retail outlets. A true zellige installation is identifiable by slight irregularities in piece edges and subtle colour variation within each glaze. Fez is the traditional centre of zellige production; Marrakech uses Fez-produced tile extensively. Installation is a separate craft from cutting — a zellige installer is a distinct maalem. A full zellige restoration in a medina riad can run from weeks to months depending on surface area.",
    alsoKnownAs: ["zellij", "hand-cut tile", "Moroccan mosaic"],
    seeAlso: [
      { term: "Maalem", anchor: "maalem" },
      { term: "Bejmat", anchor: "bejmat" },
      { term: "Tadelakt", anchor: "tadelakt" },
    ],
  },
  {
    slug: "bejmat",
    term: "Bejmat",
    pronunciation: "/bezh-MAT/",
    arabic: "بجماط",
    category: "craft-materials",
    definition:
      "The small unglazed terracotta floor tile used throughout traditional Moroccan interiors. Typically rectangular (roughly 5cm by 15cm), laid in herringbone or parallel patterns, with slight colour variation from kiln firing. The standard floor material in riads, alongside marble and zellige in more formal rooms.",
    context:
      "Bejmat wears beautifully — darkening with age, absorbing the patina of use. Replacing original bejmat with new bejmat is not straightforward; the colour and surface quality of older pieces is hard to match, and good restorers prefer to clean and relay the originals where possible. New bejmat production continues in Fez and elsewhere, but the quality range is wide. A maalem familiar with the material is essential.",
    alsoKnownAs: ["bejmat tile", "unglazed terracotta", "Moroccan floor tile"],
    seeAlso: [
      { term: "Zellige", anchor: "zellige" },
      { term: "Maalem", anchor: "maalem" },
    ],
  },
  {
    slug: "gebs",
    term: "Gebs",
    pronunciation: "/GEBS/ (with the \"g\" soft, as in \"genre\")",
    arabic: "جبس",
    french: "plâtre sculpté",
    category: "craft-materials",
    definition:
      "The carved plaster tradition of Morocco, used for decorative friezes, cornices, window surrounds, and domed ceilings. The plaster is applied to the wall, allowed to partially set, and then carved by hand with wooden and metal tools into the characteristic patterns — geometric, floral, and calligraphic.",
    context:
      "Gebs work is where a traditional Moroccan interior gets much of its visual density. A serious restoration commissions a gebs maalem for original pattern carving rather than using prefabricated panels. The difference is visible — real gebs has crispness and depth that prefabricated versions cannot match, and it develops character as it absorbs the wall's movement over decades. Budget accordingly.",
    alsoKnownAs: ["carved plaster", "stucco", "naqsh hadida"],
    seeAlso: [
      { term: "Maalem", anchor: "maalem" },
      { term: "Tadelakt", anchor: "tadelakt" },
    ],
  },
  {
    slug: "zouak",
    term: "Zouak",
    pronunciation: "/ZWAK/",
    arabic: "زواق",
    french: "bois peint",
    category: "craft-materials",
    definition:
      "The painted and carved wood tradition of Morocco, typically applied to ceilings, doors, and shutters. Uses mineral pigments on cedar or, in higher-end work, on more precious woods. Patterns are geometric and floral, related to but distinct from zellige and gebs geometry.",
    context:
      "A traditional Moroccan room reaches its full effect when zellige (lower walls), tadelakt (mid walls), gebs (upper walls and frieze), and zouak (ceiling) all work together as a coordinated composition. Modern restorations sometimes omit one element for budget reasons — most often the ceiling zouak, because a plain cedar ceiling is relatively cheap — but the visual result is thinner. Zouak masters (and there are few remaining in Marrakech) are a specific maalem tradition.",
    alsoKnownAs: ["painted wood", "Moroccan ceiling painting", "peinture sur bois"],
    seeAlso: [
      { term: "Maalem", anchor: "maalem" },
      { term: "Cedar", anchor: "cedar" },
    ],
  },
  {
    slug: "cedar",
    term: "Cedar",
    pronunciation: "/ARZ/ (Arabic); /SEE-dar/ (English)",
    arabic: "أرز",
    french: "cèdre de l'Atlas",
    category: "craft-materials",
    definition:
      "The dominant structural and decorative timber of traditional Moroccan architecture. Atlas cedar — cedrus atlantica — harvested from the Middle Atlas forests, particularly the Azrou and Ifrane regions. Used for ceilings, beams, doors, shutters, and carved panels. Naturally resistant to insects and rot.",
    context:
      "Cedar supply is now a real constraint. The Atlas cedar forests are protected and harvesting is limited; prices have risen substantially over the past decade, and quality has become inconsistent. Restoration projects increasingly reuse salvaged cedar from demolished buildings, which is often preferable to new — older cedar has deeper character and is already fully cured. Buyers should ask their architect about the source of any new cedar specified for their project.",
    alsoKnownAs: ["Arz", "Atlas cedar", "cedrus atlantica"],
    seeAlso: [
      { term: "Zouak", anchor: "zouak" },
      { term: "Moucharabieh", anchor: "moucharabieh" },
      { term: "Maalem", anchor: "maalem" },
    ],
  },
  {
    slug: "maalem",
    term: "Maalem",
    pronunciation: "/MA-lem/",
    arabic: "معلم",
    category: "people-roles",
    definition:
      "A master craftsman in one of Morocco's traditional trades. The title is informal but serious — a maalem has completed years of apprenticeship, works to standards recognised within the craft community, and typically trains apprentices of his own. Each craft has its own maalems: maalem zellige, maalem tadelakt, maalem gebs, maalem zouak, maalem cedar.",
    context:
      "For a foreign buyer restoring a riad, finding the right maalems is where the work lives or dies. A maalem of repute commands a premium — often significantly above the going market rate — and is worth it. A good architect has working relationships with specific maalems in each craft and coordinates them through the project; without that network, a foreign owner is at the mercy of whoever the contractor happens to know. The declining number of maalems in certain crafts (particularly zouak and specialised gebs) is a real restoration risk.",
    alsoKnownAs: ["master craftsman", "maître artisan"],
    seeAlso: [
      { term: "Tadelakt", anchor: "tadelakt" },
      { term: "Zellige", anchor: "zellige" },
      { term: "Gebs", anchor: "gebs" },
      { term: "Zouak", anchor: "zouak" },
    ],
    relatedContent: [
      {
        label: "What does a riad renovation actually cost?",
        href: "/buying/riad-renovation-cost",
      },
    ],
  },
  {
    slug: "samsar",
    term: "Samsar",
    pronunciation: "/sam-SAR/",
    arabic: "سمسار",
    french: "courtier, intermédiaire",
    category: "people-roles",
    definition:
      "An unlicensed real estate broker — an intermediary who connects buyers and sellers without holding the carte professionnelle required of licensed agents. Samsars are widespread in Moroccan property markets, particularly in the medina and in land transactions.",
    context:
      "A samsar can be useful — often he has access to properties that never reach the open market, particularly through family connections. He can also be dangerous: no professional accountability, no insurance, no standardised practice. Commissions are negotiated individually and sometimes double-charged (from both buyer and seller without disclosure). For foreign buyers, engaging a licensed agency (which may itself work with samsars behind the scenes) provides legal recourse that direct samsar dealings cannot offer.",
    alsoKnownAs: ["broker", "property middleman", "unlicensed agent"],
    seeAlso: [{ term: "Notaire", anchor: "notaire" }],
  },
  {
    slug: "geometre",
    term: "Géomètre",
    pronunciation: "/zhay-o-METR/",
    french: "géomètre-topographe",
    category: "people-roles",
    definition:
      "A licensed land surveyor. In Moroccan property, the géomètre's role is to measure and document the exact surface area and boundaries of a parcel — work that becomes the basis for the cadastre entry during immatriculation. A géomètre's signed and stamped plan is required for any titre foncier.",
    context:
      "Foreign buyers encountering a property with fuzzy boundaries (a common situation with rural melkia land and older medina properties) will need a géomètre before any clean title can be produced. The géomètre's survey is not a casual walkover — it typically takes days, involves formal written notification to neighbouring property owners, and results in a detailed plan that neighbours can legally contest. Good surveys cost between 5,000 and 30,000 dirhams depending on the parcel.",
    alsoKnownAs: ["surveyor", "land surveyor"],
    seeAlso: [
      { term: "Titre foncier", anchor: "titre-foncier" },
      { term: "Immatriculation", anchor: "immatriculation" },
    ],
  },
  {
    slug: "moqaddem",
    term: "Moqaddem",
    pronunciation: "/mo-KAD-em/",
    arabic: "مقدم",
    category: "people-roles",
    definition:
      "A local official in a medina neighbourhood, appointed by the government, responsible for minor administrative matters — registering residents, verifying identity for certain documents, liaising with the commune on local issues. The moqaddem is the most granular layer of the Moroccan administrative system.",
    context:
      "Foreign buyers rarely deal with the moqaddem directly during a property purchase — the notaire handles the official paperwork. But for ongoing residence (a carte de séjour application, for example, or a formal address verification), the moqaddem's signature or attestation may be required. The moqaddem of the neighbourhood where your riad sits is someone worth knowing, and your neighbours or a Moroccan-speaking agent can introduce you.",
    alsoKnownAs: ["neighbourhood chief", "local official", "mokkadem"],
    seeAlso: [{ term: "Notaire", anchor: "notaire" }],
  },
];

export function getGlossaryEntryBySlug(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((e) => e.slug === slug);
}

export function getGlossaryEntriesByCategory(
  category: GlossaryCategory,
): GlossaryEntry[] {
  return glossaryEntries.filter((e) => e.category === category);
}
