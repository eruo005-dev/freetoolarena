"use client";
import { useMemo, useState } from "react";

export function AnnuityPaymentCalculator() {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("20");
  const [freq, setFreq] = useState("12");

  const pNum = useMemo(() => { const n = Number(principal); return Number.isFinite(n) && n >= 0 ? n : 0; }, [principal]);
  const rNum = useMemo(() => { const n = Number(rate); return Number.isFinite(n) && n >= 0 ? n : 0; }, [rate]);
  const yNum = useMemo(() => { const n = Number(years); return Number.isFinite(n) && n > 0 ? n : 1; }, [years]);
  const fNum = useMemo(() => { const n = Number(freq); return Number.isFinite(n) && n > 0 ? n : 1; }, [freq]);

  const result = useMemo(() => {
    const periodicRate = rNum / 100 / fNum;
    const nPeriods = yNum * fNum;
    const payment = periodicRate > 0
      ? (pNum * periodicRate) / (1 - Math.pow(1 + periodicRate, -nPeriods))
      : pNum / nPeriods;
    const total = payment * nPeriods;
    const interest = total - pNum;
    return {
      payment: Number.isFinite(payment) ? payment : 0,
      total: Number.isFinite(total) ? total : 0,
      interest: Number.isFinite(interest) ? interest : 0,
    };
  }, [pNum, rNum, yNum, fNum]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const freqLabel = fNum === 12 ? "Monthly" : fNum === 4 ? "Quarterly" : fNum === 1 ? "Annual" : `Per period`;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Principal</span>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Annual Rate %</span>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Years</span>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Frequency</span>
          <select value={freq} onChange={(e) => setFreq(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono bg-white">
            <option value="12">Monthly</option>
            <option value="4">Quarterly</option>
            <option value="1">Annual</option>
          </select>
        </label>
      </div>
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{freqLabel} Payment</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.payment)}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Total Paid</div>
          <div className="text-xl font-semibold tabular-nums text-slate-700">{fmt(result.total)}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Total Interest</div>
          <div className="text-xl font-semibold tabular-nums text-slate-700">{fmt(result.interest)}</div>
        </div>
      </div>
      <p className="text-xs text-slate-500">For guidance only &mdash; not financial advice. Real annuity products carry fees and riders.</p>
    </div>
  );
}
