/**
 * Pure calculation functions — used by both the React tool components AND
 * the public JSON API at /api/tools/<slug>.
 *
 * Every function here:
 *  - Takes plain JSON-friendly inputs
 *  - Returns a plain JSON-friendly result
 *  - Has zero dependencies (no React, no Next, no fetch)
 *  - Is unit-testable in isolation
 *
 * No public-API client should ever need to render HTML to use these tools.
 * Most competitor free-tool sites lock the math behind a UI; we expose it.
 */

// ---------------------------------------------------------------------------
// Mortgage / loan amortization (shared math)
// ---------------------------------------------------------------------------

export interface MortgageInput {
  /** Loan principal in dollars (or your local currency). */
  principal: number;
  /** Annual interest rate, as a percent (e.g. 6.5 for 6.5%). */
  annualRate: number;
  /** Term in years. */
  years: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  payments: number;
}

/** Closed-form mortgage payment. r = monthly rate; n = total months. */
export function mortgage({ principal, annualRate, years }: MortgageInput): MortgageResult {
  if (!Number.isFinite(principal) || principal < 0) throw new Error("principal must be a non-negative number");
  if (!Number.isFinite(annualRate) || annualRate < 0) throw new Error("annualRate must be a non-negative number");
  if (!Number.isFinite(years) || years <= 0) throw new Error("years must be > 0");
  const n = Math.round(years * 12);
  const r = annualRate / 100 / 12;
  const monthlyPayment = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  const totalPaid = monthlyPayment * n;
  return {
    monthlyPayment: round(monthlyPayment, 2),
    totalInterest: round(totalPaid - principal, 2),
    totalPaid: round(totalPaid, 2),
    payments: n,
  };
}

// ---------------------------------------------------------------------------
// Compound interest (with optional monthly contribution)
// ---------------------------------------------------------------------------

export interface CompoundInput {
  /** Starting principal. */
  principal: number;
  /** Annual return rate, as a percent. */
  annualRate: number;
  /** Investment horizon in years. */
  years: number;
  /** Monthly contribution at the END of each month. Optional. */
  monthlyContribution?: number;
  /** Compounding frequency per year (default 12 = monthly). */
  compoundingPerYear?: number;
}

export interface CompoundResult {
  futureValue: number;
  totalContributed: number;
  totalInterest: number;
}

export function compoundInterest({
  principal,
  annualRate,
  years,
  monthlyContribution = 0,
  compoundingPerYear = 12,
}: CompoundInput): CompoundResult {
  if (!Number.isFinite(principal) || principal < 0) throw new Error("principal must be a non-negative number");
  if (!Number.isFinite(annualRate) || annualRate < -100) throw new Error("annualRate out of range");
  if (!Number.isFinite(years) || years <= 0) throw new Error("years must be > 0");
  if (!Number.isFinite(compoundingPerYear) || compoundingPerYear < 1) throw new Error("compoundingPerYear must be >= 1");

  const n = compoundingPerYear;
  const t = years;
  const r = annualRate / 100;

  // Lump-sum future value
  const lumpFv = principal * Math.pow(1 + r / n, n * t);

  // Annuity future value (contributions at period end). Convert monthly
  // contribution into per-period for the chosen compounding frequency.
  const monthsPerPeriod = 12 / n;
  const contributionPerPeriod = monthlyContribution * monthsPerPeriod;
  const annuityFv =
    r === 0
      ? contributionPerPeriod * n * t
      : contributionPerPeriod * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));

  const futureValue = lumpFv + annuityFv;
  const totalContributed = principal + monthlyContribution * 12 * t;

  return {
    futureValue: round(futureValue, 2),
    totalContributed: round(totalContributed, 2),
    totalInterest: round(futureValue - totalContributed, 2),
  };
}

// ---------------------------------------------------------------------------
// Tip calculator
// ---------------------------------------------------------------------------

export interface TipInput {
  bill: number;
  tipPercent: number;
  people?: number;
}

export interface TipResult {
  tipAmount: number;
  total: number;
  perPerson: number;
}

export function tip({ bill, tipPercent, people = 1 }: TipInput): TipResult {
  if (!Number.isFinite(bill) || bill < 0) throw new Error("bill must be a non-negative number");
  if (!Number.isFinite(tipPercent) || tipPercent < 0) throw new Error("tipPercent must be non-negative");
  const p = Math.max(1, Math.floor(people));
  const tipAmount = bill * (tipPercent / 100);
  const total = bill + tipAmount;
  return {
    tipAmount: round(tipAmount, 2),
    total: round(total, 2),
    perPerson: round(total / p, 2),
  };
}

// ---------------------------------------------------------------------------
// BMI calculator
// ---------------------------------------------------------------------------

export interface BmiInput {
  /** Weight in kilograms. */
  weightKg: number;
  /** Height in metres. */
  heightM: number;
}

export interface BmiResult {
  bmi: number;
  category: "underweight" | "healthy" | "overweight" | "obese";
}

export function bmi({ weightKg, heightM }: BmiInput): BmiResult {
  if (!Number.isFinite(weightKg) || weightKg <= 0) throw new Error("weightKg must be > 0");
  if (!Number.isFinite(heightM) || heightM <= 0) throw new Error("heightM must be > 0");
  const value = weightKg / (heightM * heightM);
  let category: BmiResult["category"];
  if (value < 18.5) category = "underweight";
  else if (value < 25.0) category = "healthy";
  else if (value < 30.0) category = "overweight";
  else category = "obese";
  return { bmi: round(value, 2), category };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function round(n: number, decimals: number): number {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}
