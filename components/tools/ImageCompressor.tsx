"use client";

import { useState, useEffect } from "react";
import { FileDrop, fmtBytes, loadImage } from "./ImageFormatConverter";

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [quality, setQuality] = useState(0.75);
  const [maxDim, setMaxDim] = useState(2400);
  const [format, setFormat] = useState<"jpeg" | "webp">("jpeg");
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    setErr(null);
    setOutUrl(null);
    setOutSize(null);
    loadImage(file).then((i) => !cancelled && setImg(i)).catch((e) => !cancelled && setErr(e.message));
    return () => {
      cancelled = true;
    };
  }, [file]);

  async function compress() {
    if (!img) return;
    setBusy(true);
    setErr(null);
    try {
      const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported.");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      if (format === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
      }
      ctx.drawImage(img, 0, 0, w, h);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, `image/${format}`, quality),
      );
      if (!blob) throw new Error("Compression failed.");
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e.message || "Compression failed.");
    } finally {
      setBusy(false);
    }
  }

  const ext = format === "jpeg" ? "jpg" : "webp";
  const outName = file ? file.name.replace(/\.[^.]+$/, "") + `-compressed.${ext}` : `compressed.${ext}`;
  const ratio = file && outSize ? 1 - outSize / file.size : 0;

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="image/*" hint="JPG or PNG is ideal. Runs fully offline." />

      {img && (
        <>
          <p className="text-sm text-slate-600">
            Original: <strong>{img.naturalWidth}×{img.naturalHeight}px</strong>
            {file && <> · {fmtBytes(file.size)}</>}
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Quality · {Math.round(quality * 100)}%
              </span>
              <input
                type="range"
                min={0.3}
                max={1}
                step={0.05}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Max dimension · {maxDim}px
              </span>
              <input
                type="range"
                min={480}
                max={4000}
                step={40}
                value={maxDim}
                onChange={(e) => setMaxDim(Number(e.target.value))}
                className="w-full"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Format
              </span>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="jpeg">JPG</option>
                <option value="webp">WebP (often smaller)</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={compress}
            disabled={busy}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Compressing…" : "Compress"}
          </button>
        </>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && file && outSize !== null && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-slate-700">
              <strong>{fmtBytes(outSize)}</strong>
              <span className="text-slate-500">
                {" · was "}
                {fmtBytes(file.size)} ·{" "}
                {ratio > 0 ? (
                  <span className="text-emerald-700 font-medium">
                    {Math.round(ratio * 100)}% smaller
                  </span>
                ) : (
                  <span className="text-amber-600">no gain — try lower quality</span>
                )}
              </span>
            </p>
            <a
              href={outUrl}
              download={outName}
              className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
            >
              Download
            </a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={outUrl}
            alt="Compressed output"
            className="max-h-72 rounded-lg border border-slate-200 bg-white"
          />
        </div>
      )}
    </div>
  );
}
