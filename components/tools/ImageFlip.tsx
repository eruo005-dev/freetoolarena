"use client";

import { useEffect, useState } from "react";
import { FileDrop, fmtBytes, loadImage } from "./ImageFormatConverter";

type Axis = "horizontal" | "vertical";

export function ImageFlip() {
  const [file, setFile] = useState<File | null>(null);
  const [axis, setAxis] = useState<Axis>("horizontal");
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
  }, [file, axis]);

  useEffect(() => {
    return () => {
      if (outUrl) URL.revokeObjectURL(outUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isJpg = !!file && /jpe?g$/i.test(file.type || file.name);
  const mime = isJpg ? "image/jpeg" : "image/png";
  const ext = isJpg ? "jpg" : "png";
  const outName = file ? file.name.replace(/\.[^.]+$/, "") + `-flipped.${ext}` : `flipped.${ext}`;

  async function apply() {
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
      if (isJpg) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      if (axis === "horizontal") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      } else {
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, mime, 0.95),
      );
      if (!blob) throw new Error("Flip failed — your browser may not support this format.");
      if (outUrl) URL.revokeObjectURL(outUrl);
      const url = URL.createObjectURL(blob);
      setOutUrl(url);
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e.message || "Flip failed.");
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

      <div className="grid sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setAxis("horizontal")}
          className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
            axis === "horizontal"
              ? "border-brand bg-brand/5 text-brand"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          Flip horizontal (mirror)
        </button>
        <button
          type="button"
          onClick={() => setAxis("vertical")}
          className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
            axis === "vertical"
              ? "border-brand bg-brand/5 text-brand"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          Flip vertical (upside-down)
        </button>
      </div>

      <button
        type="button"
        onClick={apply}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Working…" : "Apply flip"}
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
          <img src={outUrl} alt="Flipped output" className="max-h-72 rounded-lg border border-slate-200 bg-white" />
        </div>
      )}
    </div>
  );
}
