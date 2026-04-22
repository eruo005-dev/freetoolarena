"use client";

import { useEffect, useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type PageCard = {
  id: string;
  index: number; // original 0-based page index
  rotation: 0 | 90 | 180 | 270;
  thumbUrl: string;
};

export function PdfOrganizer() {
  const [file, setFile] = useState<File | null>(null);
  const [cards, setCards] = useState<PageCard[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      cards.forEach((c) => URL.revokeObjectURL(c.thumbUrl));
      if (outUrl) URL.revokeObjectURL(outUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onPick(f: File) {
    cards.forEach((c) => URL.revokeObjectURL(c.thumbUrl));
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(null);
    setOutSize(null);
    setCards([]);
    setFile(f);
    setErr(null);
    setLoading(true);
    try {
      const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.js");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
      const buf = await f.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const total = doc.numPages;
      const out: PageCard[] = [];
      for (let i = 1; i <= total; i++) {
        const page = await doc.getPage(i);
        const vp = page.getViewport({ scale: 0.3 });
        const w = Math.min(180, Math.ceil(vp.width));
        const ratio = w / vp.width;
        const h = Math.ceil(vp.height * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        await page.render({
          canvasContext: ctx,
          viewport: page.getViewport({ scale: 0.3 * ratio }),
        }).promise;
        const blob: Blob | null = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png"),
        );
        if (blob) {
          out.push({
            id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36),
            index: i - 1,
            rotation: 0,
            thumbUrl: URL.createObjectURL(blob),
          });
        }
        await new Promise((r) => setTimeout(r, 0));
      }
      setCards(out);
    } catch (e: any) {
      const msg = (e?.message || "") as string;
      if (/encrypt/i.test(msg)) {
        setErr("This PDF is password-protected. Unlock it first, then try again.");
      } else {
        setErr(msg || "Could not render thumbnails.");
      }
    } finally {
      setLoading(false);
    }
  }

  function move(id: string, dir: -1 | 1) {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx < 0) return prev;
      const next = idx + dir;
      if (next < 0 || next >= prev.length) return prev;
      const copy = prev.slice();
      [copy[idx], copy[next]] = [copy[next], copy[idx]];
      return copy;
    });
  }

  function remove(id: string) {
    setCards((prev) => {
      const removed = prev.find((c) => c.id === id);
      if (removed) URL.revokeObjectURL(removed.thumbUrl);
      return prev.filter((c) => c.id !== id);
    });
  }

  function rotate(id: string) {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, rotation: (((c.rotation + 90) % 360) as 0 | 90 | 180 | 270) }
          : c,
      ),
    );
  }

  async function save() {
    if (!file || cards.length === 0) return;
    setBusy(true);
    setErr(null);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const src = await PDFDocument.load(bytes, { ignoreEncryption: false });
      const out = await PDFDocument.create();
      const copied = await out.copyPages(
        src,
        cards.map((c) => c.index),
      );
      copied.forEach((p, i) => {
        const rot = cards[i].rotation;
        if (rot) p.setRotation(degrees(rot));
        out.addPage(p);
      });
      const b = await out.save();
      const blob = new Blob([b], { type: "application/pdf" });
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
        hint="Reorder, rotate, or delete pages."
      />

      {loading && <p className="text-sm text-slate-600">Rendering thumbnails…</p>}
      {err && <p className="text-sm text-rose-600">{err}</p>}

      {cards.length > 0 && (
        <>
          <p className="text-sm text-slate-600">
            {cards.length} page{cards.length === 1 ? "" : "s"} in output
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cards.map((c, i) => (
              <div
                key={c.id}
                className="rounded-xl border border-slate-200 bg-white p-2 space-y-2"
              >
                <div className="flex items-center justify-center bg-slate-50 rounded h-40 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.thumbUrl}
                    alt={`Page ${c.index + 1}`}
                    style={{ transform: `rotate(${c.rotation}deg)` }}
                    className="max-h-full max-w-full transition-transform"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>#{i + 1} (orig {c.index + 1})</span>
                  <span>{c.rotation}°</span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-sm">
                  <button
                    type="button"
                    onClick={() => move(c.id, -1)}
                    disabled={i === 0}
                    className="rounded-md border border-slate-300 bg-white px-1 py-1 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(c.id, 1)}
                    disabled={i === cards.length - 1}
                    className="rounded-md border border-slate-300 bg-white px-1 py-1 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => rotate(c.id)}
                    className="rounded-md border border-slate-300 bg-white px-1 py-1 text-slate-700 hover:bg-slate-50"
                    aria-label="Rotate"
                  >
                    ⟳
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(c.id)}
                    className="rounded-md border border-rose-200 bg-white px-1 py-1 text-rose-600 hover:bg-rose-50"
                    aria-label="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={save}
            disabled={busy || cards.length === 0}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Working…" : "Save reorganized PDF"}
          </button>
        </>
      )}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Reorganized PDF ready — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={`${baseName}-organized.pdf`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
