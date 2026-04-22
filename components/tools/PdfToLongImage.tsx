"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

export function PdfToLongImage() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(1.5);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  function onPick(f: File) {
    setFile(f);
    setErr(null);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(null);
    setOutSize(null);
    setDims(null);
  }

  async function build() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(null);
    setOutSize(null);
    setDims(null);
    try {
      const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.js");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
      const buf = await file.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const total = doc.numPages;
      setProgress({ done: 0, total });

      // First pass: measure.
      let maxW = 0;
      let totalH = 0;
      const viewports: any[] = [];
      for (let i = 1; i <= total; i++) {
        const page = await doc.getPage(i);
        const vp = page.getViewport({ scale });
        viewports.push({ page, vp });
        maxW = Math.max(maxW, Math.ceil(vp.width));
        totalH += Math.ceil(vp.height);
      }

      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = maxW;
      finalCanvas.height = totalH;
      const finalCtx = finalCanvas.getContext("2d")!;
      finalCtx.fillStyle = "#ffffff";
      finalCtx.fillRect(0, 0, maxW, totalH);

      let y = 0;
      for (let i = 0; i < viewports.length; i++) {
        const { page, vp } = viewports[i];
        const w = Math.ceil(vp.width);
        const h = Math.ceil(vp.height);
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        const x = Math.floor((maxW - w) / 2);
        finalCtx.drawImage(c, x, y);
        y += h;
        setProgress({ done: i + 1, total });
        await new Promise((r) => setTimeout(r, 0));
      }

      const blob: Blob | null = await new Promise((resolve) =>
        finalCanvas.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("Could not encode image.");
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
      setDims({ w: maxW, h: totalH });
    } catch (e: any) {
      const msg = (e?.message || "") as string;
      if (/encrypt/i.test(msg)) {
        setErr("This PDF is password-protected. Unlock it first, then try again.");
      } else {
        setErr(msg || "Operation failed.");
      }
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  const baseName = (file?.name || "document").replace(/\.pdf$/i, "");

  return (
    <div className="space-y-5">
      <FileDrop
        file={file}
        onFile={onPick}
        accept="application/pdf,.pdf"
        hint="All pages will be stacked vertically into one tall PNG."
      />

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Scale · {scale.toFixed(1)}× ({Math.round(72 * scale)} DPI)
        </span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="w-full"
        />
      </label>

      {file && (
        <button
          type="button"
          onClick={build}
          disabled={busy}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {busy ? "Working…" : "Build long image"}
        </button>
      )}

      {progress && (
        <div className="space-y-1">
          <p className="text-xs text-slate-500">
            Rendering page {progress.done} of {progress.total}
          </p>
          <div className="rounded-lg bg-slate-100 overflow-hidden">
            <div
              className="h-2 bg-brand transition-all"
              style={{ width: `${(progress.done / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && dims && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            PNG ready — <strong>{dims.w} × {dims.h}</strong> · {fmtBytes(outSize || 0)}
          </p>
          <a
            href={outUrl}
            download={`${baseName}-long.png`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
