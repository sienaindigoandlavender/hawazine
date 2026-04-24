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
];

export function getGlossaryEntryBySlug(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((e) => e.slug === slug);
}

export function getGlossaryEntriesByCategory(
  category: GlossaryCategory,
): GlossaryEntry[] {
  return glossaryEntries.filter((e) => e.category === category);
}
