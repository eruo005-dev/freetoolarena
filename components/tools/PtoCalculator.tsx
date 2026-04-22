"use client";

import { useMemo, useState } from "react";

type Freq = "weekly" | "biweekly" | "semimonthly" | "monthly";

const FREQ_PER_YEAR: Record<Freq, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

export function PtoCalculator() {
  const [daysPerYear, setDaysPerYear] = useState("15");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [freq, setFreq] = useState<Freq>("biweekly");
  const [monthsWorked, setMonthsWorked] = useState("6");
  const [hoursUsed, setHoursUsed] = useState("8");

  const { annualHours, perPeriod, accrued, remaining, daysRemaining } = useMemo(() => {
    const d = Math.max(0, parseFloat(daysPerYear) || 0);
    const hpd = Math.max(0, parseFloat(hoursPerDay) || 0);
    const months = Math.max(0, parseFloat(monthsWorked) || 0);
    const used = Math.max(0, parseFloat(hoursUsed) || 0);
    const annual = d * hpd;
    const periods = FREQ_PER_YEAR[freq];
    const perPer = periods > 0 ? annual / periods : 0;
    const periodsWorked = (months / 12) * periods;
    const acc = perPer * periodsWorked;
    const rem = Math.max(0, acc - used);
    return {
      annualHours: annual,
      perPeriod: perPer,
      accrued: acc,
      remaining: rem,
      daysRemaining: hpd > 0 ? rem / hpd : 0,
    };
  }, [daysPerYear, hoursPerDay, freq, monthsWorked, hoursUsed]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="PTO days per year" value={daysPerYear} onChange={setDaysPerYear} />
        <Field label="Hours per workday" value={hoursPerDay} onChange={setHoursPerDay} />
        <Field label="Months worked so far" value={monthsWorked} onChange={setMonthsWorked} />
        <Field label="PTO hours already used" value={hoursUsed} onChange={setHoursUsed} />
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Pay period frequency</span>
          <select
            value={freq}
            onChange={(e) => setFreq(e.target.value as Freq)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="weekly">Weekly (52/yr)</option>
            <option value="biweekly">Bi-weekly (26/yr)</option>
            <option value="semimonthly">Semi-monthly (24/yr)</option>
            <option value="monthly">Monthly (12/yr)</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <Stat label="Annual PTO (hours)" value={`${annualHours.toFixed(1)} h`} />
        <Stat label="Accrual per period" value={`${perPeriod.toFixed(2)} h`} />
        <Stat label="Hours accrued so far" value={`${accrued.toFixed(1)} h`} />
        <Stat label="Hours remaining" value={`${remaining.toFixed(1)} h`} highlight />
        <Stat label="Equivalent days left" value={`${daysRemaining.toFixed(1)} days`} />
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={0.5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">{label}</p>
      <p className={`font-bold ${highlight ? "text-3xl text-brand" : "text-xl text-slate-900"}`}>{value}</p>
    </div>
  );
}
