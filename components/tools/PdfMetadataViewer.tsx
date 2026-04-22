"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Meta = {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  creator: string;
  producer: string;
  creationDate: string;
  modificationDate: string;
  pageCount: number;
  fileSize: number;
};

export function PdfMetadataViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onPick(f: File) {
    setFile(f);
    setErr(null);
    setMeta(null);
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await f.arrayBuffer());
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: false });
      const kw = doc.getKeywords();
      const kwStr = Array.isArray(kw) ? kw.join(", ") : kw || "";
      const cd = doc.getCreationDate();
      const md = doc.getModificationDate();
      setMeta({
        title: doc.getTitle() || "",
        author: doc.getAuthor() || "",
        subject: doc.getSubject() || "",
        keywords: kwStr,
        creator: doc.getCreator() || "",
        producer: doc.getProducer() || "",
        creationDate: cd ? cd.toLocaleString() : "",
        modificationDate: md ? md.toLocaleString() : "",
        pageCount: doc.getPageCount(),
        fileSize: f.size,
      });
    } catch (e: any) {
      const msg = (e?.message || "") as string;
      if (/encrypt/i.test(msg)) {
        setErr("This PDF is password-protected. Unlock it first, then try again.");
      } else {
        setErr(msg || "Could not read PDF metadata.");
      }
    } finally {
      setBusy(false);
    }
  }

  const rows: Array<[string, string]> = meta
    ? [
        ["Title", meta.title],
        ["Author", meta.author],
        ["Subject", meta.subject],
        ["Keywords", meta.keywords],
        ["Creator", meta.creator],
        ["Producer", meta.producer],
        ["Creation date", meta.creationDate],
        ["Modification date", meta.modificationDate],
        ["Page count", String(meta.pageCount)],
        ["File size", fmtBytes(meta.fileSize)],
      ]
    : [];

  return (
    <div className="space-y-5">
      <FileDrop
        file={file}
        onFile={onPick}
        accept="application/pdf,.pdf"
        hint="Drop a PDF to inspect its metadata."
      />

      {busy && <p className="text-sm text-slate-600">Reading metadata…</p>}
      {err && <p className="text-sm text-rose-600">{err}</p>}

      {meta && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 divide-y divide-slate-200">
          {rows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-3 gap-3 px-4 py-3">
              <dt className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                {label}
              </dt>
              <dd className="col-span-2 text-sm text-slate-800 break-words">
                {value ? value : <span className="text-slate-400">—</span>}
              </dd>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
