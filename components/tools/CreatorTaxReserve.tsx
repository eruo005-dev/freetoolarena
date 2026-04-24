"use client";

import { useMemo, useState } from "react";

type Filing = "single" | "married_joint" | "hoh";

const STATES: { code: string; name: string; rate: number }[] = [
  { code: "AK", name: "Alaska", rate: 0 },
  { code: "FL", name: "Florida", rate: 0 },
  { code: "NV", name: "Nevada", rate: 0 },
  { code: "NH", name: "New Hampshire", rate: 0 },
  { code: "SD", name: "South Dakota", rate: 0 },
  { code: "TN", name: "Tennessee", rate: 0 },
  { code: "TX", name: "Texas", rate: 0 },
  { code: "WA", name: "Washington", rate: 0 },
  { code: "WY", name: "Wyoming", rate: 0 },
  { code: "AZ", name: "Arizona", rate: 0.025 },
  { code: "CO", name: "Colorado", rate: 0.044 },
  { code: "GA", name: "Georgia", rate: 0.0549 },
  { code: "IL", name: "Illinois", rate: 0.0495 },
  { code: "IN", name: "Indiana", rate: 0.0315 },
  { code: "MA", name: "Massachusetts", rate: 0.05 },
  { code: "MI", name: "Michigan", rate: 0.0425 },
  { code: "NC", name: "North Carolina", rate: 0.045 },
  { code: "PA", name: "Pennsylvania", rate: 0.0307 },
  { code: "UT", name: "Utah", rate: 0.0485 },
  { code: "NJ", name: "New Jersey", rate: 0.06 },
  { code: "CT", name: "Connecticut", rate: 0.065 },
  { code: "MN", name: "Minnesota", rate: 0.0785 },
  { code: "OR", name: "Oregon", rate: 0.0875 },
  { code: "HI", name: "Hawaii", rate: 0.09 },
  { code: "NY", name: "New York", rate: 0.0685 },
  { code: "CA", name: "California", rate: 0.093 },
];

// 2024 single brackets (simplified)
const BRACKETS_SINGLE = [
  { upTo: 11600, rate: 0.1 },
  { upTo: 47150, rate: 0.12 },
  { upTo: 100525, rate: 0.22 },
  { upTo: 191950, rate: 0.24 },
  { upTo: 243725, rate: 0.32 },
  { upTo: 609350, rate: 0.35 },
  { upTo: Infinity, rate: 0.37 },
];
const BRACKETS_MFJ = [
  { upTo: 23200, rate: 0.1 },
  { upTo: 94300, rate: 0.12 },
  { upTo: 201050, rate: 0.22 },
  { upTo: 383900, rate: 0.24 },
  { upTo: 487450, rate: 0.32 },
  { upTo: 731200, rate: 0.35 },
  { upTo: Infinity, rate: 0.37 },
];
const BRACKETS_HOH = [
  { upTo: 16550, rate: 0.1 },
  { upTo: 63100, rate: 0.12 },
  { upTo: 100500, rate: 0.22 },
  { upTo: 191950, rate: 0.24 },
  { upTo: 243700, rate: 0.32 },
  { upTo: 609350, rate: 0.35 },
  { upTo: Infinity, rate: 0.37 },
];

const STD_DEDUCTION = { single: 14600, married_joint: 29200, hoh: 21900 };
const SE_CAP_2024 = 168600;

function federalTax(taxable: number, filing: Filing): number {
  if (!Number.isFinite(taxable) || taxable <= 0) return 0;
  const brackets =
    filing === "married_joint" ? BRACKETS_MFJ : filing === "hoh" ? BRACKETS_HOH : BRACKETS_SINGLE;
  let remaining = taxable;
  let prev = 0;
  let tax = 0;
  for (const b of brackets) {
    const span = Math.min(remaining, b.upTo - prev);
    if (span > 0) {
      tax += span * b.rate;
      remaining -= span;
    }
    prev = b.upTo;
    if (remaining <= 0) break;
  }
  return tax;
}

export function CreatorTaxReserve() {
  const [income, setIncome] = useState<number>(120000);
  const [expenses, setExpenses] = useState<number>(18000);
  const [stateCode, setStateCode] = useState<string>("CA");
  const [filing, setFiling] = useState<Filing>("single");

  const result = useMemo(() => {
    const gross = Number.isFinite(income) && income > 0 ? income : 0;
    const exp = Number.isFinite(expenses) && expenses > 0 ? expenses : 0;
    const net = Math.max(0, gross - exp);

    const seBase = Math.min(net * 0.9235, SE_CAP_2024);
    const seSS = seBase * 0.124;
    const seMedicare = net * 0.9235 * 0.029;
    const seTotal = seSS + seMedicare;

    const seDeduction = seTotal / 2;
    const stdDed = STD_DEDUCTION[filing];
    const taxable = Math.max(0, net - seDeduction - stdDed);
    const fedTax = federalTax(taxable, filing);

    const stateRate = STATES.find((s) => s.code === stateCode)?.rate ?? 0;
    const stateTax = net * stateRate;

    const totalTax = seTotal + fedTax + stateTax;
    const pct = gross > 0 ? (totalTax / gross) * 100 : 0;
    const monthly = totalTax / 12;
    const quarterly = totalTax / 4;

    return { net, seTotal, fedTax, stateTax, totalTax, pct, monthly, quarterly };
  }, [income, expenses, stateCode, filing]);

  const fmt = (n: number) =>
    Number.isFinite(n)
      ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
      : "$0";

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Gross creator income (yearly)</span>
          <input
            type="number"
            min={0}
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Deductible expenses (gear, software, home office, travel)
          </span>
          <input
            type="number"
            min={0}
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">State</span>
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} ({(s.rate * 100).toFixed(2)}%)
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Filing status</span>
          <select
            value={filing}
            onChange={(e) => setFiling(e.target.value as Filing)}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="single">Single</option>
            <option value="married_joint">Married filing jointly</option>
            <option value="hoh">Head of household</option>
          </select>
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-base font-semibold text-brand">Tax reserve recommendation</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md bg-white p-3 shadow-sm">
            <div className="text-xs uppercase text-slate-500">Reserve %</div>
            <div className="text-xl font-bold text-brand">{result.pct.toFixed(1)}%</div>
          </div>
          <div className="rounded-md bg-white p-3 shadow-sm">
            <div className="text-xs uppercase text-slate-500">Monthly set-aside</div>
            <div className="text-xl font-bold text-slate-900">{fmt(result.monthly)}</div>
          </div>
          <div className="rounded-md bg-white p-3 shadow-sm ring-2 ring-brand/40">
            <div className="text-xs uppercase text-slate-500">Quarterly estimated</div>
            <div className="text-xl font-bold text-brand">{fmt(result.quarterly)}</div>
          </div>
        </div>
        <dl className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <div className="flex justify-between"><dt>Net (income &minus; expenses)</dt><dd>{fmt(result.net)}</dd></div>
          <div className="flex justify-between"><dt>Self-employment tax</dt><dd>{fmt(result.seTotal)}</dd></div>
          <div className="flex justify-between"><dt>Federal income tax</dt><dd>{fmt(result.fedTax)}</dd></div>
          <div className="flex justify-between"><dt>State income tax</dt><dd>{fmt(result.stateTax)}</dd></div>
          <div className="flex justify-between border-t pt-2 font-semibold sm:col-span-2"><dt>Total annual tax</dt><dd>{fmt(result.totalTax)}</dd></div>
        </dl>
      </div>

      <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <h4 className="font-semibold">Heads up &mdash; consult a CPA</h4>
        <p className="mt-2">
          Quarterly estimated payments are due in April, June, September, and January. Creators who skip them get hit
          with IRS underpayment penalties every year. This calculator uses 2024 brackets and a simplified state rate
          &mdash; your actual liability depends on deductions, credits, and local taxes. Talk to a CPA who works with
          self-employed creators before filing.
        </p>
      </div>
    </div>
  );
}
