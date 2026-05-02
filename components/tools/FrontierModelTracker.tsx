"use client";

import { useMemo, useState } from "react";

type Capability = "all" | "code" | "reasoning" | "vision" | "long" | "agents";

interface Model {
  name: string;
  provider: string;
  released: string;
  context: string;
  in: number;
  out: number;
  highlights: string[];
  caps: Capability[];
}

const MODELS: Model[] = [
  { name: "Claude Opus 4.7",  provider: "Anthropic", released: "2026-04", context: "1M",   in: 15, out: 75, highlights: ["1M context", "Best at agentic SWE", "Strong reasoning"], caps: ["code", "reasoning", "long", "agents"] },
  { name: "Claude Sonnet 4.6", provider: "Anthropic", released: "2026-02", context: "1M",   in: 3, out: 15, highlights: ["1M context", "Default daily driver", "Tool use"], caps: ["code", "reasoning", "long", "agents"] },
  { name: "Claude Haiku 4.5", provider: "Anthropic", released: "2025-10", context: "200k", in: 0.8, out: 4, highlights: ["Fastest Claude", "Budget agentic"], caps: ["code", "agents"] },
  { name: "GPT-5",            provider: "OpenAI",    released: "2025-08", context: "400k", in: 2.5, out: 10, highlights: ["Reasoning router", "Vision native"], caps: ["reasoning", "vision", "agents"] },
  { name: "GPT-5 mini",       provider: "OpenAI",    released: "2025-08", context: "400k", in: 0.25, out: 2, highlights: ["Cheap reasoning", "Tool use"], caps: ["code", "agents"] },
  { name: "Gemini 3 Pro",     provider: "Google",    released: "2025-12", context: "2M",   in: 2.5, out: 10, highlights: ["2M context", "Native multimodal"], caps: ["vision", "long", "reasoning"] },
  { name: "Gemini 2.5 Pro",   provider: "Google",    released: "2025-06", context: "2M",   in: 1.25, out: 5, highlights: ["2M context", "Audio + video"], caps: ["vision", "long"] },
  { name: "DeepSeek R1",      provider: "DeepSeek",  released: "2025-01", context: "128k", in: 0.55, out: 2.19, highlights: ["Open weights", "Reasoning"], caps: ["reasoning", "code"] },
  { name: "DeepSeek V3.2",    provider: "DeepSeek",  released: "2025-09", context: "128k", in: 0.27, out: 1.10, highlights: ["Cheapest frontier", "Open weights"], caps: ["code", "agents"] },
  { name: "Kimi K2",          provider: "Moonshot",  released: "2025-04", context: "1M",   in: 0.60, out: 2.50, highlights: ["1M context", "Open weights"], caps: ["long", "code"] },
  { name: "Grok 4",           provider: "xAI",       released: "2025-07", context: "256k", in: 3.00, out: 15.00, highlights: ["Real-time data", "X integration"], caps: ["reasoning"] },
  { name: "Llama 3.3 70B",    provider: "Meta",      released: "2024-12", context: "128k", in: 0,    out: 0, highlights: ["Open weights", "Self-host"], caps: ["code"] },
  { name: "Llama 4 Maverick", provider: "Meta",      released: "2025-04", context: "1M",   in: 0,    out: 0, highlights: ["Open weights", "MoE"], caps: ["code", "long"] },
  { name: "Qwen 3.5 72B",     provider: "Alibaba",   released: "2025-09", context: "128k", in: 0,    out: 0, highlights: ["Open weights", "Top SWE-bench OSS"], caps: ["code"] },
  { name: "Mistral Large 3",  provider: "Mistral",   released: "2025-05", context: "128k", in: 2.00, out: 6.00, highlights: ["EU hosting", "Tool use"], caps: ["code", "agents"] },
];

export function FrontierModelTracker() {
  const [filter, setFilter] = useState<Capability>("all");

  const rows = useMemo(() => {
    return MODELS
      .filter((m) => filter === "all" || m.caps.includes(filter))
      .sort((a, b) => b.released.localeCompare(a.released));
  }, [filter]);

  const fmt = (n: number) => n === 0 ? "open" : "$" + n.toFixed(2);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["all","code","reasoning","vision","long","agents"] as Capability[]).map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${filter === c ? "border-brand bg-brand text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Model</th><th className="py-1">Provider</th><th className="py-1">Released</th><th className="py-1">Context</th><th className="py-1">In</th><th className="py-1">Out</th><th className="py-1">Highlights</th></tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.name} className="border-t border-slate-100">
                <td className="py-1 font-medium">{m.name}</td>
                <td className="py-1 text-slate-600">{m.provider}</td>
                <td className="py-1 text-slate-600">{m.released}</td>
                <td className="py-1 text-slate-600">{m.context}</td>
                <td className="py-1 text-slate-600">{fmt(m.in)}</td>
                <td className="py-1 text-slate-600">{fmt(m.out)}</td>
                <td className="py-1 text-xs text-slate-600">{m.highlights.join(" · ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        Prices are USD per 1M tokens (standard tier). &ldquo;Open&rdquo; = open weights you can self-host.
        Tracked through 2026-Q1; pricing and capabilities shift fast &mdash; verify on the provider&rsquo;s
        page before locking long contracts.
      </div>

      <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
        <strong>Data transparency:</strong> data verified against canonical pricing pages on{" "}
        <strong>2026-04-30</strong> by our monthly automated routine.
        Sources we cross-reference each refresh:{" "}
        <a href="https://www.anthropic.com/pricing" target="_blank" rel="noopener noreferrer" className="underline">anthropic.com/pricing</a>,{" "}
        <a href="https://openai.com/pricing" target="_blank" rel="noopener noreferrer" className="underline">openai.com/pricing</a>,{" "}
        <a href="https://ai.google.dev/pricing" target="_blank" rel="noopener noreferrer" className="underline">ai.google.dev/pricing</a>,{" "}
        <a href="https://api-docs.deepseek.com/quick_start/pricing" target="_blank" rel="noopener noreferrer" className="underline">deepseek</a>,{" "}
        <a href="https://docs.x.ai/docs/models" target="_blank" rel="noopener noreferrer" className="underline">x.ai docs</a>,{" "}
        <a href="https://docs.mistral.ai/" target="_blank" rel="noopener noreferrer" className="underline">mistral docs</a>.
        See <a href="/source" className="underline">source &amp; transparency</a> for the full list.
      </div>
    </div>
  );
}
