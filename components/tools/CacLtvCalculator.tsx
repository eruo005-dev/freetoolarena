"use client";

import { useMemo, useState } from "react";

type LifetimeMode = "months" | "churn";

export function CacLtvCalculator() {
  const [cac, setCac] = useState("400");
  const [arpu, setArpu] = useState("50");
  const [margin, setMargin] = useState("80");
  const [mode, setMode] = useState<LifetimeMode>("months");
  const [lifetime, setLifetime] = useState("24");
  const [churn, setChurn] = useState("4");

  const result = useMemo(() => {
    const cacNum = Number(cac);
    const arpuNum = Number(arpu);
    const marginNum = Number(margin);
    const lifeMonths =
      mode === "months"
        ? Number(lifetime)
        : Number(churn) > 0
          ? 100 / Number(churn)
          : Number.NaN;

    if (
      !Number.isFinite(cacNum) ||
      !Number.isFinite(arpuNum) ||
      !Number.isFinite(marginNum) ||
      !Number.isFinite(lifeMonths) ||
      cacNum <= 0 ||
      arpuNum <= 0 ||
      lifeMonths <= 0
    ) {
      return null;
    }

    const grossMargin = marginNum / 100;
    const contributionPerMonth = arpuNum * grossMargin;
    const ltv = contributionPerMonth * lifeMonths;
    const ratio = ltv / cacNum;
    const payback = contributionPerMonth > 0 ? cacNum / contributionPerMonth : Number.POSITIVE_INFINITY;

    let tier: { label: string; note: string; tone: string };
    if (ratio < 1) {
      tier = { label: "Losing money", note: "LTV below CAC &mdash; each customer costs more than they earn.", tone: "text-rose-700 bg-rose-100" };
    } else if (ratio < 3) {
      tier = { label: "Struggling", note: "Acquisition is expensive relative to value. Improve retention or margin.", tone: "text-amber-700 bg-amber-100" };
    } else if (ratio <= 5) {
      tier = { label: "Healthy SaaS target", note: "3&mdash;5x is the textbook sweet spot for sustainable SaaS growth.", tone: "text-emerald-700 bg-emerald-100" };
    } else {
      tier = { label: "Possibly under-investing", note: "Above 5x often signals you could spend more on growth.", tone: "text-sky-700 bg-sky-100" };
    }

    return { ltv, cac: cacNum, ratio, payback, lifeMonths, tier };
  }, [cac, arpu, margin, mode, lifetime, churn]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Customer acquisition cost ($)
          <input
            type="number"
            value={cac}
            onChange={(e) => setCac(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Avg monthly revenue / customer ($)
          <input
            type="number"
            value={arpu}
            onChange={(e) => setArpu(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Gross margin (%)
          <input
            type="number"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Lifetime input mode
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as LifetimeMode)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value="months">Lifetime in months</option>
            <option value="churn">Monthly churn rate %</option>
          </select>
        </label>
        {mode === "months" ? (
          <label className="text-sm font-medium text-slate-700 sm:col-span-2">
            Average customer lifetime (months)
            <input
              type="number"
              value={lifetime}
              onChange={(e) => setLifetime(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            />
          </label>
        ) : (
          <label className="text-sm font-medium text-slate-700 sm:col-span-2">
            Monthly churn rate (%)
            <input
              type="number"
              value={churn}
              onChange={(e) => setChurn(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            />
          </label>
        )}
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">LTV</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.ltv)}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">CAC</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.cac)}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">LTV : CAC ratio</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.ratio.toFixed(2)}x</div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Payback period</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {Number.isFinite(result.payback) ? `${result.payback.toFixed(1)} months` : "N/A"}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Months of gross-margin revenue needed to recover CAC.
            </p>
          </div>

          <div className={`rounded-xl p-4 ${result.tier.tone}`}>
            <div className="text-sm font-semibold">{result.tier.label}</div>
            <p className="mt-1 text-xs" dangerouslySetInnerHTML={{ __html: result.tier.note }} />
          </div>

          <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-600">
            <div className="mb-2 font-semibold text-slate-700">Tier reference</div>
            <ul className="space-y-1">
              <li>&lt; 1x &mdash; losing money on every customer</li>
              <li>1&ndash;3x &mdash; struggling, unit economics unhealthy</li>
              <li>3&ndash;5x &mdash; healthy SaaS target</li>
              <li>&gt; 5x &mdash; possibly under-investing in growth</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
