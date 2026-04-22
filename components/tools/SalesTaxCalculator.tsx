"use client";

import { useMemo, useState } from "react";

type Tab = "add" | "reverse" | "compare";

export function SalesTaxCalculator() {
  const [tab, setTab] = useState<Tab>("add");

  // Tab 1: Add
  const [preTax, setPreTax] = useState("100");
  const [addRate, setAddRate] = useState("8.25");

  // Tab 2: Reverse
  const [total, setTotal] = useState("108.25");
  const [revRate, setRevRate] = useState("8.25");

  // Tab 3: Compare
  const [cmpAmount, setCmpAmount] = useState("100");
  const [cmpRates, setCmpRates] = useState("6,8.25,9.5");

  const addResult = useMemo(() => {
    const base = Math.max(0, parseFloat(preTax) || 0);
    const r = Math.max(0, parseFloat(addRate) || 0);
    const tax = base * (r / 100);
    return { base, tax, total: base + tax };
  }, [preTax, addRate]);

  const revResult = useMemo(() => {
    const t = Math.max(0, parseFloat(total) || 0);
    const r = Math.max(0, parseFloat(revRate) || 0);
    const base = r > -100 ? t / (1 + r / 100) : t;
    return { base, tax: t - base, total: t };
  }, [total, revRate]);

  const cmpResult = useMemo(() => {
    const a = Math.max(0, parseFloat(cmpAmount) || 0);
    const rates = cmpRates
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));
    return rates.map((r) => ({ rate: r, tax: a * (r / 100), total: a * (1 + r / 100) }));
  }, [cmpAmount, cmpRates]);

  const TabBtn = ({ id, label }: { id: Tab; label: string }) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
        tab === id
          ? "bg-brand text-white border-brand"
          : "bg-white text-slate-700 border-slate-300 hover:border-brand"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <TabBtn id="add" label="Add tax" />
        <TabBtn id="reverse" label="Reverse (tax included)" />
        <TabBtn id="compare" label="Compare rates" />
      </div>

      {tab === "add" && (
        <>
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Pre-tax amount ($)</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                value={preTax}
                onChange={(e) => setPreTax(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 mt-1"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Tax rate (%)</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                value={addRate}
                onChange={(e) => setAddRate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 mt-1"
              />
            </label>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold">${addResult.base.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span className="font-semibold">${addResult.tax.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Total</span><span className="font-semibold text-brand text-lg">${addResult.total.toFixed(2)}</span></div>
          </div>
        </>
      )}

      {tab === "reverse" && (
        <>
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Total paid (tax included, $)</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 mt-1"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Tax rate (%)</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                value={revRate}
                onChange={(e) => setRevRate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 mt-1"
              />
            </label>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
            <div className="flex justify-between"><span>Pre-tax</span><span className="font-semibold text-brand text-lg">${revResult.base.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax portion</span><span className="font-semibold">${revResult.tax.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Total</span><span className="font-semibold">${revResult.total.toFixed(2)}</span></div>
          </div>
        </>
      )}

      {tab === "compare" && (
        <>
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Pre-tax amount ($)</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                value={cmpAmount}
                onChange={(e) => setCmpAmount(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 mt-1"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Rates to compare (CSV, %)</span>
              <input
                type="text"
                value={cmpRates}
                onChange={(e) => setCmpRates(e.target.value)}
                placeholder="e.g. 6, 8.25, 9.5"
                className="w-full rounded-lg border border-slate-300 p-2 mt-1"
              />
            </label>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
            {cmpResult.length === 0 && <p className="text-sm text-slate-500">Enter comma-separated rates above.</p>}
            {cmpResult.map((r, i) => (
              <div key={i} className="flex justify-between items-baseline border-b border-slate-200 last:border-0 pb-1">
                <span className="text-slate-700">{r.rate}%</span>
                <span>
                  <span className="text-xs text-slate-500 mr-2">tax ${r.tax.toFixed(2)}</span>
                  <span className="font-semibold text-slate-900">${r.total.toFixed(2)}</span>
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="text-xs text-slate-500">
        Estimate — sales tax rules vary by jurisdiction, product type, and exemption. Verify exact
        rates with your state / local tax authority before pricing.
      </p>
    </div>
  );
}
