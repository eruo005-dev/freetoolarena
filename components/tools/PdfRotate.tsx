"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Mode = "all" | "odd" | "even" | "first" | "last";

export function PdfRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [mode, setMode] = useState<Mode>("all");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);

  async function run() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes);
      const pages = doc.getPages();
      pages.forEach((p, i) => {
        const idx = i + 1;
        const shouldRotate =
          mode === "all" ||
          (mode === "odd" && idx % 2 === 1) ||
          (mode === "even" && idx % 2 === 0) ||
          (mode === "first" && idx === 1) ||
          (mode === "last" && idx === pages.length);
        if (shouldRotate) {
          const current = p.getRotation().angle;
          p.setRotation(degrees((current + angle) % 360));
        }
      });
      const b = await doc.save();
      const blob = new Blob([b], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e?.message || "Rotate failed.");
    } finally {
      setBusy(false);
    }
  }

  const baseName = (file?.name || "document").replace(/\.pdf$/i, "");

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="application/pdf,.pdf" hint="Rotate PDF pages." />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <label className="text-sm">
          <span className="block mb-1 text-slate-700">Angle</span>
          <select
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value) as 90 | 180 | 270)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value={90}>90° clockwise</option>
            <option value={180}>180°</option>
            <option value={270}>90° counter-clockwise</option>
          </select>
        </label>
        <label className="text-sm sm:col-span-3">
          <span className="block mb-1 text-slate-700">Pages</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="all">All pages</option>
            <option value="odd">Odd pages only</option>
            <option value="even">Even pages only</option>
            <option value="first">First page only</option>
            <option value="last">Last page only</option>
          </select>
        </label>
      </div>
      <button
        type="button"
        onClick={run}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Rotating…" : "Rotate PDF"}
      </button>
      {err && <p className="text-sm text-rose-600">{err}</p>}
      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Rotated PDF ready — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={`${baseName}-rotated.pdf`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
