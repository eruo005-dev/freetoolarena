"use client";

import { useMemo, useState } from "react";

function todayStr(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function toBullets(text: string, fallback = "- none"): string {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return fallback;
  return lines.map((l) => (l.startsWith("- ") ? l : `- ${l}`)).join("\n");
}

export function StandupNotesTemplate() {
  const [date, setDate] = useState<string>(todayStr());
  const [name, setName] = useState<string>("");
  const [yesterday, setYesterday] = useState<string>(
    "Shipped login flow\nReviewed pricing page copy"
  );
  const [today, setToday] = useState<string>(
    "Start onboarding checklist\nPair on search ranking"
  );
  const [blockers, setBlockers] = useState<string>("");
  const [tab, setTab] = useState<"md" | "slack">("md");

  const markdown = useMemo(() => {
    const header = name.trim()
      ? `## Standup — ${date} • ${name.trim()}`
      : `## Standup — ${date}`;
    return [
      header,
      "",
      "**Yesterday**",
      toBullets(yesterday),
      "",
      "**Today**",
      toBullets(today),
      "",
      "**Blockers**",
      toBullets(blockers),
    ].join("\n");
  }, [date, name, yesterday, today, blockers]);

  const slack = useMemo(
    () => markdown.replace(/\*\*(.+?)\*\*/g, "*$1*"),
    [markdown]
  );

  const output = tab === "md" ? markdown : slack;

  const copy = () => {
    navigator.clipboard?.writeText(output);
  };

  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `standup-${date}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
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
          <span className="text-sm font-semibold text-slate-700">Name (optional)</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jay"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Yesterday (one per line)</span>
          <textarea
            value={yesterday}
            onChange={(e) => setYesterday(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Today (one per line)</span>
          <textarea
            value={today}
            onChange={(e) => setToday(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Blockers (one per line)</span>
          <textarea
            value={blockers}
            onChange={(e) => setBlockers(e.target.value)}
            rows={3}
            placeholder="Leave empty for 'none'"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setTab("md")}
              className={`rounded-md px-3 py-1 text-sm border ${
                tab === "md"
                  ? "bg-brand text-white border-brand"
                  : "border-slate-300 text-slate-700"
              }`}
            >
              Markdown
            </button>
            <button
              type="button"
              onClick={() => setTab("slack")}
              className={`rounded-md px-3 py-1 text-sm border ${
                tab === "slack"
                  ? "bg-brand text-white border-brand"
                  : "border-slate-300 text-slate-700"
              }`}
            >
              Slack
            </button>
          </div>
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
          {output}
        </pre>
      </div>
    </div>
  );
}
