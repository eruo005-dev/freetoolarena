"use client";

import { useMemo, useState } from "react";

const FORMATS: Array<{ code: string; label: string }> = [
  { code: "t", label: "Short time (16:20)" },
  { code: "T", label: "Long time (16:20:30)" },
  { code: "d", label: "Short date (20/04/2026)" },
  { code: "D", label: "Long date (20 April 2026)" },
  { code: "f", label: "Short datetime (20 April 2026 16:20)" },
  { code: "F", label: "Long datetime (Monday, 20 April 2026 16:20)" },
  { code: "R", label: "Relative (in 2 hours / 3 days ago)" },
];

export function DiscordTimestamp() {
  const now = new Date();
  const isoLocal = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  const [dt, setDt] = useState(isoLocal);
  const [copied, setCopied] = useState<string | null>(null);

  const unix = useMemo(() => Math.floor(new Date(dt).getTime() / 1000), [dt]);

  function copy(code: string) {
    const snippet = `<t:${unix}:${code}>`;
    navigator.clipboard?.writeText(snippet);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Pick date & time (local)</span>
        <input
          type="datetime-local"
          value={dt}
          onChange={(e) => setDt(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="rounded-xl bg-slate-50 p-4 space-y-2">
        <div className="text-xs text-slate-500">Unix seconds: <span className="font-mono font-semibold">{Number.isFinite(unix) ? unix : "—"}</span></div>
        {FORMATS.map((f) => (
          <div key={f.code} className="flex items-center gap-3 flex-wrap">
            <code className="font-mono text-xs bg-white border border-slate-200 rounded px-2 py-1">{`<t:${unix}:${f.code}>`}</code>
            <span className="text-sm text-slate-600">{f.label}</span>
            <button onClick={() => copy(f.code)} className="ml-auto text-xs bg-slate-900 text-white rounded px-2 py-1 hover:bg-slate-800">
              {copied === f.code ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
