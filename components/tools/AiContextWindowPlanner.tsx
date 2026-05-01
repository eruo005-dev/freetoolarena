"use client";

import { useMemo, useState } from "react";

const MODELS = [
  { name: "Claude Sonnet 4.6", ctx: 1_000_000 },
  { name: "Claude Opus 4.7", ctx: 1_000_000 },
  { name: "Claude Haiku 4.5", ctx: 200_000 },
  { name: "GPT-5", ctx: 400_000 },
  { name: "GPT-5 mini", ctx: 400_000 },
  { name: "Gemini 3 Pro", ctx: 2_000_000 },
  { name: "Gemini 2.5 Pro", ctx: 2_000_000 },
  { name: "Gemini 2.5 Flash", ctx: 1_000_000 },
  { name: "DeepSeek V3.2", ctx: 128_000 },
  { name: "Kimi K2", ctx: 1_000_000 },
];

export function AiContextWindowPlanner() {
  const [systemK, setSystemK] = useState<number>(8);
  const [docK, setDocK] = useState<number>(60);
  const [historyK, setHistoryK] = useState<number>(12);
  const [outputK, setOutputK] = useState<number>(4);
  const [bufferK, setBufferK] = useState<number>(8);

  const total = systemK + docK + historyK + outputK + bufferK;
  const totalTokens = total * 1000;

  const fits = useMemo(() => MODELS.map((m) => ({ ...m, fits: m.ctx >= totalTokens, headroom: m.ctx - totalTokens })), [totalTokens]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">System / tools prompt (k tokens)</span>
          <input type="number" min={0} value={systemK} onChange={(e) => setSystemK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Documents / context (k)</span>
          <input type="number" min={0} value={docK} onChange={(e) => setDocK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Chat history / memory (k)</span>
          <input type="number" min={0} value={historyK} onChange={(e) => setHistoryK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Output (k)</span>
          <input type="number" min={0} value={outputK} onChange={(e) => setOutputK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium text-slate-700">Safety buffer (k)</span>
          <input type="number" min={0} value={bufferK} onChange={(e) => setBufferK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
          <span className="mt-1 block text-xs text-slate-500">Recommended: 5-10% of model context as headroom</span>
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">Total budgeted</div>
        <div className="text-2xl font-bold text-slate-800">{total.toLocaleString()}k tokens</div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Model</th><th>Context</th><th>Status</th><th className="text-right">Headroom</th></tr>
          </thead>
          <tbody>
            {fits.map((m) => (
              <tr key={m.name} className="border-t border-slate-100">
                <td className="py-1 font-medium">{m.name}</td>
                <td className="py-1 text-slate-600">{(m.ctx / 1000).toLocaleString()}k</td>
                <td className="py-1">{m.fits ? <span className="text-emerald-700">fits</span> : <span className="text-rose-700">overflow</span>}</td>
                <td className={`py-1 text-right ${m.headroom > 0 ? "text-emerald-700" : "text-rose-700"}`}>{(m.headroom / 1000).toLocaleString()}k</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Why the buffer matters:</strong> models degrade in quality near max context. Most pros operate at 50-70% of
        the rated context window for production reliability. If you&rsquo;re budgeting 90%+ of the context, downsize the
        document or upgrade the model.
      </div>
    </div>
  );
}
