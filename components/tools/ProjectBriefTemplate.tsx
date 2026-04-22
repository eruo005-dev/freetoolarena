"use client";

import { useMemo, useState } from "react";

type Stakeholder = { owner: string; role: string };
type Milestone = { name: string; date: string };

function toBullets(text: string, fallback = "- _"): string {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return fallback;
  return lines.map((l) => (l.startsWith("- ") ? l : `- ${l}`)).join("\n");
}

export function ProjectBriefTemplate() {
  const [name, setName] = useState<string>("Onboarding v2");
  const [goal, setGoal] = useState<string>(
    "Cut time-to-first-value in half for new signups."
  );
  const [problem, setProblem] = useState<string>(
    "New users drop off before creating their first project because the current flow has too many steps."
  );
  const [solution, setSolution] = useState<string>(
    "Collapse signup into a single screen and seed a starter project automatically."
  );
  const [scopeIn, setScopeIn] = useState<string>(
    "Redesigned signup flow\nStarter project template\nEmpty-state coaching"
  );
  const [scopeOut, setScopeOut] = useState<string>(
    "Pricing page redesign\nMobile app changes"
  );
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    { owner: "Jay", role: "Product lead" },
    { owner: "Alex", role: "Engineering" },
  ]);
  const [milestones, setMilestones] = useState<Milestone[]>([
    { name: "Design review", date: "2026-05-05" },
    { name: "Beta rollout", date: "2026-05-20" },
  ]);
  const [metrics, setMetrics] = useState<string>(
    "50% reduction in signup-to-activation time\n+15% week-1 retention"
  );
  const [risks, setRisks] = useState<string>(
    "Auto-seeded projects could confuse power users\nScope creep from marketing"
  );

  const setStakeholder = (i: number, key: keyof Stakeholder, v: string) => {
    setStakeholders((rows) =>
      rows.map((r, idx) => (idx === i ? { ...r, [key]: v } : r))
    );
  };
  const addStakeholder = () =>
    setStakeholders((rows) => [...rows, { owner: "", role: "" }]);
  const removeStakeholder = (i: number) =>
    setStakeholders((rows) => rows.filter((_, idx) => idx !== i));

  const setMilestone = (i: number, key: keyof Milestone, v: string) => {
    setMilestones((rows) =>
      rows.map((r, idx) => (idx === i ? { ...r, [key]: v } : r))
    );
  };
  const addMilestone = () =>
    setMilestones((rows) => [...rows, { name: "", date: "" }]);
  const removeMilestone = (i: number) =>
    setMilestones((rows) => rows.filter((_, idx) => idx !== i));

  const markdown = useMemo(() => {
    const stakeholderLines =
      stakeholders.length > 0
        ? stakeholders
            .map(
              (s) =>
                `- **${s.owner.trim() || "_"}** — ${s.role.trim() || "_"}`
            )
            .join("\n")
        : "- _";
    const milestoneLines =
      milestones.length > 0
        ? milestones
            .map(
              (m) =>
                `- ${m.date.trim() || "TBD"} — ${m.name.trim() || "_"}`
            )
            .join("\n")
        : "- _";
    return [
      `# ${name.trim() || "Project brief"}`,
      "",
      `**Goal:** ${goal.trim() || "_"}`,
      "",
      "## Problem",
      problem.trim() || "_",
      "",
      "## Proposed solution",
      solution.trim() || "_",
      "",
      "## Scope",
      "**In scope**",
      toBullets(scopeIn),
      "",
      "**Out of scope**",
      toBullets(scopeOut),
      "",
      "## Stakeholders",
      stakeholderLines,
      "",
      "## Timeline",
      milestoneLines,
      "",
      "## Success metrics",
      toBullets(metrics),
      "",
      "## Risks",
      toBullets(risks),
    ].join("\n");
  }, [
    name,
    goal,
    problem,
    solution,
    scopeIn,
    scopeOut,
    stakeholders,
    milestones,
    metrics,
    risks,
  ]);

  const copy = () => {
    navigator.clipboard?.writeText(markdown);
  };

  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const slug = (name || "brief")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    a.download = `${slug || "brief"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Project name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Goal (1-liner)</span>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Problem</span>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Proposed solution</span>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">In scope (one per line)</span>
          <textarea
            value={scopeIn}
            onChange={(e) => setScopeIn(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Out of scope (one per line)</span>
          <textarea
            value={scopeOut}
            onChange={(e) => setScopeOut(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-700">Stakeholders</span>
            <button
              type="button"
              onClick={addStakeholder}
              className="rounded-md border border-brand text-brand px-2 py-0.5 text-xs"
            >
              + Add
            </button>
          </div>
          {stakeholders.map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-1">
              <input
                type="text"
                value={s.owner}
                onChange={(e) => setStakeholder(i, "owner", e.target.value)}
                placeholder="Owner"
                className="rounded-xl border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <input
                type="text"
                value={s.role}
                onChange={(e) => setStakeholder(i, "role", e.target.value)}
                placeholder="Role"
                className="rounded-xl border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <button
                type="button"
                onClick={() => removeStakeholder(i)}
                className="text-slate-500 hover:text-red-600 px-2 text-sm"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-700">Timeline</span>
            <button
              type="button"
              onClick={addMilestone}
              className="rounded-md border border-brand text-brand px-2 py-0.5 text-xs"
            >
              + Add
            </button>
          </div>
          {milestones.map((m, i) => (
            <div key={i} className="grid grid-cols-[2fr_1fr_auto] gap-1">
              <input
                type="text"
                value={m.name}
                onChange={(e) => setMilestone(i, "name", e.target.value)}
                placeholder="Milestone"
                className="rounded-xl border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <input
                type="date"
                value={m.date}
                onChange={(e) => setMilestone(i, "date", e.target.value)}
                className="rounded-xl border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <button
                type="button"
                onClick={() => removeMilestone(i)}
                className="text-slate-500 hover:text-red-600 px-2 text-sm"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Success metrics (one per line)</span>
          <textarea
            value={metrics}
            onChange={(e) => setMetrics(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Risks (one per line)</span>
          <textarea
            value={risks}
            onChange={(e) => setRisks(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">Preview</h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copy}
              className="rounded-md border border-brand text-brand px-3 py-1 text-sm"
            >
              Copy
            </button>
            <button
              type="button"
              onClick={download}
              className="rounded-md bg-brand text-white px-3 py-1 text-sm"
            >
              Download .md
            </button>
          </div>
        </div>
        <pre className="whitespace-pre-wrap font-mono text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 max-h-96 overflow-auto">
          {markdown}
        </pre>
      </div>
    </div>
  );
}
