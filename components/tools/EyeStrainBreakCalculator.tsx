"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Phase = "focus" | "rest";

export function EyeStrainBreakCalculator() {
  const [hours, setHours] = useState<number>(8);
  const [running, setRunning] = useState<boolean>(false);
  const [phase, setPhase] = useState<Phase>("focus");
  const [secondsLeft, setSecondsLeft] = useState<number>(20 * 60);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) {
      if (tickRef.current) clearInterval(tickRef.current);
      tickRef.current = null;
      return;
    }
    tickRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;
        setPhase((p) => {
          const next: Phase = p === "focus" ? "rest" : "focus";
          setSecondsLeft(next === "focus" ? 20 * 60 : 20);
          return next;
        });
        return 0;
      });
    }, 1000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [running]);

  const reset = () => {
    setRunning(false);
    setPhase("focus");
    setSecondsLeft(20 * 60);
  };

  const summary = useMemo(() => {
    if (!Number.isFinite(hours) || hours <= 0) return null;
    const focusMinutes = hours * 60;
    const breaks = Math.floor(focusMinutes / 20);
    const breakMinutes = (breaks * 20) / 60;
    const recommended = breaks;
    return { breaks: recommended, breakMinutes };
  }, [hours]);

  const mm = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const ss = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex items-baseline justify-between">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            {phase === "focus" ? "Focus phase &mdash; look at screen" : "Rest phase &mdash; look 20 ft away"}
          </div>
          <div className="text-xs text-slate-500">20-20-20 rule</div>
        </div>
        <div className={`mt-2 font-mono text-6xl font-bold ${phase === "rest" ? "text-emerald-700" : "text-slate-800"}`}>
          {mm}:{ss}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {!running ? (
            <button
              type="button"
              onClick={() => setRunning(true)}
              className="rounded bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Start
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setRunning(false)}
              className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Pause
            </button>
          )}
          <button
            type="button"
            onClick={reset}
            className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">
          Plan a full day of screen work
        </h4>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Hours at a screen today</span>
          <input
            type="number"
            min={0}
            max={16}
            step={0.5}
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2 sm:max-w-xs"
          />
        </label>
        {summary && (
          <p className="mt-3 text-sm text-slate-700">
            That&rsquo;s <strong>{summary.breaks}</strong> twenty-second breaks &mdash; about{" "}
            <strong>{summary.breakMinutes.toFixed(1)} minutes</strong> of looking away over the day.
            Tiny investment, big payoff for accommodative spasm and dry-eye risk.
          </p>
        )}
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        <h4 className="mb-2 font-semibold">The 20-20-20 rule</h4>
        <p>
          Every <strong>20 minutes</strong>, look at something <strong>20 feet</strong> away
          for <strong>20 seconds</strong>. The American Academy of Ophthalmology recommends it
          to break the focus-lock that causes digital eye strain, dry eye, and tension headaches.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <h4 className="mb-2 font-semibold text-slate-800">Other quick wins</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Blink consciously:</strong> screen use cuts blink rate by ~60%, drying the cornea.</li>
          <li><strong>Match brightness to room:</strong> screen too bright in a dim room is a strain magnet.</li>
          <li><strong>Position the monitor:</strong> top edge at or just below eye line, ~22 inches from your face.</li>
          <li><strong>Hydration + humidity:</strong> dry-air offices accelerate dry eye; a small humidifier helps.</li>
          <li><strong>Persistent symptoms:</strong> see an optometrist &mdash; you may need an updated prescription
            or specialty &ldquo;office&rdquo; lenses.</li>
        </ul>
      </div>
    </div>
  );
}
