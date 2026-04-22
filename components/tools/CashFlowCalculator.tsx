"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

interface Row {
  id: string;
  label: string;
  value: string;
}

const DEFAULT_INCOME: Row[] = [
  { id: uid(), label: "Salary", value: "5000" },
  { id: uid(), label: "Side income", value: "500" },
];

const DEFAULT_EXPENSES: Row[] = [
  { id: uid(), label: "Rent", value: "1500" },
  { id: uid(), label: "Utilities", value: "200" },
  { id: uid(), label: "Food", value: "600" },
  { id: uid(), label: "Subscriptions", value: "80" },
  { id: uid(), label: "Transport", value: "250" },
];

export function CashFlowCalculator() {
  const [income, setIncome] = useState<Row[]>(DEFAULT_INCOME);
  const [expenses, setExpenses] = useState<Row[]>(DEFAULT_EXPENSES);

  const { totalIncome, totalExpenses, net, savingsRate, yearEnd } = useMemo(() => {
    const i = income.reduce((s, r) => s + Math.max(0, parseFloat(r.value) || 0), 0);
    const e = expenses.reduce((s, r) => s + Math.max(0, parseFloat(r.value) || 0), 0);
    const n = i - e;
    const sr = i > 0 ? (n / i) * 100 : 0;
    return { totalIncome: i, totalExpenses: e, net: n, savingsRate: sr, yearEnd: n * 12 };
  }, [income, expenses]);

  function addRow(setter: Dispatch<SetStateAction<Row[]>>) {
    setter((rows) => [...rows, { id: uid(), label: "", value: "" }]);
  }
  function updateRow(setter: Dispatch<SetStateAction<Row[]>>, id: string, patch: Partial<Row>) {
    setter((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function removeRow(setter: Dispatch<SetStateAction<Row[]>>, id: string) {
    setter((rows) => rows.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-6">
      <RowSection
        title="Monthly income"
        rows={income}
        onAdd={() => addRow(setIncome)}
        onUpdate={(id, p) => updateRow(setIncome, id, p)}
        onRemove={(id) => removeRow(setIncome, id)}
      />
      <RowSection
        title="Monthly expenses"
        rows={expenses}
        onAdd={() => addRow(setExpenses)}
        onUpdate={(id, p) => updateRow(setExpenses, id, p)}
        onRemove={(id) => removeRow(setExpenses, id)}
      />

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total income</p>
          <p className="text-2xl font-bold text-slate-900">{money(totalIncome)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total expenses</p>
          <p className="text-2xl font-bold text-slate-900">{money(totalExpenses)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Net cash flow / month</p>
          <p className={`text-3xl font-bold ${net >= 0 ? "text-brand" : "text-red-600"}`}>{money(net)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Savings rate</p>
          <p className="text-2xl font-bold text-slate-900">{savingsRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">12-month projection</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
          {Array.from({ length: 12 }, (_, i) => {
            const balance = net * (i + 1);
            return (
              <div
                key={i}
                className="rounded-md border border-slate-200 bg-slate-50 p-2 text-center"
              >
                <p className="uppercase tracking-wide font-semibold text-slate-500">M{i + 1}</p>
                <p className={`font-bold ${balance >= 0 ? "text-slate-900" : "text-red-600"}`}>
                  {money(balance)}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Year-end net:{" "}
          <span className={`font-semibold ${yearEnd >= 0 ? "text-brand" : "text-red-600"}`}>
            {money(yearEnd)}
          </span>
        </p>
      </div>
    </div>
  );
}

function RowSection({
  title,
  rows,
  onAdd,
  onUpdate,
  onRemove,
}: {
  title: string;
  rows: Row[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<Row>) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          + Add row
        </button>
      </div>
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-[1fr_140px_auto] gap-2">
            <input
              type="text"
              placeholder="Label"
              value={row.label}
              onChange={(e) => onUpdate(row.id, { label: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              placeholder="0"
              value={row.value}
              onChange={(e) => onUpdate(row.id, { value: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <button
              type="button"
              onClick={() => onRemove(row.id)}
              className="text-rose-600 hover:text-rose-700 text-sm px-2"
            >
              Remove
            </button>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-slate-500">No rows yet. Click "+ Add row" to start.</p>
        )}
      </div>
    </section>
  );
}
