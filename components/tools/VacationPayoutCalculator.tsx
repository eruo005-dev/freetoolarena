"use client";

import { useMemo, useState } from "react";

export function VacationPayoutCalculator() {
  const [hours, setHours] = useState<number>(80);
  const [hourlyRate, setHourlyRate] = useState<number>(35);
  const [stateRate, setStateRate] = useState<number>(5);
  const [supplemental, setSupplemental] = useState<boolean>(true);

  const result = useMemo(() => {
    if (![hours, hourlyRate, stateRate].every(Number.isFinite)) return null;
    if (hours < 0 || hourlyRate < 0) return null;

    const gross = hours * hourlyRate;
    const fed = supplemental ? gross * 0.22 : gross * 0.12;
    const ss = Math.min(gross, 176100) * 0.062;
    const medi = gross * 0.0145;
    const state = gross * (Math.max(0, stateRate) / 100);

    const totalTax = fed + ss + medi + state;
    const net = gross - totalTax;

    return {
      gross,
      fed,
      ss,
      medi,
      state,
      totalTax,
      net,
      effective: gross > 0 ? totalTax / gross : 0,
    };
  }, [hours, hourlyRate, stateRate, supplemental]);

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  const pct = (n: number) => (n * 100).toFixed(1) + "%";

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Accrued PTO hours</span>
          <input
            type="number"
            min={0}
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
          <span className="mt-1 block text-xs text-slate-500">
            80 hours = 2 weeks (40-hour weeks)
          </span>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Hourly wage ($)</span>
          <input
            type="number"
            min={0}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
          <span className="mt-1 block text-xs text-slate-500">
            Salary &divide; 2080 = hourly equivalent
          </span>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">State income tax (%)</span>
          <input
            type="number"
            min={0}
            max={15}
            step={0.5}
            value={stateRate}
            onChange={(e) => setStateRate(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
          <span className="mt-1 block text-xs text-slate-500">
            0% in TX, FL, WA, NV, TN, NH, AK, SD, WY
          </span>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 sm:mt-6">
          <input
            type="checkbox"
            checked={supplemental}
            onChange={(e) => setSupplemental(e.target.checked)}
          />
          Treat as supplemental wage (22% federal flat)
        </label>
      </div>

      {result && (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
              <div className="text-xs uppercase tracking-wide text-emerald-700">Gross payout</div>
              <div className="text-2xl font-bold text-emerald-900">{fmt(result.gross)}</div>
              <div className="mt-1 text-xs text-emerald-800">{hours} h &times; {fmt(hourlyRate)}/h</div>
            </div>
            <div className="rounded-lg border border-rose-300 bg-rose-50 p-4">
              <div className="text-xs uppercase tracking-wide text-rose-700">Tax withheld</div>
              <div className="text-2xl font-bold text-rose-900">{fmt(result.totalTax)}</div>
              <div className="mt-1 text-xs text-rose-800">{pct(result.effective)} of gross</div>
            </div>
            <div className="rounded-lg border border-slate-300 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Take-home</div>
              <div className="text-2xl font-bold text-brand">{fmt(result.net)}</div>
              <div className="mt-1 text-xs text-slate-500">After all withholdings</div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Withholding breakdown</h4>
            <table className="w-full text-left text-sm">
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="py-1 text-slate-600">
                    Federal income tax {supplemental ? "(supplemental flat)" : "(regular)"}
                  </td>
                  <td className="py-1 text-right">{fmt(result.fed)}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-1 text-slate-600">Social Security (6.2%)</td>
                  <td className="py-1 text-right">{fmt(result.ss)}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-1 text-slate-600">Medicare (1.45%)</td>
                  <td className="py-1 text-right">{fmt(result.medi)}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-1 text-slate-600">State ({stateRate}%)</td>
                  <td className="py-1 text-right">{fmt(result.state)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            <strong>Heads up:</strong> most US employers default to the IRS supplemental wage method
            (22% federal flat) for PTO payouts, which can over-withhold if you&rsquo;re below the 22%
            bracket &mdash; you get the difference back at tax time. State rules vary: California,
            Massachusetts, and a few others <em>require</em> payout of unused vacation when you
            leave; many states leave it to company policy.
          </div>
        </>
      )}
    </div>
  );
}
