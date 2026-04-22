"use client";

import { useState } from "react";

const SAMPLE = "^[A-Z][a-z]+\\s\\d{2,4}$";

function describeCharClass(body: string): string {
  if (body === "a-z") return "lowercase letter";
  if (body === "A-Z") return "uppercase letter";
  if (body === "0-9") return "digit";
  if (body === "a-zA-Z") return "any letter";
  if (body === "a-zA-Z0-9") return "alphanumeric";
  const negated = body.startsWith("^");
  const core = negated ? body.slice(1) : body;
  return `${negated ? "any character except " : "any of "}${core
    .replace(/([a-zA-Z0-9])-([a-zA-Z0-9])/g, "$1 to $2")
    .split("")
    .join("")}`;
}

function describe(pattern: string): string {
  const parts: string[] = [];
  let i = 0;

  function peek(): string | undefined {
    return pattern[i];
  }

  function attachQuantifier(desc: string): string {
    const c = peek();
    if (c === "+") {
      i++;
      return `one or more ${desc}`;
    }
    if (c === "*") {
      i++;
      return `zero or more ${desc}`;
    }
    if (c === "?") {
      i++;
      return `optional ${desc}`;
    }
    if (c === "{") {
      const end = pattern.indexOf("}", i);
      if (end !== -1) {
        const inside = pattern.slice(i + 1, end);
        i = end + 1;
        if (inside.includes(",")) {
          const [n, m] = inside.split(",");
          if (m === "") return `${n} or more ${desc}`;
          return `between ${n} and ${m} ${desc}`;
        }
        return `exactly ${inside} ${desc}`;
      }
    }
    return desc;
  }

  while (i < pattern.length) {
    const c = pattern[i];
    if (c === "^") {
      parts.push("must start with");
      i++;
      continue;
    }
    if (c === "$") {
      parts.push("must end");
      i++;
      continue;
    }
    if (c === "|") {
      parts.push("or");
      i++;
      continue;
    }
    if (c === ".") {
      i++;
      parts.push(attachQuantifier("any character"));
      continue;
    }
    if (c === "\\") {
      const n = pattern[i + 1];
      i += 2;
      let d = "";
      if (n === "d") d = "a digit";
      else if (n === "D") d = "a non-digit";
      else if (n === "w") d = "a word character";
      else if (n === "W") d = "a non-word character";
      else if (n === "s") d = "whitespace";
      else if (n === "S") d = "non-whitespace";
      else if (n === "b") d = "a word boundary";
      else if (n === "n") d = "a newline";
      else if (n === "t") d = "a tab";
      else d = `a literal '${n}'`;
      parts.push(attachQuantifier(d));
      continue;
    }
    if (c === "[") {
      const end = pattern.indexOf("]", i);
      if (end === -1) {
        parts.push(`a literal '['`);
        i++;
        continue;
      }
      const body = pattern.slice(i + 1, end);
      i = end + 1;
      parts.push(attachQuantifier(describeCharClass(body)));
      continue;
    }
    if (c === "(") {
      let depth = 1;
      let j = i + 1;
      while (j < pattern.length && depth > 0) {
        if (pattern[j] === "\\") {
          j += 2;
          continue;
        }
        if (pattern[j] === "(") depth++;
        else if (pattern[j] === ")") depth--;
        if (depth === 0) break;
        j++;
      }
      const inner = pattern.slice(i + 1, j);
      i = j + 1;
      parts.push(attachQuantifier(`group (${describe(inner)})`));
      continue;
    }
    // literal
    let lit = c;
    i++;
    while (
      i < pattern.length &&
      !"\\[](){}|^$.*+?".includes(pattern[i])
    ) {
      lit += pattern[i];
      i++;
    }
    if (lit.length === 1) {
      parts.push(attachQuantifier(`a literal '${lit}'`));
    } else {
      const last = lit.slice(-1);
      const rest = lit.slice(0, -1);
      const next = pattern[i];
      if (next === "+" || next === "*" || next === "?" || next === "{") {
        if (rest) parts.push(`the literal text '${rest}'`);
        parts.push(attachQuantifier(`a literal '${last}'`));
      } else {
        parts.push(`the literal text '${lit}'`);
      }
    }
  }

  return parts.join(", ");
}

export function RegexToEnglish() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");

  function run() {
    try {
      // Validate regex but ignore result
      new RegExp(input);
      setOutput(describe(input));
    } catch (e) {
      setOutput(
        `Invalid regex: ${e instanceof Error ? e.message : "unknown error"}`
      );
    }
  }

  function copy() {
    if (output) navigator.clipboard?.writeText(output);
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700 mb-1 block">
          Regex pattern
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
        />
      </label>
      <button
        type="button"
        onClick={run}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
      >
        Explain
      </button>
      {output && (
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <p className="text-sm font-medium text-slate-700">Description</p>
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
            rows={6}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
