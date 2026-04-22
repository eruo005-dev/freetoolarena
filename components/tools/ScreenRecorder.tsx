"use client";

import { useEffect, useRef, useState } from "react";

export function ScreenRecorder() {
  const [recording, setRecording] = useState(false);
  const [outUrl, setOutUrl] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [err, setErr] = useState("");
  const [withMic, setWithMic] = useState(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  async function start() {
    setErr("");
    setOutUrl("");
    try {
      const screen = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 30 } as any, audio: true });
      let combined = screen;
      if (withMic) {
        try {
          const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
          const tracks = [...screen.getVideoTracks(), ...mic.getAudioTracks(), ...screen.getAudioTracks()];
          combined = new MediaStream(tracks);
        } catch { /* fall back to screen only */ }
      }
      streamRef.current = combined;
      const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus") ? "video/webm;codecs=vp9,opus" : "video/webm";
      const rec = new MediaRecorder(combined, { mimeType: mime });
      chunksRef.current = [];
      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = () => {
        setOutUrl(URL.createObjectURL(new Blob(chunksRef.current, { type: mime })));
        combined.getTracks().forEach((t) => t.stop());
      };
      combined.getVideoTracks()[0].onended = () => stop();
      rec.start(250);
      recRef.current = rec;
      setRecording(true);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } catch (e: any) {
      setErr(e?.message ?? "Screen capture denied.");
    }
  }

  function stop() {
    recRef.current?.stop();
    clearInterval(timerRef.current);
    setRecording(false);
  }

  function download() {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `screen-${Date.now()}.webm`;
    a.click();
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="space-y-5">
      {err && <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm p-3">{err}</div>}

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={withMic} onChange={(e) => setWithMic(e.target.checked)} disabled={recording} className="accent-brand" />
        Also record microphone (voiceover)
      </label>

      <div className="rounded-xl bg-slate-50 p-6 flex flex-col items-center gap-3">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${recording ? "bg-red-500 animate-pulse" : "bg-slate-400"}`}>⬤</div>
        <div className="font-mono text-xl tabular-nums">{mm}:{ss}</div>
        {!recording ? (
          <button onClick={start} className="bg-brand text-white font-semibold rounded-lg px-6 py-2 hover:bg-brand-dark">Start recording</button>
        ) : (
          <button onClick={stop} className="bg-red-500 text-white font-semibold rounded-lg px-6 py-2 hover:bg-red-600">Stop</button>
        )}
        <p className="text-xs text-slate-500">Choose a screen, window, or browser tab in the permission prompt.</p>
      </div>

      {outUrl && (
        <div className="rounded-xl bg-slate-50 p-4 space-y-3">
          <video src={outUrl} controls className="w-full max-h-80 rounded-lg border border-slate-200 bg-black" />
          <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Download .webm</button>
        </div>
      )}
    </div>
  );
}
