"use client";

import { useMemo, useState } from "react";

function splitCsv(s: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inS = false;
  let inD = false;
  let paren = 0;
  for (const c of s) {
    if (c === "'" && !inD) inS = !inS;
    else if (c === '"' && !inS) inD = !inD;
    else if (!inS && !inD && c === "(") paren++;
    else if (!inS && !inD && c === ")") paren--;
    if (c === "," && !inS && !inD && paren === 0) { out.push(cur.trim()); cur = ""; continue; }
    cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function parseValue(v: string): any {
  const t = v.trim();
  if (t === "NULL" || t === "null") return null;
  if (/^-?\d+$/.test(t)) return parseInt(t);
  if (/^-?\d+\.\d+$/.test(t)) return parseFloat(t);
  if (t === "TRUE" || t === "true") return true;
  if (t === "FALSE" || t === "false") return false;
  if ((t.startsWith("'") && t.endsWith("'")) || (t.startsWith('"') && t.endsWith('"'))) {
    return t.slice(1, -1).replace(/''/g, "'");
  }
  return t;
}

function parseInserts(sql: string): Record<string, any>[] {
  const rows: Record<string, any>[] = [];
  const re = /INSERT\s+INTO\s+[`"\[]?(\w+)[`"\]]?\s*\(([^)]+)\)\s*VALUES\s*(.+?);/gis;
  let m: RegExpExecArray | null;
  while ((m = re.exec(sql)) !== null) {
    const cols = splitCsv(m[2]).map((c) => c.replace(/[`"\[\]]/g, "").trim());
    const valsBlock = m[3];
    const rowRe = /\(((?:[^()']|'[^']*')+)\)/g;
    let rm: RegExpExecArray | null;
    while ((rm = rowRe.exec(valsBlock)) !== null) {
      const vals = splitCsv(rm[1]);
      const row: Record<string, any> = {};
      cols.forEach((c, i) => { row[c] = parseValue(vals[i] ?? ""); });
      rows.push(row);
    }
  }
  return rows;
}

export function SqlToJson() {
  const [input, setInput] = useState(`INSERT INTO users (id, name, email, active) VALUES\n  (1, 'Ada Lovelace', 'ada@example.com', TRUE),\n  (2, 'Alan Turing', 'alan@example.com', TRUE),\n  (3, 'Grace Hopper', 'grace@example.com', FALSE);`);
  const [copied, setCopied] = useState(false);

  const rows = useMemo(() => parseInserts(input), [input]);
  const out = useMemo(() => JSON.stringify(rows, null, 2), [rows]);

  function copy() {
    navigator.clipboard?.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Paste SQL INSERT statements</span>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs" />
      </label>
      <div className="text-xs text-slate-500">Parsed {rows.length} row{rows.length === 1 ? "" : "s"}</div>
      <textarea readOnly value={out} rows={12} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs bg-slate-50" />
      <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
        {copied ? "Copied" : "Copy JSON"}
      </button>
    </div>
  );
}
