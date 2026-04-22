"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

export function PdfCrop() {
  const [file, setFile] = useState<File | null>(null);
  const [top, setTop] = useState(36);
  const [right, setRight] = useState(36);
  const [bottom, setBottom] = useState(36);
  const [left, setLeft] = useState(36);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);

  function onPick(f: File) {
    setFile(f);
    setErr(null);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(null);
    setOutSize(null);
  }

  function clamp(v: number) {
    return Math.max(0, Math.min(200, Number.isFinite(v) ? v : 0));
  }

  async function crop() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: false });
      const pages = doc.getPages();
      const t = clamp(top);
      const r = clamp(right);
      const btm = clamp(bottom);
      const l = clamp(left);

      for (const page of pages) {
        const mb = page.getMediaBox();
        const newX = mb.x + l;
        const newY = mb.y + btm;
        const newW = mb.width - l - r;
        const newH = mb.height - t - btm;
        if (newW <= 0 || newH <= 0) {
          throw new Error(
            "Margins are larger than the page — pick smaller values.",
          );
        }
        page.setCropBox(newX, newY, newW, newH);
      }

      const out = await doc.save();
      const blob = new Blob([out], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      const msg = (e?.message || "") as string;
      if (/encrypt/i.test(msg)) {
        setErr("This PDF is password-protected. Unlock it first, then try again.");
      } else {
        setErr(msg || "Operation failed.");
      }
    } finally {
      setBusy(false);
    }
  }

  const baseName = (file?.name || "document").replace(/\.pdf$/i, "");

  const inputCls =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";
  const labelSpan =
    "text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block";

  return (
    <div className="space-y-5">
      <FileDrop
        file={file}
        onFile={onPick}
        accept="application/pdf,.pdf"
        hint="Trim whitespace margins from every page (non-destructive)."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <label className="block">
          <span className={labelSpan}>Top (pt)</span>
          <input
            type="number"
            min={0}
            max={200}
            value={top}
            onChange={(e) => setTop(clamp(Number(e.target.value)))}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className={labelSpan}>Right (pt)</span>
          <input
            type="number"
            min={0}
            max={200}
            value={right}
            onChange={(e) => setRight(clamp(Number(e.target.value)))}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className={labelSpan}>Bottom (pt)</span>
          <input
            type="number"
            min={0}
            max={200}
            value={bottom}
            onChange={(e) => setBottom(clamp(Number(e.target.value)))}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className={labelSpan}>Left (pt)</span>
          <input
            type="number"
            min={0}
            max={200}
            value={left}
            onChange={(e) => setLeft(clamp(Number(e.target.value)))}
            className={inputCls}
          />
        </label>
      </div>

      <p className="text-xs text-slate-500">
        Cropping is non-destructive — viewers respect the new crop box but
        content is preserved. 72pt = 1 inch.
      </p>

      {file && (
        <button
          type="button"
          onClick={crop}
          disabled={busy}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {busy ? "Working…" : "Crop all pages"}
        </button>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Cropped PDF ready — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={`${baseName}-cropped.pdf`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
