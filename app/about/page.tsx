import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";
import { getPageBySlug } from "@/lib/content/pages";

const page = getPageBySlug("about")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.subtitle,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <StaticPage page={page} kicker="Hawazine" />;
}
