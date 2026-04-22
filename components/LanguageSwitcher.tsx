import Link from "next/link";
import { LOCALE_META, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  /** Locales that have a translation for the current slug. */
  available: Locale[];
  /** The locale of the page we're currently rendering. */
  currentLocale: Locale;
  /** Canonical base path WITHOUT locale prefix, e.g. "/tools/mortgage-calculator". */
  basePath: string;
  /** Localized label for aria-hidden screen-reader title. */
  label: string;
}

/**
 * Renders a compact language switcher above the article/tool. Each pill
 * is a static server-rendered <Link> so we avoid client JS for a purely
 * navigational control. Only locales that have a published translation
 * for this slug are shown — English is always present because it's the
 * fallback.
 *
 * The switcher uses `prefetch={false}` so Next doesn't greedily warm up
 * the alternate-locale bundle — most readers never click it.
 */
export function LanguageSwitcher({
  available,
  currentLocale,
  basePath,
  label,
}: LanguageSwitcherProps) {
  // Skip entirely when there's only one locale — no switcher needed.
  if (available.length < 2) return null;
  return (
    <div
      className="mb-4 flex flex-wrap items-center gap-2 text-xs"
      role="group"
      aria-label={label}
    >
      <span className="font-semibold uppercase tracking-wide text-slate-500">
        {label}:
      </span>
      {available.map((loc) => {
        const meta = LOCALE_META[loc];
        const href = meta.urlPrefix + basePath;
        const isCurrent = loc === currentLocale;
        return isCurrent ? (
          <span
            key={loc}
            aria-current="true"
            className="rounded-full border border-brand bg-brand px-2.5 py-1 font-semibold text-white"
          >
            {meta.label}
          </span>
        ) : (
          <Link
            key={loc}
            href={href}
            hrefLang={meta.bcp47}
            prefetch={false}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-medium text-slate-700 hover:border-brand hover:text-brand"
          >
            {meta.label}
          </Link>
        );
      })}
    </div>
  );
}
