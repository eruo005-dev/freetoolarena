"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

function parseRanges(input: string, max: number): number[] {
  const out = new Set<number>();
  const parts = input.split(",").map((p) => p.trim()).filter(Boolean);
  for (const part of parts) {
    if (/^\d+$/.test(part)) {
      const n = parseInt(part);
      if (n >= 1 && n <= max) out.add(n);
    } else if (/^\d+-\d+$/.test(part)) {
      const [a, b] = part.split("-").map((n) => parseInt(n));
      if (a <= b) {
        for (let i = a; i <= b; i++) {
          if (i >= 1 && i <= max) out.add(i);
        }
      }
    }
  }
  return [...out].sort((a, b) => a - b);
}

export function PdfPageRangeExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [ranges, setRanges] = useState<string>("1-5, 8, 12-15");
  const [error, setError] = useState<string>("");
  const [busy, setBusy] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [downloadName, setDownloadName] = useState<string>("");

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setError("");
    setDownloadUrl("");
    try {
      const buf = await f.arrayBuffer();
      const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
      setTotalPages(doc.getPageCount());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not read PDF.");
    }
  };

  const onExtract = async () => {
    if (!file) { setError("Pick a PDF first."); return; }
    setBusy(true);
    setError("");
    setDownloadUrl("");
    try {
      const buf = await file.arrayBuffer();
      const src = await PDFDocument.load(buf, { ignoreEncryption: true });
      const pages = parseRanges(ranges, src.getPageCount());
      if (pages.length === 0) throw new Error("No valid page numbers in range.");
      const out = await PDFDocument.create();
      const copied = await out.copyPages(src, pages.map((p) => p - 1));
      copied.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadName(file.name.replace(/\.pdf$/i, "") + `-pages-${pages.length}.pdf`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Extraction failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">PDF file</span>
        <input type="file" accept="application/pdf" onChange={onUpload} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
      </label>

      {totalPages > 0 && (
        <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm">
          Loaded: <strong>{file?.name}</strong> — {totalPages} pages
        </div>
      )}

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Pages to keep</span>
        <input value={ranges} onChange={(e) => setRanges(e.target.value)} placeholder="e.g. 1-5, 8, 12-15" className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        <span className="mt-1 block text-xs text-slate-500">Comma-separated. Use ranges (1-5) and individual pages (8). Out-of-range numbers ignored.</span>
      </label>

      <button onClick={onExtract} disabled={busy || !file} className="rounded bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-50">
        {busy ? "Extracting..." : "Extract pages"}
      </button>

      {error && <div className="rounded border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">{error}</div>}

      {downloadUrl && (
        <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-sm">
          <a href={downloadUrl} download={downloadName} className="font-semibold text-emerald-900 underline">Download {downloadName}</a>
        </div>
      )}

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Privacy:</strong> all processing happens in your browser via pdf-lib. Your PDF is never uploaded to a server.
        Works on most PDFs including scanned (image-based) ones. Encrypted PDFs need to be unlocked first — try the
        <a href="/tools/pdf-unlock" className="ml-1 underline">pdf unlock</a> tool.
      </div>
    </div>
  );
}
