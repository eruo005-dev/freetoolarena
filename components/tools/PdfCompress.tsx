"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

export function PdfCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.6);
  const [scale, setScale] = useState(1.0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);
  const [origSize, setOrigSize] = useState<number | null>(null);

  async function run() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    setOrigSize(file.size);
    try {
      const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.js");
      pdfjs.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      const { PDFDocument } = await import("pdf-lib");
      const buf = await file.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const out = await PDFDocument.create();
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const vp = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(vp.width);
        canvas.height = Math.ceil(vp.height);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        const jpeg: Blob = await new Promise((r) =>
          canvas.toBlob((b) => r(b as Blob), "image/jpeg", quality),
        );
        const jpegBytes = new Uint8Array(await jpeg.arrayBuffer());
        const img = await out.embedJpg(jpegBytes);
        const p = out.addPage([canvas.width, canvas.height]);
        p.drawImage(img, { x: 0, y: 0, width: canvas.width, height: canvas.height });
      }
      const b = await out.save();
      const blob = new Blob([b], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e?.message || "Compress failed.");
    } finally {
      setBusy(false);
    }
  }

  const baseName = (file?.name || "document").replace(/\.pdf$/i, "");
  const savings =
    origSize && outSize ? Math.max(0, Math.round((1 - outSize / origSize) * 100)) : null;

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="application/pdf,.pdf" hint="Compress PDF by re-encoding pages as JPEG." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <label>
          <span className="block mb-1 text-slate-700">JPEG quality ({Math.round(quality * 100)}%)</span>
          <input
            type="range"
            min={0.3}
            max={0.95}
            step={0.05}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label>
          <span className="block mb-1 text-slate-700">Resolution scale ({scale.toFixed(2)}x)</span>
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.1}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
      <p className="text-xs text-slate-500">
        Heavy compression works best for PDFs that are mostly images or scans. Text-heavy PDFs may lose selectable text.
      </p>
      <button
        type="button"
        onClick={run}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Compressing…" : "Compress PDF"}
      </button>
      {err && <p className="text-sm text-rose-600">{err}</p>}
      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <p className="text-sm text-slate-700">
            {origSize && `Original: ${fmtBytes(origSize)}`} → <strong>{fmtBytes(outSize || 0)}</strong>
            {savings !== null && ` (${savings}% smaller)`}
          </p>
          <a
            href={outUrl}
            download={`${baseName}-compressed.pdf`}
            className="inline-block rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
