"use client";

import { useEffect, useState } from "react";
import { FileDrop, fmtBytes, loadImage } from "./ImageFormatConverter";

function roundedPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.arcTo(x + w, y, x + w, y + rr, rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
  ctx.lineTo(x + rr, y + h);
  ctx.arcTo(x, y + h, x, y + h - rr, rr);
  ctx.lineTo(x, y + rr);
  ctx.arcTo(x, y, x + rr, y, rr);
  ctx.closePath();
}

export function ImageBorderAdder() {
  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState("#ffffff");
  const [width, setWidth] = useState(20);
  const [radius, setRadius] = useState(0);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setOutUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setOutSize(null);
    setErr(null);
  }, [file, color, width, radius]);

  useEffect(() => {
    return () => {
      if (outUrl) URL.revokeObjectURL(outUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const outName = file ? file.name.replace(/\.[^.]+$/, "") + "-bordered.png" : "bordered.png";

  async function apply() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const img = await loadImage(file);
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const bw = Math.max(0, width);
      const newW = w + bw * 2;
      const newH = h + bw * 2;

      const canvas = document.createElement("canvas");
      canvas.width = newW;
      canvas.height = newH;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported in this browser.");

      if (radius > 0) {
        ctx.save();
        roundedPath(ctx, 0, 0, newW, newH, radius);
        ctx.clip();
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, newW, newH);
        ctx.restore();
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, newW, newH);
      }

      ctx.drawImage(img, bw, bw);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("Border failed — your browser may not support PNG.");
      if (outUrl) URL.revokeObjectURL(outUrl);
      const url = URL.createObjectURL(blob);
      setOutUrl(url);
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e.message || "Border failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="image/*" hint="JPG, PNG, WebP — any image your browser can decode." />

      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Border color</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 bg-white p-1"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Width (px)</span>
          <input
            type="number"
            min={0}
            max={500}
            value={width}
            onChange={(e) => setWidth(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Corner radius (px)</span>
          <input
            type="number"
            min={0}
            max={500}
            value={radius}
            onChange={(e) => setRadius(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={apply}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Working…" : "Add border"}
      </button>

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              <strong>{fmtBytes(outSize || 0)}</strong>
              {file && <span className="text-slate-500">{" · original "}{fmtBytes(file.size)}</span>}
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
          <img src={outUrl} alt="Bordered output" className="max-h-72 rounded-lg border border-slate-200 bg-white" />
        </div>
      )}
    </div>
  );
}
