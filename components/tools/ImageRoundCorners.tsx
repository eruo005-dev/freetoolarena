"use client";

import { useEffect, useState } from "react";
import { FileDrop, fmtBytes, loadImage } from "./ImageFormatConverter";

function roundedPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  const anyCtx = ctx as any;
  if (typeof anyCtx.roundRect === "function") {
    ctx.beginPath();
    anyCtx.roundRect(x, y, w, h, rr);
    return;
  }
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

export function ImageRoundCorners() {
  const [file, setFile] = useState<File | null>(null);
  const [maxR, setMaxR] = useState(200);
  const [radius, setRadius] = useState(40);
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
    if (!file) {
      setMaxR(200);
      return;
    }
    let alive = true;
    loadImage(file)
      .then((img) => {
        if (!alive) return;
        const m = Math.floor(Math.min(img.naturalWidth, img.naturalHeight) / 2);
        setMaxR(Math.max(1, m));
        setRadius((r) => Math.min(r, m));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [file]);

  useEffect(() => {
    return () => {
      if (outUrl) URL.revokeObjectURL(outUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const outName = file ? file.name.replace(/\.[^.]+$/, "") + "-rounded.png" : "rounded.png";

  async function apply() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const img = await loadImage(file);
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported in this browser.");
      ctx.save();
      roundedPath(ctx, 0, 0, w, h, radius);
      ctx.clip();
      ctx.drawImage(img, 0, 0);
      ctx.restore();

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("Round-corner failed — your browser may not support PNG.");
      if (outUrl) URL.revokeObjectURL(outUrl);
      const url = URL.createObjectURL(blob);
      setOutUrl(url);
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e.message || "Round-corner failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="image/*" hint="JPG, PNG, WebP — corners become transparent in the PNG output." />

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Corner radius · {radius}px (max {maxR}px)
        </span>
        <input
          type="range"
          min={0}
          max={maxR}
          step={1}
          value={Math.min(radius, maxR)}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full"
        />
      </label>

      <button
        type="button"
        onClick={apply}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Working…" : "Round corners"}
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
          <img src={outUrl} alt="Rounded output" className="max-h-72 rounded-lg border border-slate-200 bg-white" />
        </div>
      )}
    </div>
  );
}
