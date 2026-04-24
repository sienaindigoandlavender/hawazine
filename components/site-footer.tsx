import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";
import { GoogleTranslate } from "@/components/google-translate";

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
          <p className="font-serif text-2xl">{siteConfig.name}</p>
          <p className="mt-4 font-ui text-meta leading-relaxed text-paper/70">
            Licensed Moroccan real estate agency — carte professionnelle {siteConfig.carteProfessionnelle}.
          </p>
          <p className="mt-4 font-ui text-meta leading-relaxed text-paper/70">
            {siteConfig.tagline}
          </p>
          <p className="mt-4 font-ui text-meta">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-paper">
              {siteConfig.email}
            </a>
          </p>
        </div>

        <div>
          <p className="font-ui text-meta uppercase tracking-[0.14em] text-paper/60">
            Explore
          </p>
          <ul className="mt-4 space-y-2 font-ui text-meta text-paper/85">
            <li><Link href="/marrakech" className="hover:text-paper">Marrakech</Link></li>
            <li><Link href="/buying" className="hover:text-paper">Buying</Link></li>
            <li><Link href="/journal" className="hover:text-paper">Journal</Link></li>
            <li><Link href="/properties" className="hover:text-paper">Properties</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-ui text-meta uppercase tracking-[0.14em] text-paper/60">
            Practical
          </p>
          <ul className="mt-4 space-y-2 font-ui text-meta text-paper/85">
            <li><Link href="/about" className="hover:text-paper">About</Link></li>
            <li><Link href="/how-we-work" className="hover:text-paper">How we work</Link></li>
            <li><Link href="/contact" className="hover:text-paper">Contact</Link></li>
          </ul>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>

        <div>
          <p className="font-ui text-meta uppercase tracking-[0.14em] text-paper/60">
            Language
          </p>
          <div className="mt-4">
            <GoogleTranslate />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-page border-t border-paper/10 px-6 py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between font-ui text-meta text-paper/40">
        <span>&copy; 2026 Hawazine. All rights reserved.</span>
        <nav className="flex gap-6">
          <Link href="/disclaimer" className="hover:text-paper/70 transition-colors">Disclaimer</Link>
          <Link href="/terms" className="hover:text-paper/70 transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-paper/70 transition-colors">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
