"use client";

import { useMemo, useState } from "react";

export function RuleOf40Calculator() {
  const [growth, setGrowth] = useState("35");
  const [marginInput, setMarginInput] = useState("15");

  const result = useMemo(() => {
    const g = Number(growth);
    const m = Number(marginInput);

    if (!Number.isFinite(g) || !Number.isFinite(m)) return null;

    const score = g + m;

    let tier: { label: string; note: string; tone: string };
    if (score >= 60) {
      tier = { label: "Elite", note: "Top-tier SaaS performance &mdash; 60+ is rarefied air.", tone: "text-emerald-700 bg-emerald-100" };
    } else if (score >= 40) {
      tier = { label: "Passes Rule of 40", note: "Healthy balance of growth and profitability.", tone: "text-sky-700 bg-sky-100" };
    } else if (score >= 20) {
      tier = { label: "Below target", note: "Either growth or margin needs meaningful improvement.", tone: "text-amber-700 bg-amber-100" };
    } else {
      tier = { label: "Fails", note: "Unsustainable mix &mdash; material changes required.", tone: "text-rose-700 bg-rose-100" };
    }

    // Quadrants
    const highGrowth = g >= 30;
    const profitable = m >= 0;
    let quadrant: string;
    if (highGrowth && profitable) quadrant = "High-growth profitable (best)";
    else if (highGrowth && !profitable) quadrant = "High-growth unprofitable";
    else if (!highGrowth && profitable) quadrant = "Low-growth profitable";
    else quadrant = "Low-growth unprofitable (worst)";

    return { score, tier, g, m, quadrant, highGrowth, profitable };
  }, [growth, marginInput]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Revenue growth YoY (%)
          <input type="number" value={growth} onChange={(e) => setGrowth(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Profit margin % (EBITDA or FCF)
          <input type="number" value={marginInput} onChange={(e) => setMarginInput(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Rule of 40 score</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.score.toFixed(1)}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Growth contribution</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.g.toFixed(1)}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Margin contribution</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.m.toFixed(1)}</div>
            </div>
          </div>

          <div className={`rounded-xl p-4 ${result.tier.tone}`}>
            <div className="text-sm font-semibold">
              {result.tier.label} {result.score >= 40 ? "(pass)" : "(fail)"}
            </div>
            <p className="mt-1 text-xs" dangerouslySetInnerHTML={{ __html: result.tier.note }} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">Quadrant</h3>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              <div className={`rounded-lg p-3 ${!result.highGrowth && !result.profitable ? "bg-rose-100 text-rose-700 font-semibold" : "bg-slate-50 text-slate-500"}`}>
                Low-growth unprofitable<br /><span className="text-[10px]">(worst)</span>
              </div>
              <div className={`rounded-lg p-3 ${result.highGrowth && !result.profitable ? "bg-amber-100 text-amber-700 font-semibold" : "bg-slate-50 text-slate-500"}`}>
                High-growth unprofitable
              </div>
              <div className={`rounded-lg p-3 ${!result.highGrowth && result.profitable ? "bg-sky-100 text-sky-700 font-semibold" : "bg-slate-50 text-slate-500"}`}>
                Low-growth profitable
              </div>
              <div className={`rounded-lg p-3 ${result.highGrowth && result.profitable ? "bg-emerald-100 text-emerald-700 font-semibold" : "bg-slate-50 text-slate-500"}`}>
                High-growth profitable<br /><span className="text-[10px]">(best)</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">Current: {result.quadrant}</p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-600">
            <div className="mb-2 font-semibold text-slate-700">Benchmarks</div>
            <ul className="space-y-1">
              <li>40+ &mdash; healthy SaaS (passes the rule)</li>
              <li>60+ &mdash; elite (top decile public SaaS)</li>
              <li>&lt; 40 &mdash; either growth or margin must improve</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
