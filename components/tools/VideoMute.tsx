"use client";

import { useRef, useState } from "react";

export function VideoMute() {
  const [url, setUrl] = useState("");
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

  async function mute() {
    const v = videoRef.current;
    if (!v) return;
    setBusy(true);
    setProgress(0);
    try {
      // @ts-ignore
      const full = v.captureStream ? v.captureStream() : v.mozCaptureStream();
      // Keep only video tracks → muted output
      const videoOnly = new MediaStream(full.getVideoTracks());
      const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm";
      const rec = new MediaRecorder(videoOnly, { mimeType: mime });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      const done = new Promise<void>((r) => { rec.onstop = () => r(); });

      v.muted = true;
      v.currentTime = 0;
      await new Promise<void>((r) => { v.onseeked = () => r(); });
      rec.start();
      await v.play();

      const total = v.duration * 1000;
      const t0 = performance.now();
      const tick = setInterval(() => {
        const elapsed = performance.now() - t0;
        setProgress(Math.min(99, Math.round((elapsed / total) * 100)));
        if (v.currentTime >= v.duration - 0.05) {
          clearInterval(tick);
          v.pause();
          rec.stop();
        }
      }, 100);

      await done;
      setOutUrl(URL.createObjectURL(new Blob(chunks, { type: mime })));
      setProgress(100);
    } finally { setBusy(false); }
  }

  function download() {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `muted-${Date.now()}.webm`;
    a.click();
  }

  return (
    <div className="space-y-5">
      <input type="file" accept="video/*" onChange={onFile} disabled={busy} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {url && (
        <>
          <video ref={videoRef} src={url} controls className="w-full max-h-72 rounded-lg border border-slate-200 bg-black" />
          <button onClick={mute} disabled={busy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark disabled:opacity-50">
            {busy ? `Rendering silent track… ${progress}%` : "Strip audio"}
          </button>
        </>
      )}

      {outUrl && (
        <div className="rounded-xl bg-slate-50 p-4 space-y-3">
          <video src={outUrl} controls className="w-full max-h-72 rounded-lg border border-slate-200 bg-black" />
          <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Download muted video</button>
        </div>
      )}
      <p className="text-xs text-slate-500">Re-encodes video to WebM with no audio track. Runs fully in-browser via MediaRecorder.</p>
    </div>
  );
}
