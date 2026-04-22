"use client";

import { useRef, useState } from "react";

export function VideoToGif() {
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  const [fps, setFps] = useState(15);
  const [width, setWidth] = useState(400);
  const [outUrl, setOutUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUrl(URL.createObjectURL(f));
    setOutUrl("");
  }

  function onLoadedMetadata() {
    const v = videoRef.current!;
    setDuration(v.duration);
    setStart(0);
    setEnd(Math.min(3, v.duration));
  }

  async function convert() {
    const v = videoRef.current;
    if (!v) return;
    setBusy(true);
    setProgress(0);
    try {
      const canvas = document.createElement("canvas");
      const ratio = width / v.videoWidth;
      canvas.width = width;
      canvas.height = Math.round(v.videoHeight * ratio);
      const ctx = canvas.getContext("2d")!;
      // @ts-ignore
      const stream = canvas.captureStream(fps);
      const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm";
      const rec = new MediaRecorder(stream, { mimeType: mime });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      const done = new Promise<void>((r) => { rec.onstop = () => r(); });

      v.currentTime = start;
      await new Promise<void>((r) => { v.onseeked = () => r(); });

      rec.start();
      const frameMs = 1000 / fps;
      const total = end - start;
      const t0 = performance.now();
      await new Promise<void>((r) => {
        const tick = setInterval(() => {
          ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
          const elapsed = (performance.now() - t0) / 1000;
          setProgress(Math.min(99, Math.round((elapsed / total) * 100)));
          if (elapsed >= total) {
            clearInterval(tick);
            rec.stop();
            r();
          } else {
            v.currentTime = start + elapsed;
          }
        }, frameMs);
      });
      await done;
      setOutUrl(URL.createObjectURL(new Blob(chunks, { type: mime })));
      setProgress(100);
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `loop-${Date.now()}.webm`;
    a.click();
  }

  return (
    <div className="space-y-5">
      <input type="file" accept="video/*" onChange={onFile} disabled={busy} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {url && (
        <>
          <video ref={videoRef} src={url} controls muted onLoadedMetadata={onLoadedMetadata} className="w-full max-h-72 rounded-lg border border-slate-200 bg-black" />

          {duration > 0 && (
            <div className="rounded-xl bg-slate-50 p-4 space-y-3 text-sm">
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="block">
                  <div className="flex justify-between"><span>Start (s)</span><span className="tabular-nums">{start.toFixed(1)}</span></div>
                  <input type="range" min={0} max={duration} step={0.1} value={start} onChange={(e) => setStart(parseFloat(e.target.value))} className="w-full accent-brand" />
                </label>
                <label className="block">
                  <div className="flex justify-between"><span>End (s)</span><span className="tabular-nums">{end.toFixed(1)}</span></div>
                  <input type="range" min={0} max={duration} step={0.1} value={end} onChange={(e) => setEnd(parseFloat(e.target.value))} className="w-full accent-brand" />
                </label>
                <label className="block">
                  <div className="flex justify-between"><span>FPS</span><span className="tabular-nums">{fps}</span></div>
                  <input type="range" min={5} max={30} step={1} value={fps} onChange={(e) => setFps(parseInt(e.target.value))} className="w-full accent-brand" />
                </label>
                <label className="block">
                  <div className="flex justify-between"><span>Width (px)</span><span className="tabular-nums">{width}</span></div>
                  <input type="range" min={160} max={800} step={10} value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="w-full accent-brand" />
                </label>
              </div>
              <button onClick={convert} disabled={busy || end <= start} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark disabled:opacity-50">
                {busy ? `Rendering… ${progress}%` : "Convert to looping clip"}
              </button>
              <p className="text-xs text-slate-500">Outputs WebM — modern GIF replacement: smaller file, higher quality, supported everywhere except email. Drag the .webm into Twitter/X, Slack, Notion, or Discord; they'll auto-loop like a GIF.</p>
            </div>
          )}
        </>
      )}

      {outUrl && (
        <div className="rounded-xl bg-slate-50 p-4 space-y-3">
          <video src={outUrl} autoPlay loop muted controls className="max-w-full rounded-lg border border-slate-200 bg-black" />
          <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Download .webm</button>
        </div>
      )}
    </div>
  );
}
