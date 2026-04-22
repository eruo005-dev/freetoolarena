"use client";

import { useMemo, useState } from "react";

type ActionItem = {
  owner: string;
  task: string;
  due: string;
};

function todayStr(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function toBullets(text: string, fallback = "- _"): string {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return fallback;
  return lines.map((l) => (l.startsWith("- ") ? l : `- ${l}`)).join("\n");
}

function escapeCell(s: string): string {
  return s.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

export function MeetingMinutesTemplate() {
  const [title, setTitle] = useState<string>("Weekly product sync");
  const [date, setDate] = useState<string>(todayStr());
  const [time, setTime] = useState<string>("10:00");
  const [attendeesText, setAttendeesText] = useState<string>("Jay\nAlex\nPriya");
  const [agenda, setAgenda] = useState<string>(
    "Review last week's ship list\nTriage bug backlog\nPlan next sprint"
  );
  const [discussion, setDiscussion] = useState<string>(
    "Team walked through the new onboarding flow and agreed it needs a progress bar."
  );
  const [decisions, setDecisions] = useState<string>(
    "Move launch to next Thursday\nDrop pricing experiment"
  );
  const [actions, setActions] = useState<ActionItem[]>([
    { owner: "Jay", task: "Draft launch post", due: "2026-05-01" },
    { owner: "Alex", task: "Fix checkout bug", due: "2026-04-28" },
  ]);

  const setAction = (i: number, key: keyof ActionItem, v: string) => {
    setActions((rows) =>
      rows.map((row, idx) => (idx === i ? { ...row, [key]: v } : row))
    );
  };
  const addAction = () => {
    setActions((rows) => [...rows, { owner: "", task: "", due: "" }]);
  };
  const removeAction = (i: number) => {
    setActions((rows) => rows.filter((_, idx) => idx !== i));
  };

  const markdown = useMemo(() => {
    const attendees = attendeesText
      .split("\n")
      .map((a) => a.trim())
      .filter(Boolean)
      .join(", ");

    const actionRows =
      actions.length > 0
        ? actions
            .map(
              (a) =>
                `| ${escapeCell(a.owner || "_")} | ${escapeCell(a.task || "_")} | ${escapeCell(a.due || "_")} |`
            )
            .join("\n")
        : "| _ | _ | _ |";

    return [
      `# ${title.trim() || "Meeting"}`,
      "",
      `**Date:** ${date} · **Time:** ${time}`,
      "",
      `**Attendees:** ${attendees || "_"}`,
      "",
      "## Agenda",
      toBullets(agenda),
      "",
      "## Discussion",
      discussion.trim() || "_",
      "",
      "## Decisions",
      toBullets(decisions),
      "",
      "## Action items",
      "| Owner | Task | Due |",
      "|---|---|---|",
      actionRows,
    ].join("\n");
  }, [title, date, time, attendeesText, agenda, discussion, decisions, actions]);

  const copy = () => {
    navigator.clipboard?.writeText(markdown);
  };

  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const slug = (title || "meeting").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    a.download = `${slug || "meeting"}-${date}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Time</span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Attendees (one per line)</span>
          <textarea
            value={attendeesText}
            onChange={(e) => setAttendeesText(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Agenda (one per line)</span>
          <textarea
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Discussion</span>
          <textarea
            value={discussion}
            onChange={(e) => setDiscussion(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Decisions (one per line)</span>
          <textarea
            value={decisions}
            onChange={(e) => setDecisions(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-700">Action items</span>
            <button
              type="button"
              onClick={addAction}
              className="rounded-md border border-brand text-brand px-2 py-0.5 text-xs"
            >
              + Add row
            </button>
          </div>
          {actions.map((a, i) => (
            <div key={i} className="grid grid-cols-[1fr_2fr_1fr_auto] gap-1 items-center">
              <input
                type="text"
                value={a.owner}
                onChange={(e) => setAction(i, "owner", e.target.value)}
                placeholder="Owner"
                className="rounded-xl border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <input
                type="text"
                value={a.task}
                onChange={(e) => setAction(i, "task", e.target.value)}
                placeholder="Task"
                className="rounded-xl border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <input
                type="date"
                value={a.due}
                onChange={(e) => setAction(i, "due", e.target.value)}
                className="rounded-xl border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <button
                type="button"
                onClick={() => removeAction(i)}
                className="text-slate-500 hover:text-red-600 px-2 text-sm"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
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
