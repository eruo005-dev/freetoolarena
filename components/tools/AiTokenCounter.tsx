"use client";

import { useMemo, useState } from "react";

// Rough token estimate: English text averages ~3.8 characters per token for GPT-family BPE,
// Claude uses a similar ratio. Code / non-English drifts, so this is labeled as "approx".
const MODELS = [
  { id: "gpt-4o", label: "GPT-4o", ctx: 128000, inPrice: 2.5, outPrice: 10 },
  { id: "gpt-4o-mini", label: "GPT-4o mini", ctx: 128000, inPrice: 0.15, outPrice: 0.6 },
  { id: "gpt-4-turbo", label: "GPT-4 Turbo", ctx: 128000, inPrice: 10, outPrice: 30 },
  { id: "claude-opus-4", label: "Claude Opus 4", ctx: 200000, inPrice: 15, outPrice: 75 },
  { id: "claude-sonnet-4", label: "Claude Sonnet 4", ctx: 200000, inPrice: 3, outPrice: 15 },
  { id: "claude-haiku-4", label: "Claude Haiku 4", ctx: 200000, inPrice: 0.8, outPrice: 4 },
  { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro", ctx: 2000000, inPrice: 1.25, outPrice: 5 },
  { id: "gemini-1.5-flash", label: "Gemini 1.5 Flash", ctx: 1000000, inPrice: 0.075, outPrice: 0.3 },
  { id: "llama-3.1-70b", label: "Llama 3.1 70B", ctx: 128000, inPrice: 0.35, outPrice: 0.4 },
  { id: "mistral-large", label: "Mistral Large", ctx: 128000, inPrice: 2, outPrice: 6 },
];

export function AiTokenCounter() {
  const [text, setText] = useState("Paste any prompt or document here to estimate its token count and API cost across common AI models.\n\nThis uses a rough heuristic (characters ÷ 3.8) that is accurate to within ~10% for English prose. Code, non-English text, and long numbers will drift — always measure with the official tokenizer for billing-critical work.");
  const [outputTokens, setOutputTokens] = useState("500");

  const chars = text.length;
  const words = useMemo(() => text.trim() ? text.trim().split(/\s+/).length : 0, [text]);
  const tokens = Math.round(chars / 3.8);
  const bytes = useMemo(() => new Blob([text]).size, [text]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Paste text</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Characters</div>
          <div className="text-xl font-semibold tabular-nums">{chars.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Words</div>
          <div className="text-xl font-semibold tabular-nums">{words.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">~ Tokens</div>
          <div className="text-xl font-semibold tabular-nums text-brand">{tokens.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Bytes (UTF-8)</div>
          <div className="text-xl font-semibold tabular-nums">{bytes.toLocaleString()}</div>
        </div>
      </div>

      <label className="block max-w-xs">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Assumed output tokens</span>
        <input type="number" value={outputTokens} onChange={(e) => setOutputTokens(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
      </label>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-3 py-2">Model</th>
              <th className="text-right px-3 py-2">Context</th>
              <th className="text-right px-3 py-2">Input $/M</th>
              <th className="text-right px-3 py-2">Output $/M</th>
              <th className="text-right px-3 py-2">Est. cost (1 call)</th>
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m) => {
              const outTok = Number(outputTokens) || 0;
              const cost = (tokens * m.inPrice + outTok * m.outPrice) / 1_000_000;
              const fits = tokens < m.ctx;
              return (
                <tr key={m.id} className="border-t border-slate-200">
                  <td className="px-3 py-2 font-semibold">{m.label}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-xs">
                    {fits
                      ? <span className="text-slate-600">{m.ctx.toLocaleString()}</span>
                      : <span className="text-red-600 font-semibold">too long ({m.ctx.toLocaleString()})</span>}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-xs text-slate-600">${m.inPrice.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-xs text-slate-600">${m.outPrice.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right tabular-nums font-semibold">${cost.toFixed(4)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Prices are list rates per million tokens. Estimate uses ~3.8 chars/token — within ~10% for English prose. For billing-critical counts, use each provider's official tokenizer.</p>
    </div>
  );
}
