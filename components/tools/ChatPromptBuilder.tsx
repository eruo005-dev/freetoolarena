"use client";

import { useMemo, useState } from "react";

export function ChatPromptBuilder() {
  const [name, setName] = useState("Code Reviewer GPT");
  const [persona, setPersona] = useState("You are a senior staff engineer at a fintech company. You've shipped production TypeScript for 15+ years and have strong opinions about correctness over cleverness.");
  const [doRules, setDoRules] = useState("Prioritize correctness, then readability, then performance.\nPoint out race conditions, null/undefined bugs, and missing error handling.\nPropose concrete rewrites, not vague advice.\nAsk one clarifying question if the intent of a change is ambiguous.");
  const [dontRules, setDontRules] = useState("Don't comment on style, formatting, or naming unless it creates a bug.\nDon't repeat the diff back.\nDon't speculate about motives — stick to the code.");
  const [examples, setExamples] = useState("User: [pastes a diff adding a retry loop]\nAssistant: The retry loop will double-charge the card if the first request actually succeeded but the response was lost. You need an idempotency key. Here's the 3-line change: …");
  const [outputSchema, setOutputSchema] = useState("Respond in this structure:\n1. Severity (blocker / fix / nit)\n2. What the code does wrong\n3. The concrete fix (as a diff or code block)");
  const [copied, setCopied] = useState(false);

  const systemPrompt = useMemo(() => {
    const lines: string[] = [];
    lines.push(`# ${name}`);
    lines.push("");
    lines.push(`## Persona`);
    lines.push(persona.trim());
    lines.push("");
    if (doRules.trim()) {
      lines.push(`## Do`);
      for (const r of doRules.split("\n").map((s) => s.trim()).filter(Boolean)) lines.push(`- ${r}`);
      lines.push("");
    }
    if (dontRules.trim()) {
      lines.push(`## Don't`);
      for (const r of dontRules.split("\n").map((s) => s.trim()).filter(Boolean)) lines.push(`- ${r}`);
      lines.push("");
    }
    if (examples.trim()) {
      lines.push(`## Example`);
      lines.push(examples.trim());
      lines.push("");
    }
    if (outputSchema.trim()) {
      lines.push(`## Output format`);
      lines.push(outputSchema.trim());
    }
    return lines.join("\n");
  }, [name, persona, doRules, dontRules, examples, outputSchema]);

  const chars = systemPrompt.length;
  const tokens = Math.round(chars / 3.8);

  function copy() {
    navigator.clipboard?.writeText(systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Name / title</span><input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
      <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Persona</span><textarea value={persona} onChange={(e) => setPersona(e.target.value)} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" /></label>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Do (one per line)</span><textarea value={doRules} onChange={(e) => setDoRules(e.target.value)} rows={5} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Don't (one per line)</span><textarea value={dontRules} onChange={(e) => setDontRules(e.target.value)} rows={5} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" /></label>
      </div>
      <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Example turn (optional)</span><textarea value={examples} onChange={(e) => setExamples(e.target.value)} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" /></label>
      <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Output schema (optional)</span><textarea value={outputSchema} onChange={(e) => setOutputSchema(e.target.value)} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" /></label>

      <div className="rounded-xl bg-slate-50 p-4 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Generated system prompt</span>
          <span className="tabular-nums text-slate-600">{chars} chars · ~{tokens} tokens</span>
        </div>
        <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-96 overflow-auto">{systemPrompt}</pre>
      </div>

      <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">{copied ? "Copied" : "Copy system prompt"}</button>
      <p className="text-xs text-slate-500">Paste into ChatGPT GPT builder, Claude Project instructions, or the system message field of any API call.</p>
    </div>
  );
}
