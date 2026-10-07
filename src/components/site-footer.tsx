import { Logo } from "./logo";
import { LINKS } from "@/lib/links";
import { NAV } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-400">
            Tap-to-pay fares, daily settlement and transport data for Ghana&rsquo;s trotros and buses.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm sm:grid-cols-1" aria-label="Footer">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-ink-400 transition-colors hover:text-ink-100">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 text-sm">
          <a href={LINKS.pilot} className="text-ink-400 transition-colors hover:text-ink-100">
            Run a pilot
          </a>
          {LINKS.developerPortal && (
            <a
              href={LINKS.developerPortal}
              className="text-ink-400 transition-colors hover:text-ink-100"
              target="_blank"
              rel="noreferrer noopener"
            >
              Developers
            </a>
          )}
          <a href={`mailto:${LINKS.contactEmail}`} className="text-ink-400 transition-colors hover:text-ink-100">
            {LINKS.contactEmail}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-border pt-6 text-xs text-ink-600">
        © {year} Trobus. Fares, routes and figures shown on this site are examples.
      </div>
    </footer>
  );
}
