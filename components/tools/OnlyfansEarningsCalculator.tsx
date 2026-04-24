"use client";

import { useMemo, useState } from "react";

const PLATFORM_CUT = 0.2;

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function OnlyfansEarningsCalculator() {
  const [subs, setSubs] = useState(500);
  const [price, setPrice] = useState(9.99);
  const [tipRate, setTipRate] = useState(15);
  const [tipAmount, setTipAmount] = useState(20);
  const [ppvConv, setPpvConv] = useState(8);
  const [ppvPrice, setPpvPrice] = useState(15);

  const result = useMemo(() => {
    const values = [subs, price, tipRate, tipAmount, ppvConv, ppvPrice].map(Number);
    if (!values.every(Number.isFinite) || values.some((v) => v < 0) || subs <= 0) return null;

    const subRev = subs * price;
    const tipRev = subs * (tipRate / 100) * tipAmount;
    const ppvRev = subs * (ppvConv / 100) * ppvPrice;
    const gross = subRev + tipRev + ppvRev;
    const net = gross * (1 - PLATFORM_CUT);
    const rpu = gross / subs;
    const rpuNet = net / subs;

    return { subRev, tipRev, ppvRev, gross, net, rpu, rpuNet };
  }, [subs, price, tipRate, tipAmount, ppvConv, ppvPrice]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Subscribers</span>
          <input type="number" min={0} value={subs} onChange={(e) => setSubs(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Subscription price / month</span>
          <input type="number" min={0} step={0.01} value={price} onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Tip rate (% of subs / month)</span>
          <input type="number" min={0} max={100} step={0.1} value={tipRate} onChange={(e) => setTipRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Average tip amount</span>
          <input type="number" min={0} step={0.01} value={tipAmount} onChange={(e) => setTipAmount(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">PPV conversion (%)</span>
          <input type="number" min={0} max={100} step={0.1} value={ppvConv} onChange={(e) => setPpvConv(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Average PPV price</span>
          <input type="number" min={0} step={0.01} value={ppvPrice} onChange={(e) => setPpvPrice(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </label>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Gross / month</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">{currency(result.gross)}</div>
            </div>
            <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Net / month (after 20%)</div>
              <div className="mt-1 text-2xl font-semibold text-brand">{currency(result.net)}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Net / year</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">{currency(result.net * 12)}</div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 text-sm font-semibold text-slate-900">Revenue mix (gross)</div>
            <dl className="space-y-2 text-sm">
              <Row label="Subscription fees" value={currency(result.subRev)} />
              <Row label="Tips" value={currency(result.tipRev)} />
              <Row label="Pay-per-view messages" value={currency(result.ppvRev)} />
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-sm font-semibold text-slate-900">Revenue per user (RPU)</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Row label="RPU (gross)" value={currency(result.rpu)} />
              <Row label="RPU (net)" value={currency(result.rpuNet)} />
            </div>
            <p className="mt-3 text-xs text-slate-600">
              Focus on RPU (revenue per user), not sub count. A 500-sub account with $40 RPU outperforms a 5,000-sub account at $3 RPU&mdash;and costs a fraction of the DM labor.
            </p>
          </div>
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
