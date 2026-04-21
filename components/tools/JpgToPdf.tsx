"use client";

import { useState } from "react";
import { FileDrop, fmtBytes, loadImage } from "./ImageFormatConverter";

type Item = { id: string; file: File; url: string; width: number; height: number };

type PageSize = "fit" | "a4" | "letter" | "square";
type Orient = "auto" | "portrait" | "landscape";

const PX_PER_INCH = 72;
const SIZES: Record<Exclude<PageSize, "fit">, [number, number]> = {
  a4: [8.27 * PX_PER_INCH, 11.69 * PX_PER_INCH],
  letter: [8.5 * PX_PER_INCH, 11 * PX_PER_INCH],
  square: [8 * PX_PER_INCH, 8 * PX_PER_INCH],
};

export function JpgToPdf() {
  const [items, setItems] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("fit");
  const [orient, setOrient] = useState<Orient>("auto");
  const [margin, setMargin] = useState(12);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);

  async function onFiles(files: File[]) {
    const added: Item[] = [];
    for (const f of files) {
      try {
        const img = await loadImage(f);
        added.push({
          id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36),
          file: f,
          url: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      } catch {
        /* skip invalid */
      }
    }
    setItems((prev) => [...prev, ...added]);
  }

  function move(id: string, dir: -1 | 1) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx < 0) return prev;
      const next = idx + dir;
      if (next < 0 || next >= prev.length) return prev;
      const copy = prev.slice();
      [copy[idx], copy[next]] = [copy[next], copy[idx]];
      return copy;
    });
  }
  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function build() {
    if (!items.length) return;
    setBusy(true);
    setErr(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      for (const item of items) {
        const bytes = new Uint8Array(await item.file.arrayBuffer());
        const isPng = item.file.type === "image/png" || /\.png$/i.test(item.file.name);
        const embedded = isPng
          ? await doc.embedPng(bytes)
          : await doc.embedJpg(bytes);
        let pageW: number, pageH: number;
        if (pageSize === "fit") {
          pageW = embedded.width + margin * 2;
          pageH = embedded.height + margin * 2;
        } else {
          const [sw, sh] = SIZES[pageSize];
          const useLandscape =
            orient === "landscape" ||
            (orient === "auto" && embedded.width > embedded.height);
          pageW = useLandscape ? sh : sw;
          pageH = useLandscape ? sw : sh;
        }
        const page = doc.addPage([pageW, pageH]);
        if (pageSize === "fit") {
          page.drawImage(embedded, {
            x: margin,
            y: margin,
            width: embedded.width,
            height: embedded.height,
          });
        } else {
          const availW = pageW - margin * 2;
          const availH = pageH - margin * 2;
          const r = Math.min(availW / embedded.width, availH / embedded.height);
          const dw = embedded.width * r;
          const dh = embedded.height * r;
          page.drawImage(embedded, {
            x: (pageW - dw) / 2,
            y: (pageH - dh) / 2,
            width: dw,
            height: dh,
          });
        }
      }
      const bytes = await doc.save();
      if (outUrl) URL.revokeObjectURL(outUrl);
      const blob = new Blob([bytes], { type: "application/pdf" });
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e?.message || "Couldn't build the PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <FileDrop
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        multiple
        onFiles={onFiles}
        hint="Drop multiple JPG, PNG, or WebP. They'll go into the PDF in order."
      />

      {items.length > 0 && (
        <>
          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {items.map((it, i) => (
              <li key={it.id} className="flex items-center gap-3 p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.url} alt="" className="h-12 w-12 object-cover rounded border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{it.file.name}</p>
                  <p className="text-xs text-slate-500">
                    {it.width}×{it.height}px · {fmtBytes(it.file.size)}
                  </p>
                </div>
                <div className="flex gap-1 text-sm">
                  <button
                    type="button"
                    onClick={() => move(it.id, -1)}
                    disabled={i === 0}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(it.id, 1)}
                    disabled={i === items.length - 1}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(it.id)}
                    className="rounded-md border border-rose-200 bg-white px-2 py-1 text-rose-600 hover:bg-rose-50"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="grid sm:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Page size
              </span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as PageSize)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="fit">Fit to image</option>
                <option value="a4">A4</option>
                <option value="letter">Letter (US)</option>
                <option value="square">Square 8×8 in</option>
              </select>
            </label>
            {pageSize !== "fit" && (
              <label className="block">
                <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                  Orientation
                </span>
                <select
                  value={orient}
                  onChange={(e) => setOrient(e.target.value as Orient)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="auto">Auto</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </label>
            )}
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Margin · {margin}pt
              </span>
              <input
                type="range"
                min={0}
                max={72}
                step={2}
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={build}
            disabled={busy}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Building PDF…" : `Build PDF (${items.length} page${items.length === 1 ? "" : "s"})`}
          </button>
        </>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Ready — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download="images.pdf"
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
