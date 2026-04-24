/**
 * Category-keyed disclaimers. Every tool in a risk category gets a
 * short inline note; the full text lives at /disclaimers.
 *
 * Scope: only categories where a user could make a meaningful wrong
 * decision based on the tool. Text/dev/converters/random tools don't
 * need one — the worst case is a wrong word count.
 */
import type { Category } from "@/lib/pages";

export type DisclaimerKind = "financial" | "medical" | "legal" | "estimate" | null;

/**
 * Maps a Category to the kind of disclaimer that should render on the
 * tool page. Return `null` if no disclaimer is needed.
 */
export function disclaimerKindFor(category: Category): DisclaimerKind {
  switch (category) {
    case "money":
    case "career":
      return "financial";
    case "health":
      return "medical";
    case "home":
    case "gaming":
      return "estimate";
    default:
      return null;
  }
}

/**
 * Short inline copy shown directly on the tool page. Keep each under
 * 180 characters. The full text lives at /disclaimers.
 */
export const DISCLAIMER_COPY: Record<Exclude<DisclaimerKind, null>, string> = {
  financial:
    "Results are estimates for planning only — not financial, tax, or investment advice. For money decisions consult a licensed advisor.",
  medical:
    "Results are informational only — not medical advice or a substitute for professional care. Talk to a healthcare provider for anything that affects your health.",
  legal:
    "Templates and calculators in the legal space are for reference only — not legal advice. Laws vary by jurisdiction. Have an attorney review anything you plan to sign.",
  estimate:
    "Results are estimates based on the inputs provided. Actual outcomes vary with local rules, conditions, and assumptions we can't see.",
};

/**
 * Short label rendered as the section heading above the disclaimer block.
 */
export const DISCLAIMER_LABEL: Record<Exclude<DisclaimerKind, null>, string> = {
  financial: "Not financial advice",
  medical: "Not medical advice",
  legal: "Not legal advice",
  estimate: "Estimate only",
};
