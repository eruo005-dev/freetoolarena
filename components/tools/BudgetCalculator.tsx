"use client";

import { useMemo, useState } from "react";

interface Row {
  key: string;
  label: string;
}

const EXPENSE_ROWS: Row[] = [
  { key: "housing", label: "Rent / mortgage" },
  { key: "utilities", label: "Utilities" },
  { key: "groceries", label: "Groceries" },
  { key: "transport", label: "Transport" },
  { key: "insurance", label: "Insurance" },
  { key: "subscriptions", label: "Subscriptions" },
  { key: "dining", label: "Eating out" },
  { key: "other", label: "Other" },
];

type State = Record<string, string>;

const DEFAULTS: State = {
  income: "4500",
  housing: "1400",
  utilities: "150",
  groceries: "450",
  transport: "250",
  insurance: "200",
  subscriptions: "80",
  dining: "250",
  other: "150",
};

export function BudgetCalculator() {
  const [state, setState] = useState<State>(DEFAULTS);

  const { income, expenses, leftover, savingsRate, status } = useMemo(() => {
    const i = Math.max(0, parseFloat(state.income) || 0);
    const e = EXPENSE_ROWS.reduce(
      (sum, row) => sum + Math.max(0, parseFloat(state[row.key]) || 0),
      0,
    );
    const left = i - e;
    const rate = i > 0 ? (left / i) * 100 : 0;
    const s: "good" | "ok" | "warn" | "bad" =
      rate >= 20 ? "good" : rate >= 10 ? "ok" : rate >= 0 ? "warn" : "bad";
    return { income: i, expenses: e, leftover: left, savingsRate: rate, status: s };
  }, [state]);

  function update(key: string, val: string) {
    setState((s) => ({ ...s, [key]: val }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Monthly income</h3>
        <Field label="Take-home pay ($)" value={state.income} onChange={(v) => update("income", v)} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Monthly expenses</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {EXPENSE_ROWS.map((row) => (
            <Field
              key={row.key}
              label={`${row.label} ($)`}
              value={state[row.key] ?? ""}
              onChange={(v) => update(row.key, v)}
            />
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-3 gap-4">
        <Stat label="Income" value={income} />
        <Stat label="Expenses" value={expenses} />
        <Stat
          label="Left over"
          value={leftover}
          tone={status === "bad" ? "bad" : status === "good" ? "good" : "neutral"}
          highlight
        />
      </div>

      <SavingsRateBar rate={savingsRate} status={status} />
    </div>
  );
}

function Field(props: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{props.label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={1}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}

function Stat({
  label,
  value,
  highlight,
  tone,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  tone?: "good" | "bad" | "neutral";
}) {
  const color =
    tone === "bad"
      ? "text-red-600"
      : tone === "good"
        ? "text-brand"
        : "text-slate-900";
  return (
    <div>
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">{label}</p>
      <p className={`font-bold ${highlight ? `text-3xl ${color}` : "text-xl text-slate-900"}`}>
        ${value.toFixed(2)}
      </p>
    </div>
  );
}

function SavingsRateBar({ rate, status }: { rate: number; status: "good" | "ok" | "warn" | "bad" }) {
  const pct = Math.max(0, Math.min(100, rate));
  const barColor =
    status === "good"
      ? "bg-brand"
      : status === "ok"
        ? "bg-emerald-500"
        : status === "warn"
          ? "bg-amber-500"
          : "bg-red-500";
  const message =
    status === "good"
      ? "Great — you're saving 20%+ of income. Keep automating it."
      : status === "ok"
        ? "Healthy cushion. Target 20%+ to build wealth faster."
        : status === "warn"
          ? "Tight. Trim 2–3 categories before a surprise expense hits."
          : "You're spending more than you earn. Time to cut or raise income.";
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-sm font-medium text-slate-700">Savings rate</p>
        <p className="text-lg font-bold text-slate-900">{rate.toFixed(1)}%</p>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-sm text-slate-600">{message}</p>
    </div>
  );
}
