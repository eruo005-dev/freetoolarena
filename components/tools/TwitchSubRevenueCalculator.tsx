"use client";

import { useMemo, useState } from "react";

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function TwitchSubRevenueCalculator() {
  const [tier1, setTier1] = useState(150);
  const [tier2, setTier2] = useState(10);
  const [tier3, setTier3] = useState(5);
  const [bits, setBits] = useState(25000);
  const [avgViewers, setAvgViewers] = useState(200);
  const [adCpm, setAdCpm] = useState(3.5);
  const [share, setShare] = useState<"50" | "70">("50");

  const result = useMemo(() => {
    const values = [tier1, tier2, tier3, bits, avgViewers, adCpm].map(Number);
    if (!values.every(Number.isFinite) || values.some((v) => v < 0)) return null;

    const rate = share === "70" ? 0.7 : 0.5;
    const subT1 = tier1 * 4.99 * rate;
    const subT2 = tier2 * 9.99 * rate;
    const subT3 = tier3 * 24.99 * rate;
    const bitsRev = bits * 0.01;
    // avg viewers => ad impressions. Assume ~20 streaming hrs/week = 80/mo, 1 pre-roll impression per viewer per hour
    const monthlyImpressions = avgViewers * 80;
    const adRev = (monthlyImpressions / 1000) * adCpm * rate;

    const total = subT1 + subT2 + subT3 + bitsRev + adRev;
    return { subT1, subT2, subT3, bitsRev, adRev, total, rate };
  }, [tier1, tier2, tier3, bits, avgViewers, adCpm, share]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Tier 1 subs ($4.99)</span>
          <input type="number" min={0} value={tier1} onChange={(e) => setTier1(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Tier 2 subs ($9.99)</span>
          <input type="number" min={0} value={tier2} onChange={(e) => setTier2(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Tier 3 subs ($24.99)</span>
          <input type="number" min={0} value={tier3} onChange={(e) => setTier3(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Bits received / month</span>
          <input type="number" min={0} value={bits} onChange={(e) => setBits(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Average viewers</span>
          <input type="number" min={0} value={avgViewers} onChange={(e) => setAvgViewers(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Ad CPM ($)</span>
          <input type="number" min={0} step={0.1} value={adCpm} onChange={(e) => setAdCpm(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="font-medium text-slate-700">Revenue share:</span>
        <label className="flex items-center gap-2">
          <input type="radio" checked={share === "50"} onChange={() => setShare("50")} className="accent-brand" />
          50% standard
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" checked={share === "70"} onChange={() => setShare("70")} className="accent-brand" />
          70% legacy partner
        </label>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Total monthly income</div>
            <div className="mt-1 text-3xl font-semibold text-brand">{currency(result.total)}</div>
            <p className="mt-1 text-xs text-slate-500">Annualized: {currency(result.total * 12)}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 text-sm font-semibold text-slate-900">
              Breakdown ({Math.round(result.rate * 100)}% creator share)
            </div>
            <dl className="space-y-2 text-sm">
              <Row label="Tier 1 subs" value={currency(result.subT1)} />
              <Row label="Tier 2 subs" value={currency(result.subT2)} />
              <Row label="Tier 3 subs" value={currency(result.subT3)} />
              <Row label="Bits" value={currency(result.bitsRev)} />
              <Row label="Ad revenue" value={currency(result.adRev)} />
            </dl>
          </div>

          <p className="text-xs text-slate-500">
            Ad calc assumes ~80 stream-hours/month and 1 pre-roll impression per viewer-hour. Hype Train, donations &amp; sponsorships not included&mdash;add separately.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-slate-700">
      <span>{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}
