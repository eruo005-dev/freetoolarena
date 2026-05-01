"use client";

import { useMemo, useState } from "react";

const MODELS = [
  { name: "Claude Sonnet 4.6", in: 3.00, out: 15.00 },
  { name: "Claude Opus 4.7",   in: 15.00, out: 75.00 },
  { name: "GPT-5",             in: 2.50, out: 10.00 },
  { name: "GPT-5 mini",        in: 0.25, out: 2.00 },
  { name: "Gemini 2.5 Pro",    in: 1.25, out: 5.00 },
  { name: "Gemini 2.5 Flash",  in: 0.30, out: 2.50 },
  { name: "DeepSeek V3.2",     in: 0.27, out: 1.10 },
];

export function AiAgentLoopCostEstimator() {
  const [systemK, setSystemK] = useState<number>(8);
  const [stepIn, setStepIn] = useState<number>(1.5);
  const [stepOut, setStepOut] = useState<number>(0.6);
  const [steps, setSteps] = useState<number>(12);
  const [runs, setRuns] = useState<number>(500);

  const rows = useMemo(() => {
    return MODELS.map((m) => {
      const totalIn = systemK + (stepIn * steps) + (steps * (steps - 1) / 2 * stepOut);
      const totalOut = stepOut * steps;
      const perRun = (totalIn * m.in + totalOut * m.out) / 1000;
      return { ...m, perRun, monthly: perRun * runs };
    }).sort((a, b) => a.monthly - b.monthly);
  }, [systemK, stepIn, stepOut, steps, runs]);

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: n < 10 ? 4 : 2 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">System / tools prompt (k)</span>
          <input type="number" min={0} value={systemK} onChange={(e) => setSystemK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Per-step new input (k)</span>
          <input type="number" min={0} step={0.1} value={stepIn} onChange={(e) => setStepIn(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Per-step output (k)</span>
          <input type="number" min={0} step={0.1} value={stepOut} onChange={(e) => setStepOut(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Avg steps per run</span>
          <input type="number" min={1} value={steps} onChange={(e) => setSteps(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium text-slate-700">Runs / month</span>
          <input type="number" min={0} value={runs} onChange={(e) => setRuns(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Model</th><th className="py-1 text-right">$/run</th><th className="py-1 text-right">$/month</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-slate-100">
                <td className="py-1 font-medium">{r.name}</td>
                <td className="py-1 text-right">{fmt(r.perRun)}</td>
                <td className="py-1 text-right font-semibold">{fmt(r.monthly)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <strong>The hidden cost:</strong> agentic loops accumulate context across steps. By step 12,
        the model is reading every prior tool call + result. This calculator uses the standard
        triangular-sum estimate. Real-world: enable prompt caching to cut the input multiplier by ~10x.
      </div>
    </div>
  );
}
