"use client";

import { useState } from "react";

type License = "all" | "mit" | "apache" | "llama" | "qwen" | "custom";

const MODELS = [
  { name: "Llama 3.3 70B", vendor: "Meta", params: "70B", license: "llama", ctx: "128k", best: "Battle-tested production deployments" },
  { name: "Llama 4 Maverick", vendor: "Meta", params: "402B MoE", license: "llama", ctx: "1M", best: "Frontier MoE; needs serious GPU" },
  { name: "Qwen 3.5 72B", vendor: "Alibaba", params: "72B", license: "apache", ctx: "128k", best: "Top open-weight on coding (SWE-bench)" },
  { name: "Qwen 3.5 32B", vendor: "Alibaba", params: "32B", license: "apache", ctx: "128k", best: "Sweet spot quality vs hardware" },
  { name: "DeepSeek V3.2", vendor: "DeepSeek", params: "671B MoE", license: "custom", ctx: "128k", best: "Frontier-class on agentic coding" },
  { name: "DeepSeek R1", vendor: "DeepSeek", params: "671B MoE", license: "custom", ctx: "128k", best: "Reasoning leader, open weights" },
  { name: "DeepSeek-V3.2-Distill-Qwen-32B", vendor: "DeepSeek", params: "32B", license: "apache", ctx: "128k", best: "Runs on single-GPU with R1-style reasoning" },
  { name: "Kimi K2", vendor: "Moonshot", params: "1T MoE", license: "custom", ctx: "1M", best: "Long-context open-weight leader" },
  { name: "Mistral Large 3", vendor: "Mistral", params: "123B", license: "custom", ctx: "128k", best: "EU-friendly; tool use" },
  { name: "Mistral Medium 3", vendor: "Mistral", params: "30B", license: "apache", ctx: "32k", best: "Fits on a single H100" },
  { name: "Gemma 3 27B", vendor: "Google", params: "27B", license: "custom", ctx: "128k", best: "Google's open-weight; balanced" },
  { name: "Gemma 3 9B", vendor: "Google", params: "9B", license: "custom", ctx: "128k", best: "Fast inference for autocomplete-style tasks" },
  { name: "Phi-4", vendor: "Microsoft", params: "14B", license: "mit", ctx: "32k", best: "Highest-quality dense small model" },
  { name: "Llama 3.2 3B", vendor: "Meta", params: "3B", license: "llama", ctx: "128k", best: "Mobile / edge deployments" },
  { name: "SmolLM3 3B", vendor: "HuggingFace", params: "3B", license: "apache", ctx: "64k", best: "Tiny, fast, CPU-friendly" },
];

export function OpenSourceLlmTracker() {
  const [filter, setFilter] = useState<License>("all");

  const list = filter === "all" ? MODELS : MODELS.filter((m) => m.license === filter);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["all", "mit", "apache", "llama", "qwen", "custom"] as License[]).map((l) => (
          <button key={l} onClick={() => setFilter(l)} className={`rounded-full border px-3 py-1 text-xs ${filter === l ? "border-brand bg-brand text-white" : "border-slate-300 bg-white text-slate-700"}`}>{l === "all" ? "All licenses" : l}</button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Model</th><th>Vendor</th><th>Params</th><th>License</th><th>Context</th><th>Best for</th></tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.name} className="border-t border-slate-100">
                <td className="py-1 font-medium text-slate-800">{m.name}</td>
                <td className="py-1 text-slate-600">{m.vendor}</td>
                <td className="py-1 text-slate-600">{m.params}</td>
                <td className="py-1 text-xs text-slate-600">{m.license}</td>
                <td className="py-1 text-slate-600">{m.ctx}</td>
                <td className="py-1 text-xs text-slate-600">{m.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <strong>License gotchas:</strong> Apache 2.0 and MIT are the most permissive. Llama license is mostly permissive but
        has 700M-MAU acceptable-use clauses. Custom (DeepSeek, Kimi, Gemma) often allows commercial use but check restrictions.
        Always read the license file in the model repo before shipping to production.
      </div>
    </div>
  );
}
