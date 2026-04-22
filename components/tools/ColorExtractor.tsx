"use client";

import { useEffect, useState } from "react";
import { FileDrop, loadImage } from "./ImageFormatConverter";

type Swatch = { hex: string; rgb: string; hsl: string; count: number };

function toHex(n: number): string {
  const s = Math.max(0, Math.min(255, Math.round(n))).toString(16);
  return s.length === 1 ? "0" + s : s;
}

function rgbToHsl(r: number, g: number, b: number): string {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      case bn:
        h = (rn - gn) / d + 4;
        break;
    }
    h *= 60;
  }
  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function extractColors(img: HTMLImageElement): Swatch[] {
  const W = 100;
  const H = 100;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, W, H);
  const data = ctx.getImageData(0, 0, W, H).data;
  const buckets = new Map<number, { r: number; g: number; b: number; count: number }>();
  const BIN = 32;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 125) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const br = Math.floor(r / BIN);
    const bg = Math.floor(g / BIN);
    const bb = Math.floor(b / BIN);
    const key = br * 64 + bg * 8 + bb;
    const entry = buckets.get(key);
    if (entry) {
      entry.r += r;
      entry.g += g;
      entry.b += b;
      entry.count += 1;
    } else {
      buckets.set(key, { r, g, b, count: 1 });
    }
  }
  const sorted = Array.from(buckets.values()).sort((a, b) => b.count - a.count).slice(0, 6);
  return sorted.map((e) => {
    const r = Math.round(e.r / e.count);
    const g = Math.round(e.g / e.count);
    const b = Math.round(e.b / e.count);
    return {
      hex: `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase(),
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: rgbToHsl(r, g, b),
      count: e.count,
    };
  });
}

export function ColorExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [swatches, setSwatches] = useState<Swatch[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setErr(null);
    setSwatches([]);
    setBusy(true);
    loadImage(file)
      .then((img) => {
        setSwatches(extractColors(img));
      })
      .catch((e: any) => setErr(e?.message || "Couldn't read image."))
      .finally(() => setBusy(false));
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function copy(text: string, idx: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {
      setCopiedIdx(null);
    }
  }

  return (
    <div className="space-y-5">
      <FileDrop
        file={file}
        onFile={setFile}
        accept="image/*"
        hint="Drop an image — we'll find its 6 most-dominant colors."
      />

      {previewUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Source preview"
            className="max-h-72 rounded-lg border border-slate-200 bg-white"
            style={{ maxWidth: 300 }}
          />
        </div>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}
      {busy && <p className="text-sm text-slate-500">Extracting colors…</p>}

      {swatches.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {swatches.map((s, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2"
            >
              <div
                className="rounded-lg border border-slate-200"
                style={{ backgroundColor: s.hex, width: "100%", height: 64 }}
                aria-label={`Swatch ${s.hex}`}
              />
              <div className="text-xs text-slate-700 space-y-0.5 font-mono">
                <div>{s.hex}</div>
                <div>{s.rgb}</div>
                <div>{s.hsl}</div>
              </div>
              <button
                type="button"
                onClick={() => copy(s.hex, idx)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                {copiedIdx === idx ? "Copied!" : "Copy HEX"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
