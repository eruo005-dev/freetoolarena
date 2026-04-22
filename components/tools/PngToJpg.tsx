"use client";

import { useEffect, useState } from "react";
import { FileDrop, fmtBytes, loadImage } from "./ImageFormatConverter";

export function PngToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [bg, setBg] = useState("#ffffff");
  const [quality, setQuality] = useState(0.9);
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
  }, [file, bg, quality]);

  useEffect(() => {
    return () => {
      if (outUrl) URL.revokeObjectURL(outUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const outName = file ? file.name.replace(/\.[^.]+$/, "") + ".jpg" : "image.jpg";

  async function convert() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported in this browser.");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", quality),
      );
      if (!blob) throw new Error("Conversion failed — your browser may not support JPG encoding.");
      if (outUrl) URL.revokeObjectURL(outUrl);
      const url = URL.createObjectURL(blob);
      setOutUrl(url);
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e.message || "Conversion failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="image/png" hint="PNG only — transparent pixels will be filled with your background color." />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Background (for transparency)</span>
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-300 bg-white p-1"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Quality · {Math.round(quality * 100)}%
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

      <button
        type="button"
        onClick={convert}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Converting…" : "Convert to JPG"}
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
          <img src={outUrl} alt="JPG output" className="max-h-72 rounded-lg border border-slate-200 bg-white" />
        </div>
      )}
    </div>
  );
}
