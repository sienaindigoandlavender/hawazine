import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter() {
  return (
    <footer
      className="mt-24 text-paper"
      style={{
        background:
          "linear-gradient(to bottom, #1f1f1f 0%, #161616 55%, #0e0e0e 100%)",
      }}
    >
      <div className="mx-auto grid max-w-page gap-10 px-6 py-16 md:grid-cols-4 md:gap-12">
        <div>
          <p className="font-serif text-2xl text-paper">{siteConfig.name}</p>
          <p className="mt-3 font-sans text-meta text-paper/60">
            Marrakech medina.
          </p>
          <p className="mt-4 font-sans text-meta text-paper/60">
            Carte professionnelle on file.
          </p>
          <p className="mt-4 font-sans text-meta">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-paper">
              {siteConfig.email}
            </a>
          </p>
        </div>

        <div>
          <p className="font-sans text-meta uppercase tracking-[0.18em] text-paper/60">
            Navigate
          </p>
          <ul className="mt-4 space-y-2 font-sans text-meta text-paper/85">
            <li><Link href="/marrakech" className="hover:text-paper">Marrakech</Link></li>
            <li><Link href="/buying" className="hover:text-paper">Buying</Link></li>
            <li><Link href="/craft" className="hover:text-paper">Craft</Link></li>
            <li><Link href="/properties" className="hover:text-paper">Properties</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-meta uppercase tracking-[0.18em] text-paper/60">
            Reference
          </p>
          <ul className="mt-4 space-y-2 font-sans text-meta text-paper/85">
            <li><Link href="/buying" className="hover:text-paper">The Index</Link></li>
            <li><Link href="/glossary" className="hover:text-paper">Glossary</Link></li>
            <li><Link href="/journal" className="hover:text-paper">Journal</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-meta uppercase tracking-[0.18em] text-paper/60">
            Practical
          </p>
          <ul className="mt-4 space-y-2 font-sans text-meta text-paper/85">
            <li><Link href="/about" className="hover:text-paper">About</Link></li>
            <li><Link href="/how-we-work" className="hover:text-paper">How we work</Link></li>
            <li><Link href="/contact" className="hover:text-paper">Contact</Link></li>
          </ul>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-page border-t border-paper/10 px-6 py-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between font-sans text-[0.75rem] text-paper/40">
        <span>&copy; Hawazine 2026</span>
        <nav aria-label="Legal">
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="hover:text-paper/70 transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-paper/70 transition-colors">Terms</Link></li>
            <li><Link href="/disclaimer" className="hover:text-paper/70 transition-colors">Disclaimer</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
