"use client";

import { useMemo, useState } from "react";

export interface AverageCalculatorProps {
  initialNumbers?: string;
}

export function AverageCalculator({
  initialNumbers = "10, 20, 30, 40, 50",
}: AverageCalculatorProps = {}) {
  const [text, setText] = useState(initialNumbers);

  const result = useMemo(() => {
    const parts = text.split(/[\s,]+/).filter(Boolean);
    const nums: number[] = [];
    for (const p of parts) {
      const n = parseFloat(p);
      if (!Number.isFinite(n)) return { error: `Invalid number: "${p}"` };
      nums.push(n);
    }
    if (nums.length === 0) return null;

    const count = nums.length;
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / count;
    const sorted = [...nums].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[count - 1];
    const range = max - min;
    const mid = Math.floor(count / 2);
    const median = count % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

    // Mode
    const freq = new Map<number, number>();
    nums.forEach((n) => freq.set(n, (freq.get(n) || 0) + 1));
    let maxFreq = 0;
    freq.forEach((v) => {
      if (v > maxFreq) maxFreq = v;
    });
    let mode: string;
    if (maxFreq <= 1) {
      mode = "none";
    } else {
      const modes: number[] = [];
      freq.forEach((v, k) => {
        if (v === maxFreq) modes.push(k);
      });
      modes.sort((a, b) => a - b);
      mode = modes.join(", ");
    }

    // Variance & stddev
    const sqDiffs = nums.map((n) => (n - mean) ** 2);
    const sumSqDiffs = sqDiffs.reduce((a, b) => a + b, 0);
    const popVariance = sumSqDiffs / count;
    const sampleVariance = count > 1 ? sumSqDiffs / (count - 1) : NaN;
    const popStdDev = Math.sqrt(popVariance);
    const sampleStdDev = Math.sqrt(sampleVariance);

    return {
      count,
      sum,
      mean,
      median,
      mode,
      min,
      max,
      range,
      popVariance,
      sampleVariance,
      popStdDev,
      sampleStdDev,
    };
  }, [text]);

  const fmt = (n: number, decimals = 4) =>
    !Number.isFinite(n) ? "—" : parseFloat(n.toFixed(decimals)).toString();

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Numbers (comma, space, or newline separated)</span>
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          placeholder="e.g. 10, 20, 30, 40, 50"
        />
      </label>

      {!result ? (
        <p className="text-sm text-rose-600">Enter at least one number.</p>
      ) : "error" in result ? (
        <p className="text-sm text-rose-600">{result.error}</p>
      ) : (
        <>
          <div className="rounded-xl bg-slate-50 p-5 text-center">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Mean (average)</p>
            <p className="text-3xl font-bold text-brand tabular-nums">{fmt(result.mean)}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Stat label="Count" value={result.count.toString()} />
            <Stat label="Sum" value={fmt(result.sum)} />
            <Stat label="Median" value={fmt(result.median)} />
            <Stat label="Mode" value={result.mode} />
            <Stat label="Min" value={fmt(result.min)} />
            <Stat label="Max" value={fmt(result.max)} />
            <Stat label="Range" value={fmt(result.range)} />
            <Stat label="Variance (pop.)" value={fmt(result.popVariance)} />
            <Stat label="Variance (sample)" value={fmt(result.sampleVariance)} />
            <Stat label="Std Dev (pop.)" value={fmt(result.popStdDev)} />
            <Stat label="Std Dev (sample)" value={fmt(result.sampleStdDev)} />
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">{label}</p>
      <p className="text-base font-bold text-slate-900 tabular-nums break-words">{value}</p>
    </div>
  );
}
