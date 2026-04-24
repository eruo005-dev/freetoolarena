"use client";

import { useMemo, useState } from "react";

type Tier = "beginner" | "intermediate" | "expert";
type Deliverable = "testimonial" | "photo" | "single_video" | "multi_video";
type Usage = "organic" | "paid_ads" | "broadcast";

const TIERS: { value: Tier; label: string; base: { low: number; high: number } }[] = [
  { value: "beginner", label: "Beginner (0-10 brand deals)", base: { low: 150, high: 300 } },
  { value: "intermediate", label: "Intermediate (10-50 deals)", base: { low: 400, high: 750 } },
  { value: "expert", label: "Expert (50+ deals, portfolio)", base: { low: 1000, high: 3000 } },
];

const DELIVERABLES: { value: Deliverable; label: string; factor: number }[] = [
  { value: "testimonial", label: "Basic testimonial (30-60s)", factor: 0.6 },
  { value: "photo", label: "Static photo set (3-5 images)", factor: 0.75 },
  { value: "single_video", label: "Single video (60-90s polished)", factor: 1.0 },
  { value: "multi_video", label: "Multi-video package (3+ videos)", factor: 2.5 },
];

const USAGE_OPTIONS: { value: Usage; label: string; addPct: number; note: string }[] = [
  { value: "organic", label: "Organic only (brand's feed)", addPct: 0, note: "Brand posts to their own channels." },
  { value: "paid_ads", label: "Paid ads (Meta / TikTok / YouTube ads)", addPct: 200, note: "Ad usage = creator loses control over reach." },
  { value: "broadcast", label: "Broadcast / OOH / CTV", addPct: 500, note: "TV, billboards, connected-TV. Big usage fee." },
];

export function UgcRateCalculator() {
  const [tier, setTier] = useState<Tier>("intermediate");
  const [deliverable, setDeliverable] = useState<Deliverable>("single_video");
  const [usage, setUsage] = useState<Usage>("paid_ads");
  const [pieces, setPieces] = useState<number>(2);

  const result = useMemo(() => {
    const t = TIERS.find((x) => x.value === tier)!;
    const d = DELIVERABLES.find((x) => x.value === deliverable)!;
    const u = USAGE_OPTIONS.find((x) => x.value === usage)!;
    const count = Number.isFinite(pieces) && pieces > 0 ? pieces : 1;
    const usageMul = 1 + u.addPct / 100;
    const perLow = t.base.low * d.factor * usageMul;
    const perHigh = t.base.high * d.factor * usageMul;
    const totalLow = perLow * count;
    const totalHigh = perHigh * count;
    const totalMid = (totalLow + totalHigh) / 2;
    return { perLow, perHigh, totalLow, totalMid, totalHigh, usageNote: u.note };
  }, [tier, deliverable, usage, pieces]);

  const fmt = (n: number) =>
    Number.isFinite(n)
      ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
      : "$0";

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Experience tier</span>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {TIERS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Deliverable type</span>
          <select
            value={deliverable}
            onChange={(e) => setDeliverable(e.target.value as Deliverable)}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {DELIVERABLES.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Usage rights</span>
          <select
            value={usage}
            onChange={(e) => setUsage(e.target.value as Usage)}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {USAGE_OPTIONS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label} (+{u.addPct}%)
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Total content pieces</span>
          <input
            type="number"
            min={1}
            value={pieces}
            onChange={(e) => setPieces(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-base font-semibold text-brand">Suggested UGC rate</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md bg-white p-3 shadow-sm">
            <div className="text-xs uppercase text-slate-500">Low (total)</div>
            <div className="text-xl font-bold text-slate-900">{fmt(result.totalLow)}</div>
          </div>
          <div className="rounded-md bg-white p-3 shadow-sm ring-2 ring-brand/40">
            <div className="text-xs uppercase text-slate-500">Mid (total)</div>
            <div className="text-xl font-bold text-brand">{fmt(result.totalMid)}</div>
          </div>
          <div className="rounded-md bg-white p-3 shadow-sm">
            <div className="text-xs uppercase text-slate-500">High (total)</div>
            <div className="text-xl font-bold text-slate-900">{fmt(result.totalHigh)}</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-600">
          Per piece: {fmt(result.perLow)} &mdash; {fmt(result.perHigh)}.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
        <h4 className="font-semibold text-slate-900">Usage-rights note</h4>
        <p className="mt-2">{result.usageNote}</p>
        <p className="mt-2">
          UGC is flat-fee content licensing &mdash; you&rsquo;re not selling your audience, you&rsquo;re selling the footage.
          Always cap usage to 3-6 months; perpetual usage should cost 2-3x the base rate.
        </p>
      </div>
    </div>
  );
}
