"use client";

import { useMemo, useState } from "react";

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function fmt0(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function CarPaymentCalculator() {
  const [price, setPrice] = useState(32000);
  const [down, setDown] = useState(4000);
  const [trade, setTrade] = useState(0);
  const [taxPct, setTaxPct] = useState(6.5);
  const [ratePct, setRatePct] = useState(7.5);
  const [months, setMonths] = useState(60);

  const result = useMemo(() => {
    const p = Math.max(0, price);
    const d = Math.max(0, down);
    const t = Math.max(0, trade);
    const tax = (p * Math.max(0, taxPct)) / 100;
    const loan = Math.max(0, p + tax - d - t);
    const n = Math.max(1, Math.round(months));
    const r = Math.max(0, ratePct) / 100 / 12;

    const pmt =
      r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));

    const totalPaid = pmt * n;
    const totalInterest = Math.max(0, totalPaid - loan);

    // First-payment and last-payment interest/principal split.
    const firstInterest = loan * r;
    const firstPrincipal = Math.max(0, pmt - firstInterest);

    // Remaining balance at start of final month.
    let bal = loan;
    for (let i = 1; i < n; i++) {
      const iPart = bal * r;
      const pPart = Math.max(0, pmt - iPart);
      bal = Math.max(0, bal - pPart);
    }
    const lastInterest = bal * r;
    const lastPrincipal = Math.max(0, pmt - lastInterest);

    return {
      loan,
      tax,
      pmt,
      totalPaid,
      totalInterest,
      firstInterest,
      firstPrincipal,
      lastInterest,
      lastPrincipal,
    };
  }, [price, down, trade, taxPct, ratePct, months]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Vehicle price ($)
          </span>
          <input
            type="number"
            value={price}
            min={0}
            step={500}
            onChange={(e) => setPrice(Number(e.target.value))}
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
            Trade-in value ($)
          </span>
          <input
            type="number"
            value={trade}
            min={0}
            step={100}
            onChange={(e) => setTrade(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Sales tax (%)
          </span>
          <input
            type="number"
            value={taxPct}
            min={0}
            step={0.1}
            onChange={(e) => setTaxPct(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Loan rate (% APR)
          </span>
          <input
            type="number"
            value={ratePct}
            min={0}
            step={0.1}
            onChange={(e) => setRatePct(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Term (months)
          </span>
          <input
            type="number"
            value={months}
            min={12}
            max={96}
            step={12}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Monthly payment
        </p>
        <p className="text-2xl font-semibold tabular-nums text-brand">
          {fmt(result.pmt)}
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Loan amount: {fmt0(result.loan)} (incl. {fmt0(result.tax)} tax)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Total paid
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {fmt0(result.totalPaid)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Total interest
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {fmt0(result.totalInterest)}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Amortization summary
        </div>
        <table className="w-full min-w-[480px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Payment</th>
              <th className="px-3 py-2 text-right">Interest</th>
              <th className="px-3 py-2 text-right">Principal</th>
              <th className="px-3 py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-3 py-2 font-medium text-slate-700">
                First payment (mo 1)
              </td>
              <td className="px-3 py-2 text-right text-rose-700 tabular-nums">
                {fmt(result.firstInterest)}
              </td>
              <td className="px-3 py-2 text-right text-emerald-700 tabular-nums">
                {fmt(result.firstPrincipal)}
              </td>
              <td className="px-3 py-2 text-right font-medium tabular-nums">
                {fmt(result.pmt)}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium text-slate-700">
                Last payment (mo {Math.max(1, Math.round(months))})
              </td>
              <td className="px-3 py-2 text-right text-rose-700 tabular-nums">
                {fmt(result.lastInterest)}
              </td>
              <td className="px-3 py-2 text-right text-emerald-700 tabular-nums">
                {fmt(result.lastPrincipal)}
              </td>
              <td className="px-3 py-2 text-right font-medium tabular-nums">
                {fmt(result.pmt)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Early payments are mostly interest; late payments are mostly principal
        &mdash; that&rsquo;s why paying extra early saves so much.
      </p>
    </div>
  );
}
