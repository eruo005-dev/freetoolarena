"use client";

import { useMemo, useState } from "react";

interface Item {
  id: number;
  topic: string;
  minutes: number;
  owner: string;
}

export function MeetingAgendaBuilder() {
  const [title, setTitle] = useState("Weekly team sync");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("10:00");
  const [attendees, setAttendees] = useState("Alice, Bob, Carol");
  const [purpose, setPurpose] = useState("Align on weekly priorities.");
  const [items, setItems] = useState<Item[]>([
    { id: 1, topic: "Review last week's goals", minutes: 10, owner: "Alice" },
    { id: 2, topic: "New initiatives", minutes: 15, owner: "Bob" },
    { id: 3, topic: "Blockers & open questions", minutes: 10, owner: "All" },
  ]);
  const [copied, setCopied] = useState<string | null>(null);

  const addItem = () => setItems((arr) => [...arr, { id: Date.now(), topic: "", minutes: 10, owner: "" }]);
  const updateItem = (id: number, patch: Partial<Item>) =>
    setItems((arr) => arr.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const removeItem = (id: number) => setItems((arr) => arr.filter((x) => x.id !== id));

  const totalMin = useMemo(() => items.reduce((a, b) => a + (b.minutes || 0), 0), [items]);

  const plaintext = useMemo(() => {
    const lines = [
      title,
      `${date} at ${time}`,
      `Attendees: ${attendees}`,
      "",
      `Purpose: ${purpose}`,
      "",
      "Agenda:",
      ...items.map((it, i) => `${i + 1}. ${it.topic} (${it.minutes}m) — ${it.owner}`),
      "",
      `Total: ${totalMin} min`,
    ];
    return lines.join("\n");
  }, [title, date, time, attendees, purpose, items, totalMin]);

  const markdown = useMemo(() => {
    const lines = [
      `# ${title}`,
      "",
      `**Date:** ${date} at ${time}`,
      `**Attendees:** ${attendees}`,
      "",
      `## Purpose`,
      purpose,
      "",
      `## Agenda`,
      "| # | Topic | Duration | Owner |",
      "|---|-------|----------|-------|",
      ...items.map((it, i) => `| ${i + 1} | ${it.topic} | ${it.minutes}m | ${it.owner} |`),
      "",
      `**Total:** ${totalMin} min`,
    ];
    return lines.join("\n");
  }, [title, date, time, attendees, purpose, items, totalMin]);

  const copy = async (format: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(format);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Meeting title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Attendees</span>
          <input value={attendees} onChange={(e) => setAttendees(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Time</span>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Purpose</span>
        <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} rows={2}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
      </label>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-slate-700">Agenda items (total {totalMin} min)</div>
          <button type="button" onClick={addItem}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">+ Add item</button>
        </div>
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it.id} className="grid grid-cols-[1fr_80px_100px_auto] gap-2 items-center">
              <input value={it.topic} placeholder="Topic" onChange={(e) => updateItem(it.id, { topic: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
              <input type="number" min={0} value={it.minutes} onChange={(e) => updateItem(it.id, { minutes: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
              <input value={it.owner} placeholder="Owner" onChange={(e) => updateItem(it.id, { owner: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
              <button type="button" onClick={() => removeItem(it.id)} className="text-sm text-rose-600 hover:underline">remove</button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-700">Plaintext</div>
          <button type="button" onClick={() => copy("text", plaintext)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            {copied === "text" ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{plaintext}</pre>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-700">Markdown</div>
          <button type="button" onClick={() => copy("md", markdown)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            {copied === "md" ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{markdown}</pre>
      </div>
    </div>
  );
}
