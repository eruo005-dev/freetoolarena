"use client";

import { useMemo, useState } from "react";

export function GymMembershipRoiCalculator() {
  const [monthly, setMonthly] = useState<number>(45);
  const [visitsPerWeek, setVisitsPerWeek] = useState<number>(2);
  const [dropInRate, setDropInRate] = useState<number>(15);
  const [annualFees, setAnnualFees] = useState<number>(60);

  const result = useMemo(() => {
    if (![monthly, visitsPerWeek, dropInRate, annualFees].every(Number.isFinite)) return null;
    const visitsPerMonth = visitsPerWeek * 4.33;
    const visitsPerYear = visitsPerWeek * 52;
    const yearlyCost = monthly * 12 + Math.max(0, annualFees);
    const costPerVisit = visitsPerMonth > 0 ? (monthly + annualFees / 12) / visitsPerMonth : Infinity;
    const dropInYearly = visitsPerYear * dropInRate;

    const breakEven = dropInRate > 0 ? Math.ceil((monthly + annualFees / 12) / dropInRate) : Infinity;

    let verdict: "great" | "okay" | "drop" = "okay";
    if (costPerVisit < dropInRate * 0.6) verdict = "great";
    else if (costPerVisit > dropInRate) verdict = "drop";

    return {
      visitsPerMonth,
      visitsPerYear,
      yearlyCost,
      costPerVisit,
      dropInYearly,
      breakEven,
      savingsVsDropIn: dropInYearly - yearlyCost,
      verdict,
    };
  }, [monthly, visitsPerWeek, dropInRate, annualFees]);

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });

  const verdictMap = {
    great: { label: "Worth every dollar", color: "border-emerald-300 bg-emerald-50 text-emerald-900" },
    okay: { label: "Reasonable &mdash; on track", color: "border-amber-300 bg-amber-50 text-amber-900" },
    drop: { label: "You&rsquo;re overpaying", color: "border-rose-300 bg-rose-50 text-rose-900" },
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Monthly fee ($)</span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={monthly}
            onChange={(e) => setMonthly(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Annual fees / dues ($)</span>
          <input
            type="number"
            min={0}
            value={annualFees}
            onChange={(e) => setAnnualFees(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Realistic visits / week</span>
          <input
            type="number"
            min={0}
            max={14}
            step={0.5}
            value={visitsPerWeek}
            onChange={(e) => setVisitsPerWeek(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
          <span className="mt-1 block text-xs text-slate-500">
            Be honest &mdash; the average gym member visits 2&times; per week.
          </span>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Drop-in / day pass rate ($)</span>
          <input
            type="number"
            min={0}
            value={dropInRate}
            onChange={(e) => setDropInRate(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
          <span className="mt-1 block text-xs text-slate-500">
            What you&rsquo;d pay to walk in once.
          </span>
        </label>
      </div>

      {result && (
        <>
          <div className={`rounded-lg border p-4 ${verdictMap[result.verdict].color}`}>
            <div className="text-xs uppercase tracking-wide opacity-70">Verdict</div>
            <div
              className="text-2xl font-bold"
              dangerouslySetInnerHTML={{ __html: verdictMap[result.verdict].label }}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Cost per visit</div>
              <div className="text-2xl font-bold text-slate-800">{Number.isFinite(result.costPerVisit) ? fmt(result.costPerVisit) : "&infin;"}</div>
              <div className="mt-1 text-xs text-slate-500">vs {fmt(dropInRate)} drop-in</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Break-even visits</div>
              <div className="text-2xl font-bold text-slate-800">{Number.isFinite(result.breakEven) ? `${result.breakEven}/mo` : "&mdash;"}</div>
              <div className="mt-1 text-xs text-slate-500">To match drop-in pricing</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Savings vs drop-in</div>
              <div className={`text-2xl font-bold ${result.savingsVsDropIn >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                {fmt(result.savingsVsDropIn)}/yr
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {result.savingsVsDropIn >= 0 ? "Membership wins" : "Drop-ins would be cheaper"}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <h4 className="mb-2 font-semibold text-slate-800">Annual math</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>You&rsquo;ll pay <strong>{fmt(result.yearlyCost)}/year</strong> total.</li>
              <li>You expect <strong>~{Math.round(result.visitsPerYear)}</strong> visits.</li>
              <li>Paying drop-in for the same number of visits would cost <strong>{fmt(result.dropInYearly)}</strong>.</li>
              {result.verdict === "drop" && (
                <li className="text-rose-700">
                  Buying drop-ins as you go would save you <strong>{fmt(yearlyCost(result.dropInYearly, result.yearlyCost))}</strong> per year.
                </li>
              )}
            </ul>
          </div>

          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            <strong className="text-slate-800">Hidden cost reminder:</strong> include initiation fees,
            annual maintenance fees, locker fees, and personal-trainer surcharges. Most chains tack
            on $50&ndash;200 worth of dues you don&rsquo;t see in the headline monthly rate.
          </div>
        </>
      )}
    </div>
  );
}

function yearlyCost(dropIn: number, member: number) {
  return Math.max(0, member - dropIn);
}
