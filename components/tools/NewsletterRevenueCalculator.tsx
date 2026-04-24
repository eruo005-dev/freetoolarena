"use client";

import { useMemo, useState } from "react";

type Model = "ads" | "paid_sub" | "paid_free" | "affiliate" | "sponsored";

const MODELS: { value: Model; label: string }[] = [
  { value: "ads", label: "Ads-only (CPM sponsor spots)" },
  { value: "paid_sub", label: "Paid subscription (all paid)" },
  { value: "paid_free", label: "Paid + free tier" },
  { value: "affiliate", label: "Affiliate-heavy" },
  { value: "sponsored", label: "Sponsored posts" },
];

function recommendModel(subs: number, openRate: number): Model {
  if (!Number.isFinite(subs) || subs <= 0) return "ads";
  if (subs < 1000) return "affiliate";
  if (subs < 5000) return openRate >= 40 ? "paid_sub" : "sponsored";
  if (subs < 25000) return "paid_free";
  return "ads";
}

export function NewsletterRevenueCalculator() {
  const [subs, setSubs] = useState<number>(10000);
  const [openRate, setOpenRate] = useState<number>(40);
  const [model, setModel] = useState<Model>("ads");

  const result = useMemo(() => {
    const s = Number.isFinite(subs) && subs > 0 ? subs : 0;
    const or = Number.isFinite(openRate) && openRate > 0 ? openRate / 100 : 0;
    const opens = s * or;

    let monthlyLow = 0;
    let monthlyHigh = 0;
    let detail = "";

    switch (model) {
      case "ads": {
        const sendsPerMonth = 4;
        monthlyLow = (opens / 1000) * 30 * sendsPerMonth;
        monthlyHigh = (opens / 1000) * 50 * sendsPerMonth;
        detail = `$30-50 CPM on ${Math.round(opens).toLocaleString("en-US")} opens, 4 sends/month.`;
        break;
      }
      case "paid_sub": {
        const convLow = 0.05;
        const convHigh = 0.1;
        const priceLow = 5;
        const priceHigh = 20;
        monthlyLow = s * convLow * priceLow;
        monthlyHigh = s * convHigh * priceHigh;
        detail = `5-10% convert at $5-20/month.`;
        break;
      }
      case "paid_free": {
        const convLow = 0.03;
        const convHigh = 0.07;
        const priceLow = 10;
        const priceHigh = 30;
        monthlyLow = s * convLow * priceLow;
        monthlyHigh = s * convHigh * priceHigh;
        detail = `3-7% convert at $10-30/month on free base.`;
        break;
      }
      case "affiliate": {
        const sendsPerMonth = 4;
        const clickLow = 0.02;
        const clickHigh = 0.05;
        const convRate = 0.01;
        const commLow = 30;
        const commHigh = 100;
        monthlyLow = opens * clickLow * convRate * commLow * sendsPerMonth;
        monthlyHigh = opens * clickHigh * convRate * commHigh * sendsPerMonth;
        detail = `2-5% CTR, 1% conversion, $30-100 commission, 4 sends/month.`;
        break;
      }
      case "sponsored": {
        const postsLow = 1;
        const postsHigh = 2;
        const sizeFactor = Math.max(500, Math.min(5000, (s / 10000) * 1000));
        monthlyLow = postsLow * Math.max(500, sizeFactor * 0.5);
        monthlyHigh = postsHigh * Math.min(5000, sizeFactor * 2.5);
        detail = `1-2 posts/month at $500-$5000 depending on list size.`;
        break;
      }
    }

    const monthlyMid = (monthlyLow + monthlyHigh) / 2;
    const yearlyMid = monthlyMid * 12;
    const perSubMonthly = s > 0 ? monthlyMid / s : 0;

    const recommended = recommendModel(s, openRate);

    return { monthlyLow, monthlyMid, monthlyHigh, yearlyMid, perSubMonthly, detail, recommended };
  }, [subs, openRate, model]);

  const fmt = (n: number) =>
    Number.isFinite(n)
      ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
      : "$0";

  const fmtFine = (n: number) =>
    Number.isFinite(n)
      ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 })
      : "$0.00";

  const recommendedLabel = MODELS.find((m) => m.value === result.recommended)?.label ?? "";

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Subscribers</span>
          <input
            type="number"
            min={0}
            value={subs}
            onChange={(e) => setSubs(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Open rate (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={openRate}
            onChange={(e) => setOpenRate(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-slate-700">Revenue model</span>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value as Model)}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {MODELS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-base font-semibold text-brand">Projected revenue</h3>
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
          <div className="flex justify-between"><dt>Yearly (mid)</dt><dd>{fmt(result.yearlyMid)}</dd></div>
          <div className="flex justify-between"><dt>Per subscriber (mo.)</dt><dd>{fmtFine(result.perSubMonthly)}</dd></div>
        </dl>
        <p className="mt-3 text-xs text-slate-600">{result.detail}</p>
      </div>

      <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
        <h4 className="font-semibold">Recommended model for your size</h4>
        <p className="mt-2">
          At {Number.isFinite(subs) ? subs.toLocaleString("en-US") : "0"} subs and a {openRate}% open rate, the
          strongest fit is usually <span className="font-semibold">{recommendedLabel}</span>. Under 1k subs, affiliate
          income ramps fastest; 1k&mdash;5k is where paid subs start to beat ads if your open rate is above 40%; past
          25k, straight ads scale best.
        </p>
      </div>
    </div>
  );
}
