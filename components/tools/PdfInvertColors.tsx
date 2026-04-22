"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

export function PdfInvertColors() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);

  async function run() {
    if (!file) return;
    setBusy(true);
    setErr(null);
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
        const vp = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(vp.width);
        canvas.height = Math.ceil(vp.height);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let j = 0; j < data.data.length; j += 4) {
          data.data[j] = 255 - data.data[j];
          data.data[j + 1] = 255 - data.data[j + 1];
          data.data[j + 2] = 255 - data.data[j + 2];
        }
        ctx.putImageData(data, 0, 0);
        const blob: Blob = await new Promise((r) =>
          canvas.toBlob((b) => r(b as Blob), "image/jpeg", 0.92),
        );
        const bytes = new Uint8Array(await blob.arrayBuffer());
        const img = await out.embedJpg(bytes);
        const p = out.addPage([canvas.width, canvas.height]);
        p.drawImage(img, { x: 0, y: 0, width: canvas.width, height: canvas.height });
      }
      const b = await out.save();
      const blob = new Blob([b], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e?.message || "Invert failed.");
    } finally {
      setBusy(false);
    }
  }

  const baseName = (file?.name || "document").replace(/\.pdf$/i, "");

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="application/pdf,.pdf" hint="Flip colors of every page." />
      <button
        type="button"
        onClick={run}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Inverting…" : "Invert colors"}
      </button>
      {err && <p className="text-sm text-rose-600">{err}</p>}
      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Inverted PDF — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={`${baseName}-inverted.pdf`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
