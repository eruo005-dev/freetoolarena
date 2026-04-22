"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Position =
  | "center"
  | "diagonal"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const m = hex.trim().replace(/^#/, "");
  const full =
    m.length === 3
      ? m
          .split("")
          .map((c) => c + c)
          .join("")
      : m;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return { r: 1, g: 0, b: 0 };
  const num = parseInt(full, 16);
  return {
    r: ((num >> 16) & 0xff) / 255,
    g: ((num >> 8) & 0xff) / 255,
    b: (num & 0xff) / 255,
  };
}

export function PdfWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("DRAFT");
  const [size, setSize] = useState(72);
  const [opacity, setOpacity] = useState(0.3);
  const [color, setColor] = useState("#ff0000");
  const [rotation, setRotation] = useState(-30);
  const [position, setPosition] = useState<Position>("center");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);

  function onPick(f: File) {
    setFile(f);
    setErr(null);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(null);
    setOutSize(null);
  }

  async function apply() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const { PDFDocument, rgb, degrees, StandardFonts } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: false });
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const { r, g, b } = hexToRgb(color);
      const colorObj = rgb(r, g, b);
      const pages = doc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, size);
        const textHeight = font.heightAtSize(size);

        let x = 0;
        let y = 0;
        let angle = rotation;
        const margin = 36;

        switch (position) {
          case "center":
            x = (width - textWidth) / 2;
            y = (height - textHeight) / 2;
            angle = 0;
            break;
          case "diagonal":
            x = (width - textWidth) / 2;
            y = (height - textHeight) / 2;
            break;
          case "top-left":
            x = margin;
            y = height - margin - textHeight;
            break;
          case "top-right":
            x = width - margin - textWidth;
            y = height - margin - textHeight;
            break;
          case "bottom-left":
            x = margin;
            y = margin;
            break;
          case "bottom-right":
            x = width - margin - textWidth;
            y = margin;
            break;
        }

        page.drawText(text, {
          x,
          y,
          size,
          font,
          color: colorObj,
          opacity,
          rotate: degrees(angle),
        });
      }

      const out = await doc.save();
      const blob = new Blob([out], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      const msg = (e?.message || "") as string;
      if (/encrypt/i.test(msg)) {
        setErr("This PDF is password-protected. Unlock it first, then try again.");
      } else {
        setErr(msg || "Operation failed.");
      }
    } finally {
      setBusy(false);
    }
  }

  const baseName = (file?.name || "document").replace(/\.pdf$/i, "");

  return (
    <div className="space-y-5">
      <FileDrop
        file={file}
        onFile={onPick}
        accept="application/pdf,.pdf"
        hint="Adds text watermark to every page."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Watermark text
          </span>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Font size · {size}pt
          </span>
          <input
            type="range"
            min={24}
            max={144}
            step={1}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Opacity · {Math.round(opacity * 100)}%
          </span>
          <input
            type="range"
            min={0.05}
            max={1}
            step={0.05}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Color (hex)
          </span>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Rotation · {rotation}°
          </span>
          <input
            type="range"
            min={-45}
            max={45}
            step={1}
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Position
          </span>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as Position)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="center">Center</option>
            <option value="diagonal">Diagonal</option>
            <option value="top-left">Top-left</option>
            <option value="top-right">Top-right</option>
            <option value="bottom-left">Bottom-left</option>
            <option value="bottom-right">Bottom-right</option>
          </select>
        </label>
      </div>

      {file && (
        <button
          type="button"
          onClick={apply}
          disabled={busy}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {busy ? "Working…" : "Apply watermark"}
        </button>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Watermarked PDF ready — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={`${baseName}-watermarked.pdf`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
