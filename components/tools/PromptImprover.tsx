"use client";

import { useMemo, useState } from "react";

type Finding = { level: "warn" | "info" | "ok"; rule: string; note: string };

function analyze(text: string): { findings: Finding[]; improved: string } {
  const findings: Finding[] = [];
  const t = text.trim();
  const lower = t.toLowerCase();

  const vague = ["maybe", "kind of", "somewhat", "stuff", "things", "some", "a few", "various", "etc", "whatever"];
  const hits = vague.filter((v) => new RegExp(`\\b${v.replace(".", "\\.")}\\b`, "i").test(t));
  if (hits.length) findings.push({ level: "warn", rule: "Vague language", note: `Words like "${hits.slice(0, 4).join('", "')}" make the model guess. Be concrete.` });

  if (!/\b(role|you are|act as)\b/i.test(t)) findings.push({ level: "warn", rule: "No role assigned", note: "Tell the model who it should be. 'You are a senior copywriter…' beats no framing." });
  else findings.push({ level: "ok", rule: "Role assigned", note: "Good — role framing detected." });

  if (!/(format|as json|bulleted|numbered|markdown|table|schema)/i.test(lower)) findings.push({ level: "warn", rule: "Output format unspecified", note: "State what format you want back: JSON, bullets, table, markdown, etc." });
  else findings.push({ level: "ok", rule: "Output format specified", note: "Good — output structure is constrained." });

  if (!/(for example|e\.g\.|such as|ideal output|example:|\{)/i.test(lower)) findings.push({ level: "info", rule: "No example provided", note: "Consider adding one example of ideal output. Few-shot usually beats instructions alone." });
  else findings.push({ level: "ok", rule: "Example provided", note: "Good — concrete example included." });

  if (!/(don't|do not|avoid|never|must not)/i.test(lower)) findings.push({ level: "info", rule: "No constraints", note: "Add explicit 'don't' rules — e.g., 'Don't add intro phrases', 'Don't repeat the input'." });

  if (t.length < 80) findings.push({ level: "warn", rule: "Too short", note: "Very short prompts force the model to guess context. Aim for 3–8 sentences for non-trivial tasks." });
  if (t.length > 4000) findings.push({ level: "info", rule: "Very long", note: "Long prompts work but are hard to iterate on. Consider moving reference text into a separate 'context' section." });

  if (/(please|kindly|thank you|thanks)/i.test(lower)) findings.push({ level: "info", rule: "Pleasantries", note: "Polite words don't hurt, but they don't help. Safe to remove for brevity." });

  if (/(best|great|amazing|awesome|perfect)/i.test(lower)) findings.push({ level: "info", rule: "Hype adjectives", note: "Words like 'best' or 'amazing' are noise — the model already tries to be helpful." });

  if (/(you should|you must|it is important|it's important)/i.test(lower)) findings.push({ level: "info", rule: "Wordy imperatives", note: "'You must X' is weaker than just writing 'X.' in a bullet." });

  // Build an improved version.
  let improved = t;

  // Strip pleasantries at start.
  improved = improved.replace(/^(hi|hey|hello)[\s,]*(there|claude|gpt|chatgpt)?[\s,.\-]*/i, "");
  improved = improved.replace(/^(please|kindly|can you|could you|would you|i'd like you to|i want you to)\s+/i, "");
  improved = improved.replace(/\bthank you\b[.!]?/gi, "").replace(/\bthanks\b[.!]?/gi, "");

  // Strip wordy imperatives.
  improved = improved.replace(/\bit is (?:very )?important that you\s+/gi, "");
  improved = improved.replace(/\byou should (?:also )?/gi, "");
  improved = improved.replace(/\byou must\s+/gi, "");

  // Strip vague hedges.
  improved = improved.replace(/\b(?:kind of|sort of|somewhat|maybe|perhaps|possibly)\s+/gi, "");

  improved = improved.replace(/\s{2,}/g, " ").trim();

  // If we can detect no role, add a scaffold.
  const hasRole = /\b(role|you are|act as)\b/i.test(improved);
  const hasFormat = /(format|as json|bulleted|numbered|markdown|table|schema)/i.test(improved);
  const scaffold: string[] = [];
  if (!hasRole) scaffold.push("# Role\nYou are an expert assistant.\n");
  scaffold.push(`# Task\n${improved}\n`);
  if (!hasFormat) scaffold.push("# Output format\nReturn a clear, structured answer. Use bullet points or a table where it aids scanning.\n");
  scaffold.push("# Stop condition\nIf anything is ambiguous, ask one clarifying question before answering.");

  return { findings, improved: scaffold.join("\n") };
}

export function PromptImprover() {
  const [text, setText] = useState("can you please help me write something good about AI? thanks!");
  const { findings, improved } = useMemo(() => analyze(text), [text]);
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(improved);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const score = 100 - findings.filter((f) => f.level === "warn").length * 15 - findings.filter((f) => f.level === "info").length * 5;
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Your prompt</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
      </label>

      <div className="flex items-center gap-3">
        <div className="text-xs uppercase tracking-wide font-semibold text-slate-500">Prompt score</div>
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div style={{ width: `${clamped}%` }} className={`h-full ${clamped >= 75 ? "bg-emerald-500" : clamped >= 50 ? "bg-amber-500" : "bg-red-500"}`} />
        </div>
        <div className="tabular-nums font-semibold text-sm w-10 text-right">{clamped}</div>
      </div>

      <div className="space-y-2">
        {findings.map((f, i) => (
          <div key={i} className={`rounded-lg p-3 text-sm ${f.level === "warn" ? "bg-red-50 border border-red-200" : f.level === "info" ? "bg-amber-50 border border-amber-200" : "bg-emerald-50 border border-emerald-200"}`}>
            <div className="font-semibold text-xs mb-1">{f.level === "warn" ? "⚠" : f.level === "info" ? "•" : "✓"} {f.rule}</div>
            <div className="text-slate-700 text-xs leading-relaxed">{f.note}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-xs uppercase tracking-wide font-semibold text-slate-500">Improved prompt</div>
          <button onClick={copy} className="text-xs bg-brand text-white rounded-lg px-3 py-1 hover:bg-brand-dark">{copied ? "Copied" : "Copy"}</button>
        </div>
        <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed">{improved}</pre>
      </div>
      <p className="text-xs text-slate-500">This is a rule-based linter, not a model call. It catches common issues so you can fix them before spending tokens.</p>
    </div>
  );
}
