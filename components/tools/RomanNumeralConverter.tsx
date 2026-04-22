"use client";

import { useMemo, useState } from "react";

const PAIRS: Array<[number, string]> = [
  [1000000, "M̄"], [900000, "C̄M̄"], [500000, "D̄"], [400000, "C̄D̄"],
  [100000, "C̄"], [90000, "X̄C̄"], [50000, "L̄"], [40000, "X̄L̄"],
  [10000, "X̄"], [9000, "ĪX̄"], [5000, "V̄"], [4000, "ĪV̄"],
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(n: number): string {
  if (!Number.isFinite(n) || n < 1 || n > 3999999) return "";
  let out = "";
  for (const [v, s] of PAIRS) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
}

function fromRoman(s: string): number {
  const map: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
  };
  let total = 0;
  const up = s.toUpperCase();
  for (let i = 0; i < up.length; i++) {
    const cur = map[up[i]];
    const next = map[up[i + 1]];
    if (!cur) return NaN;
    if (next && next > cur) { total += next - cur; i++; }
    else total += cur;
  }
  return total;
}

export function RomanNumeralConverter() {
  const [num, setNum] = useState("2026");
  const [rom, setRom] = useState("MMXXVI");
  const romanFromNum = useMemo(() => toRoman(parseInt(num) || 0), [num]);
  const numFromRoman = useMemo(() => fromRoman(rom), [rom]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Number → Roman</span>
        <input
          value={num}
          onChange={(e) => setNum(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          placeholder="1-3999999"
        />
      </label>
      <div className="rounded-xl bg-slate-50 p-4">
        <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Roman numeral</span>
        <p className="font-mono text-2xl font-bold mt-1">{romanFromNum || <span className="text-slate-400 text-base">—</span>}</p>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Roman → Number</span>
        <input
          value={rom}
          onChange={(e) => setRom(e.target.value.toUpperCase())}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          placeholder="MCMXCIV"
        />
      </label>
      <div className="rounded-xl bg-slate-50 p-4">
        <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Number</span>
        <p className="font-mono text-2xl font-bold mt-1">{Number.isFinite(numFromRoman) ? numFromRoman : <span className="text-slate-400 text-base">—</span>}</p>
      </div>
    </div>
  );
}
