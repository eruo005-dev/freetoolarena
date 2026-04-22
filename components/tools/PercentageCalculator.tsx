"use client";

import { useMemo, useState } from "react";

export function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [pctOf, setPctOf] = useState({ x: "", y: "" });
  // Mode 2: X is what % of Y?
  const [isWhat, setIsWhat] = useState({ x: "", y: "" });
  // Mode 3: Percent change from X to Y
  const [change, setChange] = useState({ x: "", y: "" });

  const result1 = useMemo(() => {
    const x = parseFloat(pctOf.x);
    const y = parseFloat(pctOf.y);
    if (!isFinite(x) || !isFinite(y)) return null;
    return (x / 100) * y;
  }, [pctOf]);

  const result2 = useMemo(() => {
    const x = parseFloat(isWhat.x);
    const y = parseFloat(isWhat.y);
    if (!isFinite(x) || !isFinite(y) || y === 0) return null;
    return (x / y) * 100;
  }, [isWhat]);

  const result3 = useMemo(() => {
    const x = parseFloat(change.x);
    const y = parseFloat(change.y);
    if (!isFinite(x) || !isFinite(y) || x === 0) return null;
    return ((y - x) / Math.abs(x)) * 100;
  }, [change]);

  const fmt = (n: number | null, decimals = 2) =>
    n === null ? "—" : Number.isFinite(n) ? n.toFixed(decimals).replace(/\.?0+$/, "") || "0" : "—";

  const fmtSigned = (n: number | null) => {
    if (n === null) return "—";
    const sign = n > 0 ? "+" : "";
    return sign + fmt(n);
  };

  return (
    <div className="space-y-5">
      {/* Mode 1 */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <h3 className="font-semibold text-slate-900">What is X% of Y?</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">X (percent)</span>
            <input
              type="number"
              value={pctOf.x}
              onChange={(e) => setPctOf({ ...pctOf, x: e.target.value })}
              placeholder="e.g. 20"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Y (value)</span>
            <input
              type="number"
              value={pctOf.y}
              onChange={(e) => setPctOf({ ...pctOf, y: e.target.value })}
              placeholder="e.g. 150"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
        <p className="text-slate-700">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">Result: </span>
          <span className="font-bold text-brand text-xl ml-1">{fmt(result1)}</span>
        </p>
      </div>

      {/* Mode 2 */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <h3 className="font-semibold text-slate-900">X is what % of Y?</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">X (part)</span>
            <input
              type="number"
              value={isWhat.x}
              onChange={(e) => setIsWhat({ ...isWhat, x: e.target.value })}
              placeholder="e.g. 30"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Y (whole)</span>
            <input
              type="number"
              value={isWhat.y}
              onChange={(e) => setIsWhat({ ...isWhat, y: e.target.value })}
              placeholder="e.g. 150"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
        <p className="text-slate-700">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">Result: </span>
          <span className="font-bold text-brand text-xl ml-1">{fmt(result2)}%</span>
        </p>
      </div>

      {/* Mode 3 */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <h3 className="font-semibold text-slate-900">Percent change from X to Y</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">X (start)</span>
            <input
              type="number"
              value={change.x}
              onChange={(e) => setChange({ ...change, x: e.target.value })}
              placeholder="e.g. 100"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Y (end)</span>
            <input
              type="number"
              value={change.y}
              onChange={(e) => setChange({ ...change, y: e.target.value })}
              placeholder="e.g. 125"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
        <p className="text-slate-700">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">Result: </span>
          <span
            className={`font-bold text-xl ml-1 ${
              result3 === null ? "text-brand" : result3 >= 0 ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {fmtSigned(result3)}
            {result3 !== null ? "%" : ""}
          </span>
        </p>
      </div>
    </div>
  );
}
