"use client";

import { useMemo, useState } from "react";

const SAMPLE = `  name , age , city  ,
Ada , 36 , London ,
Alan,41,Manchester,
Ada,36,London,
,,,
Grace,79,New York,
Alan,41,Manchester,`;

export function CsvCleaner({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [trimCells, setTrimCells] = useState(true);
  const [removeEmptyRows, setRemoveEmptyRows] = useState(true);
  const [removeDupRows, setRemoveDupRows] = useState(true);
  const [normalizeEol, setNormalizeEol] = useState(true);
  const [removeBlankCols, setRemoveBlankCols] = useState(true);
  const [quoteAll, setQuoteAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const { output, beforeRows, afterRows } = useMemo(() => {
    const src = normalizeEol ? input.replace(/\r\n?/g, "\n") : input;
    let rows = parseCsv(src, ",");
    const before = rows.length;

    if (trimCells) rows = rows.map((r) => r.map((c) => c.trim()));
    if (removeEmptyRows) rows = rows.filter((r) => r.some((c) => c.trim() !== ""));
    if (removeDupRows) {
      const seen = new Set<string>();
      rows = rows.filter((r) => {
        const k = r.join("\u0001");
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }
    if (removeBlankCols && rows.length) {
      const cols = rows.reduce((m, r) => Math.max(m, r.length), 0);
      const keep: number[] = [];
      for (let c = 0; c < cols; c++) {
        const hasData = rows.some((r) => (r[c] ?? "").trim() !== "");
        if (hasData) keep.push(c);
      }
      rows = rows.map((r) => keep.map((i) => r[i] ?? ""));
    }

    const out = rows
      .map((r) => r.map((c) => escapeCell(c, quoteAll)).join(","))
      .join(normalizeEol ? "\n" : "\r\n");

    return { output: out, beforeRows: before, afterRows: rows.length };
  }, [input, trimCells, removeEmptyRows, removeDupRows, normalizeEol, removeBlankCols, quoteAll]);

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Messy CSV Input
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          { v: trimCells, s: setTrimCells, l: "Trim whitespace in each cell" },
          { v: removeEmptyRows, s: setRemoveEmptyRows, l: "Remove empty rows" },
          { v: removeDupRows, s: setRemoveDupRows, l: "Remove duplicate rows" },
          { v: normalizeEol, s: setNormalizeEol, l: "Standardize line endings (LF)" },
          { v: removeBlankCols, s: setRemoveBlankCols, l: "Remove blank columns" },
          { v: quoteAll, s: setQuoteAll, l: "Force quote all cells" },
        ].map((opt, i) => (
          <label
            key={i}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={opt.v}
              onChange={(e) => opt.s(e.target.checked)}
              className="h-4 w-4 accent-brand"
            />
            <span className="text-sm text-slate-700">{opt.l}</span>
          </label>
        ))}
      </div>

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Before</p>
          <p className="text-2xl font-bold text-slate-900">{beforeRows}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">After</p>
          <p className="text-2xl font-bold text-slate-900">{afterRows}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Removed</p>
          <p className="text-2xl font-bold text-slate-900">{beforeRows - afterRows}</p>
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
            Cleaned CSV
          </span>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          rows={8}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </div>
    </div>
  );
}

function escapeCell(v: string, forceQuote: boolean): string {
  const needs = forceQuote || /[",\r\n]/.test(v);
  if (!needs) return v;
  return `"${v.replace(/"/g, '""')}"`;
}

function parseCsv(input: string, delimiter: string): string[][] {
  const src = input.replace(/^\uFEFF/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let i = 0;
  let inQuotes = false;
  while (i < src.length) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === delimiter) {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (ch === "\n" || ch === "\r") {
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
      if (ch === "\r" && src[i + 1] === "\n") i += 2;
      else i++;
      continue;
    }
    field += ch;
    i++;
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}
