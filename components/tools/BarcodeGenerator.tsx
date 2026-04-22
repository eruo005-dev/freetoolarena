"use client";

import { useEffect, useRef, useState } from "react";

// Code39 patterns: each char is 9 elements (5 bars + 4 spaces). 1 = wide, 0 = narrow.
// Order: B S B S B S B S B (bar, space, bar, space, ...).
const CODE39: Record<string, string> = {
  "0": "000110100",
  "1": "100100001",
  "2": "001100001",
  "3": "101100000",
  "4": "000110001",
  "5": "100110000",
  "6": "001110000",
  "7": "000100101",
  "8": "100100100",
  "9": "001100100",
  A: "100001001",
  B: "001001001",
  C: "101001000",
  D: "000011001",
  E: "100011000",
  F: "001011000",
  G: "000001101",
  H: "100001100",
  I: "001001100",
  J: "000011100",
  K: "100000011",
  L: "001000011",
  M: "101000010",
  N: "000010011",
  O: "100010010",
  P: "001010010",
  Q: "000000111",
  R: "100000110",
  S: "001000110",
  T: "000010110",
  U: "110000001",
  V: "011000001",
  W: "111000000",
  X: "010010001",
  Y: "110010000",
  Z: "011010000",
  "-": "010000101",
  ".": "110000100",
  " ": "011000100",
  $: "010101000",
  "/": "010100010",
  "+": "010001010",
  "%": "000101010",
  "*": "010010100", // start/stop
};

export function BarcodeGenerator({
  initialText = "FREETOOLAREA",
  initialScale = 3,
  initialHeight = 120,
}: {
  initialText?: string;
  initialScale?: number;
  initialHeight?: number;
} = {}) {
  const [text, setText] = useState(initialText);
  const [scale, setScale] = useState(initialScale);
  const [height, setHeight] = useState(initialHeight);
  const [err, setErr] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const upper = text.toUpperCase();
  const validChars = upper.split("").every((c) => CODE39[c] !== undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setErr(null);
    if (!text) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    if (!validChars) {
      setErr("Code39 supports A–Z, 0–9, space, and - . $ / + %");
      return;
    }
    try {
      drawCode39(canvas, upper, scale, height);
    } catch (e: any) {
      setErr(e?.message || "Failed to draw barcode.");
    }
  }, [upper, scale, height, validChars, text]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `barcode-${upper || "code39"}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }, "image/png");
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Text (Code39)
        </span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono"
        />
        <p className="mt-1 text-xs text-slate-500">
          Allowed: A–Z, 0–9, space, and - . $ / + % (lowercase auto-uppercased).
        </p>
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Scale · {scale}x
          </span>
          <input
            type="range"
            min={1}
            max={6}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Height · {height}px
          </span>
          <input
            type="range"
            min={40}
            max={240}
            step={10}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      {err && <p className="text-sm text-rose-600">{err}</p>}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col items-center gap-4">
        <canvas
          ref={canvasRef}
          className="max-w-full rounded-lg border border-slate-200 bg-white"
        />
        <button
          type="button"
          onClick={download}
          disabled={!validChars || !text}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}

function drawCode39(
  canvas: HTMLCanvasElement,
  text: string,
  scale: number,
  height: number,
) {
  const QUIET = 10 * scale;
  const TEXT_H = 24;
  // Total modules: each char is 9 elements; inter-char gap = 1 narrow space.
  // Wrap with start/stop '*'.
  const full = `*${text}*`;
  // Calculate total width in "narrow units". narrow = 1, wide = 3.
  let units = 0;
  for (let i = 0; i < full.length; i++) {
    const pattern = CODE39[full[i]];
    for (let j = 0; j < pattern.length; j++) {
      units += pattern[j] === "1" ? 3 : 1;
    }
    if (i < full.length - 1) units += 1; // inter-char narrow space
  }

  const narrow = scale;
  const width = units * narrow + QUIET * 2;

  canvas.width = width;
  canvas.height = height + TEXT_H;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000000";
  let x = QUIET;

  for (let i = 0; i < full.length; i++) {
    const pattern = CODE39[full[i]];
    for (let j = 0; j < pattern.length; j++) {
      const w = (pattern[j] === "1" ? 3 : 1) * narrow;
      const isBar = j % 2 === 0;
      if (isBar) {
        ctx.fillRect(x, 0, w, height);
      }
      x += w;
    }
    if (i < full.length - 1) {
      x += narrow; // inter-char gap
    }
  }

  // Human readable text
  ctx.fillStyle = "#0f172a";
  ctx.font = `${Math.max(12, scale * 4)}px ui-monospace, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, height + TEXT_H / 2);
}
