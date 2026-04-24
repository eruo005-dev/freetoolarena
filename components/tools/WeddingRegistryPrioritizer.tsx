"use client";

import { useMemo, useState } from "react";

const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

type TierKey = "t25" | "t50" | "t100" | "t150" | "t250";

const TIERS: { key: TierKey; price: number; label: string; share: number; bucket: string }[] = [
  { key: "t25", price: 25, label: "$25 tier", share: 0.3, bucket: "Must-have" },
  { key: "t50", price: 50, label: "$50 tier", share: 0.3, bucket: "Must-have" },
  { key: "t100", price: 100, label: "$100 tier", share: 0.2, bucket: "Nice-to-have" },
  { key: "t150", price: 150, label: "$150 tier", share: 0.12, bucket: "Nice-to-have" },
  { key: "t250", price: 250, label: "$250+ tier", share: 0.08, bucket: "Stretch" },
];

const SAMPLE_CATS = [
  { cat: "Kitchen &amp; cookware", pct: 30 },
  { cat: "Bedroom &amp; bath", pct: 20 },
  { cat: "Home &amp; decor", pct: 15 },
  { cat: "Honeymoon fund", pct: 15 },
  { cat: "Cash fund", pct: 10 },
  { cat: "Experiences &amp; classes", pct: 10 },
];

export function WeddingRegistryPrioritizer() {
  const [goal, setGoal] = useState(8000);
  const [guests, setGuests] = useState(120);
  const [avgGift, setAvgGift] = useState(100);

  const result = useMemo(() => {
    if (
      !Number.isFinite(goal) ||
      !Number.isFinite(guests) ||
      !Number.isFinite(avgGift) ||
      goal <= 0 ||
      guests <= 0 ||
      avgGift <= 0
    ) {
      return null;
    }

    const registrySize = goal * 1.5;
    const rows = TIERS.map((t) => {
      const dollars = registrySize * t.share;
      const count = Math.max(1, Math.round(dollars / t.price));
      return { ...t, dollars, count };
    });

    const totalListed = rows.reduce((s, r) => s + r.count * r.price, 0);
    const expectedBuyRate = 0.5;
    const projected = goal * expectedBuyRate + guests * avgGift * 0.5;

    const categories = SAMPLE_CATS.map((c) => ({
      ...c,
      dollars: goal * (c.pct / 100),
    }));

    return { rows, totalListed, projected, registrySize, categories };
  }, [goal, guests, avgGift]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Registry goal ($)</label>
          <input
            type="number"
            min="0"
            value={goal}
            onChange={(e) => setGoal(parseFloat(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Guest count</label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Avg gift budget ($75&ndash;150)
          </label>
          <input
            type="number"
            min="1"
            value={avgGift}
            onChange={(e) => setAvgGift(parseFloat(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {result ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Suggested registry size
            </div>
            <div className="mt-1 text-3xl font-semibold text-brand">
              {fmtUSD(result.registrySize)}
            </div>
            <div className="mt-1 text-sm text-slate-600">
              List ~1.5&times; your goal. Projected actual receipts:{" "}
              <span className="font-medium text-slate-900">{fmtUSD(result.projected)}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-800">Price tier allocation</div>
            <div className="mt-3 space-y-2 text-sm">
              {result.rows.map((r) => (
                <div
                  key={r.key}
                  className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-b-0"
                >
                  <div>
                    <div className="font-medium text-slate-900">{r.label}</div>
                    <div className="text-xs text-slate-500">{r.bucket}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-brand">{r.count} items</div>
                    <div className="text-xs text-slate-500">{fmtUSD(r.dollars)} total</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-800">
              Sample category allocation
            </div>
            <div className="mt-3 space-y-2 text-sm">
              {result.categories.map((c) => (
                <div
                  key={c.cat}
                  className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-b-0"
                >
                  <span
                    className="text-slate-700"
                    dangerouslySetInnerHTML={{ __html: c.cat }}
                  />
                  <span className="text-right">
                    <span className="font-medium text-slate-900">{fmtUSD(c.dollars)}</span>
                    <span className="ml-2 text-xs text-slate-500">{c.pct}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            Tip: Half your guests don&rsquo;t buy off the registry. Don&rsquo;t over-stock.
            Keep a healthy share in the {fmtUSD(25)}&ndash;{fmtUSD(75)} range so budget-conscious
            guests always have something to grab.
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          Enter a goal, guest count, and average gift budget.
        </div>
      )}
    </div>
  );
}
