"use client";

import { useMemo, useState } from "react";

type Align = "left" | "center" | "right";

function makeGrid(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => `R${r + 1}C${c + 1}`));
}

export function TableGenerator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [data, setData] = useState<string[][]>(makeGrid(4, 3));
  const [aligns, setAligns] = useState<Align[]>(["left", "left", "left"]);
  const [copied, setCopied] = useState<string | null>(null);

  const resize = (r: number, c: number) => {
    const rr = Math.max(1, Math.min(10, r));
    const cc = Math.max(1, Math.min(10, c));
    setRows(rr);
    setCols(cc);
    const total = hasHeaders ? rr + 1 : rr;
    setData((prev) => {
      const next: string[][] = [];
      for (let i = 0; i < total; i++) {
        const row: string[] = [];
        for (let j = 0; j < cc; j++) {
          row.push(prev[i]?.[j] ?? "");
        }
        next.push(row);
      }
      return next;
    });
    setAligns((prev) => {
      const next: Align[] = [];
      for (let j = 0; j < cc; j++) next.push(prev[j] ?? "left");
      return next;
    });
  };

  const setCell = (r: number, c: number, v: string) =>
    setData((d) => d.map((row, ri) => (ri === r ? row.map((cell, ci) => (ci === c ? v : cell)) : row)));

  const bodyStart = hasHeaders ? 1 : 0;
  const headers = hasHeaders ? data[0] ?? [] : [];
  const body = data.slice(bodyStart);

  const html = useMemo(() => {
    const lines: string[] = ["<table>"];
    if (hasHeaders) {
      lines.push("  <thead>", "    <tr>");
      headers.forEach((h, i) => lines.push(`      <th style="text-align:${aligns[i]}">${h}</th>`));
      lines.push("    </tr>", "  </thead>");
    }
    lines.push("  <tbody>");
    body.forEach((row) => {
      lines.push("    <tr>");
      row.forEach((cell, i) => lines.push(`      <td style="text-align:${aligns[i]}">${cell}</td>`));
      lines.push("    </tr>");
    });
    lines.push("  </tbody>", "</table>");
    return lines.join("\n");
  }, [hasHeaders, headers, body, aligns]);

  const markdown = useMemo(() => {
    const hdrs = hasHeaders ? headers : Array.from({ length: cols }, (_, i) => `Column ${i + 1}`);
    const sep = aligns.map((a) => (a === "center" ? ":---:" : a === "right" ? "---:" : ":---"));
    const lines = [
      `| ${hdrs.join(" | ")} |`,
      `| ${sep.join(" | ")} |`,
      ...body.map((row) => `| ${row.join(" | ")} |`),
    ];
    return lines.join("\n");
  }, [hasHeaders, headers, body, aligns, cols]);

  const csv = useMemo(() => {
    const esc = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
    const all = hasHeaders ? [headers, ...body] : body;
    return all.map((row) => row.map(esc).join(",")).join("\n");
  }, [hasHeaders, headers, body]);

  const tsv = useMemo(() => {
    const all = hasHeaders ? [headers, ...body] : body;
    return all.map((row) => row.join("\t")).join("\n");
  }, [hasHeaders, headers, body]);

  const copy = async (format: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(format);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Rows</span>
          <input type="number" min={1} max={10} value={rows} onChange={(e) => resize(parseInt(e.target.value) || 1, cols)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Columns</span>
          <input type="number" min={1} max={10} value={cols} onChange={(e) => resize(rows, parseInt(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="flex items-end gap-2 pb-2">
          <input type="checkbox" checked={hasHeaders} onChange={(e) => setHasHeaders(e.target.checked)} className="h-4 w-4 accent-brand" />
          <span className="text-sm text-slate-700">Include header row</span>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-slate-200">
          <thead>
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="bg-slate-100 px-3 py-2 text-left font-semibold">
                  <select value={aligns[i]} onChange={(e) => setAligns((a) => a.map((x, idx) => (idx === i ? (e.target.value as Align) : x)))}
                    className="w-full rounded-lg border border-slate-300 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
                    <option value="left">left</option>
                    <option value="center">center</option>
                    <option value="right">right</option>
                  </select>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className="border-t border-slate-200 px-2 py-1">
                    <input value={cell} onChange={(e) => setCell(r, c, e.target.value)}
                      className={`w-full rounded-lg border border-slate-300 px-2 py-1 text-sm ${hasHeaders && r === 0 ? "font-semibold" : ""} focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {[
        { label: "HTML", text: html, key: "html" },
        { label: "Markdown", text: markdown, key: "md" },
        { label: "CSV", text: csv, key: "csv" },
        { label: "TSV", text: tsv, key: "tsv" },
      ].map((f) => (
        <div key={f.key} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-700">{f.label}</div>
            <button type="button" onClick={() => copy(f.key, f.text)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              {copied === f.key ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{f.text}</pre>
        </div>
      ))}
    </div>
  );
}
