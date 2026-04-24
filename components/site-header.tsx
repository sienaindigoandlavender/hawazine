import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-ink/5">
      <div className="mx-auto flex max-w-page items-center justify-between gap-8 px-6 py-6 md:py-8">
        <Link href="/" className="font-serif text-2xl tracking-tight text-ink">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="font-ui flex items-center gap-8 text-meta uppercase tracking-[0.14em] text-ink">
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
      </div>

      <nav aria-label="Primary mobile" className="md:hidden border-t border-ink/5">
        <ul className="font-ui flex flex-wrap items-center gap-x-5 gap-y-2 px-6 py-3 text-meta uppercase tracking-[0.12em] text-ink">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
