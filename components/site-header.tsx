import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site";

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

        <div className="hidden md:flex items-center">
          <nav aria-label="Primary">
            <ul className="font-sans flex items-center gap-7 text-meta uppercase tracking-[0.18em] text-ink">
              {primaryNav.map((item) =>
                item.submenu ? (
                  <li
                    key={item.href}
                    className="group relative"
                  >
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                      aria-haspopup="true"
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-quiet">
                        ▾
                      </span>
                    </Link>
                    <div className="invisible absolute left-0 top-full z-30 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="min-w-[12rem] border border-rule bg-paper px-4 py-3 normal-case tracking-normal">
                        {item.submenu.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className="block py-1.5 font-sans text-meta uppercase tracking-[0.18em] text-quiet transition-colors hover:text-accent"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </div>

      <div className="md:hidden border-t border-rule">
        <nav aria-label="Primary mobile">
          <ul className="font-sans flex items-center gap-x-5 overflow-x-auto whitespace-nowrap px-6 py-3 text-meta uppercase tracking-[0.14em] text-ink">
            {primaryNav.flatMap((item) => {
              const root = (
                <li key={item.href} className="shrink-0">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              );
              if (!item.submenu) return [root];
              const subItems = item.submenu
                .filter((sub) => sub.href !== item.href)
                .map((sub) => (
                  <li
                    key={`${item.href}::${sub.href}`}
                    className="shrink-0 text-quiet"
                  >
                    <Link href={sub.href}>{sub.label}</Link>
                  </li>
                ));
              return [root, ...subItems];
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
