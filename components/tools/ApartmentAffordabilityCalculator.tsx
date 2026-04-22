"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function ApartmentAffordabilityCalculator() {
  const [income, setIncome] = useState("6000");
  const [debts, setDebts] = useState("400");
  const [savings, setSavings] = useState("5000");
  const [sampleRent, setSampleRent] = useState("1800");

  const { max30, max25, rti, dti, dtiHigh } = useMemo(() => {
    const inc = Math.max(0, parseFloat(income) || 0);
    const d = Math.max(0, parseFloat(debts) || 0);
    const r = Math.max(0, parseFloat(sampleRent) || 0);
    const m30 = inc * 0.3;
    const m25 = inc * 0.25;
    const rtiPct = inc > 0 ? (r / inc) * 100 : 0;
    const dtiPct = inc > 0 ? ((d + r) / inc) * 100 : 0;
    return { max30: m30, max25: m25, rti: rtiPct, dti: dtiPct, dtiHigh: dtiPct > 36 };
  }, [income, debts, sampleRent]);

  const rtiTiers = [0.2, 0.25, 0.3, 0.35, 0.4];
  const incomeNum = Math.max(0, parseFloat(income) || 0);
  const savingsNum = Math.max(0, parseFloat(savings) || 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-200 bg-white">
        <Field label="Gross monthly income ($)" value={income} onChange={setIncome} />
        <Field label="Existing monthly debts ($)" value={debts} onChange={setDebts} />
        <Field label="Savings for move-in (optional, $)" value={savings} onChange={setSavings} />
        <Field label="Rent you are considering ($)" value={sampleRent} onChange={setSampleRent} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span>Max rent (30% rule)</span>
          <span className="font-semibold">{money(max30)}</span>
        </div>
        <div className="flex justify-between">
          <span>Max rent (stricter 25%)</span>
          <span className="font-semibold">{money(max25)}</span>
        </div>
        <div className="flex justify-between">
          <span>Rent-to-income at {money(parseFloat(sampleRent) || 0)}</span>
          <span className="font-semibold">{rti.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold">DTI (debts + rent / income)</span>
          <span className={`font-bold ${dtiHigh ? "text-rose-600" : "text-brand"}`}>{dti.toFixed(1)}%</span>
        </div>
        {savingsNum > 0 && (
          <div className="flex justify-between">
            <span>Move-in savings cushion</span>
            <span className="font-semibold">{money(savingsNum)}</span>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold text-slate-700 mb-2">Rent-to-income snapshot</p>
        <ul className="space-y-1 text-sm">
          {rtiTiers.map((t) => (
            <li key={t} className="flex justify-between border-b border-slate-100 pb-1">
              <span>{Math.round(t * 100)}% of income</span>
              <span className="font-semibold">{money(incomeNum * t)}/mo</span>
            </li>
          ))}
        </ul>
      </div>

      {dtiHigh && (
        <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-800">
          DTI above 36% is considered high by most lenders and landlords. Consider a lower rent.
        </div>
      )}

      <p className="text-xs text-slate-500">
        Estimates only. Rule-of-thumb: max rent 30% of gross income; stricter 25% leaves more margin.
        Landlords often require DTI under 36% and rent-to-income under 30%.
      </p>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}
