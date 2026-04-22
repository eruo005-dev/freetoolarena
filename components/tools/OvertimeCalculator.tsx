"use client";

import { useMemo, useState } from "react";

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function OvertimeCalculator() {
  const [rate, setRate] = useState("20");
  const [regHours, setRegHours] = useState("40");
  const [otHours, setOtHours] = useState("8");
  const [otMult, setOtMult] = useState("1.5");
  const [dtHours, setDtHours] = useState("0");
  const [dtMult, setDtMult] = useState("2");

  const { regPay, otPay, dtPay, total } = useMemo(() => {
    const r = Math.max(0, parseFloat(rate) || 0);
    const rh = Math.max(0, parseFloat(regHours) || 0);
    const oh = Math.max(0, parseFloat(otHours) || 0);
    const om = Math.max(0, parseFloat(otMult) || 0);
    const dh = Math.max(0, parseFloat(dtHours) || 0);
    const dm = Math.max(0, parseFloat(dtMult) || 0);
    const reg = r * rh;
    const ot = r * oh * om;
    const dt = r * dh * dm;
    return { regPay: reg, otPay: ot, dtPay: dt, total: reg + ot + dt };
  }, [rate, regHours, otHours, otMult, dtHours, dtMult]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Regular hourly rate ($)" value={rate} onChange={setRate} />
        <Field label="Regular hours worked" value={regHours} onChange={setRegHours} />
        <Field label="Overtime hours" value={otHours} onChange={setOtHours} />
        <Field label="Overtime multiplier" value={otMult} onChange={setOtMult} step={0.1} />
        <Field label="Double-time hours (optional)" value={dtHours} onChange={setDtHours} />
        <Field label="Double-time multiplier" value={dtMult} onChange={setDtMult} step={0.1} />
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <Stat label="Regular pay" value={regPay} />
        <Stat label="Overtime pay" value={otPay} />
        <Stat label="Double-time pay" value={dtPay} />
        <Stat label="Total gross" value={total} highlight />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  step = 0.01,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}

function Stat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">{label}</p>
      <p className={`font-bold ${highlight ? "text-3xl text-brand" : "text-xl text-slate-900"}`}>
        {fmt.format(value)}
      </p>
    </div>
  );
}
