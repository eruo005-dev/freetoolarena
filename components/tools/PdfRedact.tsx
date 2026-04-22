"use client";

import { useEffect, useRef, useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Rect = { pageIndex: number; x: number; y: number; w: number; h: number };

export function PdfRedact() {
  const [file, setFile] = useState<File | null>(null);
  const [rects, setRects] = useState<Rect[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);
  const [pageImg, setPageImg] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<{ w: number; h: number } | null>(null);
  const [numPages, setNumPages] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!file) return;
    (async () => {
      try {
        const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.js");
        pdfjs.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        const buf = await file.arrayBuffer();
        const doc = await pdfjs.getDocument({ data: buf }).promise;
        setNumPages(doc.numPages);
        const page = await doc.getPage(pageIndex + 1);
        const vp = page.getViewport({ scale: 1.5 });
        const c = document.createElement("canvas");
        c.width = Math.ceil(vp.width);
        c.height = Math.ceil(vp.height);
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, c.width, c.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        const blob: Blob = await new Promise((r) =>
          c.toBlob((b) => r(b as Blob), "image/png"),
        );
        setPageImg(URL.createObjectURL(blob));
        setPageSize({ w: c.width, h: c.height });
      } catch (e: any) {
        setErr(e?.message || "Failed to render page.");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, pageIndex]);

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    dragStart.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function onMouseUp(e: React.MouseEvent<HTMLDivElement>) {
    const start = dragStart.current;
    dragStart.current = null;
    if (!start || !pageSize) return;
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const end = { x: e.clientX - r.left, y: e.clientY - r.top };
    const x = Math.min(start.x, end.x) / r.width;
    const y = Math.min(start.y, end.y) / r.height;
    const w = Math.abs(end.x - start.x) / r.width;
    const h = Math.abs(end.y - start.y) / r.height;
    if (w < 0.005 || h < 0.005) return;
    setRects((prev) => [...prev, { pageIndex, x, y, w, h }]);
  }

  function removeRect(i: number) {
    setRects((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function run() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const { PDFDocument, rgb } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes);
      const pages = doc.getPages();
      for (const r of rects) {
        const p = pages[r.pageIndex];
        if (!p) continue;
        const { width, height } = p.getSize();
        p.drawRectangle({
          x: r.x * width,
          y: height - r.y * height - r.h * height,
          width: r.w * width,
          height: r.h * height,
          color: rgb(0, 0, 0),
        });
      }
      const b = await doc.save();
      const blob = new Blob([b], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      setErr(e?.message || "Redact failed.");
    } finally {
      setBusy(false);
    }
  }

  const baseName = (file?.name || "document").replace(/\.pdf$/i, "");
  const rectsOnPage = rects
    .map((r, i) => ({ ...r, i }))
    .filter((r) => r.pageIndex === pageIndex);

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="application/pdf,.pdf" hint="Click and drag to draw black redaction bars." />
      {numPages > 1 && (
        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 hover:bg-slate-50"
          >
            ← Prev
          </button>
          <span>Page {pageIndex + 1} of {numPages}</span>
          <button
            type="button"
            onClick={() => setPageIndex((p) => Math.min(numPages - 1, p + 1))}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 hover:bg-slate-50"
          >
            Next →
          </button>
        </div>
      )}
      {pageImg && (
        <div
          className="relative border border-slate-300 select-none"
          style={{ aspectRatio: pageSize ? `${pageSize.w} / ${pageSize.h}` : undefined }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pageImg} alt="page" className="block w-full h-full" draggable={false} />
          {rectsOnPage.map((r) => (
            <div
              key={r.i}
              className="absolute bg-black/90 ring-1 ring-rose-300"
              style={{
                left: `${r.x * 100}%`,
                top: `${r.y * 100}%`,
                width: `${r.w * 100}%`,
                height: `${r.h * 100}%`,
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                removeRect(r.i);
              }}
              title="Double-click to remove"
            />
          ))}
        </div>
      )}
      <p className="text-xs text-slate-500">
        {rects.length} redaction{rects.length === 1 ? "" : "s"} across all pages. Double-click a bar to remove it.
      </p>
      <button
        type="button"
        onClick={run}
        disabled={!file || busy || rects.length === 0}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Redacting…" : "Apply redactions"}
      </button>
      {err && <p className="text-sm text-rose-600">{err}</p>}
      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Redacted PDF — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={`${baseName}-redacted.pdf`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
