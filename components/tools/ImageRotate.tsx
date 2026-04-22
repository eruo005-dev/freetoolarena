"use client";

import { useEffect, useState } from "react";
import { FileDrop, fmtBytes, loadImage } from "./ImageFormatConverter";

export function ImageRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(0);
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
  }, [file, angle]);

  useEffect(() => {
    return () => {
      if (outUrl) URL.revokeObjectURL(outUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isJpg = !!file && /jpe?g$/i.test(file.type || file.name);
  const mime = isJpg ? "image/jpeg" : "image/png";
  const ext = isJpg ? "jpg" : "png";
  const outName = file ? file.name.replace(/\.[^.]+$/, "") + `-rotated.${ext}` : `rotated.${ext}`;

  async function apply() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const img = await loadImage(file);
      const rad = (angle * Math.PI) / 180;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const sin = Math.abs(Math.sin(rad));
      const cos = Math.abs(Math.cos(rad));
      const newW = Math.round(w * cos + h * sin);
      const newH = Math.round(w * sin + h * cos);

      const canvas = document.createElement("canvas");
      canvas.width = newW;
      canvas.height = newH;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D not supported in this browser.");
      if (isJpg) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, newW, newH);
      }
      ctx.translate(newW / 2, newH / 2);
      ctx.rotate(rad);
      ctx.drawImage(img, -w / 2, -h / 2);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, mime, 0.95),
      );
      if (!blob) throw new Error("Rotate failed — your browser may not support this format.");
      if (outUrl) URL.revokeObjectURL(outUrl);
      const url = URL.createObjectURL(blob);
      setOutUrl(url);
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e.message || "Rotate failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <FileDrop
        file={file}
        onFile={setFile}
        accept="image/*"
        hint="JPG, PNG, WebP — any image your browser can decode."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[90, 180, 270, 0].map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAngle(a)}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              angle === a
                ? "border-brand bg-brand/5 text-brand"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {a === 0 ? "Reset (0°)" : `${a}°`}
          </button>
        ))}
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Custom angle · {angle}°
        </span>
        <input
          type="range"
          min={-180}
          max={180}
          step={1}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full"
        />
      </label>

      <button
        type="button"
        onClick={apply}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Working…" : "Apply rotation"}
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
          <img src={outUrl} alt="Rotated output" className="max-h-72 rounded-lg border border-slate-200 bg-white" />
        </div>
      )}
    </div>
  );
}
