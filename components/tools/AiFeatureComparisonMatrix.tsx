"use client";

import { useMemo, useState } from "react";

type Feature = "vision" | "audio" | "video" | "tools" | "web" | "code_exec" | "files" | "voice" | "memory" | "agents";

interface Tool {
  name: string;
  features: Partial<Record<Feature, boolean | string>>;
  pricing: string;
}

const TOOLS: Tool[] = [
  { name: "ChatGPT (Plus/Pro)",   pricing: "$20-200/mo",  features: { vision: true, audio: true, video: "Sora", tools: true, web: true, code_exec: true, files: true, voice: true, memory: true, agents: true } },
  { name: "Claude (Pro/Max)",     pricing: "$20-100/mo",  features: { vision: true, audio: false, video: false, tools: true, web: true, code_exec: true, files: true, voice: false, memory: true, agents: true } },
  { name: "Gemini (Advanced)",    pricing: "$20-250/mo",  features: { vision: true, audio: true, video: "Veo", tools: true, web: true, code_exec: true, files: true, voice: true, memory: true, agents: true } },
  { name: "Perplexity (Pro)",     pricing: "$20/mo",      features: { vision: true, audio: false, video: false, tools: true, web: true, code_exec: false, files: true, voice: true, memory: false, agents: true } },
  { name: "DeepSeek",             pricing: "Free + API",  features: { vision: true, audio: false, video: false, tools: true, web: true, code_exec: true, files: true, voice: false, memory: false, agents: false } },
  { name: "Kimi (Moonshot)",      pricing: "Free + API",  features: { vision: true, audio: false, video: false, tools: true, web: true, code_exec: false, files: true, voice: false, memory: true, agents: false } },
  { name: "Grok (X Premium)",     pricing: "$8-40/mo",    features: { vision: true, audio: false, video: false, tools: true, web: true, code_exec: false, files: false, voice: true, memory: true, agents: false } },
  { name: "Mistral (Le Chat)",    pricing: "Free + API",  features: { vision: true, audio: false, video: false, tools: true, web: true, code_exec: true, files: true, voice: false, memory: false, agents: false } },
  { name: "NotebookLM",           pricing: "Free",        features: { vision: true, audio: "Audio overviews", video: "Video overviews", tools: false, web: false, code_exec: false, files: true, voice: true, memory: false, agents: false } },
  { name: "Microsoft Copilot",    pricing: "Free + $30",  features: { vision: true, audio: true, video: false, tools: true, web: true, code_exec: false, files: true, voice: true, memory: true, agents: true } },
];

const LABELS: Record<Feature, string> = {
  vision: "Image input",
  audio: "Audio input",
  video: "Video gen",
  tools: "Tool use",
  web: "Web search",
  code_exec: "Code interpreter",
  files: "File upload",
  voice: "Voice mode",
  memory: "Long-term memory",
  agents: "Agentic mode",
};

export function AiFeatureComparisonMatrix() {
  const [feat, setFeat] = useState<Feature | "all">("all");

  const filtered = useMemo(() => {
    if (feat === "all") return TOOLS;
    return TOOLS.filter((t) => Boolean(t.features[feat]));
  }, [feat]);

  const renderCell = (v: boolean | string | undefined) => {
    if (v === true) return <span className="text-emerald-700">&check;</span>;
    if (typeof v === "string") return <span className="text-emerald-700 text-xs">{v}</span>;
    return <span className="text-slate-300">&minus;</span>;
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFeat("all")} className={`rounded-full border px-3 py-1 text-xs ${feat === "all" ? "border-brand bg-brand text-white" : "border-slate-300 bg-white text-slate-700"}`}>All</button>
        {(Object.keys(LABELS) as Feature[]).map((f) => (
          <button key={f} onClick={() => setFeat(f)} className={`rounded-full border px-3 py-1 text-xs ${feat === f ? "border-brand bg-brand text-white" : "border-slate-300 bg-white text-slate-700"}`}>
            {LABELS[f]}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-1">Tool</th>
              <th className="py-1">Pricing</th>
              {(Object.keys(LABELS) as Feature[]).map((f) => (
                <th key={f} className="py-1 text-center">{LABELS[f]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.name} className="border-t border-slate-100">
                <td className="py-1 font-medium">{t.name}</td>
                <td className="py-1 text-xs text-slate-600">{t.pricing}</td>
                {(Object.keys(LABELS) as Feature[]).map((f) => (
                  <td key={f} className="py-1 text-center">{renderCell(t.features[f])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        Feature parity is moving fast &mdash; this matrix tracks 2026 Q1 state. The headline differences
        in 2026: Gemini owns native multimodal (audio + video both ways); Claude owns long-running agents;
        ChatGPT owns ecosystem breadth (custom GPTs, Sora, voice, search); Perplexity owns research /
        sourced answers; DeepSeek + Kimi own price-to-quality.
      </div>
    </div>
  );
}
