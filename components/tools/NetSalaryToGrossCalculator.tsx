"use client";
import { useMemo, useState } from "react";

export function NetSalaryToGrossCalculator() {
  const [net, setNet] = useState("75000");
  const [fed, setFed] = useState("22");
  const [fica, setFica] = useState("7.65");
  const [state, setState] = useState("5");

  const nNum = useMemo(() => { const n = Number(net); return Number.isFinite(n) && n >= 0 ? n : 0; }, [net]);
  const fedNum = useMemo(() => { const n = Number(fed); return Number.isFinite(n) && n >= 0 ? n : 0; }, [fed]);
  const ficaNum = useMemo(() => { const n = Number(fica); return Number.isFinite(n) && n >= 0 ? n : 0; }, [fica]);
  const stateNum = useMemo(() => { const n = Number(state); return Number.isFinite(n) && n >= 0 ? n : 0; }, [state]);

  const result = useMemo(() => {
    const effective = (fedNum + ficaNum + stateNum) / 100;
    const gross = effective < 1 ? nNum / (1 - effective) : 0;
    const taxes = gross - nNum;
    const monthly = gross / 12;
    return {
      gross: Number.isFinite(gross) ? gross : 0,
      taxes: Number.isFinite(taxes) ? taxes : 0,
      monthly: Number.isFinite(monthly) ? monthly : 0,
      effective: effective * 100,
    };
  }, [nNum, fedNum, ficaNum, stateNum]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Desired Net Pay</span>
        <input type="number" value={net} onChange={(e) => setNet(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
      </label>
      <div className="grid grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Federal %</span>
          <input type="number" value={fed} onChange={(e) => setFed(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">FICA %</span>
          <input type="number" value={fica} onChange={(e) => setFica(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">State %</span>
          <input type="number" value={state} onChange={(e) => setState(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Required Gross Salary</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.gross)}</div>
        <div className="text-xs text-slate-500 mt-1">Effective rate: {result.effective.toFixed(2)}%</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Total Taxes</div>
          <div className="text-xl font-semibold tabular-nums text-slate-700">{fmt(result.taxes)}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Monthly Gross</div>
          <div className="text-xl font-semibold tabular-nums text-slate-700">{fmt(result.monthly)}</div>
        </div>
      </div>
      <p className="text-xs text-slate-500">For guidance only &mdash; not financial advice. Uses flat effective rates; actual paychecks use bracket math.</p>
    </div>
  );
}
