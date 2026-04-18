import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";
import { getPageBySlug } from "@/lib/content/pages";

const page = getPageBySlug("buying/what-to-ask")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.subtitle,
  alternates: { canonical: "/buying/what-to-ask" },
};

export default function BuyingWhatToAsk() {
  return <StaticPage page={page} kicker="Buying — what to ask" />;
}
