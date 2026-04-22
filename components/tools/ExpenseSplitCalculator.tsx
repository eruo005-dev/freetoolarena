"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

interface Person {
  id: string;
  name: string;
  weight: string;
  paid: string;
}

const DEFAULT_PEOPLE: Person[] = [
  { id: uid(), name: "Alice", weight: "1", paid: "100" },
  { id: uid(), name: "Bob", weight: "1", paid: "30" },
  { id: uid(), name: "Carol", weight: "1", paid: "20" },
];

type Mode = "total" | "paid";

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

function settle(balances: Array<{ name: string; balance: number }>): Settlement[] {
  const creditors = balances.filter((b) => b.balance > 0.005).map((b) => ({ ...b }));
  const debtors = balances.filter((b) => b.balance < -0.005).map((b) => ({ ...b }));
  const results: Settlement[] = [];
  let i = 0;
  let j = 0;
  while (i < debtors.length && j < creditors.length) {
    const d = debtors[i];
    const c = creditors[j];
    const amt = Math.min(-d.balance, c.balance);
    if (amt > 0.005) {
      results.push({ from: d.name, to: c.name, amount: amt });
      d.balance += amt;
      c.balance -= amt;
    }
    if (Math.abs(d.balance) < 0.005) i++;
    if (Math.abs(c.balance) < 0.005) j++;
  }
  return results;
}

export function ExpenseSplitCalculator() {
  const [mode, setMode] = useState<Mode>("total");
  const [total, setTotal] = useState("150");
  const [people, setPeople] = useState<Person[]>(DEFAULT_PEOPLE);

  const result = useMemo(() => {
    if (mode === "total") {
      const t = Math.max(0, parseFloat(total) || 0);
      const totalWeight = people.reduce((s, p) => s + Math.max(0, parseFloat(p.weight) || 0), 0);
      if (totalWeight <= 0) return { perPerson: [] as Array<{ name: string; share: number }>, settlements: [] as Settlement[], grand: t };
      const perPerson = people.map((p) => ({
        name: p.name || "(unnamed)",
        share: (t * (Math.max(0, parseFloat(p.weight) || 0))) / totalWeight,
      }));
      return { perPerson, settlements: [] as Settlement[], grand: t };
    } else {
      // who-paid-what mode
      const paidValues = people.map((p) => ({
        name: p.name || "(unnamed)",
        weight: Math.max(0, parseFloat(p.weight) || 0),
        paid: Math.max(0, parseFloat(p.paid) || 0),
      }));
      const grand = paidValues.reduce((s, p) => s + p.paid, 0);
      const totalWeight = paidValues.reduce((s, p) => s + p.weight, 0);
      if (totalWeight <= 0) return { perPerson: [], settlements: [] as Settlement[], grand };
      const balances = paidValues.map((p) => ({
        name: p.name,
        balance: p.paid - (grand * p.weight) / totalWeight,
      }));
      const settlements = settle(balances);
      const perPerson = paidValues.map((p) => ({
        name: p.name,
        share: (grand * p.weight) / totalWeight,
      }));
      return { perPerson, settlements, grand };
    }
  }, [mode, total, people]);

  function addPerson() {
    setPeople((rows) => [...rows, { id: uid(), name: "", weight: "1", paid: "0" }]);
  }
  function updatePerson(id: string, patch: Partial<Person>) {
    setPeople((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function removePerson(id: string) {
    setPeople((rows) => rows.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("total")}
          className={
            mode === "total"
              ? "rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
              : "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          }
        >
          Split a total
        </button>
        <button
          type="button"
          onClick={() => setMode("paid")}
          className={
            mode === "paid"
              ? "rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
              : "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          }
        >
          Who owes whom
        </button>
      </div>

      {mode === "total" && (
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Total amount ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      )}

      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-700">People</h3>
          <button
            type="button"
            onClick={addPerson}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            + Add person
          </button>
        </div>
        <div className="space-y-2">
          {people.map((p) => (
            <div
              key={p.id}
              className={
                mode === "paid"
                  ? "grid grid-cols-[1fr_80px_110px_auto] gap-2"
                  : "grid grid-cols-[1fr_110px_auto] gap-2"
              }
            >
              <input
                type="text"
                placeholder="Name"
                value={p.name}
                onChange={(e) => updatePerson(p.id, { name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.1}
                placeholder="Share"
                value={p.weight}
                onChange={(e) => updatePerson(p.id, { weight: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
              {mode === "paid" && (
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={0.01}
                  placeholder="Paid"
                  value={p.paid}
                  onChange={(e) => updatePerson(p.id, { paid: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                />
              )}
              <button
                type="button"
                onClick={() => removePerson(p.id)}
                className="text-rose-600 hover:text-rose-700 text-sm px-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Share / weight controls how much each person owes. Equal weights = equal split.
        </p>
      </section>

      <div className="rounded-xl bg-slate-50 p-5 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
            {mode === "paid" ? "Total paid" : "Total"}
          </p>
          <p className="text-3xl font-bold text-brand">{money(result.grand)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Each person's share</p>
          <ul className="space-y-1 text-sm">
            {result.perPerson.map((p, i) => (
              <li key={i} className="flex justify-between border-b border-slate-200 pb-1">
                <span className="font-semibold text-slate-900">{p.name}</span>
                <span className="text-slate-900">{money(p.share)}</span>
              </li>
            ))}
          </ul>
        </div>
        {mode === "paid" && (
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Settlement</p>
            {result.settlements.length === 0 ? (
              <p className="text-sm text-slate-600">Everyone's even. No settlements needed.</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {result.settlements.map((s, i) => (
                  <li key={i} className="text-slate-800">
                    <span className="font-semibold">{s.from}</span> owes{" "}
                    <span className="font-semibold">{s.to}</span>{" "}
                    <span className="font-bold text-brand">{money(s.amount)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
