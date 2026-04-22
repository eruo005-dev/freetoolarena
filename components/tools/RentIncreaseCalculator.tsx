"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

type Mode = "newRent" | "percent";

export function RentIncreaseCalculator() {
  const [mode, setMode] = useState<Mode>("newRent");
  const [oldRent, setOldRent] = useState("1500");
  const [newRent, setNewRent] = useState("1650");
  const [pctInc, setPctInc] = useState("7");

  const { dollarInc, percentInc, annualExtra, resolvedNewRent } = useMemo(() => {
    const o = Math.max(0, parseFloat(oldRent) || 0);
    if (mode === "newRent") {
      const n = Math.max(0, parseFloat(newRent) || 0);
      const diff = n - o;
      const pct = o > 0 ? (diff / o) * 100 : 0;
      return { dollarInc: diff, percentInc: pct, annualExtra: diff * 12, resolvedNewRent: n };
    } else {
      const p = parseFloat(pctInc) || 0;
      const n = o * (1 + p / 100);
      const diff = n - o;
      return { dollarInc: diff, percentInc: p, annualExtra: diff * 12, resolvedNewRent: n };
    }
  }, [mode, oldRent, newRent, pctInc]);

  const overCap = percentInc > 10;
  const overSoft = percentInc > 5 && !overCap;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("newRent")}
          className={
            mode === "newRent"
              ? "rounded-lg bg-brand text-white px-4 py-2 font-semibold"
              : "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          }
        >
          New rent $
        </button>
        <button
          type="button"
          onClick={() => setMode("percent")}
          className={
            mode === "percent"
              ? "rounded-lg bg-brand text-white px-4 py-2 font-semibold"
              : "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          }
        >
          % increase
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-200 bg-white">
        <Field label="Old monthly rent ($)" value={oldRent} onChange={setOldRent} step={1} />
        {mode === "newRent" ? (
          <Field label="New monthly rent ($)" value={newRent} onChange={setNewRent} step={1} />
        ) : (
          <Field label="Increase (%)" value={pctInc} onChange={setPctInc} step={0.1} />
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span>Resolved new rent</span>
          <span className="font-semibold">{money(resolvedNewRent)}</span>
        </div>
        <div className="flex justify-between">
          <span>Monthly $ increase</span>
          <span className="font-semibold">{money(dollarInc)}</span>
        </div>
        <div className="flex justify-between">
          <span>Percent increase</span>
          <span className="font-semibold">{percentInc.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold">Annual extra cost (estimate)</span>
          <span className="font-bold text-brand">{money(annualExtra)}</span>
        </div>
      </div>

      {overSoft && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Increase above 5% — above many rent-control caps. Check your local ordinance.
        </div>
      )}
      {overCap && (
        <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-800">
          Increase above 10% — often illegal in rent-controlled jurisdictions. Verify with a tenant resource.
        </div>
      )}

      <p className="text-xs text-slate-500">
        Estimates only. Many jurisdictions cap rent hikes at 5–10% per year; some tie caps to CPI. Check your
        local housing authority for binding limits.
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
