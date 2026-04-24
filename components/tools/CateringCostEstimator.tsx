"use client";

import { useMemo, useState } from "react";

const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

type Style = "buffet" | "plated" | "family" | "stations" | "truck" | "apps";
type Tier = "casual" | "mid" | "upscale" | "luxury";

const BASE: Record<Style, Partial<Record<Tier, number>>> = {
  buffet: { casual: 25, mid: 45, upscale: 85, luxury: 150 },
  plated: { casual: 40, mid: 75, upscale: 125, luxury: 200 },
  family: { casual: 35, mid: 65, upscale: 110, luxury: 175 },
  stations: { casual: 45, mid: 80, upscale: 130, luxury: 200 },
  truck: { casual: 15, mid: 25, upscale: 40 },
  apps: { casual: 20, mid: 40, upscale: 65, luxury: 110 },
};

const STYLE_LABEL: Record<Style, string> = {
  buffet: "Buffet",
  plated: "Plated dinner",
  family: "Family-style",
  stations: "Food stations",
  truck: "Food truck",
  apps: "Heavy appetizers",
};

const TIER_LABEL: Record<Tier, string> = {
  casual: "Casual",
  mid: "Mid-range",
  upscale: "Upscale",
  luxury: "Luxury",
};

export function CateringCostEstimator() {
  const [guests, setGuests] = useState(120);
  const [style, setStyle] = useState<Style>("buffet");
  const [tier, setTier] = useState<Tier>("mid");
  const [bartenders, setBartenders] = useState("auto");

  const result = useMemo(() => {
    if (!Number.isFinite(guests) || guests <= 0) return null;
    const base = BASE[style][tier];
    if (base === undefined) return null;

    const foodTotal = base * guests;
    const serviceFee = foodTotal * 0.2;
    const tax = foodTotal * 0.08;

    const autoBar = Math.max(1, Math.ceil(guests / 75));
    const barCount =
      bartenders === "none"
        ? 0
        : bartenders === "auto"
          ? autoBar
          : parseInt(bartenders, 10) || 0;
    const barCost = barCount * 325;

    const total = foodTotal + serviceFee + tax + barCost;
    const perPerson = total / guests;

    return { foodTotal, serviceFee, tax, barCount, barCost, total, perPerson, base };
  }, [guests, style, tier, bartenders]);

  const availableTiers = Object.keys(BASE[style]) as Tier[];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
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
          <label className="block text-sm font-medium text-slate-700">Service style</label>
          <select
            value={style}
            onChange={(e) => {
              const s = e.target.value as Style;
              setStyle(s);
              if (!BASE[s][tier]) setTier(Object.keys(BASE[s])[0] as Tier);
            }}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {(Object.keys(STYLE_LABEL) as Style[]).map((s) => (
              <option key={s} value={s}>
                {STYLE_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Cuisine tier</label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {availableTiers.map((t) => (
              <option key={t} value={t}>
                {TIER_LABEL[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Bartenders</label>
          <select
            value={bartenders}
            onChange={(e) => setBartenders(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="auto">Auto (1 per 75 guests)</option>
            <option value="none">None &mdash; no bar service</option>
            <option value="1">1 bartender</option>
            <option value="2">2 bartenders</option>
            <option value="3">3 bartenders</option>
            <option value="4">4 bartenders</option>
          </select>
        </div>
      </div>

      {result ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-xs uppercase tracking-wide text-slate-500">Estimated total</div>
            <div className="mt-1 text-3xl font-semibold text-brand">{fmtUSD(result.total)}</div>
            <div className="mt-1 text-sm text-slate-600">
              {fmtUSD(result.perPerson)} per guest &mdash; {fmtUSD(result.base)} base food cost
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-800">Cost breakdown</div>
            <dl className="mt-3 divide-y divide-slate-100 text-sm">
              <div className="flex justify-between py-2">
                <dt className="text-slate-600">Food &amp; beverage ({guests} &times; {fmtUSD(result.base)})</dt>
                <dd className="font-medium text-slate-900">{fmtUSD(result.foodTotal)}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-slate-600">Service fee (20%)</dt>
                <dd className="font-medium text-slate-900">{fmtUSD(result.serviceFee)}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-slate-600">Sales tax (8%)</dt>
                <dd className="font-medium text-slate-900">{fmtUSD(result.tax)}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-slate-600">
                  Bartenders ({result.barCount} &times; $325)
                </dt>
                <dd className="font-medium text-slate-900">{fmtUSD(result.barCost)}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="font-semibold text-slate-800">Total</dt>
                <dd className="font-semibold text-brand">{fmtUSD(result.total)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            Service fees typically range 18&ndash;22%. Bartender rates vary by market ($250&ndash;$400).
            Add 10&ndash;15% buffer for rentals, linens, and overtime.
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          Enter a valid guest count and service combination to see an estimate.
        </div>
      )}
    </div>
  );
}
