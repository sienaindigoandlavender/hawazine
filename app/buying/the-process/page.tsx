import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";
import { getPageBySlug } from "@/lib/content/pages";

const page = getPageBySlug("buying/the-process")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.subtitle,
  alternates: { canonical: "/buying/the-process" },
};

export default function BuyingProcess() {
  return <StaticPage page={page} kicker="Buying — the process" />;
}
