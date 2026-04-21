"use client";

import { useState, useMemo } from "react";

type Dir = "yaml-to-json" | "json-to-yaml";

export function YamlJsonConverter() {
  const [dir, setDir] = useState<Dir>("yaml-to-json");
  const [input, setInput] = useState<string>(`name: freetoolarena
stack:
  - next.js
  - tailwind
published: true
pages: 165
`);

  const { output, error } = useMemo(() => {
    try {
      if (input.trim() === "") return { output: "", error: null };
      if (dir === "yaml-to-json") {
        const data = parseYaml(input);
        return { output: JSON.stringify(data, null, 2), error: null };
      }
      const data = JSON.parse(input);
      return { output: toYaml(data), error: null };
    } catch (e: any) {
      return { output: "", error: e.message || "Parse error" };
    }
  }, [input, dir]);

  function swap() {
    setDir((d) => (d === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json"));
    if (output && !error) setInput(output);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <select
          value={dir}
          onChange={(e) => setDir(e.target.value as Dir)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="yaml-to-json">YAML → JSON</option>
          <option value="json-to-yaml">JSON → YAML</option>
        </select>
        <button
          type="button"
          onClick={swap}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          title="Swap direction and promote output to input"
        >
          ↔ Swap
        </button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            {dir === "yaml-to-json" ? "YAML input" : "JSON input"}
          </p>
          <button
            type="button"
            onClick={() => setInput("")}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            Clear
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            {dir === "yaml-to-json" ? "JSON output" : "YAML output"}
          </p>
          <button
            type="button"
            disabled={!output}
            onClick={() => navigator.clipboard?.writeText(output)}
            className="text-xs font-medium text-brand hover:underline disabled:text-slate-400"
          >
            Copy
          </button>
        </div>
        {error ? (
          <div className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        ) : (
          <textarea
            value={output}
            readOnly
            rows={10}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm"
          />
        )}
      </div>

      <p className="text-xs text-slate-500">
        Supports scalars, nested mappings, and sequences with block (<code>-</code>) or
        flow (<code>[ ]</code>, <code>{"{ }"}</code>) syntax. Tabs are not valid indentation in YAML.
      </p>
    </div>
  );
}

// ---------- YAML → JS ----------

type Val = string | number | boolean | null | Val[] | { [k: string]: Val };

function parseYaml(src: string): Val {
  // Strip a leading document marker if present.
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const cleaned: { indent: number; text: string; raw: string }[] = [];
  for (const raw of lines) {
    if (raw.includes("\t")) {
      const leading = raw.match(/^\s*/)![0];
      if (leading.includes("\t")) throw new Error("Tabs are not valid YAML indentation. Use spaces.");
    }
    // Strip comments (but not inside quotes — simple heuristic).
    const stripped = stripComment(raw);
    const trimmed = stripped.replace(/\s+$/, "");
    if (trimmed.trim() === "" || trimmed.trim() === "---") continue;
    const indent = stripped.match(/^ */)![0].length;
    cleaned.push({ indent, text: trimmed.trim(), raw: trimmed });
  }
  if (!cleaned.length) return null;
  const [value, next] = readBlock(cleaned, 0, cleaned[0].indent);
  if (next < cleaned.length) {
    // If there's trailing content at a lower indent, that's a root-level error.
    throw new Error(`Unexpected content at line ${next + 1}: "${cleaned[next].text}"`);
  }
  return value;
}

function stripComment(line: string): string {
  let inSingle = false,
    inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (c === "#" && !inSingle && !inDouble && (i === 0 || /\s/.test(line[i - 1]))) {
      return line.slice(0, i);
    }
  }
  return line;
}

function readBlock(
  lines: { indent: number; text: string; raw: string }[],
  start: number,
  indent: number,
): [Val, number] {
  if (start >= lines.length) return [null, start];
  const first = lines[start];
  if (first.text.startsWith("- ") || first.text === "-") {
    return readSeq(lines, start, indent);
  }
  return readMap(lines, start, indent);
}

function readSeq(
  lines: { indent: number; text: string; raw: string }[],
  start: number,
  indent: number,
): [Val[], number] {
  const arr: Val[] = [];
  let i = start;
  while (i < lines.length && lines[i].indent === indent) {
    const ln = lines[i];
    if (!(ln.text === "-" || ln.text.startsWith("- "))) break;
    const rest = ln.text === "-" ? "" : ln.text.slice(2).trimStart();
    if (rest === "") {
      // nested block follows
      if (i + 1 < lines.length && lines[i + 1].indent > indent) {
        const [val, next] = readBlock(lines, i + 1, lines[i + 1].indent);
        arr.push(val);
        i = next;
      } else {
        arr.push(null);
        i++;
      }
      continue;
    }
    const colonIdx = findMapColon(rest);
    if (colonIdx >= 0) {
      // inline map: "- key: value" opens a map at a child indent
      const childIndent = indent + 2;
      // Synthesise a child block starting with this key line plus any nested
      // siblings that follow at deeper indent.
      const synthesized: { indent: number; text: string; raw: string }[] = [
        { indent: childIndent, text: rest, raw: rest },
      ];
      let j = i + 1;
      while (j < lines.length && lines[j].indent > indent) {
        synthesized.push(lines[j]);
        j++;
      }
      const [val] = readMap(synthesized, 0, childIndent);
      arr.push(val);
      i = j;
      continue;
    }
    arr.push(parseScalar(rest));
    i++;
  }
  return [arr, i];
}

function readMap(
  lines: { indent: number; text: string; raw: string }[],
  start: number,
  indent: number,
): [{ [k: string]: Val }, number] {
  const obj: { [k: string]: Val } = {};
  let i = start;
  while (i < lines.length && lines[i].indent === indent) {
    const ln = lines[i];
    if (ln.text.startsWith("- ") || ln.text === "-") break;
    const colonIdx = findMapColon(ln.text);
    if (colonIdx < 0) {
      throw new Error(`Expected "key: value" at line: "${ln.text}"`);
    }
    const key = unquote(ln.text.slice(0, colonIdx).trim());
    const rest = ln.text.slice(colonIdx + 1).trim();
    if (rest === "") {
      if (i + 1 < lines.length && lines[i + 1].indent > indent) {
        const [val, next] = readBlock(lines, i + 1, lines[i + 1].indent);
        obj[key] = val;
        i = next;
      } else {
        obj[key] = null;
        i++;
      }
    } else {
      obj[key] = parseScalar(rest);
      i++;
    }
  }
  return [obj, i];
}

function findMapColon(text: string): number {
  let inSingle = false,
    inDouble = false,
    flow = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (!inSingle && !inDouble) {
      if (c === "[" || c === "{") flow++;
      else if (c === "]" || c === "}") flow--;
      else if (c === ":" && flow === 0) {
        if (i === text.length - 1 || /\s/.test(text[i + 1])) return i;
      }
    }
  }
  return -1;
}

function unquote(s: string): string {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

function parseScalar(raw: string): Val {
  const t = raw.trim();
  if (t === "" || t === "~" || t.toLowerCase() === "null") return null;
  if (t === "true" || t === "True" || t === "TRUE") return true;
  if (t === "false" || t === "False" || t === "FALSE") return false;
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    try {
      return t.startsWith('"') ? JSON.parse(t) : t.slice(1, -1);
    } catch {
      return t.slice(1, -1);
    }
  }
  // Flow collections.
  if (t.startsWith("[") || t.startsWith("{")) {
    return parseFlow(t);
  }
  if (/^-?\d+$/.test(t)) return Number(t);
  if (/^-?\d*\.\d+([eE][+-]?\d+)?$/.test(t) || /^-?\d+[eE][+-]?\d+$/.test(t)) return Number(t);
  return t;
}

function parseFlow(text: string): Val {
  // Convert flow YAML to JSON by quoting bare identifiers. This is good enough
  // for common cases: [a, b, c], {k: 1, "a b": 2}.
  let out = "";
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (c === '"' || c === "'") {
      const q = c;
      const s = i;
      i++;
      while (i < text.length && text[i] !== q) {
        if (text[i] === "\\") i += 2;
        else i++;
      }
      i++;
      let seg = text.slice(s, i);
      if (q === "'") seg = '"' + seg.slice(1, -1).replace(/"/g, '\\"') + '"';
      out += seg;
      continue;
    }
    if (/[\[\]{},:\s]/.test(c)) {
      out += c;
      i++;
      continue;
    }
    // bare token
    const s = i;
    while (i < text.length && !/[\[\]{},:\s]/.test(text[i])) i++;
    const tok = text.slice(s, i);
    if (tok === "true" || tok === "false" || tok === "null" || /^-?\d/.test(tok)) {
      out += tok;
    } else {
      out += JSON.stringify(tok);
    }
  }
  return JSON.parse(out);
}

// ---------- JS → YAML ----------

function toYaml(v: Val, indent = 0): string {
  if (v === null) return "null\n";
  if (typeof v === "boolean") return `${v}\n`;
  if (typeof v === "number") return `${v}\n`;
  if (typeof v === "string") return `${yamlString(v)}\n`;
  if (Array.isArray(v)) {
    if (v.length === 0) return "[]\n";
    return v.map((item) => renderSeqItem(item, indent)).join("");
  }
  if (typeof v === "object") {
    const keys = Object.keys(v);
    if (keys.length === 0) return "{}\n";
    return keys.map((k) => renderMapEntry(k, (v as any)[k], indent)).join("");
  }
  return "\n";
}

function renderSeqItem(item: Val, indent: number): string {
  const pad = " ".repeat(indent);
  if (item === null || typeof item !== "object") {
    return `${pad}- ${scalarYaml(item)}\n`;
  }
  if (Array.isArray(item)) {
    if (item.length === 0) return `${pad}- []\n`;
    const body = toYaml(item, indent + 2);
    return `${pad}-\n${body}`;
  }
  const keys = Object.keys(item as object);
  if (keys.length === 0) return `${pad}- {}\n`;
  const first = keys[0];
  let out = `${pad}- ${yamlKey(first)}: ${inlineOrBreak((item as any)[first], indent + 2)}`;
  for (const k of keys.slice(1)) {
    out += `${" ".repeat(indent + 2)}${yamlKey(k)}: ${inlineOrBreak((item as any)[k], indent + 2)}`;
  }
  return out;
}

function renderMapEntry(k: string, v: Val, indent: number): string {
  const pad = " ".repeat(indent);
  if (v === null || typeof v !== "object") {
    return `${pad}${yamlKey(k)}: ${scalarYaml(v)}\n`;
  }
  if (Array.isArray(v)) {
    if (v.length === 0) return `${pad}${yamlKey(k)}: []\n`;
    const body = toYaml(v, indent);
    return `${pad}${yamlKey(k)}:\n${body}`;
  }
  const keys = Object.keys(v as object);
  if (keys.length === 0) return `${pad}${yamlKey(k)}: {}\n`;
  const body = toYaml(v, indent + 2);
  return `${pad}${yamlKey(k)}:\n${body}`;
}

function inlineOrBreak(v: Val, indent: number): string {
  if (v === null || typeof v !== "object") return `${scalarYaml(v)}\n`;
  if (Array.isArray(v) && v.length === 0) return `[]\n`;
  if (typeof v === "object" && Object.keys(v as object).length === 0) return `{}\n`;
  return `\n${toYaml(v, indent + 2)}`;
}

function scalarYaml(v: Val): string {
  if (v === null) return "null";
  if (typeof v === "string") return yamlString(v);
  return String(v);
}

function yamlKey(k: string): string {
  if (/^[A-Za-z_][A-Za-z0-9_\-]*$/.test(k)) return k;
  return JSON.stringify(k);
}

function yamlString(s: string): string {
  // Quote strings that could be misparsed as scalars or contain special chars.
  if (s === "" || /[:#\n\r\t]/.test(s) || /^[\-?!&*|>%@`]/.test(s) ||
      /^(true|false|null|yes|no|on|off|~)$/i.test(s) ||
      /^-?\d/.test(s) || /^\s|\s$/.test(s)) {
    return JSON.stringify(s);
  }
  return s;
}
