"use client";

import { useMemo, useState } from "react";

export function SystemPromptBuilder() {
  const [role, setRole] = useState("You are a senior technical writer specializing in developer documentation.");
  const [constraints, setConstraints] = useState("- Always use active voice.\n- Never invent APIs or flags that weren't provided.\n- Keep paragraphs under 3 sentences.");
  const [outputFormat, setOutputFormat] = useState("Return Markdown with an H2 title, a short summary, then numbered steps.");
  const [examples, setExamples] = useState("Input: \"document the /auth endpoint\"\nOutput: ## /auth\\nAuthenticates the user...\\n1. Send POST...");
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    const sections: string[] = [];
    if (role.trim()) sections.push(`# ROLE\n${role.trim()}`);
    if (constraints.trim()) sections.push(`# CONSTRAINTS\n${constraints.trim()}`);
    if (outputFormat.trim()) sections.push(`# OUTPUT FORMAT\n${outputFormat.trim()}`);
    if (examples.trim()) sections.push(`# EXAMPLES\n${examples.trim()}`);
    return sections.join("\n\n");
  }, [role, constraints, outputFormat, examples]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Role</span>
        <textarea value={role} onChange={(e) => setRole(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Constraints</span>
        <textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Output format</span>
        <textarea value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Examples</span>
        <textarea value={examples} onChange={(e) => setExamples(e.target.value)} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
      </label>

      <div className="rounded-xl bg-slate-50 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">Generated system prompt</span>
          <button onClick={copy} className="text-xs font-semibold rounded-lg bg-brand text-white px-3 py-1">{copied ? "Copied!" : "Copy"}</button>
        </div>
        <pre className="text-xs font-mono whitespace-pre-wrap text-slate-800 max-h-80 overflow-auto">{prompt || "// fill a field to generate"}</pre>
      </div>
      <p className="text-xs text-slate-500">Paste into the system / instruction field of your LLM playground or API call. Works with OpenAI, Anthropic, Gemini, and most agent frameworks.</p>
    </div>
  );
}
