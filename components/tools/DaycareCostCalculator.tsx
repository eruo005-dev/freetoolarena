"use client";

import { useMemo, useState } from "react";

type Tier = "major" | "midsize" | "suburban" | "rural";
type CareType = "home" | "center" | "nanny" | "share";
type AgeType = "infant" | "toddler" | "preschool";
type Income = "under60" | "60to100" | "100to150" | "150to250" | "over250";

const TIER_LABEL: Record<Tier, string> = {
  major: "Major city (NYC, SF, Boston)",
  midsize: "Midsize city",
  suburban: "Suburban",
  rural: "Rural / small town",
};

const TIER_MULT: Record<Tier, number> = {
  major: 1.45,
  midsize: 1.1,
  suburban: 0.95,
  rural: 0.75,
};

// Baseline monthly cost for center, full-time 40hr/wk, midsize city
const AGE_BASE: Record<AgeType, number> = {
  infant: 1800,
  toddler: 1500,
  preschool: 1200,
};

const TYPE_MULT: Record<CareType, number> = {
  home: 0.8,
  center: 1.0,
  nanny: 1.9,
  share: 1.2,
};

const INCOME_MID: Record<Income, number> = {
  under60: 45000,
  "60to100": 80000,
  "100to150": 125000,
  "150to250": 200000,
  over250: 300000,
};

const INCOME_LABEL: Record<Income, string> = {
  under60: "Under $60k",
  "60to100": "$60k&mdash;$100k",
  "100to150": "$100k&mdash;$150k",
  "150to250": "$150k&mdash;$250k",
  over250: "Over $250k",
};

export function DaycareCostCalculator() {
  const [tier, setTier] = useState<Tier>("midsize");
  const [careType, setCareType] = useState<CareType>("center");
  const [ageType, setAgeType] = useState<AgeType>("toddler");
  const [hours, setHours] = useState<string>("40");
  const [income, setIncome] = useState<Income>("100to150");

  const result = useMemo(() => {
    const h = Number(hours);
    if (!Number.isFinite(h) || h <= 0 || h > 168) return null;
    const monthlyFull = AGE_BASE[ageType] * TIER_MULT[tier] * TYPE_MULT[careType];
    const hourlyEquivalent = monthlyFull / (40 * 4.333);
    const monthly = hourlyEquivalent * h * 4.333;
    const weekly = monthly / 4.333;
    const annual = monthly * 12;
    const incomeMid = INCOME_MID[income];
    const pctIncome = (annual / incomeMid) * 100;
    return {
      weekly,
      monthly,
      annual,
      hourlyEquivalent,
      pctIncome,
      incomeMid,
    };
  }, [tier, careType, ageType, hours, income]);

  const fmt = (n: number) =>
    "$" + n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Location tier</span>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {(Object.keys(TIER_LABEL) as Tier[]).map((t) => (
              <option key={t} value={t}>
                {TIER_LABEL[t]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Care type</span>
          <select
            value={careType}
            onChange={(e) => setCareType(e.target.value as CareType)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="home">Home daycare</option>
            <option value="center">Daycare center</option>
            <option value="nanny">Nanny (solo)</option>
            <option value="share">Nanny share</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Child age</span>
          <select
            value={ageType}
            onChange={(e) => setAgeType(e.target.value as AgeType)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="infant">Infant (under 18 mo)</option>
            <option value="toddler">Toddler (18&mdash;36 mo)</option>
            <option value="preschool">Preschool (3&mdash;5)</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Hours per week</span>
          <input
            type="number"
            min={1}
            max={80}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-slate-700">Household income bracket</span>
          <select
            value={income}
            onChange={(e) => setIncome(e.target.value as Income)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {(Object.keys(INCOME_LABEL) as Income[]).map((i) => (
              <option
                key={i}
                value={i}
                dangerouslySetInnerHTML={{ __html: INCOME_LABEL[i] }}
              />
            ))}
          </select>
        </label>
      </div>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Weekly</div>
              <div className="text-2xl font-bold text-brand">{fmt(result.weekly)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Monthly</div>
              <div className="text-2xl font-bold text-slate-800">{fmt(result.monthly)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Annual</div>
              <div className="text-2xl font-bold text-slate-800">{fmt(result.annual)}</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-slate-700">
            Hourly equivalent: <strong>${result.hourlyEquivalent.toFixed(2)}/hr</strong> &bull; Annual
            cost ={" "}
            <strong>{result.pctIncome.toFixed(1)}%</strong> of your household income bracket
            (~{fmt(result.incomeMid)}).
          </div>
        </div>
      )}

      <div className="rounded-lg border-l-4 border-brand bg-brand/5 p-4 text-sm text-slate-700">
        Daycare costs a new-car payment every year &mdash; and for infants in major cities, often a
        luxury-car payment. Plan care cost into your family budget like rent, not a line item.
      </div>

      <p className="text-xs text-slate-500">
        Estimates based on 2024 US national averages. Actual costs vary by provider, waitlists, and
        siblings discounts. Check your state&rsquo;s child-care subsidy program &mdash; many families
        qualify and don&rsquo;t realize it.
      </p>
    </div>
  );
}
