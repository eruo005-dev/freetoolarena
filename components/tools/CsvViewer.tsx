"use client";

import { useMemo, useState } from "react";

const SAMPLE = `name,age,city,email
Ada Lovelace,36,London,ada@example.com
Alan Turing,41,Manchester,alan@example.com
Grace Hopper,79,"New York, NY",grace@example.com
Katherine Johnson,101,Hampton,"katherine ""kat"" johnson@example.com"`;

type Delim = "auto" | "," | "\t" | ";" | "|";

export function CsvViewer({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [delim, setDelim] = useState<Delim>("auto");

  const { rows, detected, error } = useMemo(() => {
    try {
      const actual = delim === "auto" ? detectDelimiter(input) : delim;
      const parsed = parseCsv(input, actual);
      return { rows: parsed, detected: actual, error: null as string | null };
    } catch (e: any) {
      return { rows: [] as string[][], detected: ",", error: e?.message || "Parse error" };
    }
  }, [input, delim]);

  const colCount = rows.reduce((m, r) => Math.max(m, r.length), 0);

  const delimLabel = (d: string) =>
    d === "\t" ? "Tab" : d === "," ? "Comma" : d === ";" ? "Semicolon" : d === "|" ? "Pipe" : d;

  const dBtn = (d: Delim, label: string) => (
    <button
      type="button"
      onClick={() => setDelim(d)}
      className={`rounded-md border px-3 py-2 text-sm font-semibold ${
        delim === d
          ? "bg-brand text-white border-brand"
          : "bg-white text-slate-700 border-slate-300 hover:border-brand"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          CSV Input
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div>
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Delimiter
        </span>
        <div className="flex flex-wrap gap-2">
          {dBtn("auto", "Auto-detect")}
          {dBtn(",", "Comma")}
          {dBtn("\t", "Tab")}
          {dBtn(";", "Semicolon")}
          {dBtn("|", "Pipe")}
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Rows</p>
          <p className="text-2xl font-bold text-slate-900">{rows.length}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Columns</p>
          <p className="text-2xl font-bold text-slate-900">{colCount}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Delimiter</p>
          <p className="text-2xl font-bold text-slate-900">{delimLabel(detected)}</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="overflow-auto max-h-[500px]">
          {rows.length ? (
            <table className="min-w-full text-sm">
              <thead className="bg-white sticky top-0">
                <tr>
                  {rows[0].map((h, i) => (
                    <th
                      key={i}
                      className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-700"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((r, ri) => (
                  <tr key={ri} className="odd:bg-white even:bg-slate-50">
                    {r.map((c, ci) => (
                      <td
                        key={ci}
                        className="border border-slate-200 px-3 py-2 text-slate-800 align-top"
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-slate-500">No data to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function detectDelimiter(src: string): "," | "\t" | ";" | "|" {
  const sample = src.split(/\r?\n/).slice(0, 5).join("\n");
  const candidates: Array<"," | "\t" | ";" | "|"> = [",", "\t", ";", "|"];
  let best: "," | "\t" | ";" | "|" = ",";
  let max = 0;
  for (const c of candidates) {
    const count = (sample.match(new RegExp(c === "\t" ? "\\t" : `\\${c}`, "g")) || []).length;
    if (count > max) {
      max = count;
      best = c;
    }
  }
  return best;
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
