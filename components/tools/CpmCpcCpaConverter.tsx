"use client";

import { useMemo, useState } from "react";

export function CpmCpcCpaConverter() {
  const [spend, setSpend] = useState("1000");
  const [impressions, setImpressions] = useState("100000");
  const [clicks, setClicks] = useState("2000");
  const [conversions, setConversions] = useState("80");

  const result = useMemo(() => {
    const s = Number(spend);
    const i = Number(impressions);
    const c = Number(clicks);
    const v = Number(conversions);

    if (!Number.isFinite(s) || !Number.isFinite(i) || !Number.isFinite(c) || !Number.isFinite(v)) return null;
    if (s < 0 || i < 0 || c < 0 || v < 0) return null;

    const cpm = i > 0 ? (s / i) * 1000 : Number.NaN;
    const cpc = c > 0 ? s / c : Number.NaN;
    const ctr = i > 0 ? (c / i) * 100 : Number.NaN;
    const cvr = c > 0 ? (v / c) * 100 : Number.NaN;
    const cpa = v > 0 ? s / v : Number.NaN;

    const impToClickDrop = i > 0 ? ((i - c) / i) * 100 : 0;
    const clickToConvDrop = c > 0 ? ((c - v) / c) * 100 : 0;

    return { cpm, cpc, ctr, cvr, cpa, impressions: i, clicks: c, conversions: v, impToClickDrop, clickToConvDrop };
  }, [spend, impressions, clicks, conversions]);

  const fmt = (n: number) =>
    Number.isFinite(n) ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }) : "&mdash;";
  const num = (n: number) => (Number.isFinite(n) ? n.toLocaleString("en-US", { maximumFractionDigits: 0 }) : "—");
  const pct = (n: number) => (Number.isFinite(n) ? `${n.toFixed(2)}%` : "—");

  const maxFunnel = result ? Math.max(result.impressions, 1) : 1;
  const clickWidth = result ? (result.clicks / maxFunnel) * 100 : 0;
  const convWidth = result ? (result.conversions / maxFunnel) * 100 : 0;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Total spend ($)
          <input type="number" value={spend} onChange={(e) => setSpend(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Impressions
          <input type="number" value={impressions} onChange={(e) => setImpressions(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Clicks
          <input type="number" value={clicks} onChange={(e) => setClicks(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Conversions
          <input type="number" value={conversions} onChange={(e) => setConversions(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">CPM</div>
              <div className="text-2xl font-semibold tabular-nums text-brand" dangerouslySetInnerHTML={{ __html: fmt(result.cpm) }} />
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">CPC</div>
              <div className="text-2xl font-semibold tabular-nums text-brand" dangerouslySetInnerHTML={{ __html: fmt(result.cpc) }} />
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">CPA</div>
              <div className="text-2xl font-semibold tabular-nums text-brand" dangerouslySetInnerHTML={{ __html: fmt(result.cpa) }} />
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">CTR</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{pct(result.ctr)}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">CVR</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{pct(result.cvr)}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Cost per click check</div>
              <div className="text-2xl font-semibold tabular-nums text-brand" dangerouslySetInnerHTML={{ __html: fmt(result.cpc) }} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">Funnel visualization</h3>
            <div className="mt-2 space-y-2 text-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">Impressions</span>
                  <span className="tabular-nums text-slate-600">{num(result.impressions)}</span>
                </div>
                <div className="mt-1 h-3 w-full rounded bg-slate-100">
                  <div className="h-3 rounded bg-brand" style={{ width: "100%" }} />
                </div>
              </div>
              <div className="pl-3 text-[11px] text-slate-500">
                &darr; {result.impToClickDrop.toFixed(1)}% drop-off
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">Clicks</span>
                  <span className="tabular-nums text-slate-600">{num(result.clicks)}</span>
                </div>
                <div className="mt-1 h-3 w-full rounded bg-slate-100">
                  <div className="h-3 rounded bg-brand" style={{ width: `${clickWidth}%` }} />
                </div>
              </div>
              <div className="pl-3 text-[11px] text-slate-500">
                &darr; {result.clickToConvDrop.toFixed(1)}% drop-off
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">Conversions</span>
                  <span className="tabular-nums text-slate-600">{num(result.conversions)}</span>
                </div>
                <div className="mt-1 h-3 w-full rounded bg-slate-100">
                  <div className="h-3 rounded bg-brand" style={{ width: `${convWidth}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-600">
            <div className="mb-2 font-semibold text-slate-700">Platform benchmarks</div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500">
                  <th className="py-1">Platform</th>
                  <th className="py-1">Typical CPM</th>
                  <th className="py-1">Typical CTR</th>
                  <th className="py-1">Typical CPC</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                <tr className="border-t border-slate-100">
                  <td className="py-1">Google Search</td>
                  <td>$15</td>
                  <td>3%</td>
                  <td>$2&ndash;4</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-1">Facebook / Instagram</td>
                  <td>$10</td>
                  <td>1%</td>
                  <td>$1&ndash;2</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-1">LinkedIn</td>
                  <td>$30</td>
                  <td>0.5%</td>
                  <td>$5+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
