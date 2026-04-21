"use client";

import { useEffect, useRef, useState } from "react";

export function Stopwatch() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startedRef = useRef<number | null>(null);
  const baseRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    startedRef.current = Date.now();
    const id = window.setInterval(() => {
      if (startedRef.current == null) return;
      setMs(baseRef.current + (Date.now() - startedRef.current));
    }, 50);
    return () => window.clearInterval(id);
  }, [running]);

  function toggle() {
    if (running) {
      baseRef.current = ms;
      setRunning(false);
    } else {
      setRunning(true);
    }
  }

  function reset() {
    setRunning(false);
    baseRef.current = 0;
    setMs(0);
    setLaps([]);
  }

  function lap() {
    if (running) setLaps((l) => [ms, ...l]);
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 text-center">
        <p className="text-6xl sm:text-7xl font-bold tabular-nums text-slate-900">{format(ms)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={toggle}
          className={`font-semibold rounded-lg px-5 py-2 text-sm ${
            running
              ? "bg-slate-900 text-white hover:bg-slate-800"
              : "bg-brand text-white hover:bg-brand-dark"
          }`}
        >
          {running ? "Stop" : ms > 0 ? "Resume" : "Start"}
        </button>
        <button
          type="button"
          onClick={lap}
          disabled={!running}
          className="border border-slate-300 text-slate-700 rounded-lg px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
        >
          Lap
        </button>
        <button
          type="button"
          onClick={reset}
          className="border border-slate-300 text-slate-700 rounded-lg px-4 py-2 text-sm hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
      {laps.length > 0 && (
        <ol className="border border-slate-200 rounded-lg divide-y">
          {laps.map((l, i) => (
            <li key={i} className="flex justify-between px-4 py-2 text-sm">
              <span className="text-slate-500">Lap {laps.length - i}</span>
              <span className="font-mono tabular-nums">{format(l)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function format(ms: number) {
  const total = Math.floor(ms / 10);
  const cs = total % 100;
  const s = Math.floor(total / 100) % 60;
  const m = Math.floor(total / 6000) % 60;
  const h = Math.floor(total / 360000);
  const pad = (n: number, w = 2) => n.toString().padStart(w, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}.${pad(cs)}` : `${pad(m)}:${pad(s)}.${pad(cs)}`;
}
