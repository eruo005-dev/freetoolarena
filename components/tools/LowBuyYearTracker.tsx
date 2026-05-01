"use client";

import { useMemo, useState } from "react";

interface Item { id: string; name: string; cost: number; date: string; category: string; needed: boolean }

const CATEGORIES = ["Clothing", "Beauty / skincare", "Books / media", "Electronics", "Home decor", "Hobbies", "Subscriptions", "Other"];

export function LowBuyYearTracker() {
  const [budget, setBudget] = useState<number>(50);
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [cat, setCat] = useState<string>(CATEGORIES[0]);

  const totals = useMemo(() => {
    const monthly = items.reduce((s, i) => s + i.cost, 0);
    const needed = items.filter((i) => i.needed).reduce((s, i) => s + i.cost, 0);
    const wants = monthly - needed;
    return { monthly, needed, wants, count: items.length };
  }, [items]);

  const add = () => {
    if (!name.trim() || cost <= 0) return;
    setItems((s) => [...s, { id: String(Date.now()), name: name.trim(), cost, date: new Date().toISOString().slice(0, 10), category: cat, needed: false }]);
    setName(""); setCost(0);
  };
  const toggleNeeded = (id: string) => setItems((s) => s.map((i) => i.id === id ? { ...i, needed: !i.needed } : i));
  const remove = (id: string) => setItems((s) => s.filter((i) => i.id !== id));

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  const overBudget = totals.monthly - budget;

  return (
    <div className="space-y-5">
      <label className="block text-sm sm:max-w-xs"><span className="mb-1 block font-medium text-slate-700">Monthly low-buy budget ($)</span>
        <input type="number" min={0} value={budget} onChange={(e) => setBudget(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
      </label>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">Log a purchase</h4>
        <div className="grid gap-3 sm:grid-cols-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <input type="number" min={0} step={0.01} value={cost || ""} onChange={(e) => setCost(parseFloat(e.target.value) || 0)} placeholder="$" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded border border-slate-300 px-3 py-2 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={add} className="rounded bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark">Log</button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Item</th><th>Category</th><th className="text-right">Cost</th><th>Need?</th><th></th></tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className="border-t border-slate-100">
                <td className="py-1 font-medium">{i.name}</td>
                <td className="py-1 text-xs text-slate-600">{i.category}</td>
                <td className="py-1 text-right">{fmt(i.cost)}</td>
                <td className="py-1"><input type="checkbox" checked={i.needed} onChange={() => toggleNeeded(i.id)} /></td>
                <td className="py-1 text-right"><button onClick={() => remove(i.id)} className="text-xs text-slate-400 hover:text-rose-600">remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Spent this month</div>
          <div className="text-2xl font-bold text-slate-800">{fmt(totals.monthly)}</div>
        </div>
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
          <div className="text-xs uppercase tracking-wide text-emerald-700">Of which: needed</div>
          <div className="text-2xl font-bold text-emerald-900">{fmt(totals.needed)}</div>
        </div>
        <div className={`rounded-lg border p-4 ${overBudget <= 0 ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50"}`}>
          <div className={`text-xs uppercase tracking-wide ${overBudget <= 0 ? "text-emerald-700" : "text-rose-700"}`}>{overBudget <= 0 ? "Under budget" : "Over budget"}</div>
          <div className={`text-2xl font-bold ${overBudget <= 0 ? "text-emerald-900" : "text-rose-900"}`}>{fmt(Math.abs(overBudget))}</div>
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Low-buy 2026:</strong> not no-buy. The discipline is logging every discretionary purchase + asking
        &ldquo;need vs want&rdquo; before it lands in the cart. Three months in, most people cut 30-50% of category spending
        without feeling deprived.
      </div>
    </div>
  );
}
