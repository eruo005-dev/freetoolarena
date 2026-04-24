"use client";

import { useMemo, useState } from "react";

export function SaasMagicNumberCalculator() {
  const [netNewArr, setNetNewArr] = useState(600000);
  const [smSpend, setSmSpend] = useState(500000);

  const result = useMemo(() => {
    if (
      !Number.isFinite(netNewArr) ||
      !Number.isFinite(smSpend) ||
      smSpend <= 0
    ) {
      return null;
    }
    const magic = (netNewArr * 4) / smSpend;

    let tier: string;
    let tone: string;
    let advice: string;
    if (magic >= 1) {
      tier = "Great — push more spend";
      tone = "text-emerald-700 bg-emerald-50 border-emerald-200";
      advice =
        "Each sales & marketing dollar returns strong ARR. Consider accelerating hiring and paid channels.";
    } else if (magic >= 0.75) {
      tier = "Good — efficient growth";
      tone = "text-emerald-700 bg-emerald-50 border-emerald-200";
      advice = "Healthy efficiency. Maintain investment levels and optimize the funnel.";
    } else if (magic >= 0.5) {
      tier = "Concerning — tighten before scaling";
      tone = "text-amber-700 bg-amber-50 border-amber-200";
      advice =
        "Revenue is coming but not efficiently. Audit channel mix, quota attainment, and ICP before adding more spend.";
    } else {
      tier = "Inefficient — slow spend";
      tone = "text-rose-700 bg-rose-50 border-rose-200";
      advice =
        "You are burning cash for marginal ARR. Pull back S&M investment until unit economics recover.";
    }

    const annualizedArrAdd = netNewArr * 4;
    const annualizedSpend = smSpend * 4;

    return { magic, tier, tone, advice, annualizedArrAdd, annualizedSpend };
  }, [netNewArr, smSpend]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Net new ARR this quarter ($)
          </span>
          <input
            type="number"
            min={0}
            value={netNewArr}
            onChange={(e) => setNetNewArr(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            S&amp;M spend this quarter ($)
          </span>
          <input
            type="number"
            min={0}
            value={smSpend}
            onChange={(e) => setSmSpend(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      {result ? (
        <>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
              Magic Number
            </p>
            <p className="text-4xl font-bold text-brand tabular-nums">
              {result.magic.toFixed(2)}
            </p>
            <p className="text-sm text-slate-600 mt-1">
              (Net new ARR &times; 4) / S&amp;M spend
            </p>
          </div>

          <div className={`rounded-xl border p-5 ${result.tone}`}>
            <p className="text-xs uppercase tracking-wide font-semibold mb-1">Efficiency tier</p>
            <p className="text-lg font-semibold mb-2">{result.tier}</p>
            <p className="text-sm">{result.advice}</p>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3">
              If this quarter continues for a year
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Projected annual ARR added</dt>
                <dd className="font-semibold text-slate-900 tabular-nums">
                  {fmt(result.annualizedArrAdd)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Projected annual S&amp;M spend</dt>
                <dd className="font-semibold text-slate-900 tabular-nums">
                  {fmt(result.annualizedSpend)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                <dt className="font-semibold text-slate-800">ARR added per $1 of S&amp;M</dt>
                <dd className="font-bold text-brand tabular-nums">
                  ${(result.annualizedArrAdd / result.annualizedSpend).toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
              Benchmark rule
            </p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                <span className="font-semibold">&gt; 1.0</span> &mdash; Pour fuel on the fire
              </li>
              <li>
                <span className="font-semibold">0.75 &ndash; 1.0</span> &mdash; Keep investing, tune
                the funnel
              </li>
              <li>
                <span className="font-semibold">0.5 &ndash; 0.75</span> &mdash; Pause scaling, fix
                conversion
              </li>
              <li>
                <span className="font-semibold">&lt; 0.5</span> &mdash; Slow spend and re-examine
                ICP
              </li>
            </ul>
          </div>
        </>
      ) : (
        <p className="text-sm text-rose-600">Enter a positive quarterly S&amp;M spend.</p>
      )}
    </div>
  );
}
