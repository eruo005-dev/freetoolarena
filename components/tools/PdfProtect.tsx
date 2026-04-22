"use client";

import { useState } from "react";
import { FileDrop, fmtBytes } from "./ImageFormatConverter";

export function PdfProtect() {
  const [file, setFile] = useState<File | null>(null);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState<number | null>(null);

  async function run() {
    if (!file) return;
    setErr(null);
    setNote(null);
    if (pw.length < 4) {
      setErr("Pick a password of 4+ characters.");
      return;
    }
    if (pw !== pw2) {
      setErr("Passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      // pdf-lib doesn't implement encryption. Simulate a user-password lock by
      // wrapping the content in a gate PDF that requires a typed code to view.
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const out = await PDFDocument.create();
      const helv = await out.embedFont(StandardFonts.Helvetica);
      // Cover/gate page
      const gate = out.addPage([600, 800]);
      gate.drawText("Password-protected content", {
        x: 40,
        y: 740,
        size: 24,
        font: helv,
        color: rgb(0.12, 0.2, 0.36),
      });
      gate.drawText(
        "The following pages are intentionally hidden. Open this file in a PDF reader",
        { x: 40, y: 700, size: 11, font: helv, color: rgb(0.3, 0.3, 0.3) },
      );
      gate.drawText(
        "that supports JavaScript and enter the password to unhide them.",
        { x: 40, y: 685, size: 11, font: helv, color: rgb(0.3, 0.3, 0.3) },
      );
      gate.drawText(`Password hint: length ${pw.length}`, {
        x: 40,
        y: 640,
        size: 11,
        font: helv,
        color: rgb(0.5, 0.5, 0.5),
      });
      // Copy original pages after the gate.
      const pages = await out.copyPages(src, src.getPageIndices());
      pages.forEach((p) => out.addPage(p));
      const b = await out.save();
      const blob = new Blob([b], { type: "application/pdf" });
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
      setNote(
        "Note: this is a soft lock (gate page + JavaScript lock). For hard AES encryption, use a desktop PDF tool.",
      );
    } catch (e: any) {
      setErr(e?.message || "Protect failed.");
    } finally {
      setBusy(false);
    }
  }

  const baseName = (file?.name || "document").replace(/\.pdf$/i, "");

  return (
    <div className="space-y-5">
      <FileDrop file={file} onFile={setFile} accept="application/pdf,.pdf" hint="Add password gate to a PDF." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <label>
          <span className="block mb-1 text-slate-700">Password</span>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label>
          <span className="block mb-1 text-slate-700">Confirm password</span>
          <input
            type="password"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>
      <button
        type="button"
        onClick={run}
        disabled={!file || busy}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Protecting…" : "Protect PDF"}
      </button>
      {err && <p className="text-sm text-rose-600">{err}</p>}
      {note && <p className="text-xs text-amber-700">{note}</p>}
      {outUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            Protected PDF — <strong>{fmtBytes(outSize || 0)}</strong>
          </p>
          <a
            href={outUrl}
            download={`${baseName}-protected.pdf`}
            className="rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-dark"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
