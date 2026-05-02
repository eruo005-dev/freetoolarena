"use client";

import { useEffect, useMemo, useState } from "react";
import { ExportData } from "@/components/ExportData";

export interface TipCalculatorProps {
  initialBill?: number;
  initialTip?: number;
  initialPeople?: number;
}

export function TipCalculator({
  initialBill,
  initialTip,
  initialPeople,
}: TipCalculatorProps = {}) {
  const [bill, setBill] = useState(initialBill != null ? String(initialBill) : "50");
  const [tipPct, setTipPct] = useState(initialTip != null ? String(initialTip) : "18");
  const [people, setPeople] = useState(initialPeople != null ? String(initialPeople) : "1");

  const { billNum, tipAmount, total, perPerson } = useMemo(() => {
    const b = Math.max(0, parseFloat(bill) || 0);
    const t = Math.max(0, parseFloat(tipPct) || 0);
    const p = Math.max(1, parseInt(people) || 1);
    const tip = b * (t / 100);
    const tot = b + tip;
    return { billNum: b, tipAmount: tip, total: tot, perPerson: tot / p };
  }, [bill, tipPct, people]);

  // Sync state to URL so the share-link copies a permalink to the user's scenario.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const u = new URL(window.location.href);
    u.searchParams.set("bill", bill);
    u.searchParams.set("tip", tipPct);
    u.searchParams.set("people", people);
    if (u.toString() !== window.location.href) {
      window.history.replaceState(null, "", u.toString());
    }
  }, [bill, tipPct, people]);

  const presets = [10, 15, 18, 20, 25];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Bill amount ($)" value={bill} onChange={setBill} type="number" min={0} step={0.01} />
        <Field label="Tip (%)" value={tipPct} onChange={setTipPct} type="number" min={0} max={100} step={1} />
        <Field label="People" value={people} onChange={setPeople} type="number" min={1} step={1} />
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setTipPct(String(p))}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
              Number(tipPct) === p
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            {p}%
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <Stat label="Tip amount" value={tipAmount} />
        <Stat label="Total with tip" value={total} />
        <Stat label="Per person" value={perPerson} highlight />
        <Stat label="Bill total" value={billNum} muted />
      </div>

      <ExportData
        filename={`tip-calculation-${Math.round(billNum)}`}
        rows={[
          { metric: "Bill total", value: billNum.toFixed(2) },
          { metric: "Tip percent", value: tipPct },
          { metric: "Tip amount", value: tipAmount.toFixed(2) },
          { metric: "Total with tip", value: total.toFixed(2) },
          { metric: "Number of people", value: people },
          { metric: "Per person", value: perPerson.toFixed(2) },
        ]}
      />
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{props.label}</span>
      <input
        type={props.type ?? "text"}
        inputMode="decimal"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}

function Stat({ label, value, highlight, muted }: { label: string; value: number; highlight?: boolean; muted?: boolean }) {
  return (
    <div>
      <p className={`text-xs uppercase tracking-wide font-semibold mb-1 ${muted ? "text-slate-400" : "text-slate-500"}`}>
        {label}
      </p>
      <p className={`font-bold ${highlight ? "text-3xl text-brand" : "text-xl text-slate-900"}`}>
        ${value.toFixed(2)}
      </p>
    </div>
  );
}
