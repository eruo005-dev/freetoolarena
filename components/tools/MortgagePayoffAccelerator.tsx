"use client";

import { useMemo, useState } from "react";

const money = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : "—";

function monthlyPI(balance: number, annualRate: number, months: number): number {
  if (!(balance > 0) || !(months > 0)) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return balance / months;
  return (balance * r) / (1 - Math.pow(1 + r, -months));
}

function simulate(balance: number, annualRate: number, pi: number, extra: number) {
  const r = annualRate / 100 / 12;
  let bal = balance;
  let totalInterest = 0;
  let months = 0;
  const max = 1200; // 100 years safety
  while (bal > 0.01 && months < max) {
    const interest = bal * r;
    let principal = pi - interest + extra;
    if (principal <= 0) return { months: Infinity, totalInterest: Infinity };
    if (principal > bal) principal = bal;
    bal -= principal;
    totalInterest += interest;
    months++;
  }
  return { months, totalInterest };
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", year: "numeric" });

export function MortgagePayoffAccelerator() {
  const [balance, setBalance] = useState(350000);
  const [rate, setRate] = useState(6.85);
  const [term, setTerm] = useState(30);
  const [extra, setExtra] = useState(250);

  const result = useMemo(() => {
    const b = Number.isFinite(balance) ? balance : 0;
    const r = Number.isFinite(rate) ? rate : 0;
    const t = Number.isFinite(term) ? term : 30;
    const e = Number.isFinite(extra) ? Math.max(extra, 0) : 0;
    const n = t * 12;
    const pi = monthlyPI(b, r, n);

    const baseline = simulate(b, r, pi, 0);
    const accelerated = simulate(b, r, pi, e);

    const today = new Date();
    const baseDate = Number.isFinite(baseline.months) ? addMonths(today, baseline.months) : null;
    const accelDate = Number.isFinite(accelerated.months) ? addMonths(today, accelerated.months) : null;

    const monthsSaved =
      Number.isFinite(baseline.months) && Number.isFinite(accelerated.months)
        ? baseline.months - accelerated.months
        : 0;
    const interestSaved =
      Number.isFinite(baseline.totalInterest) && Number.isFinite(accelerated.totalInterest)
        ? baseline.totalInterest - accelerated.totalInterest
        : 0;

    const scenarios = [100, 250, 500, 1000].map((amt) => {
      const sim = simulate(b, r, pi, amt);
      return {
        extra: amt,
        months: sim.months,
        yearsSaved:
          Number.isFinite(baseline.months) && Number.isFinite(sim.months)
            ? (baseline.months - sim.months) / 12
            : 0,
        interestSaved:
          Number.isFinite(baseline.totalInterest) && Number.isFinite(sim.totalInterest)
            ? baseline.totalInterest - sim.totalInterest
            : 0,
      };
    });

    return {
      pi,
      baseline,
      accelerated,
      baseDate,
      accelDate,
      monthsSaved,
      interestSaved,
      scenarios,
    };
  }, [balance, rate, term, extra]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Loan balance</span>
          <input
            type="number"
            min={0}
            value={balance}
            onChange={(e) => setBalance(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Interest rate %</span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Original term (years)</span>
          <select
            value={term}
            onChange={(e) => setTerm(parseInt(e.target.value, 10))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value={30}>30 years</option>
            <option value={20}>20 years</option>
            <option value={15}>15 years</option>
            <option value={10}>10 years</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Extra payment per month</span>
          <input
            type="number"
            min={0}
            step={25}
            value={extra}
            onChange={(e) => setExtra(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Standard payoff</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {result.baseDate ? fmtDate(result.baseDate) : "—"}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Accelerated payoff</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {result.accelDate ? fmtDate(result.accelDate) : "—"}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Time saved</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {Math.floor(result.monthsSaved / 12)} yr {result.monthsSaved % 12} mo
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Interest saved</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {money(result.interestSaved)}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 text-sm font-semibold text-slate-700">
          Impact of different extra payments
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-3">Extra / month</th>
                <th className="py-2 pr-3">Payoff in</th>
                <th className="py-2 pr-3">Years saved</th>
                <th className="py-2">Interest saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {result.scenarios.map((s) => (
                <tr key={s.extra}>
                  <td className="py-2 pr-3 font-mono tabular-nums">{money(s.extra)}</td>
                  <td className="py-2 pr-3 font-mono tabular-nums">
                    {Number.isFinite(s.months)
                      ? `${Math.floor(s.months / 12)} yr ${s.months % 12} mo`
                      : "—"}
                  </td>
                  <td className="py-2 pr-3 font-mono tabular-nums">{s.yearsSaved.toFixed(1)}</td>
                  <td className="py-2 font-mono tabular-nums">{money(s.interestSaved)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Base monthly P&amp;I: <span className="font-mono">{money(result.pi)}</span>. Extra principal
        goes directly against the balance &mdash; the earlier you add it, the more interest you
        avoid.
      </p>
    </div>
  );
}
