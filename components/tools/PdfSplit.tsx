"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Output = { range: string; url: string; size: number; pages: number };

export function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [mode, setMode] = useState<"every" | "ranges">("every");
  const [ranges, setRanges] = useState<string>("1-3, 5");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<Output[]>([]);

  async function onPick(f: File) {
    setFile(f);
    setErr(null);
    setOutputs((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return [];
    });
    setPageCount(0);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await f.arrayBuffer());
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: false });
      setPageCount(doc.getPageCount());
    } catch (e: any) {
      const msg = (e?.message || "") as string;
      if (/encrypt/i.test(msg)) {
        setErr("This PDF is password-protected. Unlock it first, then try again.");
      } else {
        setErr(msg || "Could not read PDF.");
      }
    }
  }

  function parseRanges(input: string, total: number): number[][] {
    const parts = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const out: number[][] = [];
    for (const part of parts) {
      const m = part.match(/^(\d+)(?:-(\d+))?$/);
      if (!m) throw new Error(`Invalid range: "${part}"`);
      const a = parseInt(m[1], 10);
      const b = m[2] ? parseInt(m[2], 10) : a;
      if (a < 1 || b < 1 || a > total || b > total) {
        throw new Error(`Range "${part}" is out of bounds (1–${total}).`);
      }
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      const arr: number[] = [];
      for (let i = lo; i <= hi; i++) arr.push(i);
      out.push(arr);
    }
    return out;
  }

  async function split() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    outputs.forEach((o) => URL.revokeObjectURL(o.url));
    setOutputs([]);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const src = await PDFDocument.load(bytes, { ignoreEncryption: false });
      const total = src.getPageCount();

      const groups: number[][] =
        mode === "every"
          ? Array.from({ length: total }, (_, i) => [i + 1])
          : parseRanges(ranges, total);

      const results: Output[] = [];
      for (const group of groups) {
        const out = await PDFDocument.create();
        const copied = await out.copyPages(
          src,
          group.map((n) => n - 1),
        );
        copied.forEach((p) => out.addPage(p));
        const b = await out.save();
        const blob = new Blob([b], { type: "application/pdf" });
        const label =
          group.length === 1 ? `${group[0]}` : `${group[0]}-${group[group.length - 1]}`;
        results.push({
          range: label,
          url: URL.createObjectURL(blob),
          size: blob.size,
          pages: group.length,
        });
        await new Promise((r) => setTimeout(r, 0));
      }
      setOutputs(results);
    } catch (e: any) {
      const msg = (e?.message || "") as string;
      if (/encrypt/i.test(msg)) {
        setErr("This PDF is password-protected. Unlock it first, then try again.");
      } else {
        setErr(msg || "Split failed.");
      }
    } finally {
      setBusy(false);
    }
  }

  const baseName = (file?.name || "document").replace(/\.pdf$/i, "");

  return (
    <div className="space-y-5">
      <FileDrop
        file={file}
        onFile={onPick}
        accept="application/pdf,.pdf"
        hint="Drop a PDF to split into pieces."
      />

      {file && pageCount > 0 && (
        <p className="text-sm text-slate-600">
          {pageCount} page{pageCount === 1 ? "" : "s"} · {fmtBytes(file.size)}
        </p>
      )}

      {file && pageCount > 0 && (
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="split-mode"
              checked={mode === "every"}
              onChange={() => setMode("every")}
            />
            Every page as its own PDF
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="split-mode"
              checked={mode === "ranges"}
              onChange={() => setMode("ranges")}
            />
            Custom ranges
          </label>

          {mode === "ranges" && (
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Ranges (e.g. 1-3, 5, 7-9)
              </span>
              <textarea
                rows={2}
                value={ranges}
                onChange={(e) => setRanges(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </label>
          )}

          <button
            type="button"
            onClick={split}
            disabled={busy}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Working…" : "Split"}
          </button>
        </div>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outputs.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            {outputs.length} output{outputs.length === 1 ? "" : "s"}
          </p>
          <div className="space-y-2">
            {outputs.map((o) => (
              <div
                key={o.range}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    Pages {o.range}
                  </p>
                  <p className="text-xs text-slate-500">
                    {o.pages} page{o.pages === 1 ? "" : "s"} · {fmtBytes(o.size)}
                  </p>
                </div>
                <a
                  href={o.url}
                  download={`${baseName}-pages-${o.range}.pdf`}
                  className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
