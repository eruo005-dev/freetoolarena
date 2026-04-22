"use client";

import { useMemo, useState } from "react";

type CronFields = {
  minute: string;
  hour: string;
  dom: string;
  month: string;
  dow: string;
};

type Preset = { name: string; fields: CronFields };

const PRESETS: Preset[] = [
  { name: "Every minute", fields: { minute: "*", hour: "*", dom: "*", month: "*", dow: "*" } },
  { name: "Every 5 minutes", fields: { minute: "*/5", hour: "*", dom: "*", month: "*", dow: "*" } },
  { name: "Every hour", fields: { minute: "0", hour: "*", dom: "*", month: "*", dow: "*" } },
  { name: "Daily at midnight", fields: { minute: "0", hour: "0", dom: "*", month: "*", dow: "*" } },
  { name: "Weekdays at 9am", fields: { minute: "0", hour: "9", dom: "*", month: "*", dow: "1-5" } },
  { name: "Mondays at 8am", fields: { minute: "0", hour: "8", dom: "*", month: "*", dow: "1" } },
  { name: "First of month", fields: { minute: "0", hour: "0", dom: "1", month: "*", dow: "*" } },
  { name: "Every Sunday", fields: { minute: "0", hour: "0", dom: "*", month: "*", dow: "0" } },
  { name: "Every 15 minutes", fields: { minute: "*/15", hour: "*", dom: "*", month: "*", dow: "*" } },
  { name: "Twice daily", fields: { minute: "0", hour: "0,12", dom: "*", month: "*", dow: "*" } },
];

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function CronExpressionBuilder() {
  const [fields, setFields] = useState<CronFields>(PRESETS[3].fields);
  const [copied, setCopied] = useState(false);

  const cron = `${fields.minute} ${fields.hour} ${fields.dom} ${fields.month} ${fields.dow}`;
  const description = useMemo(() => describeCron(fields), [fields]);

  function update(k: keyof CronFields, v: string) {
    setFields({ ...fields, [k]: v });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(cron);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  function presetActive(p: Preset) {
    return (
      p.fields.minute === fields.minute &&
      p.fields.hour === fields.hour &&
      p.fields.dom === fields.dom &&
      p.fields.month === fields.month &&
      p.fields.dow === fields.dow
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2 block">
          Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => {
            const active = presetActive(p);
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => setFields(p.fields)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                  active
                    ? "bg-brand text-white border-brand"
                    : "bg-white text-slate-700 border-slate-300 hover:border-brand"
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(["minute", "hour", "dom", "month", "dow"] as const).map((k) => (
          <label key={k} className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              {k === "dom" ? "Day of Month" : k === "dow" ? "Day of Week" : k}
            </span>
            <input
              type="text"
              value={fields[k]}
              onChange={(e) => update(k, e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono"
            />
          </label>
        ))}
      </div>

      <div className="text-xs text-slate-500 grid grid-cols-2 sm:grid-cols-5 gap-3">
        <span>0-59</span>
        <span>0-23</span>
        <span>1-31</span>
        <span>1-12</span>
        <span>0-6 (Sun=0)</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Cron Expression
          </span>
          <button
            type="button"
            onClick={copy}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{cron}</pre>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Human-readable
        </span>
        <p className="text-slate-900">{description}</p>
      </div>
    </div>
  );
}

function describeField(value: string, unit: string, names?: string[]): string {
  if (value === "*") return `every ${unit}`;
  if (value.startsWith("*/")) return `every ${value.slice(2)} ${unit}s`;
  if (value.includes(",")) {
    const parts = value.split(",").map((p) => resolveName(p.trim(), names));
    return `${unit} ${joinList(parts)}`;
  }
  if (value.includes("-")) {
    const [a, b] = value.split("-");
    return `${unit} ${resolveName(a, names)} through ${resolveName(b, names)}`;
  }
  return `${unit} ${resolveName(value, names)}`;
}

function resolveName(v: string, names?: string[]): string {
  if (!names) return v;
  const n = parseInt(v, 10);
  if (isNaN(n) || n < 0 || n >= names.length) return v;
  return names[n];
}

function joinList(arr: string[]): string {
  if (arr.length <= 1) return arr.join("");
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
}

function describeCron(f: CronFields): string {
  const parts: string[] = [];

  if (f.minute === "0" && f.hour !== "*" && !f.hour.startsWith("*/")) {
    parts.push(`At ${formatTime(f.hour, "0")}`);
  } else if (f.minute === "*" && f.hour === "*") {
    parts.push("Every minute");
  } else if (f.minute.startsWith("*/")) {
    parts.push(`Every ${f.minute.slice(2)} minutes`);
  } else if (f.hour === "*") {
    parts.push(`At minute ${f.minute} of every hour`);
  } else {
    parts.push(`At ${formatTime(f.hour, f.minute)}`);
  }

  if (f.dow !== "*") {
    parts.push(`on ${describeField(f.dow, "day", DOW_NAMES).replace("day ", "")}`);
  }
  if (f.dom !== "*") {
    parts.push(`on day ${f.dom} of the month`);
  }
  if (f.month !== "*") {
    parts.push(`in ${describeField(f.month, "month", MONTH_NAMES).replace("month ", "")}`);
  }

  return parts.join(" ") + ".";
}

function formatTime(hour: string, minute: string): string {
  if (hour.includes(",")) {
    return hour.split(",").map((h) => `${h.padStart(2, "0")}:${minute.padStart(2, "0")}`).join(" and ");
  }
  if (hour.includes("-")) {
    const [a, b] = hour.split("-");
    return `${a.padStart(2, "0")}:${minute.padStart(2, "0")} through ${b.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  }
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}
