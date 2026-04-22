"use client";

import { useMemo, useState } from "react";

function mondayOfWeek(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function WeeklyGoalTracker() {
  const [weekOf, setWeekOf] = useState<string>(mondayOfWeek());
  const [goals, setGoals] = useState<string[]>([
    "Ship 3 new tool pages",
    "Hit 1k daily organic clicks",
    "Close 2 partner outreach emails",
  ]);
  const [dayNotes, setDayNotes] = useState<string[]>(Array(7).fill(""));
  const [review, setReview] = useState<string>("");

  const setGoal = (i: number, v: string) => {
    setGoals((g) => g.map((x, idx) => (idx === i ? v : x)));
  };
  const setDay = (i: number, v: string) => {
    setDayNotes((d) => d.map((x, idx) => (idx === i ? v : x)));
  };

  const markdown = useMemo(() => {
    const goalLines = goals
      .map((g) => `- [ ] ${g.trim() || "(empty)"}`)
      .join("\n");
    const dayLines = DAYS.map((d, i) => {
      const note = dayNotes[i].trim();
      return `- ${d}: ${note || "_"}`;
    }).join("\n");
    return [
      `# Week of ${weekOf}`,
      "",
      "## Goals",
      goalLines,
      "",
      "## Daily log",
      dayLines,
      "",
      "## Friday review",
      review.trim() || "_",
    ].join("\n");
  }, [weekOf, goals, dayNotes, review]);

  const copy = () => {
    navigator.clipboard?.writeText(markdown);
  };

  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `week-of-${weekOf}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Week of (Monday)</span>
          <input
            type="date"
            value={weekOf}
            onChange={(e) => setWeekOf(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>

        <div className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Goals</span>
          {goals.map((g, i) => (
            <input
              key={i}
              type="text"
              value={g}
              onChange={(e) => setGoal(i, e.target.value)}
              placeholder={`Goal ${i + 1}`}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          ))}
        </div>

        <div className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Daily notes</span>
          {DAYS.map((d, i) => (
            <label key={d} className="block">
              <span className="text-xs font-medium text-slate-600">{d}</span>
              <textarea
                value={dayNotes[i]}
                onChange={(e) => setDay(i, e.target.value)}
                rows={2}
                placeholder={`What happened on ${d}?`}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </label>
          ))}
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Friday review</span>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            placeholder="What worked? What didn't? What's next?"
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
