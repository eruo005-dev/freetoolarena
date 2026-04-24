"use client";

import { useMemo, useState } from "react";

export function SaasChurnRateCalculator() {
  const [custStart, setCustStart] = useState("500");
  const [custEnd, setCustEnd] = useState("480");
  const [newCust, setNewCust] = useState("40");
  const [mrrStart, setMrrStart] = useState("50000");
  const [mrrEnd, setMrrEnd] = useState("52000");
  const [expansion, setExpansion] = useState("5000");
  const [newMrr, setNewMrr] = useState("6000");

  const result = useMemo(() => {
    const cs = Number(custStart);
    const ce = Number(custEnd);
    const cn = Number(newCust);
    const ms = Number(mrrStart);
    const me = Number(mrrEnd);
    const ex = Number(expansion);
    const nm = Number(newMrr);

    if (
      !Number.isFinite(cs) || !Number.isFinite(ce) || !Number.isFinite(cn) ||
      !Number.isFinite(ms) || !Number.isFinite(me) || !Number.isFinite(ex) ||
      !Number.isFinite(nm) || cs <= 0 || ms <= 0
    ) {
      return null;
    }

    const customersLost = Math.max(0, cs + cn - ce);
    const customerChurn = (customersLost / cs) * 100;

    // Lost MRR = starting + expansion + new - ending (implied churn)
    const lostMrr = Math.max(0, ms + ex + nm - me);
    const grossMrrChurn = (lostMrr / ms) * 100;
    const netMrrChurn = ((lostMrr - ex) / ms) * 100;

    const tierFor = (annualPct: number) => {
      if (annualPct < 5) return { label: "Excellent", tone: "text-emerald-700 bg-emerald-100" };
      if (annualPct < 10) return { label: "Good", tone: "text-sky-700 bg-sky-100" };
      if (annualPct < 20) return { label: "Concerning", tone: "text-amber-700 bg-amber-100" };
      return { label: "Critical", tone: "text-rose-700 bg-rose-100" };
    };

    const annualCustomerChurn = (1 - Math.pow(1 - customerChurn / 100, 12)) * 100;
    const annualGrossMrrChurn = (1 - Math.pow(1 - grossMrrChurn / 100, 12)) * 100;

    return {
      customersLost,
      customerChurn,
      grossMrrChurn,
      netMrrChurn,
      lostMrr,
      annualCustomerChurn,
      annualGrossMrrChurn,
      customerTier: tierFor(annualCustomerChurn),
      mrrTier: tierFor(annualGrossMrrChurn),
    };
  }, [custStart, custEnd, newCust, mrrStart, mrrEnd, expansion, newMrr]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const pct = (n: number) => `${n.toFixed(2)}%`;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-700">Customer churn inputs</h3>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          <label className="text-sm font-medium text-slate-700">
            Customers (start of month)
            <input type="number" value={custStart} onChange={(e) => setCustStart(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Customers (end of month)
            <input type="number" value={custEnd} onChange={(e) => setCustEnd(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            New customers added
            <input type="number" value={newCust} onChange={(e) => setNewCust(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-700">Revenue churn inputs</h3>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            MRR start ($)
            <input type="number" value={mrrStart} onChange={(e) => setMrrStart(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            MRR end ($)
            <input type="number" value={mrrEnd} onChange={(e) => setMrrEnd(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Expansion MRR ($)
            <input type="number" value={expansion} onChange={(e) => setExpansion(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            New-customer MRR ($)
            <input type="number" value={newMrr} onChange={(e) => setNewMrr(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
          </label>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Customer churn</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{pct(result.customerChurn)}</div>
              <div className="mt-1 text-xs text-slate-500">{result.customersLost} lost this month</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Gross MRR churn</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{pct(result.grossMrrChurn)}</div>
              <div className="mt-1 text-xs text-slate-500">{fmt(result.lostMrr)} lost MRR</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Net MRR churn</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{pct(result.netMrrChurn)}</div>
              <div className="mt-1 text-xs text-slate-500">
                {result.netMrrChurn < 0 ? "Negative churn &mdash; growing without new customers" : "Expansion not offsetting losses"}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className={`rounded-xl p-4 ${result.customerTier.tone}`}>
              <div className="text-xs font-medium uppercase tracking-wide opacity-70">Annual customer churn</div>
              <div className="text-2xl font-semibold tabular-nums">{pct(result.annualCustomerChurn)}</div>
              <div className="mt-1 text-sm font-semibold">{result.customerTier.label}</div>
            </div>
            <div className={`rounded-xl p-4 ${result.mrrTier.tone}`}>
              <div className="text-xs font-medium uppercase tracking-wide opacity-70">Annual MRR churn</div>
              <div className="text-2xl font-semibold tabular-nums">{pct(result.annualGrossMrrChurn)}</div>
              <div className="mt-1 text-sm font-semibold">{result.mrrTier.label}</div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-600">
            <div className="mb-2 font-semibold text-slate-700">Annual churn tiers</div>
            <ul className="space-y-1">
              <li>&lt; 5% &mdash; excellent (best-in-class SaaS)</li>
              <li>5&ndash;10% &mdash; good (typical healthy SMB SaaS)</li>
              <li>10&ndash;20% &mdash; concerning (retention work needed)</li>
              <li>&gt; 20% &mdash; critical (leaky bucket)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
