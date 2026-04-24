"use client";

import { useMemo, useState } from "react";

type Rule = "20" | "15" | "10" | "dti";

function fmt(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "$0";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

/**
 * PMT-solve for max loan amount given a target monthly payment.
 * payment = L * r / (1 - (1 + r)^-n), so L = payment * (1 - (1+r)^-n) / r.
 */
function maxLoanFromPayment(
  payment: number,
  annualRate: number,
  termYears: number,
): number {
  const n = Math.max(1, Math.round(termYears * 12));
  const r = annualRate / 100 / 12;
  if (!Number.isFinite(payment) || payment <= 0) return 0;
  if (r === 0) return payment * n;
  return (payment * (1 - Math.pow(1 + r, -n))) / r;
}

/**
 * Rough monthly ownership costs (insurance + fuel + maintenance) scaled to
 * the target car price. Real-world $300-500/mo for a $25k car.
 */
function ownershipCost(carPrice: number): number {
  // Base $180/mo + ~1.3% of car price per year -> /12.
  const base = 180;
  const scaled = (carPrice * 0.013) / 12;
  return base + scaled;
}

export function CarAffordabilityCalculator() {
  const [income, setIncome] = useState(6500);
  const [debts, setDebts] = useState(400);
  const [down, setDown] = useState(3000);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(5);
  const [rule, setRule] = useState<Rule>("15");

  const result = useMemo(() => {
    const grossOk = Number.isFinite(income) && income > 0;
    if (!grossOk) {
      return {
        maxPayment: 0,
        maxLoan: 0,
        maxPrice: 0,
        ownership: 0,
        ruleLabel: "",
      };
    }

    let maxPayment = 0;
    let ruleLabel = "";

    if (rule === "20") {
      // Total ownership (payment + insurance + fuel + maint) <= 20% of gross.
      // Solve iteratively since ownership scales with car price.
      ruleLabel = "20% total ownership rule";
      const cap = income * 0.2;
      // Iterate: start with full cap as payment, shrink by ownership.
      let price = 25000;
      for (let i = 0; i < 20; i++) {
        const own = ownershipCost(price);
        const pmt = Math.max(0, cap - own);
        const loan = maxLoanFromPayment(pmt, rate, years);
        price = loan + Math.max(0, down);
        maxPayment = pmt;
      }
      const own = ownershipCost(price);
      return {
        maxPayment,
        maxLoan: Math.max(0, price - Math.max(0, down)),
        maxPrice: price,
        ownership: own,
        ruleLabel,
      };
    }

    if (rule === "15") {
      ruleLabel = "15% payment rule";
      maxPayment = income * 0.15;
    } else if (rule === "10") {
      ruleLabel = "10% payment rule (conservative)";
      maxPayment = income * 0.1;
    } else {
      ruleLabel = "DTI 36% rule";
      const totalDebtCap = income * 0.36;
      maxPayment = Math.max(0, totalDebtCap - Math.max(0, debts));
    }

    const maxLoan = maxLoanFromPayment(maxPayment, rate, years);
    const maxPrice = maxLoan + Math.max(0, down);
    const ownership = ownershipCost(maxPrice);
    return { maxPayment, maxLoan, maxPrice, ownership, ruleLabel };
  }, [income, debts, down, rate, years, rule]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Monthly gross income ($)
          </span>
          <input
            type="number"
            value={income}
            min={0}
            step={100}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Existing monthly debts ($)
          </span>
          <input
            type="number"
            value={debts}
            min={0}
            step={25}
            onChange={(e) => setDebts(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Down payment ($)
          </span>
          <input
            type="number"
            value={down}
            min={0}
            step={100}
            onChange={(e) => setDown(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Loan rate (% APR)
          </span>
          <input
            type="number"
            value={rate}
            min={0}
            step={0.1}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Loan term (years)
          </span>
          <input
            type="number"
            value={years}
            min={1}
            max={10}
            step={1}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Affordability rule
          </span>
          <select
            value={rule}
            onChange={(e) => setRule(e.target.value as Rule)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value="20">20% total ownership rule</option>
            <option value="15">15% payment rule</option>
            <option value="10">10% payment rule (conservative)</option>
            <option value="dti">DTI 36% rule</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Max car price you can afford
        </p>
        <p className="text-2xl font-semibold tabular-nums text-brand">
          {fmt(result.maxPrice)}
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Using: {result.ruleLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Max monthly payment
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {fmt(result.maxPayment)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Max loan amount
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {fmt(result.maxLoan)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Ownership (ins/fuel/maint)
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {fmt(result.ownership)}
            <span className="ml-1 text-sm font-normal text-slate-500">/mo</span>
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">How the rules compare</p>
        <ul className="mt-2 space-y-1 text-xs text-slate-600">
          <li>
            <strong>20% rule</strong> &mdash; payment + insurance + fuel +
            maintenance must stay under 20% of gross income.
          </li>
          <li>
            <strong>15% rule</strong> &mdash; loan payment alone stays under 15%
            of gross (most common).
          </li>
          <li>
            <strong>10% rule</strong> &mdash; payment under 10% of gross (Dave
            Ramsey / most conservative).
          </li>
          <li>
            <strong>DTI rule</strong> &mdash; all debts (car + existing) under
            36% of gross (lender threshold).
          </li>
        </ul>
      </div>
    </div>
  );
}
