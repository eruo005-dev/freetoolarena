"use client";

import { useMemo, useState } from "react";

type Model = {
  name: string;
  vendor: string;
  release: string;
  ctx: number;
  maxOut: number;
  inPrice: number;
  outPrice: number;
  multimodal: boolean;
  toolUse: boolean;
  jsonMode: boolean;
  strengths: string;
  weakness: string;
};

const MODELS: Model[] = [
  { name: "Claude Opus 4", vendor: "Anthropic", release: "2025", ctx: 200000, maxOut: 8192, inPrice: 15, outPrice: 75, multimodal: true, toolUse: true, jsonMode: true, strengths: "Best-in-class reasoning and long-form writing. Strong at following nuanced instructions and agentic tool use.", weakness: "Highest cost tier. Slower than smaller models." },
  { name: "Claude Sonnet 4", vendor: "Anthropic", release: "2025", ctx: 200000, maxOut: 8192, inPrice: 3, outPrice: 15, multimodal: true, toolUse: true, jsonMode: true, strengths: "Excellent quality-to-price ratio. Default pick for production coding agents.", weakness: "Loses to Opus on deep reasoning and creative nuance." },
  { name: "Claude Haiku 4", vendor: "Anthropic", release: "2025", ctx: 200000, maxOut: 8192, inPrice: 0.8, outPrice: 4, multimodal: true, toolUse: true, jsonMode: true, strengths: "Cheapest smart Claude. Fast enough for interactive chat and simple classification.", weakness: "Weaker at multi-step reasoning and code generation." },
  { name: "GPT-4o", vendor: "OpenAI", release: "2024", ctx: 128000, maxOut: 16384, inPrice: 2.5, outPrice: 10, multimodal: true, toolUse: true, jsonMode: true, strengths: "Solid all-rounder with fast voice and image capabilities. Huge ecosystem of tooling.", weakness: "Reasoning behind Claude Opus / o1. Writing feels more generic." },
  { name: "GPT-4o mini", vendor: "OpenAI", release: "2024", ctx: 128000, maxOut: 16384, inPrice: 0.15, outPrice: 0.6, multimodal: true, toolUse: true, jsonMode: true, strengths: "Extremely cheap and fast. Great for classification, extraction, and routing.", weakness: "Meaningfully weaker on hard reasoning and nuanced tasks." },
  { name: "o1", vendor: "OpenAI", release: "2024", ctx: 200000, maxOut: 100000, inPrice: 15, outPrice: 60, multimodal: true, toolUse: false, jsonMode: false, strengths: "Reasoning model that thinks internally before responding. Strong on math, science, hard coding problems.", weakness: "Expensive, slow, limited tool use, no streaming." },
  { name: "Gemini 1.5 Pro", vendor: "Google", release: "2024", ctx: 2000000, maxOut: 8192, inPrice: 1.25, outPrice: 5, multimodal: true, toolUse: true, jsonMode: true, strengths: "2M-token context window — unmatched for feeding entire codebases or long videos.", weakness: "Quality dips at very long contexts. Safety filters can be intrusive." },
  { name: "Gemini 1.5 Flash", vendor: "Google", release: "2024", ctx: 1000000, maxOut: 8192, inPrice: 0.075, outPrice: 0.3, multimodal: true, toolUse: true, jsonMode: true, strengths: "Cheapest long-context option. Millions of tokens at sub-cent prices.", weakness: "Lower quality than Pro. Struggles on deep reasoning." },
  { name: "Llama 3.1 70B", vendor: "Meta", release: "2024", ctx: 128000, maxOut: 4096, inPrice: 0.35, outPrice: 0.4, multimodal: false, toolUse: true, jsonMode: true, strengths: "Open-weights — can self-host. Competitive quality for the price.", weakness: "No vision. Weaker than top proprietary models on nuanced tasks." },
  { name: "Llama 3.1 405B", vendor: "Meta", release: "2024", ctx: 128000, maxOut: 4096, inPrice: 2.7, outPrice: 2.7, multimodal: false, toolUse: true, jsonMode: true, strengths: "Strongest open-weights model. Roughly matches GPT-4-class on reasoning.", weakness: "Expensive to self-host (multiple GPUs). No vision." },
  { name: "Mistral Large 2", vendor: "Mistral", release: "2024", ctx: 128000, maxOut: 4096, inPrice: 2, outPrice: 6, multimodal: false, toolUse: true, jsonMode: true, strengths: "Strong European alternative. Good at code and multilingual tasks.", weakness: "No vision. Smaller community than OpenAI/Anthropic." },
  { name: "DeepSeek V3", vendor: "DeepSeek", release: "2024", ctx: 64000, maxOut: 8192, inPrice: 0.27, outPrice: 1.1, multimodal: false, toolUse: true, jsonMode: true, strengths: "Extremely cheap for its quality. Strong code performance.", weakness: "Smaller context. Data-residency concerns for some buyers." },
];

type Key = keyof Omit<Model, "name" | "vendor" | "strengths" | "weakness">;

export function AiModelCompare() {
  const [picked, setPicked] = useState<string[]>(["Claude Sonnet 4", "GPT-4o", "Gemini 1.5 Pro"]);
  const [sort, setSort] = useState<Key>("ctx");

  const vendors = Array.from(new Set(MODELS.map((m) => m.vendor)));
  const [vendor, setVendor] = useState<string>("all");

  const list = useMemo(() => {
    const v = vendor === "all" ? MODELS : MODELS.filter((m) => m.vendor === vendor);
    return [...v].sort((a, b) => {
      const va = a[sort] as any;
      const vb = b[sort] as any;
      if (typeof va === "number") return vb - va;
      if (typeof va === "boolean") return Number(vb) - Number(va);
      return String(va).localeCompare(String(vb));
    });
  }, [vendor, sort]);

  const compared = MODELS.filter((m) => picked.includes(m.name));

  function toggle(name: string) {
    setPicked((p) => p.includes(name) ? p.filter((x) => x !== name) : [...p, name]);
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap items-end">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Vendor</span>
          <select value={vendor} onChange={(e) => setVendor(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="all">All</option>
            {vendors.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Key)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="ctx">Context window</option>
            <option value="inPrice">Input price</option>
            <option value="outPrice">Output price</option>
            <option value="maxOut">Max output</option>
            <option value="multimodal">Multimodal</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-3 py-2">Compare</th>
              <th className="text-left px-3 py-2">Model</th>
              <th className="text-right px-3 py-2">Context</th>
              <th className="text-right px-3 py-2">Max out</th>
              <th className="text-right px-3 py-2">In $/M</th>
              <th className="text-right px-3 py-2">Out $/M</th>
              <th className="text-center px-3 py-2">Vision</th>
              <th className="text-center px-3 py-2">Tools</th>
              <th className="text-center px-3 py-2">JSON</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.name} className="border-t border-slate-200">
                <td className="px-3 py-2"><input type="checkbox" checked={picked.includes(m.name)} onChange={() => toggle(m.name)} className="accent-brand" /></td>
                <td className="px-3 py-2"><span className="font-semibold">{m.name}</span> <span className="text-xs text-slate-500">· {m.vendor}</span></td>
                <td className="px-3 py-2 text-right tabular-nums text-xs">{m.ctx.toLocaleString()}</td>
                <td className="px-3 py-2 text-right tabular-nums text-xs">{m.maxOut.toLocaleString()}</td>
                <td className="px-3 py-2 text-right tabular-nums text-xs">${m.inPrice}</td>
                <td className="px-3 py-2 text-right tabular-nums text-xs">${m.outPrice}</td>
                <td className="px-3 py-2 text-center text-xs">{m.multimodal ? "✓" : "—"}</td>
                <td className="px-3 py-2 text-center text-xs">{m.toolUse ? "✓" : "—"}</td>
                <td className="px-3 py-2 text-center text-xs">{m.jsonMode ? "✓" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {compared.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wide font-semibold text-slate-500">Head-to-head notes</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {compared.map((m) => (
              <div key={m.name} className="rounded-xl bg-slate-50 p-4">
                <div className="font-semibold">{m.name}</div>
                <div className="text-xs text-slate-500 mb-2">{m.vendor} · {m.release}</div>
                <div className="text-xs mb-2"><span className="font-semibold text-emerald-700">Strengths:</span> <span className="text-slate-700">{m.strengths}</span></div>
                <div className="text-xs"><span className="font-semibold text-red-700">Watch out:</span> <span className="text-slate-700">{m.weakness}</span></div>
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="text-xs text-slate-500">Prices are list rates per million tokens as of publication. Always verify with the provider before budgeting.</p>
    </div>
  );
}
