"use client";

import { useState } from "react";

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Array.from(
    rows.reduce((set, r) => {
      Object.keys(r).forEach((k) => set.add(k));
      return set;
    }, new Set<string>())
  );
  const esc = (v: unknown) => {
    if (v == null) return "";
    const s = typeof v === "object" ? JSON.stringify(v) : String(v);
    return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(",")];
  for (const r of rows) lines.push(headers.map((h) => esc((r as Record<string, unknown>)[h])).join(","));
  return lines.join("\n");
}

export function JsonToCsv() {
  const [input, setInput] = useState('[{"name":"Alice","age":30},{"name":"Bob","age":25}]');
  const [output, setOutput] = useState("");
  const [err, setErr] = useState("");

  const convert = () => {
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data)) throw new Error("Input must be an array of objects");
      setOutput(toCsv(data));
      setErr("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">JSON (array of objects)</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <button type="button" onClick={convert}
        className="rounded-lg bg-brand-dark text-white px-4 py-2 text-sm font-semibold hover:bg-brand">
        Convert to CSV
      </button>
      {err && <p className="text-sm text-rose-700">{err}</p>}
      {output && (
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">CSV</span>
          <textarea readOnly value={output} rows={6}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm" />
        </label>
      )}
    </div>
  );
}
