import Image from "next/image";

interface EditorialHeroProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function EditorialHero({
  kicker,
  title,
  subtitle,
  imageUrl,
  imageAlt,
}: EditorialHeroProps) {
  return (
    <>
      <section
        className={`mx-auto max-w-page px-6 pt-16 md:pt-24 ${
          imageUrl ? "pb-12 md:pb-16" : "pb-12 md:pb-16"
        }`}
      >
        <div className="max-w-reading">
          {kicker && (
            <p className="font-ui text-meta uppercase tracking-[0.18em] text-quiet">
              {kicker}
            </p>
          )}
          <h1 className="mt-4 font-serif text-display leading-[1.05] text-ink md:text-[4rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 font-serif text-subtitle text-ink/80">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {imageUrl && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5 md:aspect-[2.2/1]">
          <Image
            src={imageUrl}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
    </>
  );
}
