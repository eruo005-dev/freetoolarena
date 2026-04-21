"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Status = "idle" | "running" | "paused" | "done";

const PRESETS = [
  { label: "5m", seconds: 5 * 60 },
  { label: "10m", seconds: 10 * 60 },
  { label: "15m", seconds: 15 * 60 },
  { label: "25m", seconds: 25 * 60 },
  { label: "45m", seconds: 45 * 60 },
];

export function CountdownTimer() {
  const [minutes, setMinutes] = useState("10");
  const [seconds, setSeconds] = useState("0");
  const [remaining, setRemaining] = useState(10 * 60);
  const [status, setStatus] = useState<Status>("idle");
  const targetRef = useRef<number | null>(null);

  useEffect(() => {
    if (status !== "running") return;
    const id = window.setInterval(() => {
      if (targetRef.current == null) return;
      const left = Math.max(0, Math.round((targetRef.current - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) {
        setStatus("done");
        beep();
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [status]);

  const total = useMemo(() => {
    const m = Math.max(0, parseInt(minutes, 10) || 0);
    const s = Math.max(0, Math.min(59, parseInt(seconds, 10) || 0));
    return m * 60 + s;
  }, [minutes, seconds]);

  const start = useCallback(() => {
    if (total <= 0) return;
    const startFrom = status === "paused" ? remaining : total;
    targetRef.current = Date.now() + startFrom * 1000;
    setRemaining(startFrom);
    setStatus("running");
  }, [status, remaining, total]);

  function pause() {
    if (status !== "running") return;
    setStatus("paused");
  }

  function reset() {
    setStatus("idle");
    targetRef.current = null;
    setRemaining(total);
  }

  function applyPreset(s: number) {
    setMinutes(String(Math.floor(s / 60)));
    setSeconds(String(s % 60));
    setRemaining(s);
    setStatus("idle");
  }

  const mm = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const ss = (remaining % 60).toString().padStart(2, "0");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 text-center">
        <p className="text-6xl sm:text-7xl font-bold tabular-nums text-slate-900 mb-1">
          {mm}:{ss}
        </p>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {status === "running"
            ? "Running…"
            : status === "paused"
              ? "Paused"
              : status === "done"
                ? "Done"
                : "Ready"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Minutes</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={minutes}
            onChange={(e) => {
              setMinutes(e.target.value);
              if (status === "idle" || status === "done") setStatus("idle");
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Seconds</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={59}
            value={seconds}
            onChange={(e) => {
              setSeconds(e.target.value);
              if (status === "idle" || status === "done") setStatus("idle");
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p.seconds)}
            className="border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {status !== "running" ? (
          <button
            type="button"
            onClick={start}
            disabled={total <= 0}
            className="bg-brand text-white font-semibold rounded-lg px-5 py-2 text-sm hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "paused" ? "Resume" : "Start"}
          </button>
        ) : (
          <button
            type="button"
            onClick={pause}
            className="bg-slate-900 text-white font-semibold rounded-lg px-5 py-2 text-sm hover:bg-slate-800"
          >
            Pause
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          className="border border-slate-300 text-slate-700 rounded-lg px-4 py-2 text-sm hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function beep() {
  if (typeof window === "undefined") return;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
    setTimeout(() => ctx.close(), 800);
  } catch {
    // ignore audio errors (e.g., no user gesture yet)
  }
}
