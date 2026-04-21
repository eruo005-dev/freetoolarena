"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "focus" | "short" | "long";

const DURATIONS: Record<Mode, number> = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const LABELS: Record<Mode, string> = {
  focus: "Focus",
  short: "Short break",
  long: "Long break",
};

export function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const [completedFocus, setCompletedFocus] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          // segment finished
          queueMicrotask(() => advance());
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function advance() {
    setRunning(false);
    if (mode === "focus") {
      const next = completedFocus + 1;
      setCompletedFocus(next);
      const nextMode: Mode = next % 4 === 0 ? "long" : "short";
      setMode(nextMode);
      setSecondsLeft(DURATIONS[nextMode]);
    } else {
      setMode("focus");
      setSecondsLeft(DURATIONS.focus);
    }
  }

  function switchMode(m: Mode) {
    setRunning(false);
    setMode(m);
    setSecondsLeft(DURATIONS[m]);
  }

  function reset() {
    setRunning(false);
    setSecondsLeft(DURATIONS[mode]);
  }

  const mins = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const secs = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2">
        {(Object.keys(DURATIONS) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
              mode === m
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            {LABELS[m]}
          </button>
        ))}
      </div>

      <div
        className="text-center py-6"
        aria-live="polite"
        aria-label={`${LABELS[mode]} timer, ${mins} minutes ${secs} seconds remaining`}
      >
        <p className="text-6xl sm:text-7xl font-bold tabular-nums text-slate-900 tracking-tight">
          {mins}:{secs}
        </p>
        <p className="text-sm text-slate-500 mt-2">
          Round {completedFocus + (mode === "focus" ? 1 : 0)} · {LABELS[mode]}
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="bg-brand text-white font-semibold rounded-lg px-6 py-2.5 hover:bg-brand-dark min-w-[100px]"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="border border-slate-300 text-slate-900 font-semibold rounded-lg px-5 py-2.5 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      <p className="text-center text-sm text-slate-500">
        Completed focus rounds today: <span className="font-semibold text-slate-900">{completedFocus}</span>
      </p>
    </div>
  );
}
