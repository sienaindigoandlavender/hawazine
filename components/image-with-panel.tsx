import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type ImageWithPanelSize = "featured" | "card";
export type ImageWithPanelTone = "paper" | "paper-deep";

interface ImageWithPanelProps {
  imageUrl?: string;
  imageAlt?: string;
  size?: ImageWithPanelSize;
  tone?: ImageWithPanelTone;
  href?: string;
  priority?: boolean;
  aspectRatio?: string; // Tailwind aspect class, default "aspect-[16/9]"
  sizes?: string;
  children: ReactNode;
}

// Modern House-pattern image with a panel floating left-of-centre on
// desktop and stacking below on mobile. When imageUrl is absent, the panel
// renders alone on paper so the same component produces the no-image
// degraded state without the caller branching.
//
// tone controls the panel background. Journal entries use "paper" (pure
// white). Properties use "paper-deep" — the warm off-white reserved in
// CLAUDE.md for small info cards overlaying hero imagery.
export function ImageWithPanel({
  imageUrl,
  imageAlt = "",
  size = "card",
  tone = "paper",
  href,
  priority = false,
  aspectRatio = "aspect-[16/9]",
  sizes,
  children,
}: ImageWithPanelProps) {
  const isFeatured = size === "featured";
  const bgClass = tone === "paper-deep" ? "bg-paper-deep" : "bg-paper";

  const panelClass = isFeatured
    ? `${bgClass} p-7 md:p-8 md:max-w-[360px] md:absolute md:top-1/2 md:left-[5%] md:-translate-y-1/2`
    : `${bgClass} p-5 md:p-6 md:max-w-[280px] md:absolute md:bottom-5 md:left-5`;

  const defaultSizes = isFeatured
    ? "100vw"
    : "(min-width: 1024px) 50vw, 100vw";

  const outerClass = imageUrl ? "group md:relative block" : "group block";

  const inner = (
    <>
      {imageUrl && (
        <div className={`relative ${aspectRatio} w-full overflow-hidden bg-ink/5`}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes={sizes ?? defaultSizes}
            priority={priority}
            className="object-cover"
          />
        </div>
      )}
      <div className={panelClass}>{children}</div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={outerClass}>
        {inner}
      </Link>
    );
  }

  return <div className={outerClass}>{inner}</div>;
}
