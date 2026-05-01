"use client";

import { useMemo, useState } from "react";

interface Line { id: string; service: string; monthly: number }

const STARTER: Line[] = [
  { id: "1", service: "ChatGPT Plus",     monthly: 20 },
  { id: "2", service: "Claude Pro",       monthly: 20 },
  { id: "3", service: "Cursor Pro",       monthly: 20 },
  { id: "4", service: "Perplexity Pro",   monthly: 20 },
  { id: "5", service: "Anthropic API",    monthly: 35 },
  { id: "6", service: "OpenAI API",       monthly: 18 },
];

export function AiMonthlyCostBudgeter() {
  const [lines, setLines] = useState<Line[]>(STARTER);
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [budget, setBudget] = useState<number>(150);

  const total = useMemo(() => lines.reduce((s, l) => s + (l.monthly || 0), 0), [lines]);
  const yearly = total * 12;
  const overUnder = budget - total;

  const add = () => {
    if (!name.trim() || cost <= 0) return;
    setLines((s) => [...s, { id: String(Date.now()), service: name.trim(), monthly: cost }]);
    setName("");
    setCost(0);
  };
  const remove = (id: string) => setLines((s) => s.filter((l) => l.id !== id));
  const update = (id: string, val: number) =>
    setLines((s) => s.map((l) => l.id === id ? { ...l, monthly: val } : l));

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <label className="block text-sm sm:max-w-xs"><span className="mb-1 block font-medium text-slate-700">Monthly AI budget ($)</span>
        <input type="number" min={0} value={budget} onChange={(e) => setBudget(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
      </label>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">Add an AI service</h4>
        <div className="grid gap-3 sm:grid-cols-3">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Gemini Advanced" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <input type="number" min={0} step={0.01} value={cost || ""} onChange={(e) => setCost(parseFloat(e.target.value) || 0)} placeholder="$ / month" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <button onClick={add} className="rounded bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark">Add</button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Service</th><th className="py-1 text-right">$ / month</th><th className="py-1"></th></tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.id} className="border-t border-slate-100">
                <td className="py-2 font-medium">{l.service}</td>
                <td className="py-2 text-right">
                  <input type="number" min={0} step={0.01} value={l.monthly} onChange={(e) => update(l.id, parseFloat(e.target.value) || 0)} className="w-24 rounded border border-slate-300 px-2 py-1 text-right text-sm" />
                </td>
                <td className="py-2 text-right">
                  <button onClick={() => remove(l.id)} className="text-xs text-slate-400 hover:text-rose-600">remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Monthly total</div>
          <div className="text-2xl font-bold text-slate-800">{fmt(total)}</div>
          <div className="mt-1 text-xs text-slate-500">{fmt(yearly)} / year</div>
        </div>
        <div className={`rounded-lg border p-4 ${overUnder >= 0 ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50"}`}>
          <div className={`text-xs uppercase tracking-wide ${overUnder >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
            {overUnder >= 0 ? "Under budget" : "Over budget"}
          </div>
          <div className={`text-2xl font-bold ${overUnder >= 0 ? "text-emerald-900" : "text-rose-900"}`}>
            {fmt(Math.abs(overUnder))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Lines tracked</div>
          <div className="text-2xl font-bold text-slate-800">{lines.length}</div>
        </div>
      </div>
    </div>
  );
}
