"use client";

import { useMemo, useState } from "react";

export function CashOnCashReturnCalculator() {
  const [price, setPrice] = useState(300000);
  const [downPct, setDownPct] = useState(25);
  const [closingCosts, setClosingCosts] = useState(6000);
  const [rehab, setRehab] = useState(5000);
  const [monthlyRent, setMonthlyRent] = useState(2400);
  const [monthlyExpenses, setMonthlyExpenses] = useState(650);
  const [loanRate, setLoanRate] = useState(7);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const result = useMemo(() => {
    if (!Number.isFinite(price) || price <= 0) return null;

    const downPayment = (downPct / 100) * price;
    const loanAmount = price - downPayment;
    const monthlyRate = loanRate / 100 / 12;
    const n = loanTermYears * 12;

    let mortgagePayment = 0;
    if (loanAmount > 0 && monthlyRate > 0 && n > 0) {
      mortgagePayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
        (Math.pow(1 + monthlyRate, n) - 1);
    } else if (loanAmount > 0 && n > 0) {
      mortgagePayment = loanAmount / n;
    }

    const cashInvested = downPayment + closingCosts + rehab;
    const monthlyCashFlow = monthlyRent - monthlyExpenses - mortgagePayment;
    const annualCashFlow = monthlyCashFlow * 12;
    const cashOnCash = (annualCashFlow / cashInvested) * 100;
    const breakEvenMonth =
      monthlyCashFlow > 0
        ? Math.ceil(cashInvested / monthlyCashFlow)
        : Infinity;

    let tier = "below average";
    let tierTone = "text-rose-600";
    if (cashOnCash >= 12) {
      tier = "excellent";
      tierTone = "text-emerald-600";
    } else if (cashOnCash >= 8) {
      tier = "good deal threshold";
      tierTone = "text-emerald-600";
    } else if (cashOnCash >= 5) {
      tier = "modest";
      tierTone = "text-amber-600";
    }

    return {
      downPayment,
      loanAmount,
      mortgagePayment,
      cashInvested,
      monthlyCashFlow,
      annualCashFlow,
      cashOnCash,
      breakEvenMonth,
      tier,
      tierTone,
    };
  }, [
    price,
    downPct,
    closingCosts,
    rehab,
    monthlyRent,
    monthlyExpenses,
    loanRate,
    loanTermYears,
  ]);

  const money = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Purchase price
          </span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Down payment (%)
          </span>
          <input
            type="number"
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Closing costs
          </span>
          <input
            type="number"
            value={closingCosts}
            onChange={(e) => setClosingCosts(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Rehab costs
          </span>
          <input
            type="number"
            value={rehab}
            onChange={(e) => setRehab(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Monthly rent
          </span>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Monthly expenses (tax + ins + maint + HOA + PM)
          </span>
          <input
            type="number"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Loan rate (%)
          </span>
          <input
            type="number"
            value={loanRate}
            onChange={(e) => setLoanRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Loan term (years)
          </span>
          <input
            type="number"
            value={loanTermYears}
            onChange={(e) => setLoanTermYears(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Cash-on-cash return
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.cashOnCash.toFixed(2) + "%"}
            </div>
            <div className={`mt-1 text-xs font-medium ${result.tierTone}`}>
              Tier: {result.tier}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Annual cash flow
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {money(result.annualCashFlow)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Monthly cash flow
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {money(result.monthlyCashFlow)}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Mortgage payment {money(result.mortgagePayment)}/mo
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Break-even month
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {Number.isFinite(result.breakEvenMonth)
                ? `Month ${result.breakEvenMonth}`
                : "Never"}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Cash invested {money(result.cashInvested)}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500">
        8%+ is the common &ldquo;good deal&rdquo; threshold for long-term rentals.
        Mortgage uses a standard amortization formula.
      </p>
    </div>
  );
}
