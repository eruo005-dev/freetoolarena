"use client";

import { useState } from "react";

export function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [result, setResult] = useState<number[]>([]);

  const gen = () => {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    const n = Math.max(1, Math.min(count, 1000));
    if (unique) {
      const pool: number[] = [];
      for (let v = lo; v <= hi; v++) pool.push(v);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      setResult(pool.slice(0, Math.min(n, pool.length)));
    } else {
      setResult(Array.from({ length: n }, () => lo + Math.floor(Math.random() * (hi - lo + 1))));
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Min</span>
          <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Max</span>
          <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">How many</span>
          <input type="number" min={1} max={1000} value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="flex items-center gap-2 mt-5">
          <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="h-4 w-4 accent-brand" />
          <span className="text-sm text-slate-700">Unique only</span>
        </label>
      </div>
      <button type="button" onClick={gen}
        className="rounded-lg bg-brand-dark text-white px-4 py-2 text-sm font-semibold hover:bg-brand">
        Generate
      </button>
      {result.length > 0 && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-sm break-words">
          {result.join(", ")}
        </div>
      )}
    </div>
  );
}
