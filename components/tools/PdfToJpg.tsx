"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type PageImage = { num: number; url: string; size: number };

export function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(1.5);
  const [quality, setQuality] = useState(0.9);
  const [images, setImages] = useState<PageImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  async function render(chosen: File) {
    // Clean up any previous object URLs.
    images.forEach((i) => URL.revokeObjectURL(i.url));
    setImages([]);
    setErr(null);
    setBusy(true);
    try {
      const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.js");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
      const buf = await chosen.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const total = doc.numPages;
      setProgress({ done: 0, total });
      const out: PageImage[] = [];
      for (let i = 1; i <= total; i++) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        const blob: Blob | null = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/jpeg", quality),
        );
        if (blob) out.push({ num: i, url: URL.createObjectURL(blob), size: blob.size });
        setProgress({ done: i, total });
        // give the UI a tick
        await new Promise((r) => setTimeout(r, 0));
      }
      setImages(out);
    } catch (e: any) {
      setErr(e?.message || "Couldn't render the PDF.");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  function onPick(f: File) {
    setFile(f);
    render(f);
  }

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={onPick} accept="application/pdf,.pdf" hint="Each PDF page becomes one JPG." />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Scale · {scale.toFixed(1)}× ({Math.round(72 * scale)} DPI)
          </span>
          <input
            type="range"
            min={0.75}
            max={3}
            step={0.25}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            JPG quality · {Math.round(quality * 100)}%
          </span>
          <input
            type="range"
            min={0.5}
            max={1}
            step={0.05}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      {file && (
        <button
          type="button"
          onClick={() => render(file)}
          disabled={busy}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {busy ? "Rendering…" : "Re-render with new settings"}
        </button>
      )}

      {progress && (
        <div className="rounded-lg bg-slate-100 overflow-hidden">
          <div
            className="h-2 bg-brand transition-all"
            style={{ width: `${(progress.done / progress.total) * 100}%` }}
            aria-label={`Rendering page ${progress.done} of ${progress.total}`}
          />
        </div>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {images.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            {images.length} page{images.length === 1 ? "" : "s"} rendered ·{" "}
            total {fmtBytes(images.reduce((s, i) => s + i.size, 0))}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {images.map((im) => (
              <div key={im.num} className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Page {im.num}</span>
                  <a
                    href={im.url}
                    download={`${(file?.name || "page").replace(/\.pdf$/i, "")}-${im.num}.jpg`}
                    className="text-brand hover:underline"
                  >
                    Download
                  </a>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={im.url}
                  alt={`PDF page ${im.num}`}
                  className="w-full rounded bg-white border border-slate-200"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
