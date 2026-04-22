"use client";

import { useMemo, useState } from "react";

function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function formatMoney0(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export interface LoanCalculatorProps {
  /** Initial loan amount ($). Overridable via ?amount=25000 URL param. */
  initialAmount?: number;
  /** Initial annual interest rate (%). Overridable via ?rate=7.5. */
  initialRate?: number;
  /** Initial term in years. Overridable via ?years=5. */
  initialYears?: number;
}

interface AmortRow {
  period: number;
  payment: number;
  interest: number;
  principal: number;
  extra: number;
  balance: number;
}

interface YearRow {
  year: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

/**
 * Amortize a loan month-by-month. `extra` is an extra amount paid on top
 * of the scheduled payment every month — used for early-payoff scenarios.
 * Loop exits early when the balance hits zero (which happens ahead of
 * schedule when `extra > 0`).
 */
function amortize(
  principal: number,
  annualRate: number,
  termYears: number,
  extra: number,
): AmortRow[] {
  const rows: AmortRow[] = [];
  const n = Math.max(1, Math.round(termYears * 12));
  const r = annualRate / 100 / 12;
  const scheduled =
    r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  let balance = principal;

  for (let i = 1; i <= n && balance > 0.005; i++) {
    const interestPart = balance * r;
    let principalPart = scheduled - interestPart;
    let extraPart = Math.max(0, extra);

    // Don't over-pay on the final month.
    if (principalPart + extraPart > balance) {
      const remaining = balance;
      if (principalPart >= remaining) {
        principalPart = remaining;
        extraPart = 0;
      } else {
        extraPart = remaining - principalPart;
      }
    }

    balance = Math.max(0, balance - principalPart - extraPart);
    rows.push({
      period: i,
      payment: interestPart + principalPart + extraPart,
      interest: interestPart,
      principal: principalPart,
      extra: extraPart,
      balance,
    });
  }
  return rows;
}

/** Collapse a month-by-month schedule into per-year totals. */
function rollupByYear(rows: AmortRow[]): YearRow[] {
  const out: YearRow[] = [];
  let year = 0;
  let acc = { payment: 0, interest: 0, principal: 0, balance: 0 };
  for (const r of rows) {
    const y = Math.ceil(r.period / 12);
    if (y !== year) {
      if (year > 0) out.push({ year, ...acc });
      year = y;
      acc = { payment: 0, interest: 0, principal: 0, balance: 0 };
    }
    acc.payment += r.payment;
    acc.interest += r.interest;
    acc.principal += r.principal + r.extra;
    acc.balance = r.balance;
  }
  if (year > 0) out.push({ year, ...acc });
  return out;
}

function payoffDateLabel(months: number): string {
  if (!Number.isFinite(months) || months <= 0) return "—";
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function downloadCsv(filename: string, rows: AmortRow[]) {
  const header = [
    "Month",
    "Payment",
    "Interest",
    "Principal",
    "Extra principal",
    "Remaining balance",
  ].join(",");
  const body = rows
    .map((r) =>
      [
        r.period,
        r.payment.toFixed(2),
        r.interest.toFixed(2),
        r.principal.toFixed(2),
        r.extra.toFixed(2),
        r.balance.toFixed(2),
      ].join(","),
    )
    .join("\n");
  const csv = `${header}\n${body}\n`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function LoanCalculator({
  initialAmount = 25000,
  initialRate = 7.5,
  initialYears = 5,
}: LoanCalculatorProps = {}) {
  const [amount, setAmount] = useState(initialAmount);
  const [rate, setRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);
  const [extra, setExtra] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [granularity, setGranularity] = useState<"year" | "month">("year");

  const { scheduled, baseline, withExtra } = useMemo(() => {
    const n = Math.max(1, Math.round(years * 12));
    const r = rate / 100 / 12;
    const sched =
      r === 0 ? amount / n : (amount * r) / (1 - Math.pow(1 + r, -n));
    const baseRows = amortize(amount, rate, years, 0);
    const extraRows = amortize(amount, rate, years, extra);
    return {
      scheduled: sched,
      baseline: {
        rows: baseRows,
        interest: baseRows.reduce((a, r) => a + r.interest, 0),
        months: baseRows.length,
      },
      withExtra: {
        rows: extraRows,
        interest: extraRows.reduce((a, r) => a + r.interest, 0),
        months: extraRows.length,
      },
    };
  }, [amount, rate, years, extra]);

  const activeRows = extra > 0 ? withExtra.rows : baseline.rows;
  const totalInterest = extra > 0 ? withExtra.interest : baseline.interest;
  const totalPaid = amount + totalInterest;
  const interestSaved = Math.max(0, baseline.interest - withExtra.interest);
  const monthsSaved = Math.max(0, baseline.months - withExtra.months);

  const yearRows = useMemo(() => rollupByYear(activeRows), [activeRows]);
  const tableRows: YearRow[] | AmortRow[] =
    granularity === "year" ? yearRows : activeRows;

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">
          Loan amount ($)
        </span>
        <input
          type="number"
          value={amount}
          min={0}
          step={100}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Rate (%)
          </span>
          <input
            type="number"
            value={rate}
            min={0}
            step={0.1}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Term (years)
          </span>
          <input
            type="number"
            value={years}
            min={1}
            max={40}
            step={1}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">
          Extra monthly payment ($){" "}
          <span className="text-xs font-normal text-slate-500">
            (optional — pays down principal faster)
          </span>
        </span>
        <input
          type="number"
          value={extra}
          min={0}
          step={25}
          onChange={(e) => setExtra(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">
          Monthly payment
        </p>
        <p className="text-3xl font-bold">
          {formatMoney(scheduled + extra)}
        </p>
        {extra > 0 && (
          <p className="mt-1 text-xs text-white/70">
            {formatMoney(scheduled)} scheduled + {formatMoney(extra)} extra
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Total paid
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {formatMoney(totalPaid)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Total interest
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {formatMoney(totalInterest)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Payoff date
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {payoffDateLabel(activeRows.length)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Payoff timeline
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {activeRows.length} mo
          </p>
        </div>
      </div>

      {extra > 0 && interestSaved > 0 && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <p className="font-semibold">
            Paying {formatMoney(extra)}/mo extra saves you{" "}
            {formatMoney0(interestSaved)}
          </p>
          <p className="mt-1 text-xs text-emerald-800">
            You&rsquo;d pay off the loan {monthsSaved} month
            {monthsSaved === 1 ? "" : "s"} earlier — interest avoided:{" "}
            {formatMoney(interestSaved)}.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand hover:text-brand"
        >
          {showTable ? "Hide" : "Show"} amortization schedule
        </button>
        <button
          type="button"
          onClick={() =>
            downloadCsv(`loan-amortization-${amount}-${rate}-${years}y.csv`, activeRows)
          }
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand hover:text-brand"
        >
          Export CSV
        </button>
      </div>

      {showTable && (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs">
            <span className="font-semibold uppercase tracking-wide text-slate-600">
              Amortization ({tableRows.length}{" "}
              {granularity === "year" ? "years" : "months"})
            </span>
            <div className="inline-flex rounded-md bg-white ring-1 ring-slate-200">
              <button
                type="button"
                onClick={() => setGranularity("year")}
                className={`rounded-l-md px-2.5 py-1 text-xs font-medium ${
                  granularity === "year"
                    ? "bg-brand text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                By year
              </button>
              <button
                type="button"
                onClick={() => setGranularity("month")}
                className={`rounded-r-md px-2.5 py-1 text-xs font-medium ${
                  granularity === "month"
                    ? "bg-brand text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                By month
              </button>
            </div>
          </div>
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">
                  {granularity === "year" ? "Year" : "Month"}
                </th>
                <th className="px-3 py-2 text-right">Payment</th>
                <th className="px-3 py-2 text-right">Interest</th>
                <th className="px-3 py-2 text-right">Principal</th>
                <th className="px-3 py-2 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {granularity === "year"
                ? (tableRows as YearRow[]).map((r) => (
                    <tr key={`y-${r.year}`} className="hover:bg-slate-50">
                      <td className="px-3 py-2 font-medium text-slate-700">
                        {r.year}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {formatMoney0(r.payment)}
                      </td>
                      <td className="px-3 py-2 text-right text-rose-700">
                        {formatMoney0(r.interest)}
                      </td>
                      <td className="px-3 py-2 text-right text-emerald-700">
                        {formatMoney0(r.principal)}
                      </td>
                      <td className="px-3 py-2 text-right font-medium">
                        {formatMoney0(r.balance)}
                      </td>
                    </tr>
                  ))
                : (tableRows as AmortRow[]).map((r) => (
                    <tr key={`m-${r.period}`} className="hover:bg-slate-50">
                      <td className="px-3 py-2 font-medium text-slate-700">
                        {r.period}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {formatMoney(r.payment)}
                      </td>
                      <td className="px-3 py-2 text-right text-rose-700">
                        {formatMoney(r.interest)}
                      </td>
                      <td className="px-3 py-2 text-right text-emerald-700">
                        {formatMoney(r.principal + r.extra)}
                      </td>
                      <td className="px-3 py-2 text-right font-medium">
                        {formatMoney(r.balance)}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
