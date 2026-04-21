"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

export function PdfToText() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [pages, setPages] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [perPage, setPerPage] = useState(true);

  async function extract(chosen: File) {
    setBusy(true);
    setErr(null);
    setText("");
    setPages(0);
    try {
      // Lazy-load pdf.js only when extraction runs — keeps the initial
      // tool chunk tiny.
      const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.js");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
      const buf = await chosen.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      setPages(doc.numPages);
      const chunks: string[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((it: any) => (typeof it.str === "string" ? it.str : ""))
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
        chunks.push(perPage ? `--- Page ${i} ---\n${pageText}` : pageText);
        // Yield to the event loop so the UI updates.
        await new Promise((r) => setTimeout(r, 0));
      }
      setText(chunks.join("\n\n"));
    } catch (e: any) {
      setErr(e?.message || "Couldn't read the PDF. It may be scanned (image-only) or password-protected.");
    } finally {
      setBusy(false);
    }
  }

  function onPick(f: File) {
    setFile(f);
    extract(f);
  }

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={onPick} accept="application/pdf,.pdf" hint="PDF file with real text (not a scan)." />

      {busy && <p className="text-sm text-slate-600">Reading PDF…</p>}
      {err && <p className="text-sm text-rose-600">{err}</p>}

      {text && (
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
              Text output · {pages} page{pages === 1 ? "" : "s"} · {fmtBytes(new Blob([text]).size)}
            </p>
            <div className="flex gap-2 items-center">
              <label className="text-xs flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={perPage}
                  onChange={(e) => {
                    setPerPage(e.target.checked);
                    if (file) extract(file);
                  }}
                />
                Page markers
              </label>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(text)}
                className="text-xs font-medium text-brand hover:underline"
              >
                Copy
              </button>
              <a
                href={URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }))}
                download={(file?.name || "document").replace(/\.pdf$/i, "") + ".txt"}
                className="text-xs font-medium text-brand hover:underline"
              >
                Download .txt
              </a>
            </div>
          </div>
          <textarea
            value={text}
            readOnly
            rows={14}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm"
          />
        </div>
      )}

      <p className="text-xs text-slate-500">
        This extracts real text embedded in the PDF. Scanned documents
        (images of text) need OCR — this tool can&rsquo;t read them.
      </p>
    </div>
  );
}
