/**
 * Central translation registry. Each locale exposes:
 * - `common`: sitewide strings (nav, footer, shell labels)
 * - `tools`: Record<slug, ToolTranslation>
 * - `guides`: Record<slug, GuideTranslation>
 *
 * We import each translated page explicitly (rather than glob-loading) so
 * the bundle graph stays visible to Next and dead translations tree-shake
 * cleanly out of locales that don't use them.
 */

import type { CommonStrings, Locale, ToolTranslation, GuideTranslation } from "@/lib/i18n";
import { LOCALES } from "@/lib/i18n";

import { COMMON as EN_COMMON } from "./en/common";
import { COMMON as ES_COMMON } from "./es/common";
// pt + fr bundles drop in as we ship them. Until a locale has a common.ts
// we fall back to English to keep the site functional.

import { MORTGAGE_CALCULATOR_ES } from "./es/tools/mortgage-calculator";
import { LOAN_CALCULATOR_ES } from "./es/tools/loan-calculator";
import { COMPOUND_INTEREST_CALCULATOR_ES } from "./es/tools/compound-interest-calculator";

import { HOW_TO_SAVE_MONEY_FAST_ES } from "./es/guides/how-to-save-money-fast";

type LocaleBundle = {
  common: CommonStrings;
  tools: Record<string, ToolTranslation>;
  guides: Record<string, GuideTranslation>;
};

const BUNDLES: Record<Locale, LocaleBundle> = {
  en: {
    common: EN_COMMON,
    tools: {},
    guides: {},
  },
  es: {
    common: ES_COMMON,
    tools: {
      "mortgage-calculator": MORTGAGE_CALCULATOR_ES,
      "loan-calculator": LOAN_CALCULATOR_ES,
      "compound-interest-calculator": COMPOUND_INTEREST_CALCULATOR_ES,
    },
    guides: {
      "how-to-save-money-fast": HOW_TO_SAVE_MONEY_FAST_ES,
    },
  },
  pt: {
    // Brazilian Portuguese — scheduled for wave 2. Falls back to English
    // until common.ts + tool bundles land. Routes under /pt/ should not
    // render until this is populated (see app/pt/* guards).
    common: EN_COMMON,
    tools: {},
    guides: {},
  },
  fr: {
    common: EN_COMMON,
    tools: {},
    guides: {},
  },
};

export function getCommon(locale: Locale): CommonStrings {
  return BUNDLES[locale]?.common ?? EN_COMMON;
}

export function getToolTranslation(locale: Locale, slug: string): ToolTranslation | null {
  if (locale === "en") return null; // English is sourced from lib/pages.ts
  return BUNDLES[locale]?.tools[slug] ?? null;
}

export function getGuideTranslation(locale: Locale, slug: string): GuideTranslation | null {
  if (locale === "en") return null;
  return BUNDLES[locale]?.guides[slug] ?? null;
}

/** Locales that have a translation for a given slug (tool or guide). */
export function localesFor(slug: string, type: "tool" | "guide"): Locale[] {
  const out: Locale[] = ["en"];
  for (const loc of LOCALES) {
    if (loc === "en") continue;
    const bundle = BUNDLES[loc];
    const has = type === "tool" ? !!bundle?.tools[slug] : !!bundle?.guides[slug];
    if (has) out.push(loc);
  }
  return out;
}

/** Slugs translated for a given locale (tool or guide). */
export function translatedSlugs(locale: Locale, type: "tool" | "guide"): string[] {
  const bundle = BUNDLES[locale];
  if (!bundle) return [];
  return Object.keys(type === "tool" ? bundle.tools : bundle.guides);
}
