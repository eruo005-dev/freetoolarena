"use client";

import { useMemo, useState } from "react";

const SICK_DAY_REDUCTION = 0.175; // midpoint of 15-20%
const HEALTH_CLAIM_REDUCTION = 0.065; // midpoint of 5-8%
const TURNOVER_REDUCTION = 0.125; // midpoint of 10-15%
const DAILY_PRODUCTIVITY = 250; // estimated $ cost per sick day
const REPLACEMENT_COST_MULT = 0.5; // turnover cost = 50% of annual salary (conservative)
const AVG_SALARY = 65000;

export function CorporateWellnessRoi() {
  const [employees, setEmployees] = useState<number>(250);
  const [costPerEmp, setCostPerEmp] = useState<number>(150);
  const [participation, setParticipation] = useState<number>(40);
  const [sickDays, setSickDays] = useState<number>(8);
  const [claims, setClaims] = useState<number>(6500);
  const [turnover, setTurnover] = useState<number>(18);

  const result = useMemo(() => {
    const vals = [employees, costPerEmp, participation, sickDays, claims, turnover];
    if (!vals.every(Number.isFinite)) return null;
    if (employees <= 0) return null;

    const participants = employees * (participation / 100);
    const sickDaySavings =
      participants * sickDays * SICK_DAY_REDUCTION * DAILY_PRODUCTIVITY;
    const claimSavings = participants * claims * HEALTH_CLAIM_REDUCTION;
    const turnoverBaseline = employees * (turnover / 100);
    const turnoverSaved =
      turnoverBaseline * (participation / 100) * TURNOVER_REDUCTION * AVG_SALARY * REPLACEMENT_COST_MULT;

    const totalSavings = sickDaySavings + claimSavings + turnoverSaved;
    const totalCost = employees * costPerEmp;
    const net = totalSavings - totalCost;
    const roiPct = totalCost > 0 ? (net / totalCost) * 100 : 0;
    const paybackMonths = totalSavings > 0 ? (totalCost / totalSavings) * 12 : Infinity;
    const perEmployee = employees > 0 ? net / employees : 0;

    return {
      participants: Math.round(participants),
      sickDaySavings,
      claimSavings,
      turnoverSaved,
      totalSavings,
      totalCost,
      net,
      roiPct,
      paybackMonths,
      perEmployee,
    };
  }, [employees, costPerEmp, participation, sickDays, claims, turnover]);

  const fmt = (n: number) =>
    "$" + Math.round(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Employees</span>
          <input
            type="number"
            min={1}
            value={employees}
            onChange={(e) => setEmployees(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Program cost per employee ($/yr)</span>
          <input
            type="number"
            min={0}
            value={costPerEmp}
            onChange={(e) => setCostPerEmp(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Expected participation (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={participation}
            onChange={(e) => setParticipation(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Sick days / employee / yr</span>
          <input
            type="number"
            min={0}
            value={sickDays}
            onChange={(e) => setSickDays(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Healthcare claims $ / employee</span>
          <input
            type="number"
            min={0}
            value={claims}
            onChange={(e) => setClaims(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Turnover rate (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={turnover}
            onChange={(e) => setTurnover(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      {result && (
        <>
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Net ROI</div>
              <div className="text-2xl font-bold text-brand">{fmt(result.net)}</div>
              <div className="text-xs text-slate-500">{result.roiPct.toFixed(1)}%</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Payback</div>
              <div className="text-2xl font-bold text-slate-800">
                {Number.isFinite(result.paybackMonths)
                  ? `${result.paybackMonths.toFixed(1)} mo`
                  : "N/A"}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Per employee</div>
              <div className="text-2xl font-bold text-slate-800">{fmt(result.perEmployee)}</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Participants</div>
              <div className="text-2xl font-bold text-slate-800">
                {result.participants.toLocaleString("en-US")}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Savings breakdown</h4>
            <ul className="space-y-1 text-sm text-slate-700">
              <li className="flex justify-between border-b border-slate-100 py-1">
                <span>Sick-day productivity recovered</span>
                <span className="font-medium">{fmt(result.sickDaySavings)}</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 py-1">
                <span>Healthcare claims avoided</span>
                <span className="font-medium">{fmt(result.claimSavings)}</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 py-1">
                <span>Turnover cost avoided</span>
                <span className="font-medium">{fmt(result.turnoverSaved)}</span>
              </li>
              <li className="flex justify-between py-1 text-brand">
                <span className="font-semibold">Total annual savings</span>
                <span className="font-bold">{fmt(result.totalSavings)}</span>
              </li>
              <li className="flex justify-between py-1 text-slate-600">
                <span>Program cost</span>
                <span>{fmt(result.totalCost)}</span>
              </li>
            </ul>
          </div>

          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            <strong className="text-slate-800">Citations:</strong> Assumptions draw on the RAND
            Workplace Wellness Programs Study (Mattke et al.) and Harvard Business Review meta-reviews:
            wellness programs typically reduce sick days 15&ndash;20%, healthcare claims 5&ndash;8%,
            and turnover 10&ndash;15% among active participants. Actual results vary with program
            design and engagement quality.
          </div>
        </>
      )}
    </div>
  );
}
