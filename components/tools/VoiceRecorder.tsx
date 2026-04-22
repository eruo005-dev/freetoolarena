"use client";

import { useEffect, useRef, useState } from "react";

export function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [url, setUrl] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [err, setErr] = useState("");
  const [mime, setMime] = useState("");
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
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
      const picked = candidates.find((m) => MediaRecorder.isTypeSupported(m)) ?? "";
      setMime(picked || "audio/webm");
      const rec = new MediaRecorder(stream, picked ? { mimeType: picked } : undefined);
      chunksRef.current = [];
      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: picked || "audio/webm" });
        setUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start(250);
      recRef.current = rec;
      setRecording(true);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } catch (e: any) {
      setErr(e?.message ?? "Microphone access denied.");
    }
  }

  function stop() {
    recRef.current?.stop();
    clearInterval(timerRef.current);
    setRecording(false);
  }

  function download() {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    const ext = mime.includes("mp4") ? "m4a" : mime.includes("ogg") ? "ogg" : "webm";
    a.download = `recording-${Date.now()}.${ext}`;
    a.click();
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="space-y-5">
      {err && <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm p-3">{err}</div>}

      <div className="rounded-xl bg-slate-50 p-6 flex flex-col items-center gap-4">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl ${recording ? "bg-red-500 animate-pulse" : "bg-slate-400"}`}>●</div>
        <div className="font-mono text-2xl tabular-nums">{mm}:{ss}</div>
        {!recording ? (
          <button onClick={start} className="bg-brand text-white font-semibold rounded-lg px-6 py-2 hover:bg-brand-dark">Start recording</button>
        ) : (
          <button onClick={stop} className="bg-red-500 text-white font-semibold rounded-lg px-6 py-2 hover:bg-red-600">Stop</button>
        )}
      </div>

      {url && (
        <div className="rounded-xl bg-slate-50 p-4 space-y-3">
          <audio src={url} controls className="w-full" />
          <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Download</button>
        </div>
      )}
    </div>
  );
}
