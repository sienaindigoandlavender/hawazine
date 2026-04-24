import Link from "next/link";
import { primaryNav, secondaryNav, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-page items-start justify-between gap-8 px-6 pt-8 pb-5 md:pt-10 md:pb-6">
        <Link href="/" className="group block">
          <span className="font-serif text-[1.75rem] leading-none tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
            {siteConfig.name}
          </span>
          <span className="hidden md:block font-sans text-[0.625rem] uppercase tracking-[0.32em] text-quiet mt-1.5">
            {siteConfig.wordmarkTagline}
          </span>
        </Link>

        <div className="hidden md:flex flex-col items-end gap-2">
          <nav aria-label="Primary">
            <ul className="font-sans flex items-center gap-7 text-meta uppercase tracking-[0.18em] text-ink">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Reference">
            <ul className="font-sans flex items-center gap-5 text-[0.6875rem] uppercase tracking-[0.18em] text-quiet">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="md:hidden border-t border-rule">
        <nav aria-label="Primary mobile">
          <ul className="font-sans flex items-center gap-x-5 overflow-x-auto whitespace-nowrap px-6 py-3 text-meta uppercase tracking-[0.14em] text-ink">
            {primaryNav.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Reference mobile" className="border-t border-rule">
          <ul className="font-sans flex items-center gap-x-5 overflow-x-auto whitespace-nowrap px-6 py-2 text-[0.6875rem] uppercase tracking-[0.18em] text-quiet">
            {secondaryNav.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
