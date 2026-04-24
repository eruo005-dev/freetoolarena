"use client";

import { useMemo, useState } from "react";

export function NetRevenueRetentionCalculator() {
  const [startMrr, setStartMrr] = useState("100000");
  const [expansion, setExpansion] = useState("15000");
  const [contraction, setContraction] = useState("3000");
  const [churn, setChurn] = useState("4000");

  const result = useMemo(() => {
    const s = Number(startMrr);
    const e = Number(expansion);
    const c = Number(contraction);
    const ch = Number(churn);

    if (!Number.isFinite(s) || !Number.isFinite(e) || !Number.isFinite(c) || !Number.isFinite(ch) || s <= 0) {
      return null;
    }

    const endingMrr = s + e - c - ch;
    const nrr = (endingMrr / s) * 100;
    const grr = ((s - c - ch) / s) * 100;

    let tier: { label: string; note: string; tone: string };
    if (nrr >= 120) {
      tier = { label: "Elite SaaS", note: "Top public SaaS territory &mdash; growth compounds from existing customers alone.", tone: "text-emerald-700 bg-emerald-100" };
    } else if (nrr >= 100) {
      tier = { label: "Good", note: "You&rsquo;re growing from existing cohort &mdash; healthy position.", tone: "text-sky-700 bg-sky-100" };
    } else if (nrr >= 90) {
      tier = { label: "Concerning", note: "Cohort shrinks over time &mdash; new sales must fill the gap.", tone: "text-amber-700 bg-amber-100" };
    } else {
      tier = { label: "Bleeding", note: "Serious retention problem &mdash; prioritize churn work immediately.", tone: "text-rose-700 bg-rose-100" };
    }

    return { nrr, grr, endingMrr, tier };
  }, [startMrr, expansion, contraction, churn]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Starting MRR from cohort ($)
          <input type="number" value={startMrr} onChange={(e) => setStartMrr(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Expansion MRR ($)
          <input type="number" value={expansion} onChange={(e) => setExpansion(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Contraction MRR ($)
          <input type="number" value={contraction} onChange={(e) => setContraction(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Churned MRR ($)
          <input type="number" value={churn} onChange={(e) => setChurn(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Net Revenue Retention</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.nrr.toFixed(1)}%</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Gross Revenue Retention</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.grr.toFixed(1)}%</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Ending cohort MRR</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.endingMrr)}</div>
            </div>
          </div>

          <div className={`rounded-xl p-4 ${result.tier.tone}`}>
            <div className="text-sm font-semibold">{result.tier.label}</div>
            <p className="mt-1 text-xs" dangerouslySetInnerHTML={{ __html: result.tier.note }} />
          </div>

          <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-600">
            <div className="mb-2 font-semibold text-slate-700">NRR reference</div>
            <ul className="space-y-1">
              <li>&gt; 120% &mdash; elite SaaS (top public benchmarks 115&ndash;130%)</li>
              <li>100&ndash;120% &mdash; good, growing from existing cohort</li>
              <li>90&ndash;100% &mdash; concerning, relying on new sales</li>
              <li>&lt; 90% &mdash; bleeding revenue</li>
            </ul>
            <p className="mt-2 italic">NRR &gt; 100% means you grow without new customers.</p>
          </div>
        </div>
      )}
    </div>
  );
}
