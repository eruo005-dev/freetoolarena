"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Position =
  | "bottom-center"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "top-right"
  | "top-left";

type Format = "plain" | "page-n" | "page-n-of-n" | "n-slash-n";

export function PdfPageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [size, setSize] = useState(12);
  const [startNum, setStartNum] = useState(1);
  const [format, setFormat] = useState<Format>("page-n-of-n");
  const [skipFirst, setSkipFirst] = useState(false);
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

  function formatText(n: number, total: number): string {
    switch (format) {
      case "plain":
        return `${n}`;
      case "page-n":
        return `Page ${n}`;
      case "page-n-of-n":
        return `Page ${n} of ${total}`;
      case "n-slash-n":
        return `${n} / ${total}`;
    }
  }

  async function apply() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: false });
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      const margin = 20;
      // Total "numbered" pages (skipFirst means first page gets no number).
      const total = skipFirst ? pages.length - 1 : pages.length;

      let counter = startNum;
      for (let i = 0; i < pages.length; i++) {
        if (skipFirst && i === 0) continue;
        const page = pages[i];
        const { width, height } = page.getSize();
        const text = formatText(counter, total + (startNum - 1));
        const textWidth = font.widthOfTextAtSize(text, size);
        const textHeight = font.heightAtSize(size);

        let x = margin;
        let y = margin;
        switch (position) {
          case "bottom-center":
            x = (width - textWidth) / 2;
            y = margin;
            break;
          case "bottom-right":
            x = width - margin - textWidth;
            y = margin;
            break;
          case "bottom-left":
            x = margin;
            y = margin;
            break;
          case "top-center":
            x = (width - textWidth) / 2;
            y = height - margin - textHeight;
            break;
          case "top-right":
            x = width - margin - textWidth;
            y = height - margin - textHeight;
            break;
          case "top-left":
            x = margin;
            y = height - margin - textHeight;
            break;
        }

        page.drawText(text, {
          x,
          y,
          size,
          font,
          color: rgb(0, 0, 0),
        });
        counter++;
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
        hint="Adds page numbers to every page."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Position
          </span>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as Position)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="bottom-center">Bottom center</option>
            <option value="bottom-right">Bottom right</option>
            <option value="bottom-left">Bottom left</option>
            <option value="top-center">Top center</option>
            <option value="top-right">Top right</option>
            <option value="top-left">Top left</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Format
          </span>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as Format)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="plain">1, 2, 3</option>
            <option value="page-n">Page 1</option>
            <option value="page-n-of-n">Page 1 of N</option>
            <option value="n-slash-n">1 / N</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Font size · {size}pt
          </span>
          <input
            type="range"
            min={8}
            max={24}
            step={1}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Starting number
          </span>
          <input
            type="number"
            min={1}
            value={startNum}
            onChange={(e) => setStartNum(Math.max(1, Number(e.target.value) || 1))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-2">
          <input
            type="checkbox"
            checked={skipFirst}
            onChange={(e) => setSkipFirst(e.target.checked)}
          />
          Skip first page
        </label>
      </div>

      {file && (
        <button
          type="button"
          onClick={apply}
          disabled={busy}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {busy ? "Working…" : "Apply page numbers"}
        </button>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Numbered PDF ready — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={`${baseName}-numbered.pdf`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
