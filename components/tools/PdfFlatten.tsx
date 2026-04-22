"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

export function PdfFlatten() {
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
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes);
      const form = doc.getForm();
      try {
        form.flatten();
      } catch {
        /* no form — ignore */
      }
      // Re-emit as a raster flatten for annotations: walk pages through canvas.
      const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.js");
      pdfjs.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      const firstSave = await doc.save();
      const src = await pdfjs.getDocument({ data: firstSave }).promise;
      const flat = await PDFDocument.create();
      for (let i = 1; i <= src.numPages; i++) {
        const page = await src.getPage(i);
        const vp = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(vp.width);
        canvas.height = Math.ceil(vp.height);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        const blob: Blob = await new Promise((r) =>
          canvas.toBlob((b) => r(b as Blob), "image/jpeg", 0.94),
        );
        const jpegBytes = new Uint8Array(await blob.arrayBuffer());
        const img = await flat.embedJpg(jpegBytes);
        const p = flat.addPage([canvas.width, canvas.height]);
        p.drawImage(img, { x: 0, y: 0, width: canvas.width, height: canvas.height });
      }
      const b = await flat.save();
      const blob = new Blob([b], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e?.message || "Flatten failed.");
    } finally {
      setBusy(false);
    }
  }

  const baseName = (file?.name || "document").replace(/\.pdf$/i, "");

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="application/pdf,.pdf" hint="Flatten form fields and annotations." />
      <button
        type="button"
        onClick={run}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Flattening…" : "Flatten PDF"}
      </button>
      {err && <p className="text-sm text-rose-600">{err}</p>}
      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Flattened PDF — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={`${baseName}-flattened.pdf`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
