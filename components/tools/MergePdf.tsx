"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Item = { id: string; file: File; pages?: number };

export function MergePdf() {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);

  async function onFiles(files: File[]) {
    const added = files
      .filter((f) => f.type === "application/pdf" || /\.pdf$/i.test(f.name))
      .map((f) => ({
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36),
        file: f,
      }));
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
  function clear() {
    setItems([]);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(null);
    setOutSize(null);
  }

  async function merge() {
    if (items.length < 2) {
      setErr("Add at least two PDFs to merge.");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      const updatedItems = [...items];
      for (let i = 0; i < updatedItems.length; i++) {
        const it = updatedItems[i];
        const bytes = new Uint8Array(await it.file.arrayBuffer());
        const src = await PDFDocument.load(bytes, { ignoreEncryption: false });
        updatedItems[i] = { ...it, pages: src.getPageCount() };
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      setItems(updatedItems);
      const bytes = await out.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e: any) {
      const msg = (e?.message || "") as string;
      if (/encrypt/i.test(msg)) {
        setErr("One of the PDFs is password-protected. Unlock it first, then merge.");
      } else {
        setErr(msg || "Merge failed.");
      }
    } finally {
      setBusy(false);
    }
  }

  const totalSize = items.reduce((s, i) => s + i.file.size, 0);

  return (
    <div className="space-y-5">
      <FileDrop
        accept="application/pdf,.pdf"
        multiple
        onFiles={onFiles}
        hint="Drop multiple PDFs to merge. They'll join in the order shown below."
      />

      {items.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              {items.length} PDF{items.length === 1 ? "" : "s"} · {fmtBytes(totalSize)} total
            </p>
            <button
              type="button"
              onClick={clear}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Clear all
            </button>
          </div>

          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {items.map((it, i) => (
              <li key={it.id} className="flex items-center gap-3 p-3">
                <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand font-semibold text-sm">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{it.file.name}</p>
                  <p className="text-xs text-slate-500">
                    {fmtBytes(it.file.size)}
                    {it.pages !== undefined && ` · ${it.pages} page${it.pages === 1 ? "" : "s"}`}
                  </p>
                </div>
                <div className="flex gap-1 text-sm">
                  <button
                    type="button"
                    onClick={() => move(it.id, -1)}
                    disabled={i === 0}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(it.id, 1)}
                    disabled={i === items.length - 1}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Move down"
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

          <button
            type="button"
            onClick={merge}
            disabled={busy || items.length < 2}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          >
            {busy ? "Merging…" : `Merge ${items.length} PDFs`}
          </button>
        </>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Merged PDF ready — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download="merged.pdf"
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
