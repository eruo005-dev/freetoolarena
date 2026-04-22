"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Cleared = {
  label: string;
  before: string;
};

export function PdfMetadataRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);
  const [cleared, setCleared] = useState<Cleared[]>([]);

  function onPick(f: File) {
    setFile(f);
    setErr(null);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(null);
    setOutSize(null);
    setCleared([]);
  }

  async function strip() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: false });

      const kw = doc.getKeywords();
      const before: Cleared[] = [
        { label: "Title", before: doc.getTitle() || "" },
        { label: "Author", before: doc.getAuthor() || "" },
        { label: "Subject", before: doc.getSubject() || "" },
        {
          label: "Keywords",
          before: Array.isArray(kw) ? kw.join(", ") : kw || "",
        },
        { label: "Creator", before: doc.getCreator() || "" },
        { label: "Producer", before: doc.getProducer() || "" },
        {
          label: "Creation date",
          before: doc.getCreationDate()?.toLocaleString() || "",
        },
        {
          label: "Modification date",
          before: doc.getModificationDate()?.toLocaleString() || "",
        },
      ];

      doc.setTitle("");
      doc.setAuthor("");
      doc.setSubject("");
      doc.setKeywords([]);
      doc.setProducer("");
      doc.setCreator("");
      doc.setCreationDate(new Date(0));
      doc.setModificationDate(new Date(0));

      const out = await doc.save();
      const blob = new Blob([out], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
      setCleared(before);
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
        hint="Drop a PDF to scrub its metadata."
      />

      {file && (
        <button
          type="button"
          onClick={strip}
          disabled={busy}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {busy ? "Working…" : "Strip metadata"}
        </button>
      )}

      {err && <p className="text-sm text-rose-600">{err}</p>}

      {cleared.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-200">
          <div className="grid grid-cols-3 gap-3 px-4 py-2 text-xs uppercase tracking-wide font-semibold text-slate-500">
            <span>Field</span>
            <span>Before</span>
            <span>After</span>
          </div>
          {cleared.map((c) => (
            <div key={c.label} className="grid grid-cols-3 gap-3 px-4 py-2 text-sm">
              <span className="font-medium text-slate-700">{c.label}</span>
              <span className="text-slate-600 break-words">
                {c.before || <span className="text-slate-400">—</span>}
              </span>
              <span className="text-slate-400">cleared</span>
            </div>
          ))}
        </div>
      )}

      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Stripped PDF ready — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={`${baseName}-stripped.pdf`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
