"use client";

import { useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";

// Use the worker bundled with pdfjs-dist via the CDN.
if (typeof window !== "undefined") {
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

type Item = { x: number; y: number; w: number; text: string };

function clusterRows(items: Item[]): Item[][] {
  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);
  const rows: Item[][] = [];
  let current: Item[] = [];
  let lastY = Number.NEGATIVE_INFINITY;
  for (const it of sorted) {
    if (lastY === Number.NEGATIVE_INFINITY || Math.abs(it.y - lastY) <= 3) {
      current.push(it);
    } else {
      rows.push(current);
      current = [it];
    }
    lastY = it.y;
  }
  if (current.length) rows.push(current);
  return rows;
}

function rowToCells(row: Item[]): string[] {
  // Sort items left-to-right
  const sorted = [...row].sort((a, b) => a.x - b.x);
  // Group into cells where consecutive items overlap or are within threshold
  const cells: string[] = [];
  let cur = "";
  let lastEnd = Number.NEGATIVE_INFINITY;
  const GAP = 8; // px tolerance — increase to merge more
  for (const it of sorted) {
    if (lastEnd === Number.NEGATIVE_INFINITY || it.x - lastEnd > GAP) {
      if (cur) cells.push(cur.trim());
      cur = it.text;
    } else {
      cur += " " + it.text;
    }
    lastEnd = it.x + it.w;
  }
  if (cur) cells.push(cur.trim());
  return cells;
}

function toCsv(rows: string[][]): string {
  return rows.map((r) => r.map((c) => /[",\n]/.test(c) ? `"${c.replace(/"/g, "\"\"")}"` : c).join(",")).join("\n");
}

export function PdfTableExtractor() {
  const [rows, setRows] = useState<string[][]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFile = async (file: File, page: number) => {
    setLoading(true);
    setError("");
    try {
      const buf = await file.arrayBuffer();
      const doc = await getDocument({ data: buf }).promise;
      setTotalPages(doc.numPages);
      if (page < 1 || page > doc.numPages) {
        setError(`Page ${page} out of range (1-${doc.numPages}).`);
        setLoading(false);
        return;
      }
      const p = await doc.getPage(page);
      const content = await p.getTextContent();
      const items: Item[] = (content.items as Array<{ str: string; transform: number[]; width: number }>).map((it) => ({
        x: it.transform[4],
        y: it.transform[5],
        w: it.width,
        text: it.str,
      })).filter((i) => i.text.trim());
      const rowsClustered = clusterRows(items);
      const cells = rowsClustered.map(rowToCells).filter((r) => r.length > 0);
      setRows(cells);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f, pageNum);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-slate-700">PDF file</span>
          <input type="file" accept="application/pdf" onChange={onUpload} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Page number</span>
          <input type="number" min={1} value={pageNum} onChange={(e) => setPageNum(parseInt(e.target.value) || 1)} className="w-full rounded border border-slate-300 px-3 py-2" />
          {totalPages > 0 && <span className="mt-1 block text-xs text-slate-500">Of {totalPages} pages</span>}
        </label>
      </div>

      {loading && <div className="text-sm text-slate-500">Extracting...</div>}
      {error && <div className="rounded border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">{error}</div>}

      {rows.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4">
            <table className="w-full text-left text-xs">
              <tbody>
                {rows.slice(0, 50).map((r, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    {r.map((c, j) => <td key={j} className="px-2 py-1">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length > 50 && <div className="mt-2 text-xs text-slate-500">Showing first 50 of {rows.length} rows. Full data in the CSV download.</div>}
          </div>

          <div className="flex gap-2">
            <button onClick={() => navigator.clipboard?.writeText(toCsv(rows))} className="rounded bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700">Copy CSV</button>
            <a href={`data:text/csv;charset=utf-8,${encodeURIComponent(toCsv(rows))}`} download="extracted-table.csv" className="rounded bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark">Download CSV</a>
          </div>
        </>
      )}

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>How this works:</strong> uses pdf.js to extract text + position from each character box, then clusters
        items into rows by Y-coordinate and cells by X-gap. Works well on simple single-page tables. <strong>Limitations:</strong>
        scanned PDFs (image-only) won&rsquo;t work — need OCR first. Tables with merged cells or unusual structure may need
        manual cleanup. All processing in your browser — file never uploaded.
      </div>
    </div>
  );
}
