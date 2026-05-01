"use client";

import { useMemo, useState } from "react";

const SAMPLE_TEMPLATE = `Hi {{firstName}},

Thanks for being part of {{company}}. Your renewal date is {{renewalDate}}.

Best,
{{senderName}}`;

const SAMPLE_CSV = `firstName,company,renewalDate,senderName
Sarah,Acme Inc,2026-08-12,Jane
Tom,Beta Corp,2026-09-03,Jane
Priya,Gamma LLC,2026-10-21,Jane`;

function parseCsv(text: string): { headers: string[]; rows: string[][] } {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return { headers: [], rows: [] };
  const split = (line: string): string[] => {
    const out: string[] = [];
    let cur = "";
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === "\"") {
        if (q && line[i + 1] === "\"") { cur += "\""; i++; }
        else q = !q;
      } else if (c === "," && !q) {
        out.push(cur); cur = "";
      } else {
        cur += c;
      }
    }
    out.push(cur);
    return out.map((s) => s.trim());
  };
  const headers = split(lines[0]);
  const rows = lines.slice(1).map(split);
  return { headers, rows };
}

function merge(template: string, headers: string[], row: string[]): string {
  const map: Record<string, string> = {};
  headers.forEach((h, i) => { map[h] = row[i] ?? ""; });
  return template.replace(/\{\{\s*([\w-]+)\s*\}\}/g, (_, name) => map[name] ?? `{{${name}}}`);
}

export function MailMergeHelper() {
  const [template, setTemplate] = useState<string>(SAMPLE_TEMPLATE);
  const [csv, setCsv] = useState<string>(SAMPLE_CSV);

  const { headers, rows } = useMemo(() => parseCsv(csv), [csv]);

  const outputs = useMemo(() => rows.map((r) => merge(template, headers, r)), [template, headers, rows]);

  const placeholders = useMemo(() => {
    const set = new Set<string>();
    template.replace(/\{\{\s*([\w-]+)\s*\}\}/g, (_, n) => { set.add(n); return ""; });
    return [...set];
  }, [template]);

  const missing = placeholders.filter((p) => !headers.includes(p));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Template (use {`{{ field }}`})</span>
          <textarea value={template} onChange={(e) => setTemplate(e.target.value)} rows={10} className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-xs" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Data (CSV with header row)</span>
          <textarea value={csv} onChange={(e) => setCsv(e.target.value)} rows={10} className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-xs" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">Placeholders</div>
          <div className="text-xl font-bold text-slate-800">{placeholders.length}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">CSV columns</div>
          <div className="text-xl font-bold text-slate-800">{headers.length}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <div className="text-xs uppercase tracking-wide text-slate-500">Rows</div>
          <div className="text-xl font-bold text-slate-800">{rows.length}</div>
        </div>
      </div>

      {missing.length > 0 && (
        <div className="rounded border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">
          <strong>Missing CSV columns for placeholders:</strong> {missing.join(", ")}
        </div>
      )}

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <h4 className="text-sm font-semibold text-slate-700">Merged outputs ({outputs.length})</h4>
          <button onClick={() => navigator.clipboard?.writeText(outputs.join("\n\n---\n\n"))} className="text-xs text-emerald-700 underline">Copy all</button>
        </div>
        <div className="space-y-3">
          {outputs.map((out, i) => (
            <div key={i} className="rounded border border-slate-200 bg-slate-50 p-3">
              <div className="mb-1 text-xs uppercase tracking-wide text-slate-500">Row {i + 1}</div>
              <pre className="whitespace-pre-wrap font-mono text-xs text-slate-800">{out}</pre>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Privacy:</strong> all merging happens in your browser. Nothing uploaded.
        Use double curly braces (<code>{"{{ field }}"}</code>) for placeholders. Field names match CSV column headers.
      </div>
    </div>
  );
}
