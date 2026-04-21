"use client";

import { useState, useEffect } from "react";
import { FileDrop, fmtBytes, loadImage } from "./ImageFormatConverter";

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [mode, setMode] = useState<"px" | "pct">("px");
  const [pct, setPct] = useState(50);
  const [format, setFormat] = useState<"jpeg" | "png" | "webp">("png");
  const [quality, setQuality] = useState(0.9);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    setErr(null);
    loadImage(file)
      .then((i) => {
        if (cancelled) return;
        setImg(i);
        setWidth(i.naturalWidth);
        setHeight(i.naturalHeight);
      })
      .catch((e) => !cancelled && setErr(e.message));
    return () => {
      cancelled = true;
    };
  }, [file]);

  function onWidth(n: number) {
    if (!img) return;
    const w = Math.max(1, Math.round(n));
    setWidth(w);
    if (lockAspect) setHeight(Math.round((w / img.naturalWidth) * img.naturalHeight));
  }
  function onHeight(n: number) {
    if (!img) return;
    const h = Math.max(1, Math.round(n));
    setHeight(h);
    if (lockAspect) setWidth(Math.round((h / img.naturalHeight) * img.naturalWidth));
  }
  function applyPct(p: number) {
    if (!img) return;
    setPct(p);
    setWidth(Math.round((img.naturalWidth * p) / 100));
    setHeight(Math.round((img.naturalHeight * p) / 100));
  }

  async function resize() {
    if (!img) return;
    setBusy(true);
    setErr(null);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported.");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      if (format === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      }
      ctx.drawImage(img, 0, 0, width, height);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, `image/${format}`, quality),
      );
      if (!blob) throw new Error("Resize failed.");
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e.message || "Resize failed.");
    } finally {
      setBusy(false);
    }
  }

  const ext = format === "jpeg" ? "jpg" : format;
  const outName = file ? file.name.replace(/\.[^.]+$/, "") + `-${width}x${height}.${ext}` : `resized.${ext}`;

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="image/*" hint="JPG, PNG, WebP up to your browser's memory limit." />

      {img && (
        <>
          <p className="text-sm text-slate-600">
            Original: <strong>{img.naturalWidth}×{img.naturalHeight}px</strong>
            {file && <> · {fmtBytes(file.size)}</>}
          </p>

          <div className="flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => setMode("px")}
              className={`rounded-lg px-3 py-1.5 ${mode === "px" ? "bg-brand text-white" : "bg-slate-100 text-slate-700"}`}
            >
              Pixels
            </button>
            <button
              type="button"
              onClick={() => setMode("pct")}
              className={`rounded-lg px-3 py-1.5 ${mode === "pct" ? "bg-brand text-white" : "bg-slate-100 text-slate-700"}`}
            >
              Percent
            </button>
          </div>

          {mode === "px" ? (
            <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <label className="block">
                <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                  Width (px)
                </span>
                <input
                  type="number"
                  value={width}
                  min={1}
                  onChange={(e) => onWidth(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                  Height (px)
                </span>
                <input
                  type="number"
                  value={height}
                  min={1}
                  onChange={(e) => onHeight(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex items-center gap-2 text-sm pb-2">
                <input
                  type="checkbox"
                  checked={lockAspect}
                  onChange={(e) => setLockAspect(e.target.checked)}
                />
                Lock aspect
              </label>
            </div>
          ) : (
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Scale · {pct}%
              </span>
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={pct}
                onChange={(e) => applyPct(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-slate-600 mt-1">
                Target: {width}×{height}px
              </p>
            </label>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Format
              </span>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="png">PNG (lossless)</option>
                <option value="jpeg">JPG</option>
                <option value="webp">WebP</option>
              </select>
            </label>
            {format !== "png" && (
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
            )}
          </div>

          <button
            type="button"
            onClick={resize}
            disabled={busy}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Resizing…" : "Resize"}
          </button>
        </>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-slate-600">
              {width}×{height}px · <strong>{fmtBytes(outSize || 0)}</strong>
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
            alt="Resized output"
            className="max-h-72 rounded-lg border border-slate-200 bg-white"
          />
        </div>
      )}
    </div>
  );
}
