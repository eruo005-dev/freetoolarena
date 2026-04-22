"use client";

import { useEffect, useRef, useState } from "react";

export function VideoTrimmer() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [outUrl, setOutUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setUrl(URL.createObjectURL(f));
    setOutUrl("");
  }

  function onLoadedMetadata() {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
    setStart(0);
    setEnd(v.duration);
  }

  async function trim() {
    const v = videoRef.current;
    if (!v) return;
    setBusy(true);
    setProgress(0);
    try {
      v.muted = false;
      // @ts-ignore
      const vStream = v.captureStream ? v.captureStream() : v.mozCaptureStream();
      const candidates = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm", "video/mp4"];
      const mime = candidates.find((m) => MediaRecorder.isTypeSupported(m)) ?? "video/webm";
      const rec = new MediaRecorder(vStream, { mimeType: mime });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      const stopPromise = new Promise<void>((r) => { rec.onstop = () => r(); });

      v.currentTime = start;
      await new Promise<void>((r) => { v.onseeked = () => r(); });

      rec.start();
      await v.play();

      const dur = end - start;
      const total = dur * 1000;
      const t0 = performance.now();
      const tick = setInterval(() => {
        const elapsed = performance.now() - t0;
        setProgress(Math.min(99, Math.round((elapsed / total) * 100)));
        if (v.currentTime >= end) {
          clearInterval(tick);
          v.pause();
          rec.stop();
        }
      }, 100);

      await stopPromise;
      const blob = new Blob(chunks, { type: mime });
      setOutUrl(URL.createObjectURL(blob));
      setProgress(100);
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `trimmed-${Date.now()}.webm`;
    a.click();
  }

  const fmt = (n: number) => `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, "0")}`;

  return (
    <div className="space-y-5">
      <input type="file" accept="video/*" onChange={onFile} disabled={busy} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {url && (
        <>
          <video ref={videoRef} src={url} controls onLoadedMetadata={onLoadedMetadata} className="w-full max-h-80 rounded-lg border border-slate-200 bg-black" />
          {duration > 0 && (
            <div className="rounded-xl bg-slate-50 p-4 space-y-3 text-sm">
              <label className="block">
                <div className="flex justify-between"><span>Start: {fmt(start)}</span></div>
                <input type="range" min={0} max={duration} step={0.1} value={start} onChange={(e) => setStart(parseFloat(e.target.value))} className="w-full accent-brand" />
              </label>
              <label className="block">
                <div className="flex justify-between"><span>End: {fmt(end)}</span></div>
                <input type="range" min={0} max={duration} step={0.1} value={end} onChange={(e) => setEnd(parseFloat(e.target.value))} className="w-full accent-brand" />
              </label>
              <button onClick={trim} disabled={busy || end <= start} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark disabled:opacity-50">
                {busy ? `Re-recording… ${progress}%` : "Trim to selection"}
              </button>
              <p className="text-xs text-slate-500">Browser trimming re-encodes to WebM using the canvas/stream pipeline. Takes roughly as long as the clip.</p>
            </div>
          )}
        </>
      )}

      {outUrl && (
        <div className="rounded-xl bg-slate-50 p-4 space-y-3">
          <video src={outUrl} controls className="w-full max-h-80 rounded-lg border border-slate-200 bg-black" />
          <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Download WebM</button>
        </div>
      )}
    </div>
  );
}
