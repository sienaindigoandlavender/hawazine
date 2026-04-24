import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type ImageWithPanelSize = "featured" | "card";

interface ImageWithPanelProps {
  imageUrl?: string;
  imageAlt?: string;
  size?: ImageWithPanelSize;
  href?: string;
  priority?: boolean;
  aspectRatio?: string; // Tailwind aspect class, default "aspect-[16/9]"
  sizes?: string;
  children: ReactNode;
}

// Modern House-pattern image with a white panel floating bottom-left on
// desktop and stacking below on mobile. When imageUrl is absent, the panel
// renders alone on paper so the same component produces the no-image
// degraded state without the caller branching.
export function ImageWithPanel({
  imageUrl,
  imageAlt = "",
  size = "card",
  href,
  priority = false,
  aspectRatio = "aspect-[16/9]",
  sizes,
  children,
}: ImageWithPanelProps) {
  const isFeatured = size === "featured";

  const panelClass = isFeatured
    ? "bg-paper p-8 md:p-10 md:max-w-[420px] md:absolute md:bottom-[6%] md:left-[6%]"
    : "bg-paper p-6 md:max-w-[300px] md:absolute md:bottom-6 md:left-6";

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
