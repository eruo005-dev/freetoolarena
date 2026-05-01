"use client";

import { useMemo, useState } from "react";

type Status = "employee" | "self";

const SS_RATE_EMP = 0.062;
const SS_RATE_SE = 0.124;
const MEDI_RATE_EMP = 0.0145;
const MEDI_RATE_SE = 0.029;
const ADDL_MEDI = 0.009;

const SS_WAGE_BASE_2026 = 176100;
const ADDL_MEDI_THRESH_SINGLE = 200000;
const ADDL_MEDI_THRESH_MARRIED = 250000;

export function FicaTaxCalculator() {
  const [income, setIncome] = useState<number>(85000);
  const [status, setStatus] = useState<Status>("employee");
  const [married, setMarried] = useState<boolean>(false);

  const result = useMemo(() => {
    if (!Number.isFinite(income) || income < 0) return null;

    const ssBase = Math.min(income, SS_WAGE_BASE_2026);
    const ssRate = status === "employee" ? SS_RATE_EMP : SS_RATE_SE;
    const mediRate = status === "employee" ? MEDI_RATE_EMP : MEDI_RATE_SE;

    const ss = ssBase * ssRate;
    const medi = income * mediRate;

    const addlThresh = married ? ADDL_MEDI_THRESH_MARRIED : ADDL_MEDI_THRESH_SINGLE;
    const addlMedi = income > addlThresh ? (income - addlThresh) * ADDL_MEDI : 0;

    const total = ss + medi + addlMedi;
    const monthly = total / 12;
    const biweekly = total / 26;
    const effective = income > 0 ? total / income : 0;

    const seDeduction = status === "self" ? total * 0.5 : 0;

    return { ss, medi, addlMedi, total, monthly, biweekly, effective, seDeduction, ssBase };
  }, [income, status, married]);

  const fmt = (n: number) => "$" + Math.round(n).toLocaleString();
  const pct = (n: number) => (n * 100).toFixed(2) + "%";

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Wage / SE income ($)</span>
          <input
            type="number"
            min={0}
            value={income}
            onChange={(e) => setIncome(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Worker type</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value="employee">W-2 employee</option>
            <option value="self">Self-employed (SE tax)</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Filing status</span>
          <select
            value={married ? "married" : "single"}
            onChange={(e) => setMarried(e.target.value === "married")}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value="single">Single / HoH</option>
            <option value="married">Married joint</option>
          </select>
        </label>
      </div>

      {result && (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Total FICA / SE</div>
              <div className="text-2xl font-bold text-rose-700">{fmt(result.total)}</div>
              <div className="mt-1 text-xs text-slate-500">{pct(result.effective)} of gross</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Per month</div>
              <div className="text-2xl font-bold text-slate-800">{fmt(result.monthly)}</div>
              <div className="mt-1 text-xs text-slate-500">Set aside this much each month</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Per biweekly check</div>
              <div className="text-2xl font-bold text-slate-800">{fmt(result.biweekly)}</div>
              <div className="mt-1 text-xs text-slate-500">26 paychecks per year</div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Breakdown</h4>
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-1">Tax</th>
                  <th className="py-1">Rate</th>
                  <th className="py-1">Base</th>
                  <th className="py-1 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="py-1">Social Security (OASDI)</td>
                  <td className="py-1">
                    {status === "employee" ? "6.2%" : "12.4%"}
                  </td>
                  <td className="py-1 text-slate-600">
                    capped at {fmt(SS_WAGE_BASE_2026)}
                  </td>
                  <td className="py-1 text-right">{fmt(result.ss)}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-1">Medicare (HI)</td>
                  <td className="py-1">
                    {status === "employee" ? "1.45%" : "2.9%"}
                  </td>
                  <td className="py-1 text-slate-600">no cap</td>
                  <td className="py-1 text-right">{fmt(result.medi)}</td>
                </tr>
                {result.addlMedi > 0 && (
                  <tr className="border-t border-slate-100">
                    <td className="py-1">Additional Medicare</td>
                    <td className="py-1">0.9%</td>
                    <td className="py-1 text-slate-600">
                      over {fmt(married ? ADDL_MEDI_THRESH_MARRIED : ADDL_MEDI_THRESH_SINGLE)}
                    </td>
                    <td className="py-1 text-right">{fmt(result.addlMedi)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {status === "self" && (
            <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
              <strong>SE deduction tip:</strong> as a self-employed filer you can deduct half of your
              SE tax (~{fmt(result.seDeduction)}) on your federal return, even if you take the standard
              deduction. That softens the sting of paying both halves.
            </div>
          )}

          <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            <strong>Heads up:</strong> uses 2026 figures &mdash; SS wage base ${SS_WAGE_BASE_2026.toLocaleString()},
            additional Medicare thresholds $200k single / $250k married. Doesn&rsquo;t include federal
            income tax, state tax, or local payroll taxes. Use the tax bracket visualizer for income tax.
          </div>
        </>
      )}
    </div>
  );
}
