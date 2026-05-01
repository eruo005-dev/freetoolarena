"use client";

import { useMemo, useState } from "react";

type Issue = { label: string; fix: string };

function analyze(text: string): { score: number; issues: Issue[]; rewritten: string } {
  const t = text.trim();
  const issues: Issue[] = [];
  let score = 100;

  if (t.length === 0) return { score: 0, issues: [], rewritten: "" };

  const words = t.split(/\s+/).filter(Boolean);

  if (words.length < 8) {
    issues.push({ label: "Too vague", fix: "Add a specific task, audience, format, and constraints." });
    score -= 30;
  }

  const hasRole = /\b(act as|you are|you're a|as a|role:|persona:)\b/i.test(t);
  if (!hasRole && words.length > 8) {
    issues.push({ label: "No role / persona", fix: "Lead with a role: 'You are a senior data engineer who...'" });
    score -= 12;
  }

  const hasFormat = /\b(format|markdown|json|bullet|numbered|table|csv|yaml|xml|paragraph)\b/i.test(t);
  if (!hasFormat) {
    issues.push({ label: "No output format specified", fix: "End with the format you want: markdown, JSON, table, bullets." });
    score -= 12;
  }

  const hasConstraint = /\b(under \d+|exactly \d+|no more than|max|limit|word count|word limit|short)\b/i.test(t);
  if (!hasConstraint) {
    issues.push({ label: "No length / scope constraint", fix: "Add an explicit cap: '200 words max' or 'list 5 items'." });
    score -= 8;
  }

  const hasExample = /\b(for example|e\.g\.|example:|like this:)\b/i.test(t);
  if (!hasExample && words.length > 30) {
    issues.push({ label: "No example", fix: "Add one short example of the desired output style." });
    score -= 8;
  }

  const hasAudience = /\b(audience|reader|customer|developer|engineer|beginner|expert|kid|user|client)\b/i.test(t);
  if (!hasAudience) {
    issues.push({ label: "No audience defined", fix: "Specify who the output is for — 'for senior backend devs' vs 'for high schoolers' changes everything." });
    score -= 10;
  }

  const fluff = /(please|kindly|i would like|could you|i need you to)/gi;
  const fluffCount = (t.match(fluff) || []).length;
  if (fluffCount > 1) {
    issues.push({ label: "Wordy / polite filler", fix: "Drop 'please', 'could you'. AI doesn't care; clearer prompts work better." });
    score -= 5;
  }

  if (/\?\?\?|!{3,}/.test(t)) {
    issues.push({ label: "Excessive punctuation", fix: "One ? or !. The model already knows it's important." });
    score -= 4;
  }

  // Build rewritten version
  const cleaned = t
    .replace(/please /gi, "")
    .replace(/could you /gi, "")
    .replace(/i would like (you to )?/gi, "")
    .replace(/i need you to /gi, "")
    .replace(/\?{2,}/g, "?")
    .replace(/!{2,}/g, "!")
    .trim();

  const rewritten = `# Role
You are an expert in [domain].

# Task
${cleaned}

# Audience
[describe the reader / user]

# Constraints
- [length / scope]
- [tone]
- [must-have / must-not]

# Output format
[markdown / JSON / table / bullets]

# Example
[1 short example of the desired style]`;

  return { score: Math.max(0, score), issues, rewritten };
}

export function PromptRewriter() {
  const [input, setInput] = useState<string>("");
  const result = useMemo(() => analyze(input), [input]);

  const verdict =
    result.score >= 80
      ? { label: "Strong", color: "border-emerald-300 bg-emerald-50 text-emerald-900" }
      : result.score >= 50
        ? { label: "Decent — fixable", color: "border-amber-300 bg-amber-50 text-amber-900" }
        : { label: "Needs work", color: "border-rose-300 bg-rose-50 text-rose-900" };

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Paste your prompt</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder="e.g. Write me a blog post about productivity tips"
          className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-xs"
        />
      </label>

      {input.trim().length > 0 && (
        <>
          <div className={`rounded-lg border p-4 ${verdict.color}`}>
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-xs uppercase tracking-wide opacity-70">Quality score</div>
                <div className="text-3xl font-bold">{result.score}/100</div>
              </div>
              <div className="text-sm font-semibold">{verdict.label}</div>
            </div>
          </div>

          {result.issues.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h4 className="mb-2 text-sm font-semibold text-slate-700">What to fix</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {result.issues.map((i) => (
                  <li key={i.label} className="border-l-2 border-rose-300 pl-3">
                    <div className="font-medium text-slate-800">{i.label}</div>
                    <div className="text-xs text-slate-600">{i.fix}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <div className="mb-2 flex items-baseline justify-between">
              <h4 className="text-sm font-semibold text-emerald-900">Suggested template</h4>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(result.rewritten)}
                className="text-xs text-emerald-800 underline hover:text-emerald-900"
              >
                Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-xs text-emerald-900">{result.rewritten}</pre>
          </div>

          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            <strong>Why structure beats prose:</strong> structured prompts (Role / Task / Audience / Constraints / Format /
            Example) make models 30-50% more reliable. Fill the bracketed slots with specifics, drop sections you don&rsquo;t need,
            and you&rsquo;ll see the difference in your first three runs.
          </div>
        </>
      )}
    </div>
  );
}
