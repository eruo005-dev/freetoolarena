"use client";

import { useRef, useState } from "react";

export function VideoFrameExtractor() {
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(6);
  const [frames, setFrames] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUrl(URL.createObjectURL(f));
    setFrames([]);
  }

  function onLoadedMetadata() {
    const v = videoRef.current!;
    setDuration(v.duration);
    setTime(0);
  }

  async function grab(t: number): Promise<string> {
    const v = videoRef.current!;
    return new Promise((resolve) => {
      const onSeek = () => {
        const c = document.createElement("canvas");
        c.width = v.videoWidth;
        c.height = v.videoHeight;
        c.getContext("2d")!.drawImage(v, 0, 0);
        v.removeEventListener("seeked", onSeek);
        c.toBlob((b) => resolve(URL.createObjectURL(b!)), "image/png");
      };
      v.addEventListener("seeked", onSeek);
      v.currentTime = t;
    });
  }

  async function grabSingle() {
    setBusy(true);
    try {
      const u = await grab(time);
      setFrames([u]);
    } finally { setBusy(false); }
  }

  async function grabEvenly() {
    setBusy(true);
    try {
      const out: string[] = [];
      for (let i = 0; i < count; i++) {
        const t = (duration / (count + 1)) * (i + 1);
        out.push(await grab(t));
      }
      setFrames(out);
    } finally { setBusy(false); }
  }

  function downloadOne(u: string, i: number) {
    const a = document.createElement("a");
    a.href = u;
    a.download = `frame-${i + 1}.png`;
    a.click();
  }

  return (
    <div className="space-y-5">
      <input type="file" accept="video/*" onChange={onFile} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {url && (
        <>
          <video ref={videoRef} src={url} controls onLoadedMetadata={onLoadedMetadata} className="w-full max-h-72 rounded-lg border border-slate-200 bg-black" />
          {duration > 0 && (
            <div className="rounded-xl bg-slate-50 p-4 space-y-3 text-sm">
              <div>
                <label className="block">
                  <div className="flex justify-between"><span>Scrub to time (s)</span><span className="tabular-nums">{time.toFixed(2)}</span></div>
                  <input type="range" min={0} max={duration} step={0.01} value={time} onChange={(e) => setTime(parseFloat(e.target.value))} className="w-full accent-brand" />
                </label>
                <button onClick={grabSingle} disabled={busy} className="mt-2 bg-slate-900 text-white text-sm font-semibold rounded-lg px-3 py-2 hover:bg-slate-800">Grab this frame</button>
              </div>
              <div className="border-t border-slate-200 pt-3 flex items-center gap-3">
                <label className="flex items-center gap-2">
                  Frames
                  <select value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="rounded-lg border border-slate-300 px-2 py-1">
                    <option value={4}>4</option><option value={6}>6</option><option value={8}>8</option><option value={12}>12</option><option value={16}>16</option>
                  </select>
                </label>
                <button onClick={grabEvenly} disabled={busy} className="bg-brand text-white text-sm font-semibold rounded-lg px-3 py-2 hover:bg-brand-dark">
                  Grab {count} evenly spaced
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {frames.length > 0 && (
        <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-3">
          {frames.map((f, i) => (
            <div key={i} className="rounded-lg bg-slate-50 p-2">
              <img src={f} alt={`Frame ${i + 1}`} className="w-full rounded-md" />
              <button onClick={() => downloadOne(f, i)} className="mt-2 w-full bg-brand text-white text-xs font-semibold rounded-lg px-2 py-1 hover:bg-brand-dark">Download PNG</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
