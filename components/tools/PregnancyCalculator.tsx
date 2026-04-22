"use client";

import { useMemo, useState } from "react";

type Mode = "lmp" | "conception";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(iso: string, days: number): Date | null {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return null;
  d.setDate(d.getDate() + days);
  return d;
}

function fmt(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export interface PregnancyCalculatorProps {
  /** ISO YYYY-MM-DD */
  initialLmp?: string;
}

export function PregnancyCalculator({ initialLmp }: PregnancyCalculatorProps = {}) {
  const [mode, setMode] = useState<Mode>("lmp");
  const [lmp, setLmp] = useState(initialLmp ?? todayISO());
  const [conception, setConception] = useState(todayISO());

  const result = useMemo(() => {
    const lmpDate =
      mode === "lmp"
        ? lmp
          ? new Date(lmp + "T00:00:00")
          : null
        : addDays(conception, -14);
    if (!lmpDate || isNaN(lmpDate.getTime())) {
      return null;
    }
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);
    const conceptionDate = new Date(lmpDate);
    conceptionDate.setDate(conceptionDate.getDate() + 14);

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const daysSince = Math.floor((now.getTime() - lmpDate.getTime()) / MS_PER_DAY);
    const weeks = Math.max(0, Math.floor(daysSince / 7));
    const days = Math.max(0, daysSince % 7);
    let trimester = "—";
    if (daysSince >= 0) {
      if (weeks < 13) trimester = "1st trimester";
      else if (weeks < 27) trimester = "2nd trimester";
      else trimester = "3rd trimester";
    }
    return { lmpDate, dueDate, conceptionDate, weeks, days, trimester, daysSince };
  }, [mode, lmp, conception]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["lmp", "conception"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
              mode === m
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            {m === "lmp" ? "By last period (LMP)" : "By conception date"}
          </button>
        ))}
      </div>

      {mode === "lmp" ? (
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">First day of last menstrual period</span>
          <input
            type="date"
            value={lmp}
            onChange={(e) => setLmp(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      ) : (
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Estimated conception date</span>
          <input
            type="date"
            value={conception}
            onChange={(e) => setConception(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      )}

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Estimated due date</p>
          <p className="text-2xl font-bold text-brand">{fmt(result?.dueDate ?? null)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Current progress</p>
          <p className="text-xl font-bold text-slate-900">
            {result && result.daysSince >= 0 ? `${result.weeks}w ${result.days}d` : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Trimester</p>
          <p className="text-xl font-bold text-slate-900">{result?.trimester ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Conception (est.)</p>
          <p className="text-xl font-bold text-slate-900">{fmt(result?.conceptionDate ?? null)}</p>
        </div>
      </div>

      <div className="text-sm text-slate-600">
        <p className="font-semibold text-slate-700 mb-1">How it works</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>Due date = LMP + 280 days (Naegele's rule).</li>
          <li>Conception is estimated at LMP + 14 days (assumes a 28-day cycle).</li>
          <li>Trimesters: 1st = weeks 1–12, 2nd = 13–26, 3rd = 27–40.</li>
        </ul>
        <p className="mt-2 italic">Estimates only — your provider's dating ultrasound is more accurate.</p>
      </div>
    </div>
  );
}
