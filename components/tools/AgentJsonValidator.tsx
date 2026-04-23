"use client";

import { useMemo, useState } from "react";

const DEFAULT_SCHEMA = `{
  "type": "object",
  "required": ["city", "units"],
  "properties": {
    "city": { "type": "string" },
    "units": { "type": "string" },
    "days": { "type": "number" }
  }
}`;

const DEFAULT_OUTPUT = `{
  "city": "Tokyo",
  "units": "metric",
  "days": 3
}`;

type Check = { label: string; ok: boolean; detail?: string };

function typeOfJson(v: unknown): string {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}

export function AgentJsonValidator() {
  const [schemaText, setSchemaText] = useState(DEFAULT_SCHEMA);
  const [outputText, setOutputText] = useState(DEFAULT_OUTPUT);

  const result = useMemo(() => {
    const checks: Check[] = [];
    let schema: any = null;
    let output: any = null;
    try {
      schema = JSON.parse(schemaText);
      checks.push({ label: "Schema parses as JSON", ok: true });
    } catch (e: any) {
      checks.push({ label: "Schema parses as JSON", ok: false, detail: String(e?.message || e) });
      return { checks, allOk: false };
    }
    try {
      output = JSON.parse(outputText);
      checks.push({ label: "Output parses as JSON", ok: true });
    } catch (e: any) {
      checks.push({ label: "Output parses as JSON", ok: false, detail: String(e?.message || e) });
      return { checks, allOk: false };
    }

    const required: string[] = Array.isArray(schema.required) ? schema.required : [];
    const properties: Record<string, any> = schema.properties || {};

    for (const key of required) {
      const present = output && Object.prototype.hasOwnProperty.call(output, key);
      checks.push({ label: `required field "${key}" present`, ok: !!present });
    }

    for (const [key, def] of Object.entries(properties)) {
      if (output && Object.prototype.hasOwnProperty.call(output, key)) {
        const expected = (def as any).type;
        const actual = typeOfJson(output[key]);
        const ok = !expected || expected === actual || (expected === "integer" && actual === "number");
        checks.push({ label: `"${key}" type = ${expected || "any"}`, ok, detail: ok ? undefined : `got ${actual}` });
      }
    }

    const allOk = checks.every((c) => c.ok);
    return { checks, allOk };
  }, [schemaText, outputText]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">JSON schema</span>
          <textarea value={schemaText} onChange={(e) => setSchemaText(e.target.value)} rows={10} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Tool-call output</span>
          <textarea value={outputText} onChange={(e) => setOutputText(e.target.value)} rows={10} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono" />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-3">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Overall</div>
        <div className={`text-xl font-semibold ${result.allOk ? "text-green-600" : "text-red-600"}`}>
          {result.allOk ? "All checks passed" : "Validation failed"}
        </div>
      </div>

      <ul className="space-y-1 text-sm">
        {result.checks.map((c, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={`font-semibold ${c.ok ? "text-green-600" : "text-red-600"}`}>{c.ok ? "+" : "-"}</span>
            <span className="text-slate-700">{c.label}{c.detail ? <span className="text-slate-500"> — {c.detail}</span> : null}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">Supports required-field checks and shallow type checks (string, number, boolean, array, object, null). Not a full JSON-Schema validator.</p>
    </div>
  );
}
