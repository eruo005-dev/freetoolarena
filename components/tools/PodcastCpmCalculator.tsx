"use client";

import { useMemo, useState } from "react";

type Placement = "pre" | "mid" | "post";
type ReadType = "host" | "produced";

const PLACEMENTS: { value: Placement; label: string; low: number; high: number }[] = [
  { value: "pre", label: "Pre-roll (opening)", low: 15, high: 20 },
  { value: "mid", label: "Mid-roll (highest value)", low: 20, high: 30 },
  { value: "post", label: "Post-roll (closing)", low: 10, high: 15 },
];

export function PodcastCpmCalculator() {
  const [downloads, setDownloads] = useState<number>(5000);
  const [adsPerEp, setAdsPerEp] = useState<number>(2);
  const [epsPerMonth, setEpsPerMonth] = useState<number>(4);
  const [placement, setPlacement] = useState<Placement>("mid");
  const [readType, setReadType] = useState<ReadType>("host");

  const result = useMemo(() => {
    const p = PLACEMENTS.find((x) => x.value === placement)!;
    const hostMul = readType === "host" ? 2 : 1;
    const cpmLow = p.low * hostMul;
    const cpmHigh = p.high * hostMul;
    const cpmMid = (cpmLow + cpmHigh) / 2;

    const dls = Number.isFinite(downloads) && downloads > 0 ? downloads : 0;
    const ads = Number.isFinite(adsPerEp) && adsPerEp > 0 ? adsPerEp : 0;
    const eps = Number.isFinite(epsPerMonth) && epsPerMonth > 0 ? epsPerMonth : 0;

    const impressionsPerEp = dls * ads;
    const monthlyImpressions = impressionsPerEp * eps;

    const monthlyLow = (monthlyImpressions / 1000) * cpmLow;
    const monthlyMid = (monthlyImpressions / 1000) * cpmMid;
    const monthlyHigh = (monthlyImpressions / 1000) * cpmHigh;

    const yearlyMid = monthlyMid * 12;
    const totalDownloadsMonthly = dls * eps;
    const rpm = totalDownloadsMonthly > 0 ? (monthlyMid / totalDownloadsMonthly) * 1000 : 0;

    // Same audience on a YouTube dedicated video ad = ~$50 per 1000 subs equivalent
    // Approximate by comparing total monthly downloads to YouTube dedicated video revenue if posted weekly
    const youtubeEquivMonthly = (totalDownloadsMonthly / 1000) * 50 * 0.25;

    return {
      cpmLow,
      cpmMid,
      cpmHigh,
      monthlyLow,
      monthlyMid,
      monthlyHigh,
      yearlyMid,
      rpm,
      youtubeEquivMonthly,
    };
  }, [downloads, adsPerEp, epsPerMonth, placement, readType]);

  const fmt = (n: number) =>
    Number.isFinite(n)
      ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
      : "$0";

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Downloads per episode</span>
          <input
            type="number"
            min={0}
            value={downloads}
            onChange={(e) => setDownloads(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Ads per episode</span>
          <input
            type="number"
            min={0}
            value={adsPerEp}
            onChange={(e) => setAdsPerEp(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Episodes per month</span>
          <input
            type="number"
            min={0}
            value={epsPerMonth}
            onChange={(e) => setEpsPerMonth(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Ad placement</span>
          <select
            value={placement}
            onChange={(e) => setPlacement(e.target.value as Placement)}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {PLACEMENTS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label} (${p.low}-${p.high} CPM)
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-slate-700">Read type</span>
          <select
            value={readType}
            onChange={(e) => setReadType(e.target.value as ReadType)}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="host">Host-read (2x CPM)</option>
            <option value="produced">Produced / dynamic insertion</option>
          </select>
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-base font-semibold text-brand">Projected ad revenue</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md bg-white p-3 shadow-sm">
            <div className="text-xs uppercase text-slate-500">Monthly (low)</div>
            <div className="text-xl font-bold text-slate-900">{fmt(result.monthlyLow)}</div>
          </div>
          <div className="rounded-md bg-white p-3 shadow-sm ring-2 ring-brand/40">
            <div className="text-xs uppercase text-slate-500">Monthly (mid)</div>
            <div className="text-xl font-bold text-brand">{fmt(result.monthlyMid)}</div>
          </div>
          <div className="rounded-md bg-white p-3 shadow-sm">
            <div className="text-xs uppercase text-slate-500">Monthly (high)</div>
            <div className="text-xl font-bold text-slate-900">{fmt(result.monthlyHigh)}</div>
          </div>
        </div>
        <dl className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <div className="flex justify-between"><dt>Effective CPM range</dt><dd>${result.cpmLow.toFixed(0)}&mdash;${result.cpmHigh.toFixed(0)}</dd></div>
          <div className="flex justify-between"><dt>Effective RPM (per 1000 downloads)</dt><dd>{fmt(result.rpm)}</dd></div>
          <div className="flex justify-between sm:col-span-2 border-t pt-2 font-semibold"><dt>Yearly (mid estimate)</dt><dd>{fmt(result.yearlyMid)}</dd></div>
        </dl>
      </div>

      <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
        <h4 className="font-semibold text-slate-900">How this compares</h4>
        <p className="mt-2">
          The same monthly audience running a dedicated YouTube brand-deal video would earn roughly{" "}
          <span className="font-semibold text-brand">{fmt(result.youtubeEquivMonthly)}</span> per month &mdash;
          YouTube dedicated videos pay a premium over podcast CPMs, but podcasts have stickier listeners and higher
          conversion for host-read reads.
        </p>
      </div>
    </div>
  );
}
