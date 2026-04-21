"use client";

import { useState, useMemo } from "react";

export function CsvToJson() {
  const [csv, setCsv] = useState(`name,age,city
Ada,36,London
Alan,41,Manchester
Grace,79,New York`);
  const [delimiter, setDelimiter] = useState<"," | ";" | "\t" | "|">(",");
  const [hasHeader, setHasHeader] = useState(true);
  const [pretty, setPretty] = useState(true);

  const { output, error, rowCount } = useMemo(() => {
    try {
      const rows = parseCsv(csv, delimiter);
      if (!rows.length) return { output: "[]", error: null, rowCount: 0 };
      let data: unknown;
      if (hasHeader) {
        const [head, ...body] = rows;
        data = body.map((r) => {
          const obj: Record<string, string> = {};
          head.forEach((h, i) => {
            obj[h || `col_${i + 1}`] = r[i] ?? "";
          });
          return obj;
        });
      } else {
        data = rows;
      }
      const json = JSON.stringify(data, null, pretty ? 2 : 0);
      return {
        output: json,
        error: null,
        rowCount: Array.isArray(data) ? data.length : 0,
      };
    } catch (e: any) {
      return { output: "", error: e.message || "Parse error", rowCount: 0 };
    }
  }, [csv, delimiter, hasHeader, pretty]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <label className="text-sm flex items-center gap-2">
          <span className="text-slate-600">Delimiter</span>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value as any)}
            className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
          >
            <option value=",">, comma</option>
            <option value=";">; semicolon</option>
            <option value={"\t"}>tab</option>
            <option value="|">| pipe</option>
          </select>
        </label>
        <label className="text-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
            className="rounded"
          />
          <span className="text-slate-600">First row is header</span>
        </label>
        <label className="text-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={pretty}
            onChange={(e) => setPretty(e.target.checked)}
            className="rounded"
          />
          <span className="text-slate-600">Pretty print</span>
        </label>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            CSV input
          </p>
          <button
            type="button"
            onClick={() => setCsv("")}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            Clear
          </button>
        </div>
        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Paste CSV here…"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            JSON output {rowCount > 0 && <span className="text-slate-400">({rowCount} rows)</span>}
          </p>
          <button
            type="button"
            disabled={!output}
            onClick={() => navigator.clipboard?.writeText(output)}
            className="text-xs font-medium text-brand hover:underline disabled:text-slate-400"
          >
            Copy
          </button>
        </div>
        {error ? (
          <div className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        ) : (
          <textarea
            value={output}
            readOnly
            rows={10}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm"
          />
        )}
      </div>
    </div>
  );
}

/**
 * Minimal CSV parser that handles:
 *   - custom delimiter
 *   - quoted fields with embedded delimiter / newlines / escaped quotes ("")
 *   - both \n and \r\n line endings
 *   - BOM stripping
 */
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
  // flush final field / row
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  // drop trailing blank row if input ended in newline
  if (rows.length && rows[rows.length - 1].length === 1 && rows[rows.length - 1][0] === "") {
    rows.pop();
  }
  return rows;
}
