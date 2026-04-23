"use client";

import { useMemo, useState } from "react";

export function ChainOfThoughtFormatter() {
  const [problem, setProblem] = useState(
    "A train leaves Paris at 9am going 120 km/h. Another leaves Lyon at 10am going 140 km/h toward Paris. When do they meet?"
  );
  const [copied, setCopied] = useState(false);

  const template = useMemo(() => build(problem), [problem]);

  const copy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(template).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      });
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
        Wrap any problem in a four-step Chain-of-Thought scaffold to get more
        reliable reasoning from an LLM.
      </p>
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Problem or question
        </span>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
            Formatted CoT prompt
          </div>
          <button
            onClick={copy}
            className="rounded-md bg-brand text-white text-xs px-2 py-1 font-semibold"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap">
          {template}
        </pre>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {[
          ["Step 1", "Understand"],
          ["Step 2", "Plan"],
          ["Step 3", "Execute"],
          ["Step 4", "Verify"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-slate-200 p-2">
            <div className="font-semibold text-brand">{k}</div>
            <div className="text-slate-600">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function build(problem: string): string {
  const p = problem.trim() || "<your problem here>";
  return `You will solve the following problem using a structured chain of thought.

PROBLEM:
${p}

Work through these four steps, showing your reasoning for each:

Step 1 - Understand
  Restate the problem in your own words. Identify knowns, unknowns, and any constraints.

Step 2 - Plan
  Outline the approach you will take. List the sub-steps or formulas needed.

Step 3 - Execute
  Carry out the plan. Show every calculation or logical step.

Step 4 - Verify
  Check the answer. Does it match the constraints? Try an alternate method if possible.

Finish with a line that starts with "ANSWER:" followed by the final result.`;
}
