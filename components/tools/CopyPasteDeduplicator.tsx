"use client";
import { useMemo, useState } from "react";

export function CopyPasteDeduplicator() {
  const [text, setText] = useState("apple\nbanana\nApple\n  apple\ncherry\nbanana\ncherry");
  const [trim, setTrim] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [preserveOrder, setPreserveOrder] = useState(true);

  const out = useMemo(() => dedup(text, trim, caseSensitive, preserveOrder), [text, trim, caseSensitive, preserveOrder]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Input lines</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
      </label>

      <div className="flex flex-wrap gap-4 text-sm">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} />
          Trim whitespace
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
          Case-sensitive
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={preserveOrder} onChange={(e) => setPreserveOrder(e.target.checked)} />
          Preserve order
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Before" value={String(out.before)} />
        <Stat label="After" value={String(out.after)} />
        <Stat label="Removed" value={String(out.before - out.after)} />
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Deduplicated output</div>
        <pre className="text-sm whitespace-pre-wrap font-mono mt-1">{out.text}</pre>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{label}</div>
      <div className="text-lg font-semibold text-slate-800">{value}</div>
    </div>
  );
}

function dedup(raw: string, trim: boolean, caseSensitive: boolean, preserveOrder: boolean) {
  const lines = raw.split(/\r?\n/);
  const seen = new Set<string>();
  const kept: string[] = [];
  for (const line of lines) {
    const base = trim ? line.trim() : line;
    const key = caseSensitive ? base : base.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    kept.push(base);
  }
  const output = preserveOrder ? kept : [...kept].sort((a, b) => a.localeCompare(b));
  return {
    before: lines.length,
    after: output.length,
    text: output.join("\n"),
  };
}
