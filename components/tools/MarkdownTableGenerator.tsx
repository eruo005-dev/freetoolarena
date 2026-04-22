"use client";

import { useState, useMemo } from "react";

type Props = {
  initialRows?: number;
  initialCols?: number;
};

type Align = "left" | "center" | "right";

function alignMarker(a: Align): string {
  if (a === "left") return ":---";
  if (a === "right") return "---:";
  return ":---:";
}

function buildMarkdown(
  headers: string[],
  rows: string[][],
  aligns: Align[],
): string {
  const headerLine = "| " + headers.map((h) => h || " ").join(" | ") + " |";
  const alignLine = "| " + aligns.map(alignMarker).join(" | ") + " |";
  const bodyLines = rows.map(
    (r) => "| " + r.map((c) => c || " ").join(" | ") + " |",
  );
  return [headerLine, alignLine, ...bodyLines].join("\n");
}

function parseCsvRow(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuote) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuote = false;
        }
      } else {
        cur += c;
      }
    } else {
      if (c === '"') inQuote = true;
      else if (c === ",") {
        out.push(cur);
        cur = "";
      } else cur += c;
    }
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

export function MarkdownTableGenerator({
  initialRows = 3,
  initialCols = 3,
}: Props = {}) {
  const [nRows, setNRows] = useState(initialRows);
  const [nCols, setNCols] = useState(initialCols);
  const [headers, setHeaders] = useState<string[]>(
    Array.from({ length: initialCols }, (_, i) => `Header ${i + 1}`),
  );
  const [aligns, setAligns] = useState<Align[]>(
    Array.from({ length: initialCols }, () => "left"),
  );
  const [cells, setCells] = useState<string[][]>(
    Array.from({ length: initialRows }, (_, r) =>
      Array.from({ length: initialCols }, (_, c) => `R${r + 1}C${c + 1}`),
    ),
  );
  const [tab, setTab] = useState<"builder" | "import">("builder");
  const [csv, setCsv] = useState("Name,Role,Pages\nJay,Founder,258\nClaude,AI,0");
  const [copied, setCopied] = useState(false);

  function resize(r: number, c: number) {
    setNRows(r);
    setNCols(c);
    setHeaders((old) =>
      Array.from({ length: c }, (_, i) => old[i] ?? `Header ${i + 1}`),
    );
    setAligns((old) => Array.from({ length: c }, (_, i) => old[i] ?? "left"));
    setCells((old) =>
      Array.from({ length: r }, (_, ri) =>
        Array.from(
          { length: c },
          (_, ci) => old[ri]?.[ci] ?? `R${ri + 1}C${ci + 1}`,
        ),
      ),
    );
  }

  const markdown = useMemo(
    () => buildMarkdown(headers, cells, aligns),
    [headers, cells, aligns],
  );

  const importedMd = useMemo(() => {
    const lines = csv.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0) return "";
    const rows = lines.map(parseCsvRow);
    const cols = Math.max(...rows.map((r) => r.length));
    const padded = rows.map((r) => {
      const copy = [...r];
      while (copy.length < cols) copy.push("");
      return copy;
    });
    const hs = padded[0];
    const body = padded.slice(1);
    const ag: Align[] = Array.from({ length: cols }, () => "left");
    return buildMarkdown(hs, body, ag);
  }, [csv]);

  function copy(s: string) {
    if (!s) return;
    navigator.clipboard?.writeText(s);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const current = tab === "builder" ? markdown : importedMd;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("builder")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            tab === "builder"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Builder
        </button>
        <button
          type="button"
          onClick={() => setTab("import")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            tab === "import"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Import CSV
        </button>
      </div>

      {tab === "builder" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Rows
              </span>
              <input
                type="number"
                min={1}
                max={20}
                value={nRows}
                onChange={(e) =>
                  resize(
                    Math.max(1, Math.min(20, Number(e.target.value) || 1)),
                    nCols,
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Columns
              </span>
              <input
                type="number"
                min={1}
                max={10}
                value={nCols}
                onChange={(e) =>
                  resize(
                    nRows,
                    Math.max(1, Math.min(10, Number(e.target.value) || 1)),
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {headers.map((h, c) => (
                    <th key={c} className="p-1 align-top">
                      <input
                        value={h}
                        onChange={(e) => {
                          const copy = [...headers];
                          copy[c] = e.target.value;
                          setHeaders(copy);
                        }}
                        className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                      />
                      <select
                        value={aligns[c]}
                        onChange={(e) => {
                          const copy = [...aligns];
                          copy[c] = e.target.value as Align;
                          setAligns(copy);
                        }}
                        className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1 text-xs"
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cells.map((row, r) => (
                  <tr key={r}>
                    {row.map((val, c) => (
                      <td key={c} className="p-1">
                        <input
                          value={val}
                          onChange={(e) => {
                            const copy = cells.map((x) => [...x]);
                            copy[r][c] = e.target.value;
                            setCells(copy);
                          }}
                          className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "import" && (
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Paste CSV (first row = headers)
          </span>
          <textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            rows={8}
            spellCheck={false}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      )}

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Markdown output
        </span>
        <textarea
          value={current}
          readOnly
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => copy(current)}
          disabled={!current}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy markdown"}
        </button>
      </div>

      {current && (
        <div>
          <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
            Preview
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <MarkdownPreview md={current} />
          </div>
        </div>
      )}
    </div>
  );
}

function MarkdownPreview({ md }: { md: string }) {
  const lines = md.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length < 2) return null;
  const headers = lines[0]
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((s) => s.trim());
  const aligns = lines[1]
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((s) => s.trim())
    .map((s) => {
      const startsColon = s.startsWith(":");
      const endsColon = s.endsWith(":");
      if (startsColon && endsColon) return "center";
      if (endsColon) return "right";
      return "left";
    });
  const rows = lines.slice(2).map((l) =>
    l
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((s) => s.trim()),
  );

  return (
    <table className="w-full text-sm">
      <thead className="bg-slate-50">
        <tr>
          {headers.map((h, i) => (
            <th
              key={i}
              className="px-3 py-2 border-b border-slate-200 font-semibold"
              style={{ textAlign: aligns[i] as any }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-slate-100">
            {r.map((c, j) => (
              <td
                key={j}
                className="px-3 py-2"
                style={{ textAlign: aligns[j] as any }}
              >
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
