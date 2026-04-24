import type { Page } from "@/lib/types";

export const pages: Page[] = [
  {
    slug: "marrakech",
    title: "Marrakech",
    subtitle: "The medina as a place to own property in",
    bodyMarkdown: `The Marrakech medina is not one market. It is a set of overlapping micro-markets — Laksour, Mouassine, Kasbah, Mellah, Bab Doukkala, Riad Zitoun, Sidi Ben Slimane, and a dozen smaller quarters — each with its own price curve, its own buyer profile, its own building stock, and its own conventions around title.

This landing is a way in. The quarter pages below go deeper, one quarter at a time.`,
    updatedAt: "2026-04-17",
  },
  {
    slug: "buying",
    title: "Buying in the medina",
    subtitle: "The short version, and then the long version",
    bodyMarkdown: `Buying in the medina is not complicated, but it is specific. It requires patience, a willingness to read what an adoul has written, and an honest conversation with yourself about what you are actually trying to do.

The four pages linked from this index cover the legal instrument (the melkia), the sequence of a transaction, the fees you should expect to pay, and the questions a careful buyer asks before anything else.`,
    updatedAt: "2026-04-17",
  },
  {
    slug: "buying/melkia",
    title: "The melkia",
    subtitle: "Customary title, clearly explained",
    bodyMarkdown: `A melkia is a form of customary title drawn up by adouls — Moroccan notaries working within a tradition that predates the twentieth-century French-influenced cadastre. It records ownership through a chain of witnessed acts, and it is the instrument on which most of the medina is held.

This page is a plain-English walk through what a melkia contains, how one is checked, what "melkia in process" means, and how a melkia is converted to a titre foncier if a buyer wishes to do so.`,
    updatedAt: "2026-04-17",
  },
  {
    slug: "buying/the-process",
    title: "The process",
    subtitle: "From first visit to keys",
    bodyMarkdown: `A typical transaction takes between six and twelve weeks from accepted offer to completion. The rhythm is: offer, deposit (usually 10%), title verification with the adoul, due diligence on condition, final deed, payment of taxes and fees, registration, handover.

Each of these steps has failure modes worth understanding in advance.`,
    updatedAt: "2026-04-17",
  },
  {
    slug: "buying/costs",
    title: "Costs",
    subtitle: "What a buyer actually pays, and to whom",
    bodyMarkdown: `Beyond the purchase price, expect the following in the medina as of 2026: registration tax (around 4%), adoul fees (around 0.5%), agency fees (typically 2.5–3% for the buyer side; we are explicit about ours on every mandate), and — if you choose to convert the melkia to a titre foncier — land registry fees.

These figures drift; the page maintains current ranges.`,
    updatedAt: "2026-04-17",
  },
  {
    slug: "buying/what-to-ask",
    title: "What to ask",
    subtitle: "Before you offer on anything in the medina",
    bodyMarkdown: `A short list, written for buyers we have actually worked with:

- What is the title status, and how recently was the chain of ownership verified?
- Who are the neighbours on either side and above, and what is the derb's social texture?
- What works were done in the last ten years, and by whom?
- What is the water pressure on the top floor, and what is the drainage arrangement?
- Are there any ongoing administrative items — syndic issues, shared party walls, pending permits?

None of these questions are rude. Sellers who take offence at them are signalling something.`,
    updatedAt: "2026-04-17",
  },
  {
    slug: "about",
    title: "About Hawazine",
    subtitle: "An editorial agency for the Marrakech medina",
    bodyMarkdown: `Hawazine is the Marrakech medina, read slowly.

Every quarter of the old city. Riads, dars, and land, held to the standard of the medina itself.

The writing on this site is the work. Not its advertisement.`,
    updatedAt: "2026-04-17",
  },
  {
    slug: "how-we-work",
    title: "How we work",
    subtitle: "Fees, mandates, and what you should expect",
    bodyMarkdown: `We take exclusive buyer-side mandates. The fee is 2.5% of the purchase price, payable on completion; it is disclosed on the mandate and it does not change. We do not take seller-side commission on the same property we represent a buyer for.

We do not do unaccompanied viewings. The first visit is with Mouad, in person. We do not share photographs or addresses of active listings over email before a mandate is signed — this is a deliberate choice that protects the seller's privacy and, frankly, keeps the tyre-kickers away from houses that do not deserve the traffic.

If you are weighing whether to speak to us, the contact page is the right place to start. A short, honest message about what you are looking for is better than a long one.`,
    updatedAt: "2026-04-17",
  },
];

export function getPageBySlug(slug: string): Page | undefined {
  return pages.find((p) => p.slug === slug);
}
