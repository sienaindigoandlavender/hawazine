import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Hawazine wants its editorial and reference content to be readable by
// general search crawlers AND by the AI/answer engines that increasingly
// front the web (ChatGPT, Claude, Perplexity, Gemini, etc.). The work is
// the positioning — restricting LLM access would erase the reach of the
// agency's authority. We list the major AI agents explicitly so the rule
// is auditable rather than implicit through the wildcard.
//
// /api/ stays disallowed for everyone: those endpoints are for first-party
// runtime, not crawl. /api/glossary is a structured-data convenience and
// is intentionally exempted so AI agents can pull the canonical schema.

const AI_USER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "DuckAssistBot",
  "YouBot",
  "cohere-ai",
  "Diffbot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "Bytespider",
  "MistralAI-User",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/glossary"],
        disallow: "/api/",
      },
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: ["/", "/api/glossary"],
        disallow: "/api/",
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
