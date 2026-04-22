"use client";

import { useMemo, useState } from "react";

function toMinutes(t: string): number | null {
  const m = t.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  if (h < 0 || h > 23 || mm < 0 || mm > 59) return null;
  return h * 60 + mm;
}

function fmtHours(h: number): string {
  return h.toFixed(2);
}

function fmtTime(mins: number): string {
  const m = ((mins % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
}

export function LunchBreakCalculator() {
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");
  const [lunch, setLunch] = useState(30);
  const [paid, setPaid] = useState(false);
  const [rate, setRate] = useState(20);

  const result = useMemo(() => {
    const s = toMinutes(start);
    const e = toMinutes(end);
    if (s === null || e === null) return null;
    let totalMin = e - s;
    if (totalMin <= 0) totalMin += 24 * 60;
    const lunchMin = Math.max(0, Math.min(lunch, totalMin));
    const paidMin = paid ? totalMin : totalMin - lunchMin;
    const unpaidMin = paid ? 0 : lunchMin;
    const totalH = totalMin / 60;
    const paidH = paidMin / 60;
    const unpaidH = unpaidMin / 60;
    const pay = paidH * rate;
    const scenarios = [-15, 0, 15, 30].map((delta) => {
      const newLunch = Math.max(0, lunchMin + delta);
      const newEndMin = s + (paid ? totalMin : totalMin - lunchMin + newLunch);
      return { delta, lunch: newLunch, end: fmtTime(newEndMin) };
    });
    return { totalH, paidH, unpaidH, pay, scenarios };
  }, [start, end, lunch, paid, rate]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Shift start</span>
          <input type="time" value={start} onChange={(e) => setStart(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Shift end</span>
          <input type="time" value={end} onChange={(e) => setEnd(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Lunch break (minutes)</span>
          <input type="number" min={0} value={lunch} onChange={(e) => setLunch(parseInt(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Hourly rate ($)</span>
          <input type="number" min={0} step="0.01" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={paid} onChange={(e) => setPaid(e.target.checked)} className="h-4 w-4 accent-brand" />
        <span className="text-sm text-slate-700">Lunch break is paid</span>
      </label>

      {!result ? (
        <p className="text-sm text-rose-600">Enter valid times.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-xs uppercase text-slate-500">Total shift</div>
              <div className="text-2xl font-bold text-slate-800">{fmtHours(result.totalH)}h</div>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-xs uppercase text-slate-500">Paid hours</div>
              <div className="text-2xl font-bold text-slate-800">{fmtHours(result.paidH)}h</div>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-xs uppercase text-slate-500">Unpaid hours</div>
              <div className="text-2xl font-bold text-slate-800">{fmtHours(result.unpaidH)}h</div>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-xs uppercase text-slate-500">Gross pay</div>
              <div className="text-2xl font-bold text-brand">${result.pay.toFixed(2)}</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-700 mb-2">Shift end at different lunch lengths</div>
            <table className="w-full text-sm border border-slate-200">
              <thead>
                <tr>
                  <th className="bg-slate-100 px-3 py-2 text-left font-semibold">Lunch</th>
                  <th className="bg-slate-100 px-3 py-2 text-left font-semibold">Shift ends at</th>
                </tr>
              </thead>
              <tbody>
                {result.scenarios.map((s) => (
                  <tr key={s.delta}>
                    <td className="border-t border-slate-200 px-3 py-2">{s.lunch} min</td>
                    <td className="border-t border-slate-200 px-3 py-2">{s.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
