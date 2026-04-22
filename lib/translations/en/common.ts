import type { CommonStrings } from "@/lib/i18n";

// Source-of-truth English strings. Other locales' common.ts files are
// independent (not auto-generated) so translators can adjust wording
// idiomatically rather than mirror English sentence structure.
export const COMMON: CommonStrings = {
  skipToContent: "Skip to content",
  nav: {
    tools: "Tools",
    guides: "Guides",
    hubs: "Curated lists",
    learn: "Glossary",
    compare: "Compare",
  },
  footer: {
    browse: "Browse",
    curatedLists: "Curated lists",
    guideSections: "Guide sections",
    trust: "Trust & safety",
    legal: "Legal",
    rights: "All rights reserved.",
  },
  advertisement: "Advertisement",
  updatedOn: (date) => `Updated ${date}`,
  breadcrumb: {
    home: "Home",
    tools: "Tools",
    guides: "Guides",
  },
  trust: {
    noDownload: "No download required",
    browserOnly: "Runs entirely in your browser",
    noSignup: "No signup required",
    noDataStored: "Your data is never stored on our servers",
  },
  toolShell: {
    whatItDoes: "What it does",
    howToUseIt: "How to use it",
    howItWorks: "How it works",
    whenToUse: "When to use this tool",
    whenNotToUse: "When not to use it",
    commonUseCases: "Common use cases",
    faq: "Frequently asked questions",
    relatedTools: "Related tools",
    supportingGuides: "Supporting guides",
    exampleInput: "Input",
    exampleOutput: "Output",
  },
  languageSwitcher: {
    label: "Language",
    currentLanguage: "Current language",
  },
};
