"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Out = { name: string; url: string; size: number };

export function PdfToPng() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(2.0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [items, setItems] = useState<Out[]>([]);

  async function run() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    items.forEach((i) => URL.revokeObjectURL(i.url));
    setItems([]);
    try {
      const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.js");
      pdfjs.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      const buf = await file.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const base = file.name.replace(/\.pdf$/i, "");
      const out: Out[] = [];
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
        const blob: Blob = await new Promise((r) =>
          canvas.toBlob((b) => r(b as Blob), "image/png"),
        );
        out.push({
          name: `${base}-page-${i}.png`,
          url: URL.createObjectURL(blob),
          size: blob.size,
        });
      }
      setItems(out);
    } catch (e: any) {
      setErr(e?.message || "Render failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="application/pdf,.pdf" hint="Render each page as a PNG." />
      <label className="text-sm block">
        <span className="block mb-1 text-slate-700">Resolution scale ({scale.toFixed(1)}x)</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.5}
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="w-full"
        />
      </label>
      <button
        type="button"
        onClick={run}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Rendering…" : "Convert to PNG"}
      </button>
      {err && <p className="text-sm text-rose-600">{err}</p>}
      {items.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <p className="text-sm text-slate-700">{items.length} PNG{items.length === 1 ? "" : "s"} ready:</p>
          <ul className="space-y-1 text-sm">
            {items.map((i) => (
              <li key={i.name} className="flex items-center justify-between gap-2">
                <span className="truncate">{i.name} — {fmtBytes(i.size)}</span>
                <a
                  href={i.url}
                  download={i.name}
                  className="rounded-md border border-brand text-brand px-2 py-1 text-xs hover:bg-brand hover:text-white"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
