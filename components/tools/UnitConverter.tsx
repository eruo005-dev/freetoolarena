"use client";

import { useMemo, useState } from "react";

type Category = "length" | "weight" | "volume" | "area";

const UNITS: Record<Category, Record<string, number>> = {
  length: {
    mm: 0.001, cm: 0.01, m: 1, km: 1000,
    in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344,
  },
  weight: {
    mg: 0.000001, g: 0.001, kg: 1, tonne: 1000,
    oz: 0.028349523125, lb: 0.45359237, st: 6.35029318,
  },
  volume: {
    ml: 0.001, L: 1, m3: 1000,
    tsp: 0.00492892, tbsp: 0.01478676, floz: 0.0295735, cup: 0.236588, pint: 0.473176, quart: 0.946353, gal: 3.78541,
  },
  area: {
    m2: 1, km2: 1_000_000, ha: 10_000,
    ft2: 0.09290304, yd2: 0.83612736, acre: 4046.8564224, mi2: 2_589_988.110336,
  },
};

export function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState("1");
  const unitList = Object.keys(UNITS[category]);
  const [from, setFrom] = useState(unitList[0]);
  const [to, setTo] = useState(unitList[1]);

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (!isFinite(v)) return "";
    const inBase = v * UNITS[category][from];
    const out = inBase / UNITS[category][to];
    return fmt(out);
  }, [category, value, from, to]);

  function changeCategory(c: Category) {
    setCategory(c);
    const list = Object.keys(UNITS[c]);
    setFrom(list[0]);
    setTo(list[1]);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(UNITS) as Category[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => changeCategory(c)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              category === c ? "bg-brand text-white" : "border border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {c[0].toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">From</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-slate-300 px-2 py-2 w-28">
              {unitList.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
          <div className="flex gap-2">
            <input
              readOnly
              value={result}
              className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono"
            />
            <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-slate-300 px-2 py-2 w-28">
              {unitList.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function fmt(n: number): string {
  if (!isFinite(n)) return "";
  const abs = Math.abs(n);
  if (abs === 0) return "0";
  if (abs >= 1e6 || abs < 1e-4) return n.toExponential(4);
  return parseFloat(n.toPrecision(8)).toString();
}
