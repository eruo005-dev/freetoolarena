"use client";

import { useMemo, useState } from "react";

type RegionKey = "major" | "midsize" | "small" | "rural";

const REGIONS: Record<RegionKey, { label: string; per100: number }> = {
  major: { label: "Major metro ($35k per 100 guests)", per100: 35000 },
  midsize: { label: "Midsize city ($22k per 100 guests)", per100: 22000 },
  small: { label: "Small city ($15k per 100 guests)", per100: 15000 },
  rural: { label: "Rural area ($10k per 100 guests)", per100: 10000 },
};

const SPLITS: { key: string; label: string; pct: number }[] = [
  { key: "venue", label: "Venue + food", pct: 45 },
  { key: "photo", label: "Photography / video", pct: 12 },
  { key: "attire", label: "Attire", pct: 7 },
  { key: "flowers", label: "Flowers / decor", pct: 10 },
  { key: "music", label: "Music / entertainment", pct: 8 },
  { key: "stationery", label: "Stationery", pct: 3 },
  { key: "rings", label: "Rings", pct: 3 },
  { key: "cake", label: "Cake", pct: 2 },
  { key: "transport", label: "Transportation", pct: 2 },
  { key: "favors", label: "Favors / misc", pct: 3 },
  { key: "buffer", label: "Buffer", pct: 5 },
];

function usd(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export interface WeddingBudgetCalculatorProps {
  initialGuests?: number;
  initialRegion?: RegionKey;
}

export function WeddingBudgetCalculator({
  initialGuests = 120,
  initialRegion = "midsize",
}: WeddingBudgetCalculatorProps = {}) {
  const [mode, setMode] = useState<"guests" | "budget">("guests");
  const [guests, setGuests] = useState(String(initialGuests));
  const [budget, setBudget] = useState("30000");
  const [region, setRegion] = useState<RegionKey>(initialRegion);

  const { totalBudget, guestCount, perGuest, tier, breakdown } = useMemo(() => {
    const per100 = REGIONS[region].per100;
    const g = Math.max(1, parseFloat(guests) || 0);
    const b = Math.max(0, parseFloat(budget) || 0);

    const gNum = Number.isFinite(g) ? g : 1;
    const bNum = Number.isFinite(b) ? b : 0;

    let total: number;
    let count: number;
    if (mode === "guests") {
      count = gNum;
      total = (gNum / 100) * per100;
    } else {
      total = bNum;
      count = Math.max(1, Math.round((bNum / per100) * 100));
    }

    const pp = count > 0 ? total / count : 0;
    let tierLabel = "Budget";
    if (pp >= 500) tierLabel = "Ultra-luxury";
    else if (pp >= 300) tierLabel = "Luxury";
    else if (pp >= 175) tierLabel = "Mid-range";

    const rows = SPLITS.map((s) => ({
      key: s.key,
      label: s.label,
      pct: s.pct,
      amount: total * (s.pct / 100),
    }));

    return {
      totalBudget: total,
      guestCount: count,
      perGuest: pp,
      tier: tierLabel,
      breakdown: rows,
    };
  }, [mode, guests, budget, region]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("guests")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
            mode === "guests" ? "bg-brand text-white border-brand" : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Estimate from guest count
        </button>
        <button
          type="button"
          onClick={() => setMode("budget")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
            mode === "budget" ? "bg-brand text-white border-brand" : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Fit to a budget
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {mode === "guests" ? (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Guest count</span>
            <input
              type="number"
              min={1}
              step={1}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        ) : (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Total budget ($)</span>
            <input
              type="number"
              min={0}
              step={500}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        )}
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Region</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as RegionKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand bg-white"
          >
            {Object.entries(REGIONS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold mb-1 text-slate-500">Estimated budget</p>
          <p className="text-3xl font-bold text-brand">{usd(totalBudget)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold mb-1 text-slate-500">Per guest</p>
          <p className="text-xl font-bold text-slate-900">{usd(perGuest)}</p>
          <p className="text-xs text-slate-500 mt-1">{guestCount} guests</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold mb-1 text-slate-500">Tier</p>
          <p className="text-xl font-bold text-slate-900">{tier}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left px-4 py-2 font-semibold">Category</th>
              <th className="text-right px-4 py-2 font-semibold">%</th>
              <th className="text-right px-4 py-2 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.map((r, i) => (
              <tr key={r.key} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="px-4 py-2 text-slate-800">{r.label}</td>
                <td className="px-4 py-2 text-right text-slate-600">{r.pct}%</td>
                <td className="px-4 py-2 text-right font-semibold text-slate-900">{usd(r.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Industry-standard splits from The Knot &amp; WeddingWire surveys. Buffer covers last-minute overages&mdash;don&rsquo;t skip it.
      </p>
    </div>
  );
}
