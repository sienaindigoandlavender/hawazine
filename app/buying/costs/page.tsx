import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";
import { getPageBySlug } from "@/lib/content/pages";

const page = getPageBySlug("buying/costs")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.subtitle,
  alternates: { canonical: "/buying/costs" },
};

export default function BuyingCosts() {
  return <StaticPage page={page} kicker="Buying — costs" />;
}
