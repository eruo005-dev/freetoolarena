/**
 * Per-tool methodology + sources. Lookup by slug; ToolShell renders the
 * MethodologyPanel when an entry exists.
 *
 * Differentiator vs every black-box tool site — we publish the formula
 * AND cite the authoritative primary source. Government docs (IRS, CDC,
 * SEC, CFPB), peer-reviewed papers, and named industry standards only.
 *
 * To add a new tool's methodology:
 *   1. Find the canonical formula (textbook / standard).
 *   2. Track down the primary source URL — IRS pub, CDC page, SEC, CFPB,
 *      peer-reviewed paper. NOT a random blog.
 *   3. Note what the tool ASSUMES (limits, scope, scope-out).
 *   4. Add the entry below; lastVerified is today's date.
 */

import type { Source } from "@/components/MethodologyPanel";

export interface ToolMethodology {
  formula: string;
  assumes: string;
  sources: Source[];
  lastVerified: string;
  dataUpdated?: string;
}

export const METHODOLOGIES: Record<string, ToolMethodology> = {
  "mortgage-calculator": {
    formula:
      "Monthly payment M = P × [r(1+r)^n] / [(1+r)^n − 1], where P = principal, r = annual rate ÷ 12, n = total months. Total interest = M × n − P.",
    assumes:
      "Fixed-rate, fully amortizing loan with monthly compounding. Excludes property tax, homeowners insurance, PMI, HOA, and points unless explicitly entered.",
    sources: [
      {
        label: "Consumer Financial Protection Bureau — Loan Options + Amortization",
        url: "https://www.consumerfinance.gov/owning-a-home/loan-options/conventional-loans/",
      },
      {
        label: "CFPB — What is amortization?",
        url: "https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-en-103/",
      },
    ],
    lastVerified: "2026-04-30",
  },

  "loan-calculator": {
    formula:
      "Same as mortgage: M = P × [r(1+r)^n] / [(1+r)^n − 1]. Remaining balance after k payments: P(1+r)^k − M × [(1+r)^k − 1] / r.",
    assumes:
      "Fixed-rate, fully amortizing loan, monthly payments. No prepayments, no fees rolled into principal, no balloon payments.",
    sources: [
      {
        label: "Consumer Financial Protection Bureau — Amortization Explainer",
        url: "https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-en-103/",
      },
    ],
    lastVerified: "2026-04-30",
  },

  "compound-interest-calculator": {
    formula:
      "Future value A = P(1 + r/n)^(n × t). With monthly contributions C: A = P(1+r/n)^(n×t) + C × [((1+r/n)^(n×t) − 1) / (r/n)].",
    assumes:
      "Constant interest rate, no fees, no taxes. Contributions added at end of each compounding period; no withdrawals.",
    sources: [
      {
        label: "SEC Investor.gov — Compound Interest Calculator",
        url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
      },
    ],
    lastVerified: "2026-04-30",
  },

  "bmi-calculator": {
    formula:
      "BMI = weight (kg) ÷ height (m)². CDC adult categories: <18.5 underweight, 18.5–24.9 healthy, 25.0–29.9 overweight, ≥30.0 obese.",
    assumes:
      "Adults 20+ years old, not pregnant. BMI is a population-level screening number, not a measure of body fat or health on its own. Athletes with high muscle mass and very tall/short adults often score outside their actual body composition.",
    sources: [
      {
        label: "CDC — Adult BMI Categories",
        url: "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html",
      },
    ],
    lastVerified: "2026-04-30",
  },

  "calorie-calculator": {
    formula:
      "Mifflin-St Jeor BMR. Men: BMR = 10W + 6.25H − 5A + 5. Women: BMR = 10W + 6.25H − 5A − 161 (W = kg, H = cm, A = years). TDEE = BMR × activity factor (1.2 sedentary → 1.9 very active).",
    assumes:
      "Healthy adults aged 19–78. Activity multipliers are population estimates, not measured for the individual. Likely under/over-estimates at extremes of body composition (very lean, very obese, very muscular).",
    sources: [
      {
        label: "Mifflin et al. — A new predictive equation for resting energy expenditure (AJCN 1990;51:241-7)",
        url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
      },
    ],
    lastVerified: "2026-04-30",
  },

  "paycheck-calculator": {
    formula:
      "Federal income tax withholding via the IRS Percentage Method tables (Pub 15-T). FICA: Social Security 6.2% on first $176,100; Medicare 1.45% on all wages (+0.9% over $200k single / $250k married).",
    assumes:
      "Federal taxes only by default. Assumes a post-2020 W-4 (no withholding allowances). Does not model state/local income tax, pre-tax deductions (401(k), HSA), or supplemental wage rules unless explicitly toggled. 2026 figures.",
    sources: [
      {
        label: "IRS Publication 15-T (2026) — Federal Income Tax Withholding Methods",
        url: "https://www.irs.gov/pub/irs-pdf/p15t.pdf",
      },
      {
        label: "IRS — Topic 751: Social Security and Medicare Withholding Rates",
        url: "https://www.irs.gov/taxtopics/tc751",
      },
    ],
    lastVerified: "2026-04-30",
    dataUpdated: "Tax year 2026",
  },

  "tip-calculator": {
    formula:
      "Tip amount = bill × tip rate. Per-person total = (bill + tip) ÷ party size.",
    assumes:
      "US-style tipping (table service: 15–20% standard; takeout: 0–15%; cafes/bars: 10–15% or $1/drink). Pre-tax base by default. International norms vary widely; presets reflect US conventions.",
    sources: [
      {
        label: "Pew Research — Tipping Culture in America 2023 (n=11,945)",
        url: "https://www.pewresearch.org/2023/11/09/tipping-culture-in-america-public-sees-a-changed-landscape/",
      },
    ],
    lastVerified: "2026-04-30",
  },

  "tax-calculator": {
    formula:
      "Liability = Σ (income in bracket × marginal rate) over the 7 federal brackets: 10/12/22/24/32/35/37%. 2026 standard deductions: $16,100 single, $32,200 married jointly, $24,150 head of household.",
    assumes:
      "Federal income tax only. Assumes standard deduction unless itemized. Does not model AMT, credits beyond the obvious (CTC, EITC), NIIT, state/local tax, or specialized deductions. 2026 figures.",
    sources: [
      {
        label: "IRS Rev. Proc. 2025-32 — Inflation-adjusted tax year 2026 figures",
        url: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
      },
    ],
    lastVerified: "2026-04-30",
    dataUpdated: "Tax year 2026",
  },

  "roi-calculator": {
    formula:
      "Simple ROI = (End − Start) / Start. Annualized (CAGR) = (End/Start)^(1/years) − 1.",
    assumes:
      "Single lump-sum investment, no intermediate cash flows. Use IRR / XIRR for irregular contributions. Excludes taxes, fees, and inflation unless real-return mode is enabled.",
    sources: [
      {
        label: "SEC Investor.gov — Compound Interest + Investment Basics",
        url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest",
      },
    ],
    lastVerified: "2026-04-30",
  },

  "retirement-calculator": {
    formula:
      "Trinity-style 4% rule: annual safe spending = 0.04 × initial portfolio, inflation-adjusted thereafter, over a 30-year horizon at 50–75% stocks.",
    assumes:
      "Backtested on 1926–1995 US large-cap + corporate-bond returns. Success ≠ guarantee. Does not model regime change beyond the historical sample, sequence risk under poor early-retirement returns, taxes, or fees. For early retirement (50+ years), 3.0–3.5% is more conservative.",
    sources: [
      {
        label: "Cooley, Hubbard & Walz — Choosing a Withdrawal Rate That Is Sustainable (AAII Journal Feb 1998 — 'Trinity Study')",
        url: "https://www.aaii.com/journal/199802/feature.pdf",
      },
    ],
    lastVerified: "2026-04-30",
  },

  "macro-calculator": {
    formula:
      "Protein 1.4–2.0 g/kg/day (≈ 0.64–0.91 g/lb) for exercising adults. 0.7 g/lb ≈ 1.54 g/kg sits comfortably in this band. Calorie equivalents: protein 4 cal/g, carb 4 cal/g, fat 9 cal/g.",
    assumes:
      "Healthy training adults. Clinical conditions (chronic kidney disease, etc.) require medical guidance. The 0.8 g/kg RDA is the floor for sedentary adults — not athletes.",
    sources: [
      {
        label: "Jäger et al. — ISSN Position Stand: Protein and Exercise (J Int Soc Sports Nutr 2017)",
        url: "https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8",
      },
    ],
    lastVerified: "2026-04-30",
  },

  "zone-2-heart-rate-calculator": {
    formula:
      "Karvonen: target HR = ((HRmax − HRrest) × intensity%) + HRrest. Maffetone (MAF): 180 − age, then ±5 / ±10 by health category.",
    assumes:
      "HRmax estimated as 220 − age (±10–12 bpm error per Tanaka 2001). Not validated for users on beta blockers, with arrhythmias, or under 16 / over 65 (Maffetone explicitly excludes these). MAF adjustments are the author's clinical convention, not peer-reviewed.",
    sources: [
      {
        label: "Karvonen, Kentala & Mustala — The effects of training on heart rate (Ann Med Exp Biol Fenn 1957;35:307-15)",
        url: "https://pubmed.ncbi.nlm.nih.gov/13470504/",
      },
      {
        label: "Maffetone — The 180 Formula (author's site)",
        url: "https://philmaffetone.com/180-formula/",
      },
    ],
    lastVerified: "2026-04-30",
  },
};

export function methodologyForSlug(slug: string): ToolMethodology | undefined {
  return METHODOLOGIES[slug];
}
