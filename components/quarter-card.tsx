import Image from "next/image";
import Link from "next/link";
import type { Quarter } from "@/lib/types";

export function QuarterCard({ quarter }: { quarter: Quarter }) {
  return (
    <Link href={`/marrakech/${quarter.slug}`} className="group block">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink/5">
        <Image
          src={quarter.heroImageUrl}
          alt={quarter.heroImageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-5">
        <h3 className="font-serif text-2xl text-ink transition-colors group-hover:text-accent">
          {quarter.name}
        </h3>
        {quarter.subtitle && (
          <p className="mt-2 font-serif text-base text-ink/70">
            {quarter.subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
