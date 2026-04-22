"use client";

import { useMemo, useState } from "react";

const ROLES = ["Senior software engineer", "Marketing strategist", "Copywriter", "Technical writer", "Product manager", "Data analyst", "UX researcher", "Career coach", "Teacher", "Legal assistant", "Doctor (educational only)", "Financial advisor (educational only)", "Travel planner", "Chef", "Therapist-style listener"];
const TONES = ["Neutral", "Friendly", "Formal", "Concise", "Enthusiastic", "Skeptical", "Socratic"];
const FORMATS = ["Plain prose", "Bulleted list", "Numbered steps", "Markdown table", "JSON object", "Code block", "Outline (H2/H3)", "Q&A pairs"];
const AUDIENCES = ["General adult", "Beginner", "Expert peer", "Executive (1-page brief)", "Child / teen", "Technical reviewer", "Non-technical stakeholder"];

export function AiPromptGenerator() {
  const [role, setRole] = useState(ROLES[0]);
  const [goal, setGoal] = useState("Review this code diff and flag risky logic changes");
  const [context, setContext] = useState("The code is a TypeScript payment handler used in production. Any bug could affect billing.");
  const [constraints, setConstraints] = useState("Do not suggest stylistic changes. Focus on correctness, edge cases, and security.");
  const [audience, setAudience] = useState(AUDIENCES[2]);
  const [tone, setTone] = useState(TONES[3]);
  const [format, setFormat] = useState(FORMATS[1]);
  const [examples, setExamples] = useState("");
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    const lines: string[] = [];
    lines.push(`# Role`);
    lines.push(`You are a ${role.toLowerCase()}.`);
    lines.push("");
    lines.push(`# Task`);
    lines.push(goal.trim());
    lines.push("");
    if (context.trim()) {
      lines.push(`# Context`);
      lines.push(context.trim());
      lines.push("");
    }
    lines.push(`# Audience`);
    lines.push(audience);
    lines.push("");
    lines.push(`# Tone`);
    lines.push(tone);
    lines.push("");
    if (constraints.trim()) {
      lines.push(`# Constraints`);
      lines.push(constraints.trim());
      lines.push("");
    }
    lines.push(`# Output format`);
    lines.push(format);
    lines.push("");
    if (examples.trim()) {
      lines.push(`# Example of ideal output`);
      lines.push(examples.trim());
      lines.push("");
    }
    lines.push(`# Stop condition`);
    lines.push(`If you lack enough information to answer, ask one clarifying question before proceeding.`);
    return lines.join("\n");
  }, [role, goal, context, constraints, audience, tone, format, examples]);

  function copy() {
    navigator.clipboard?.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Audience</span>
          <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            {AUDIENCES.map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Goal (what you want the AI to do)</span>
          <input value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Context / background</span>
          <textarea value={context} onChange={(e) => setContext(e.target.value)} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Constraints (what to avoid or require)</span>
          <textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Tone</span>
          <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            {TONES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Output format</span>
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            {FORMATS.map((f) => <option key={f}>{f}</option>)}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Example of ideal output (optional)</span>
          <textarea value={examples} onChange={(e) => setExamples(e.target.value)} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>

      <pre className="rounded-xl bg-slate-900 text-slate-100 p-4 text-xs font-mono whitespace-pre-wrap max-h-96 overflow-auto">{prompt}</pre>

      <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">{copied ? "Copied" : "Copy prompt"}</button>
      <p className="text-xs text-slate-500">Paste this into ChatGPT, Claude, Gemini, or any model's chat box. Edit freely — it's just text.</p>
    </div>
  );
}
