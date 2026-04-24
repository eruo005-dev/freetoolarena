"use client";

import { useMemo, useState } from "react";

type Frequency = "rarely" | "few_months" | "monthly";

const FREQ_LABEL: Record<Frequency, string> = {
  rarely: "Rarely (once a year or less)",
  few_months: "Every few months",
  monthly: "Monthly or more often",
};

const FREQ_PER_YEAR: Record<Frequency, number> = {
  rarely: 1,
  few_months: 4,
  monthly: 12,
};

function currency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function RepairOrReplaceCalculator() {
  const [repairCost, setRepairCost] = useState("2500");
  const [carValue, setCarValue] = useState("6000");
  const [freq, setFreq] = useState<Frequency>("few_months");
  const [yearsKeep, setYearsKeep] = useState("3");
  const [replacementCost, setReplacementCost] = useState("22000");

  const result = useMemo(() => {
    const repair = parseFloat(repairCost);
    const value = parseFloat(carValue);
    const years = parseFloat(yearsKeep);
    const replace = parseFloat(replacementCost);
    if (![repair, value, years, replace].every((n) => Number.isFinite(n) && n >= 0) || years <= 0 || value <= 0) return null;

    const ratio = repair / value;
    const visitsPerYear = FREQ_PER_YEAR[freq];
    const avgVisitCost = repair / Math.max(1, visitsPerYear / 4);
    const twoYearRepairProjection = repair + visitsPerYear * 2 * (avgVisitCost * 0.5);
    const monthsKept = years * 12;
    const repairCostPerMonth = (repair + visitsPerYear * years * (avgVisitCost * 0.4)) / monthsKept;

    const replaceDepreciationPerMonth = replace / (5 * 12);
    const twoYearReplaceProjection = replaceDepreciationPerMonth * 24;

    let recommendation: "repair" | "replace" | "marginal";
    const reasons: string[] = [];

    if (ratio > 0.75) {
      recommendation = "replace";
      reasons.push(`Repair is ${Math.round(ratio * 100)}% of the car&rsquo;s value &mdash; almost always a bad investment.`);
    } else if (ratio > 0.5) {
      recommendation = "marginal";
      reasons.push(`Repair is ${Math.round(ratio * 100)}% of the car&rsquo;s value &mdash; borderline, lean toward replacing.`);
    } else {
      recommendation = "repair";
      reasons.push(`Repair is ${Math.round(ratio * 100)}% of the car&rsquo;s value &mdash; well under the 50% rule of thumb.`);
    }

    if (freq === "monthly") {
      reasons.push("Monthly-plus shop visits signal cascading failures &mdash; cumulative 2-year cost will likely eclipse a replacement down payment.");
      if (recommendation === "repair") recommendation = "marginal";
      else if (recommendation === "marginal") recommendation = "replace";
    } else if (freq === "few_months") {
      reasons.push("Repairs every few months add up &mdash; factor ongoing costs, not just this bill.");
    } else {
      reasons.push("Infrequent repairs make fixing this one reasonable if the rest of the car is sound.");
    }

    if (repairCostPerMonth < replaceDepreciationPerMonth * 0.6) {
      reasons.push(`Cost per month kept (${currency(repairCostPerMonth)}) is far below replacement ownership (${currency(replaceDepreciationPerMonth)}).`);
    } else if (repairCostPerMonth > replaceDepreciationPerMonth) {
      reasons.push(`Cost per month kept (${currency(repairCostPerMonth)}) exceeds replacement ownership (${currency(replaceDepreciationPerMonth)}).`);
      if (recommendation === "repair") recommendation = "marginal";
    }

    return {
      ratio,
      recommendation,
      reasons,
      repairCostPerMonth,
      replaceDepreciationPerMonth,
      twoYearRepairProjection,
      twoYearReplaceProjection,
    };
  }, [repairCost, carValue, freq, yearsKeep, replacementCost]);

  const badgeStyle = (rec: "repair" | "replace" | "marginal") => {
    if (rec === "repair") return "bg-emerald-100 text-emerald-900 border-emerald-300";
    if (rec === "replace") return "bg-rose-100 text-rose-900 border-rose-300";
    return "bg-amber-100 text-amber-900 border-amber-300";
  };

  const recLabel = (rec: "repair" | "replace" | "marginal") => {
    if (rec === "repair") return "Repair it";
    if (rec === "replace") return "Replace it";
    return "Marginal &mdash; lean toward replacing";
  };

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Estimated repair cost ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={50}
            value={repairCost}
            onChange={(e) => setRepairCost(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Current car value ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={100}
            value={carValue}
            onChange={(e) => setCarValue(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Repair frequency lately</span>
          <select
            value={freq}
            onChange={(e) => setFreq(e.target.value as Frequency)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="rarely">{FREQ_LABEL.rarely}</option>
            <option value="few_months">{FREQ_LABEL.few_months}</option>
            <option value="monthly">{FREQ_LABEL.monthly}</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Years you&rsquo;d keep it if repaired</span>
          <input
            type="number"
            inputMode="decimal"
            min={0.5}
            step={0.5}
            value={yearsKeep}
            onChange={(e) => setYearsKeep(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Cost of comparable replacement ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={500}
            value={replacementCost}
            onChange={(e) => setReplacementCost(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      {result ? (
        <>
          <div className="rounded-xl bg-slate-50 p-5 space-y-3">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Recommendation</p>
            <span className={`inline-block rounded-full border px-4 py-2 text-base font-bold ${badgeStyle(result.recommendation)}`} dangerouslySetInnerHTML={{ __html: recLabel(result.recommendation) }} />
            <p className="text-3xl font-bold text-brand">Repair / value ratio: {Math.round(result.ratio * 100)}%</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2">
            <p className="text-sm font-semibold text-slate-800">Rationale</p>
            <ul className="text-sm text-slate-700 space-y-1.5 list-disc pl-5">
              {result.reasons.map((r, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: r }} />
              ))}
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">If you repair</p>
              <p className="text-xl font-bold text-slate-900">{currency(result.repairCostPerMonth)}/mo kept</p>
              <p className="text-sm text-slate-600 mt-1">2-year projected: {currency(result.twoYearRepairProjection)}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">If you replace</p>
              <p className="text-xl font-bold text-slate-900">{currency(result.replaceDepreciationPerMonth)}/mo ownership</p>
              <p className="text-sm text-slate-600 mt-1">2-year projected: {currency(result.twoYearReplaceProjection)}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Enter positive values above for a recommendation.</div>
      )}

      <p className="text-xs text-slate-500">
        Rules of thumb &mdash; 50% and 75% thresholds, cumulative-cost projections. Your decision should also weigh safety, reliability for commuting, and whether a major system (engine / transmission) is the failure point.
      </p>
    </div>
  );
}
