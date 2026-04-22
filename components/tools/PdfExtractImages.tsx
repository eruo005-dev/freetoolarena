"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

type Out = { name: string; url: string; size: number };

export function PdfExtractImages() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [items, setItems] = useState<Out[]>([]);

  async function run() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    items.forEach((i) => URL.revokeObjectURL(i.url));
    setItems([]);
    try {
      const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.js");
      pdfjs.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      const buf = await file.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const out: Out[] = [];
      let imgN = 0;
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const ops = await page.getOperatorList();
        const objs = page.objs;
        for (let j = 0; j < ops.fnArray.length; j++) {
          // 85 = paintImageXObject in pdfjs OPS enum
          if (ops.fnArray[j] === pdfjs.OPS.paintImageXObject) {
            const name = ops.argsArray[j][0];
            const img = await new Promise<any>((resolve) => {
              objs.get(name, (o: any) => resolve(o));
            });
            if (!img || !img.bitmap) continue;
            const c = document.createElement("canvas");
            c.width = img.width || img.bitmap.width;
            c.height = img.height || img.bitmap.height;
            const ctx = c.getContext("2d")!;
            try {
              ctx.drawImage(img.bitmap, 0, 0);
            } catch {
              continue;
            }
            const blob: Blob = await new Promise((r) =>
              c.toBlob((b) => r(b as Blob), "image/png"),
            );
            imgN += 1;
            out.push({
              name: `image-${String(imgN).padStart(3, "0")}.png`,
              url: URL.createObjectURL(blob),
              size: blob.size,
            });
          }
        }
      }
      if (out.length === 0) {
        setErr("No embedded images found. (Vector graphics aren't extracted.)");
      }
      setItems(out);
    } catch (e: any) {
      setErr(e?.message || "Extract failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="application/pdf,.pdf" hint="Extract embedded images from a PDF." />
      <button
        type="button"
        onClick={run}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Extracting…" : "Extract images"}
      </button>
      {err && <p className="text-sm text-rose-600">{err}</p>}
      {items.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <p className="text-sm text-slate-700">{items.length} image{items.length === 1 ? "" : "s"} extracted:</p>
          <ul className="space-y-1 text-sm">
            {items.map((i) => (
              <li key={i.name} className="flex items-center justify-between gap-2">
                <span className="truncate">{i.name} — {fmtBytes(i.size)}</span>
                <a
                  href={i.url}
                  download={i.name}
                  className="rounded-md border border-brand text-brand px-2 py-1 text-xs hover:bg-brand hover:text-white"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
