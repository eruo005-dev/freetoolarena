"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

type Mode = "even" | "itemized";

interface Diner {
  id: string;
  name: string;
  items: string; // comma-separated prices
}

const DEFAULT_DINERS: Diner[] = [
  { id: uid(), name: "Alice", items: "18, 4" },
  { id: uid(), name: "Bob", items: "22, 6" },
  { id: uid(), name: "Carol", items: "14, 4" },
];

function sumItems(items: string): number {
  return items
    .split(",")
    .map((s) => parseFloat(s.trim()))
    .filter((n) => Number.isFinite(n) && n > 0)
    .reduce((s, n) => s + n, 0);
}

export function BillSplitCalculator() {
  const [mode, setMode] = useState<Mode>("even");
  const [subtotal, setSubtotal] = useState("120");
  const [taxPct, setTaxPct] = useState("8.5");
  const [tipPct, setTipPct] = useState("18");
  const [people, setPeople] = useState("4");
  const [diners, setDiners] = useState<Diner[]>(DEFAULT_DINERS);

  const { grandTotal, perEven, itemized } = useMemo(() => {
    const tax = Math.max(0, parseFloat(taxPct) || 0) / 100;
    const tip = Math.max(0, parseFloat(tipPct) || 0) / 100;
    if (mode === "even") {
      const sub = Math.max(0, parseFloat(subtotal) || 0);
      const total = sub * (1 + tax) * (1 + tip);
      const n = Math.max(1, parseInt(people) || 1);
      return { grandTotal: total, perEven: total / n, itemized: [] as Array<{ name: string; share: number }> };
    } else {
      // itemized
      const dinerSubs = diners.map((d) => ({
        name: d.name || "(unnamed)",
        sub: sumItems(d.items),
      }));
      const sub = dinerSubs.reduce((s, d) => s + d.sub, 0);
      const total = sub * (1 + tax) * (1 + tip);
      const shares = dinerSubs.map((d) => ({
        name: d.name,
        share: sub > 0 ? (d.sub / sub) * total : 0,
      }));
      return { grandTotal: total, perEven: 0, itemized: shares };
    }
  }, [mode, subtotal, taxPct, tipPct, people, diners]);

  function addDiner() {
    setDiners((rows) => [...rows, { id: uid(), name: "", items: "" }]);
  }
  function updateDiner(id: string, patch: Partial<Diner>) {
    setDiners((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function removeDiner(id: string) {
    setDiners((rows) => rows.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("even")}
          className={
            mode === "even"
              ? "rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
              : "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          }
        >
          Even split
        </button>
        <button
          type="button"
          onClick={() => setMode("itemized")}
          className={
            mode === "itemized"
              ? "rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
              : "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          }
        >
          Itemized
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {mode === "even" && (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Subtotal ($)</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={0.01}
              value={subtotal}
              onChange={(e) => setSubtotal(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        )}
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Tax (%)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.1}
            value={taxPct}
            onChange={(e) => setTaxPct(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Tip (%)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1}
            value={tipPct}
            onChange={(e) => setTipPct(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        {mode === "even" && (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Number of people</span>
            <input
              type="number"
              inputMode="decimal"
              min={1}
              step={1}
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        )}
      </div>

      {mode === "itemized" && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-700">Diners</h3>
            <button
              type="button"
              onClick={addDiner}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              + Add diner
            </button>
          </div>
          <div className="space-y-2">
            {diners.map((d) => (
              <div key={d.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={d.name}
                  onChange={(e) => updateDiner(d.id, { name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                />
                <input
                  type="text"
                  placeholder="Items: 14, 3.50, 2"
                  value={d.items}
                  onChange={(e) => updateDiner(d.id, { items: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                />
                <button
                  type="button"
                  onClick={() => removeDiner(d.id)}
                  className="text-rose-600 hover:text-rose-700 text-sm px-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Enter item prices comma-separated. Tax + tip are distributed proportionally.
          </p>
        </section>
      )}

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Grand total (incl. tax+tip)</p>
          <p className="text-2xl font-bold text-slate-900">{money(grandTotal)}</p>
        </div>
        {mode === "even" ? (
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Per person</p>
            <p className="text-3xl font-bold text-brand">{money(perEven)}</p>
          </div>
        ) : (
          <div className="sm:col-span-2">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Each diner pays</p>
            <ul className="space-y-1 text-sm">
              {itemized.map((p, i) => (
                <li key={i} className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="font-semibold text-slate-900">{p.name}</span>
                  <span className="font-bold text-brand">{money(p.share)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
