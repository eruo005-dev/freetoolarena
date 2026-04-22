"use client";

import { useMemo, useState } from "react";

const SAMPLE_TSV = `name\tage\tcity
Ada\t36\tLondon
Alan\t41\tManchester
Grace\t79\tNew York, NY`;

type Direction = "tsv2csv" | "csv2tsv";

export function TsvToCsv({ initial = SAMPLE_TSV }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [direction, setDirection] = useState<Direction>("tsv2csv");
  const [copied, setCopied] = useState(false);

  const { output, rows, cols } = useMemo(() => {
    const fromDelim = direction === "tsv2csv" ? "\t" : ",";
    const toDelim = direction === "tsv2csv" ? "," : "\t";
    const parsed = parseCsv(input, fromDelim);
    const out = parsed
      .map((r) =>
        r
          .map((c) => {
            if (toDelim === ",") {
              return /[",\r\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
            }
            return /[\t\r\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
          })
          .join(toDelim),
      )
      .join("\n");
    const maxCols = parsed.reduce((m, r) => Math.max(m, r.length), 0);
    return { output: out, rows: parsed.length, cols: maxCols };
  }, [input, direction]);

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    const ext = direction === "tsv2csv" ? "csv" : "tsv";
    const mime = direction === "tsv2csv" ? "text/csv" : "text/tab-separated-values";
    const blob = new Blob([output], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const dirBtn = (d: Direction, label: string) => (
    <button
      type="button"
      onClick={() => setDirection(d)}
      className={`rounded-md border px-3 py-2 text-sm font-semibold ${
        direction === d
          ? "bg-brand text-white border-brand"
          : "bg-white text-slate-700 border-slate-300 hover:border-brand"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-5">
      <div>
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Direction
        </span>
        <div className="flex flex-wrap gap-2">
          {dirBtn("tsv2csv", "TSV → CSV")}
          {dirBtn("csv2tsv", "CSV → TSV")}
        </div>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          {direction === "tsv2csv" ? "TSV Input" : "CSV Input"}
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Rows</p>
          <p className="text-2xl font-bold text-slate-900">{rows}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Columns</p>
          <p className="text-2xl font-bold text-slate-900">{cols}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Output</p>
          <p className="text-2xl font-bold text-slate-900">
            {direction === "tsv2csv" ? "CSV" : "TSV"}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
            Output
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copy}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              onClick={download}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
            >
              Download
            </button>
          </div>
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
  if (rows.length && rows[rows.length - 1].length === 1 && rows[rows.length - 1][0] === "") {
    rows.pop();
  }
  return rows;
}
