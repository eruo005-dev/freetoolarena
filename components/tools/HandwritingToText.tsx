"use client";

import { useState } from "react";

export function HandwritingToText() {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    setText("");
    setProgress(0);
    setStage("loading engine");
    try {
      const Tess = (await import("tesseract.js")).default as any;
      const worker = await Tess.createWorker("eng", 1, {
        logger: (m: any) => {
          setStage(m.status || "");
          if (typeof m.progress === "number") setProgress(Math.round(m.progress * 100));
        },
      });
      // Tweak params for handwriting: looser whitelist, assume single block
      await worker.setParameters({ tessedit_pageseg_mode: "6" });
      const { data } = await worker.recognize(f);
      setText(data.text);
      await worker.terminate();
    } catch (err: any) {
      setText(`Error: ${err?.message ?? err}`);
    } finally {
      setBusy(false);
      setStage("");
    }
  }

  function copy() {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm p-3">
        Handwriting recognition is harder than printed text. Best results: dark ink, plain light paper, straight horizontal lines, high-resolution photo, good lighting.
      </div>

      <input type="file" accept="image/*" onChange={onFile} disabled={busy} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark disabled:opacity-50" />

      {busy && (
        <div className="rounded-xl bg-slate-50 p-4 text-sm">
          <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{stage}</span><span>{progress}%</span></div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-brand transition-all" style={{ width: `${progress}%` }} /></div>
        </div>
      )}

      {text && (
        <>
          <textarea readOnly value={text} rows={14} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50" />
          <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">{copied ? "Copied" : "Copy text"}</button>
        </>
      )}

      <p className="text-xs text-slate-500">Uses Tesseract with a page-layout mode tuned for single blocks of handwritten text. Runs fully in your browser.</p>
    </div>
  );
}
