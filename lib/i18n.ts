/**
 * Internationalization config + helpers.
 *
 * Design choices (see INTERNATIONAL.md for full rationale):
 * - Subfolder URLs: /es/, /pt/, /fr/ (literal Next.js routes, not a [lang]
 *   dynamic segment). Keeps the English site's 550+ existing pages
 *   completely untouched and lowers regression risk during rollout.
 * - English slugs across all locales: /es/tools/mortgage-calculator, not
 *   /es/tools/calculadora-hipoteca. Simpler hreflang + no slug-translation
 *   regressions. Title/H1/body carry the native keyword signal.
 * - Self-referencing hreflang + x-default to English is emitted on every
 *   translated page AND on the English original (if the slug has any
 *   translation).
 * - Neutral Latin American Spanish (es) and Brazilian Portuguese (pt-BR)
 *   chosen for RPM + volume reasons. Documented, not a default we hide.
 * - Shell-only translation in V1: title, description, H1, breadcrumbs,
 *   explainer, how-to-use, FAQ, trust signals. Interactive tool labels
 *   stay English. See INTERNATIONAL.md §7 for scope rationale.
 */

export type Locale = "en" | "es" | "pt" | "fr";

/** All supported locales in priority order. Locale at index 0 is the default. */
export const LOCALES: Locale[] = ["en", "es", "pt", "fr"];

/** Locale that the root (bare) URL serves. */
export const DEFAULT_LOCALE: Locale = "en";

export interface LocaleMeta {
  code: Locale;
  /** BCP-47 tag used in hreflang and <html lang>. */
  bcp47: string;
  /** Native display label for the language switcher. */
  label: string;
  /** English label for docs / admin UI. */
  englishLabel: string;
  /** Default currency symbol shown in tool UIs that deal with money. */
  currencySymbol: string;
  /** Default ISO-4217 currency code for forms that care. */
  currencyCode: string;
  /** URL prefix: "" for default, "/es" etc. otherwise. No trailing slash. */
  urlPrefix: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: {
    code: "en",
    bcp47: "en",
    label: "English",
    englishLabel: "English",
    currencySymbol: "$",
    currencyCode: "USD",
    urlPrefix: "",
  },
  es: {
    // Neutral Latin American Spanish. Mexico-first defaults for currency.
    // Spanish readers in Spain understand LA Spanish without issue; the
    // reverse is less reliable, and LA audiences are 5x the size.
    code: "es",
    bcp47: "es",
    label: "Español",
    englishLabel: "Spanish",
    currencySymbol: "$",
    currencyCode: "MXN",
    urlPrefix: "/es",
  },
  pt: {
    // Brazilian Portuguese. Brazil has ~6x the search volume of Portugal
    // and better AdSense RPM. Portuguese readers in PT still parse pt-BR
    // comfortably. Documented choice; not hidden.
    code: "pt",
    bcp47: "pt-BR",
    label: "Português",
    englishLabel: "Portuguese (Brazil)",
    currencySymbol: "R$",
    currencyCode: "BRL",
    urlPrefix: "/pt",
  },
  fr: {
    code: "fr",
    bcp47: "fr",
    label: "Français",
    englishLabel: "French",
    currencySymbol: "€",
    currencyCode: "EUR",
    urlPrefix: "/fr",
  },
};

/**
 * Strip the locale prefix from a path. Useful when building hreflang
 * alternates: given "/es/tools/mortgage-calculator" we want the base
 * "/tools/mortgage-calculator" to re-apply each locale's prefix.
 */
export function stripLocale(path: string): { locale: Locale; rest: string } {
  for (const loc of LOCALES) {
    const prefix = LOCALE_META[loc].urlPrefix;
    if (prefix && (path === prefix || path.startsWith(prefix + "/"))) {
      return { locale: loc, rest: path.slice(prefix.length) || "/" };
    }
  }
  return { locale: "en", rest: path };
}

/** Prepend the locale prefix to a path. Idempotent-ish — always strips first. */
export function localizePath(path: string, locale: Locale): string {
  const { rest } = stripLocale(path);
  const prefix = LOCALE_META[locale].urlPrefix;
  if (!prefix) return rest;
  return prefix + (rest === "/" ? "" : rest);
}

/**
 * The shape a per-tool translation bundle must satisfy. One file per
 * (locale × slug). Start with the 20 top revenue tools documented in
 * REVENUE.md §1 — build out by priority, not alphabetically.
 */
export interface ToolTranslation {
  slug: string;
  locale: Locale;
  title: string;           // browser tab title (without site name — layout appends)
  description: string;     // meta description, 140–160 chars, uses native keyword
  h1: string;              // visible page H1
  eyebrow?: string;        // small label over H1
  /**
   * Paragraphs rendered under "What it does" (the "explainer" slot in
   * ToolShell). Plain strings; each renders as one <p>.
   */
  explainer: string[];
  /** "How to use" steps (ordered list). */
  howToUse: string[];
  /** Optional native-language FAQ with emitting FAQPage JSON-LD. */
  faq?: { q: string; a: string }[];
  /** Optional "When to use this tool" bullets. */
  whenToUse?: string[];
  /** Optional "Common use cases" bullets. */
  useCases?: string[];
  /** "How it works" prose — rendered under <h2>How it works</h2>. */
  howItWorks?: string[];
}

export interface GuideTranslation {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  h1: string;
  /** Opening 1–2 paragraphs shown above the in-article ad. */
  intro: string[];
  /** Body sections; each has an H2 and one or more paragraphs. */
  sections: { heading: string; body: string[] }[];
  /** Optional CTA to a tool — targetSlug is the English slug. */
  cta?: { label: string; targetSlug: string };
  faq?: { q: string; a: string }[];
}

/**
 * Sitewide translated strings. One file per locale under
 * lib/translations/[locale]/common.ts.
 */
export interface CommonStrings {
  // Navigation / chrome
  skipToContent: string;
  nav: {
    tools: string;
    guides: string;
    hubs: string;
    learn: string;
    compare: string;
  };
  footer: {
    browse: string;
    curatedLists: string;
    guideSections: string;
    trust: string;
    legal: string;
    rights: string;
  };
  // Shared UI
  advertisement: string;
  updatedOn: (date: string) => string;
  breadcrumb: {
    home: string;
    tools: string;
    guides: string;
  };
  // Trust signals shown on hubs, homepage, tool shells
  trust: {
    noDownload: string;
    browserOnly: string;
    noSignup: string;
    noDataStored: string;
  };
  // Tool shell sections (render as H2)
  toolShell: {
    whatItDoes: string;
    howToUseIt: string;
    howItWorks: string;
    whenToUse: string;
    whenNotToUse: string;
    commonUseCases: string;
    faq: string;
    relatedTools: string;
    supportingGuides: string;
    exampleInput: string;
    exampleOutput: string;
  };
  // Language switcher tooltip / aria
  languageSwitcher: {
    label: string;
    currentLanguage: string;
  };
}
