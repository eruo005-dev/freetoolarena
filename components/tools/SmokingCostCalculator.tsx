"use client";

import { useMemo, useState } from "react";

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"] as const;
type Currency = (typeof CURRENCIES)[number];

export function SmokingCostCalculator() {
  const [packsPerDay, setPacksPerDay] = useState("1");
  const [packPrice, setPackPrice] = useState("8");
  const [years, setYears] = useState("10");
  const [currency, setCurrency] = useState<Currency>("USD");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }),
    [currency],
  );
  const fmt2 = useMemo(
    () => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }),
    [currency],
  );

  const { daily, monthly, yearly, total, proj10, proj20, invested10, invested20, investedTotal } = useMemo(() => {
    const p = Math.max(0, parseFloat(packsPerDay) || 0);
    const pr = Math.max(0, parseFloat(packPrice) || 0);
    const y = Math.max(0, parseFloat(years) || 0);
    const d = p * pr;
    const m = d * 30.4375;
    const yr = d * 365.25;
    const tot = yr * y;

    // Compound annual 7% — daily contribution invested at month-end style, simplified to yearly contrib
    const invFuture = (annualContribution: number, yrs: number) => {
      const r = 0.07;
      if (yrs <= 0) return 0;
      return annualContribution * ((Math.pow(1 + r, yrs) - 1) / r);
    };

    return {
      daily: d,
      monthly: m,
      yearly: yr,
      total: tot,
      proj10: yr * 10,
      proj20: yr * 20,
      invested10: invFuture(yr, 10),
      invested20: invFuture(yr, 20),
      investedTotal: invFuture(yr, y),
    };
  }, [packsPerDay, packPrice, years]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Packs per day</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.1}
            value={packsPerDay}
            onChange={(e) => setPacksPerDay(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Price per pack</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={packPrice}
            onChange={(e) => setPackPrice(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Years smoking</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1}
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Currency</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <Stat label="Daily" value={fmt2.format(daily)} />
        <Stat label="Monthly" value={fmt.format(monthly)} />
        <Stat label="Yearly" value={fmt.format(yearly)} />
        <Stat label={`Total over ${years} yrs`} value={fmt.format(total)} highlight />
        <Stat label="Cost projected 10 yrs" value={fmt.format(proj10)} />
        <Stat label="Cost projected 20 yrs" value={fmt.format(proj20)} />
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 space-y-3">
        <p className="text-sm font-semibold text-emerald-900">If invested at 7% annual return instead:</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-emerald-700 mb-1">After 10 yrs</p>
            <p className="text-xl font-bold text-emerald-900">{fmt.format(invested10)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-emerald-700 mb-1">After 20 yrs</p>
            <p className="text-xl font-bold text-emerald-900">{fmt.format(invested20)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-emerald-700 mb-1">After {years} yrs</p>
            <p className="text-xl font-bold text-emerald-900">{fmt.format(investedTotal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">{label}</p>
      <p className={`font-bold ${highlight ? "text-3xl text-brand" : "text-xl text-slate-900"}`}>{value}</p>
    </div>
  );
}
