import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getPublishedQuarters } from "@/lib/content/quarters";
import { getPublishedProperties } from "@/lib/content/properties";
import { getPublishedJournalEntries } from "@/lib/content/journal";
import { safeSitemapUrl } from "@/lib/sitemap-helpers";

const STATIC_ROUTES = [
  "/",
  "/marrakech",
  "/buying",
  "/buying/melkia",
  "/buying/the-process",
  "/buying/costs",
  "/buying/what-to-ask",
  "/journal",
  "/properties",
  "/about",
  "/how-we-work",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: safeSitemapUrl(base, path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const quarterEntries = getPublishedQuarters().map((q) => ({
    url: safeSitemapUrl(base, `/marrakech/${q.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const propertyEntries = getPublishedProperties().map((p) => ({
    url: safeSitemapUrl(base, `/properties/${p.slug}`),
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const journalEntries = getPublishedJournalEntries().map((j) => ({
    url: safeSitemapUrl(base, `/journal/${j.slug}`),
    lastModified: new Date(j.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...quarterEntries,
    ...propertyEntries,
    ...journalEntries,
  ];
}
