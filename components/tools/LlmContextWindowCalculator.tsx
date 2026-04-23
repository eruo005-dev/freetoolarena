"use client";

import { useMemo, useState } from "react";

const MODELS = [
  { id: "gpt-4o", label: "GPT-4o", ctx: 128000 },
  { id: "claude-opus-4", label: "Claude Opus 4", ctx: 200000 },
  { id: "claude-sonnet-4", label: "Claude Sonnet 4", ctx: 200000 },
  { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro", ctx: 2000000 },
  { id: "llama-3.1", label: "Llama 3.1", ctx: 128000 },
  { id: "mistral-large", label: "Mistral Large", ctx: 128000 },
];

export function LlmContextWindowCalculator() {
  const [inputTokens, setInputTokens] = useState("5000");
  const [outputTokens, setOutputTokens] = useState("1000");

  const rows = useMemo(() => {
    const inT = Number(inputTokens) || 0;
    const outT = Number(outputTokens) || 0;
    const needed = inT + outT;
    return MODELS.map((m) => {
      const fits = needed < m.ctx;
      const headroom = m.ctx - needed;
      const pct = Math.min(100, Math.max(0, (needed / m.ctx) * 100));
      return { ...m, fits, headroom, pct };
    });
  }, [inputTokens, outputTokens]);

  const totalNeeded = (Number(inputTokens) || 0) + (Number(outputTokens) || 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Input tokens</span>
          <input type="number" value={inputTokens} onChange={(e) => setInputTokens(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Expected output tokens</span>
          <input type="number" value={outputTokens} onChange={(e) => setOutputTokens(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-3">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Total needed</div>
        <div className="text-xl font-semibold tabular-nums text-brand">{totalNeeded.toLocaleString()} tokens</div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-3 py-2">Model</th>
              <th className="text-right px-3 py-2">Context</th>
              <th className="text-center px-3 py-2">Fits?</th>
              <th className="text-right px-3 py-2">Headroom</th>
              <th className="text-right px-3 py-2">Fill</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id} className="border-t border-slate-200">
                <td className="px-3 py-2 font-semibold">{m.label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-xs text-slate-600">{m.ctx.toLocaleString()}</td>
                <td className="px-3 py-2 text-center">
                  {m.fits
                    ? <span className="text-green-600 font-semibold">Yes</span>
                    : <span className="text-red-600 font-semibold">No</span>}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-xs">
                  {m.fits
                    ? <span className="text-slate-600">{m.headroom.toLocaleString()}</span>
                    : <span className="text-red-600 font-semibold">-{Math.abs(m.headroom).toLocaleString()}</span>}
                </td>
                <td className="px-3 py-2 text-right tabular-nums font-semibold">{m.pct.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Headroom = context window − (input + output). Leave ~10-20% buffer for safety and future edits.</p>
    </div>
  );
}
