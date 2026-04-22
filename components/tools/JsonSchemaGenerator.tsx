"use client";

import { useState } from "react";

const SAMPLE = `{
  "id": 42,
  "name": "Ada",
  "active": true,
  "tags": ["admin", "editor"],
  "profile": { "age": 30, "city": "Paris" }
}`;

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type Schema = {
  type?: string | string[];
  properties?: Record<string, Schema>;
  required?: string[];
  items?: Schema;
};

function inferType(value: JsonValue): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") return "object";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") {
    return Number.isInteger(value) ? "integer" : "number";
  }
  return "string";
}

function mergeSchemas(a: Schema, b: Schema): Schema {
  if (JSON.stringify(a) === JSON.stringify(b)) return a;
  const types = new Set<string>();
  const addType = (t: string | string[] | undefined) => {
    if (!t) return;
    if (Array.isArray(t)) t.forEach((x) => types.add(x));
    else types.add(t);
  };
  addType(a.type);
  addType(b.type);
  const merged: Schema = {};
  const typeArr = Array.from(types);
  merged.type = typeArr.length === 1 ? typeArr[0] : typeArr;
  if (a.properties || b.properties) {
    merged.properties = { ...(a.properties || {}), ...(b.properties || {}) };
  }
  if (a.items && b.items) {
    merged.items = mergeSchemas(a.items, b.items);
  } else if (a.items) {
    merged.items = a.items;
  } else if (b.items) {
    merged.items = b.items;
  }
  return merged;
}

function buildSchema(value: JsonValue): Schema {
  const t = inferType(value);
  if (t === "object" && value && typeof value === "object" && !Array.isArray(value)) {
    const obj = value as { [key: string]: JsonValue };
    const properties: Record<string, Schema> = {};
    const required: string[] = [];
    for (const k of Object.keys(obj)) {
      properties[k] = buildSchema(obj[k]);
      required.push(k);
    }
    const result: Schema = { type: "object", properties };
    if (required.length > 0) result.required = required;
    return result;
  }
  if (t === "array" && Array.isArray(value)) {
    if (value.length === 0) return { type: "array" };
    let items = buildSchema(value[0]);
    for (let i = 1; i < value.length; i++) {
      items = mergeSchemas(items, buildSchema(value[i]));
    }
    return { type: "array", items };
  }
  return { type: t };
}

export function JsonSchemaGenerator() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function generate() {
    try {
      const parsed = JSON.parse(input) as JsonValue;
      const schema = {
        $schema: "http://json-schema.org/draft-07/schema#",
        ...buildSchema(parsed),
      };
      setOutput(JSON.stringify(schema, null, 2));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  }

  function copy() {
    if (output) navigator.clipboard?.writeText(output);
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700 mb-1 block">
          JSON sample
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={generate}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
        >
          Generate schema
        </button>
      </div>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      {output && (
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <p className="text-sm font-medium text-slate-700">Draft-07 schema</p>
            <button
              type="button"
              onClick={copy}
              className="text-xs font-semibold text-brand hover:text-brand-dark"
            >
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={14}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
