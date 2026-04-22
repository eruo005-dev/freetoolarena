"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function monthlyPayment(principal: number, aprPct: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = aprPct / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

export function LeaseVsBuyCalculator() {
  // Lease
  const [leaseMonthly, setLeaseMonthly] = useState("350");
  const [leaseMonths, setLeaseMonths] = useState("36");
  const [leaseUpfront, setLeaseUpfront] = useState("2000");
  const [mileageCap, setMileageCap] = useState("36000");
  const [milesPerYear, setMilesPerYear] = useState("15000");
  const [overMileRate, setOverMileRate] = useState("0.25");

  // Buy
  const [price, setPrice] = useState("32000");
  const [down, setDown] = useState("4000");
  const [apr, setApr] = useState("6.5");
  const [financeMonths, setFinanceMonths] = useState("60");
  const [residual, setResidual] = useState("18000");

  const { leaseTotal, buyTotal, buyMonthly, overMilesPenalty, termMonths, delta } = useMemo(() => {
    const lm = Math.max(0, parseFloat(leaseMonthly) || 0);
    const lt = Math.max(1, parseInt(leaseMonths) || 36);
    const lu = Math.max(0, parseFloat(leaseUpfront) || 0);
    const cap = Math.max(0, parseFloat(mileageCap) || 0);
    const mpy = Math.max(0, parseFloat(milesPerYear) || 0);
    const omr = Math.max(0, parseFloat(overMileRate) || 0);

    const driven = mpy * (lt / 12);
    const over = Math.max(0, driven - cap);
    const penalty = over * omr;
    const lTotal = lm * lt + lu + penalty;

    const p = Math.max(0, parseFloat(price) || 0);
    const d = Math.max(0, parseFloat(down) || 0);
    const a = Math.max(0, parseFloat(apr) || 0);
    const fm = Math.max(1, parseInt(financeMonths) || 60);
    const res = Math.max(0, parseFloat(residual) || 0);
    const financed = Math.max(0, p - d);
    const bMonthly = monthlyPayment(financed, a, fm);
    // Total cost over lease term (apples-to-apples): down + monthly × leaseMonths - residual value retained
    const bTotal = d + bMonthly * lt - res;

    return {
      leaseTotal: lTotal,
      buyTotal: bTotal,
      buyMonthly: bMonthly,
      overMilesPenalty: penalty,
      termMonths: lt,
      delta: lTotal - bTotal,
    };
  }, [leaseMonthly, leaseMonths, leaseUpfront, mileageCap, milesPerYear, overMileRate, price, down, apr, financeMonths, residual]);

  const leaseCheaper = delta < 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Lease</h3>
          <Field label="Monthly payment ($)" value={leaseMonthly} onChange={setLeaseMonthly} />
          <Field label="Term (months)" value={leaseMonths} onChange={setLeaseMonths} step={1} />
          <Field label="Upfront fee / down ($)" value={leaseUpfront} onChange={setLeaseUpfront} />
          <Field label="Mileage cap (total)" value={mileageCap} onChange={setMileageCap} step={1} />
          <Field label="Miles driven / year" value={milesPerYear} onChange={setMilesPerYear} step={1} />
          <Field label="Over-mileage $/mile" value={overMileRate} onChange={setOverMileRate} step={0.01} />
        </div>
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Buy / Finance</h3>
          <Field label="Vehicle price ($)" value={price} onChange={setPrice} />
          <Field label="Down payment ($)" value={down} onChange={setDown} />
          <Field label="APR (%)" value={apr} onChange={setApr} step={0.01} />
          <Field label="Finance term (months)" value={financeMonths} onChange={setFinanceMonths} step={1} />
          <Field label="Residual value at lease-end ($)" value={residual} onChange={setResidual} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Lease total over {termMonths} mo</p>
          <div className="flex justify-between"><span>Monthly × term</span><span className="font-semibold">{money((parseFloat(leaseMonthly) || 0) * termMonths)}</span></div>
          <div className="flex justify-between"><span>Upfront</span><span className="font-semibold">{money(parseFloat(leaseUpfront) || 0)}</span></div>
          <div className="flex justify-between"><span>Over-mileage penalty</span><span className="font-semibold">{money(overMilesPenalty)}</span></div>
          <div className="flex justify-between border-t pt-2"><span className="font-bold">Total</span><span className="font-bold text-brand">{money(leaseTotal)}</span></div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Buy cost over {termMonths} mo</p>
          <div className="flex justify-between"><span>Estimated monthly</span><span className="font-semibold">{money(buyMonthly)}</span></div>
          <div className="flex justify-between"><span>Down payment</span><span className="font-semibold">{money(parseFloat(down) || 0)}</span></div>
          <div className="flex justify-between"><span>Less residual value</span><span className="font-semibold">-{money(parseFloat(residual) || 0)}</span></div>
          <div className="flex justify-between border-t pt-2"><span className="font-bold">Net total</span><span className="font-bold text-brand">{money(buyTotal)}</span></div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
        <span className="font-semibold">Verdict (estimate): </span>
        {leaseCheaper ? (
          <span>Lease is <span className="text-brand font-bold">{money(Math.abs(delta))}</span> cheaper over {termMonths} months.</span>
        ) : (
          <span>Buying is <span className="text-brand font-bold">{money(Math.abs(delta))}</span> cheaper over {termMonths} months.</span>
        )}
      </div>

      <p className="text-xs text-slate-500">
        Estimates only. Does not include insurance, taxes, fees, maintenance, opportunity cost on down payment,
        or depreciation risk. Use for rough comparison.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}
