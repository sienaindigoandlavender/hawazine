import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";
import { getPageBySlug } from "@/lib/content/pages";

const page = getPageBySlug("buying/melkia")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.subtitle,
  alternates: { canonical: "/buying/melkia" },
};

export default function BuyingMelkia() {
  return <StaticPage page={page} kicker="Buying — the melkia" />;
}
