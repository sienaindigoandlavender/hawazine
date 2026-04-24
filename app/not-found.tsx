import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-page px-6 py-24 md:py-32">
      <p className="font-ui text-meta uppercase tracking-[0.18em] text-quiet">
        404
      </p>
      <h1 className="mt-4 max-w-reading font-serif text-display leading-[1.05] text-ink">
        We can&apos;t find that page.
      </h1>
      <p className="mt-6 max-w-reading font-serif text-subtitle text-ink/80">
        Return to the{" "}
        <Link
          href="/"
          className="underline decoration-quiet underline-offset-4 hover:decoration-accent hover:text-accent"
        >
          home page
        </Link>
        , or write to us at{" "}
        <a
          href="mailto:morocco@hawazine.com"
          className="underline decoration-quiet underline-offset-4 hover:decoration-accent hover:text-accent"
        >
          morocco@hawazine.com
        </a>
        .
      </p>
    </section>
  );
}
