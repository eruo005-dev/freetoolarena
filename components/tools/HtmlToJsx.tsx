"use client";

import { useMemo, useState } from "react";

const ATTR_MAP: Record<string, string> = {
  "class": "className",
  "for": "htmlFor",
  "tabindex": "tabIndex",
  "readonly": "readOnly",
  "maxlength": "maxLength",
  "minlength": "minLength",
  "colspan": "colSpan",
  "rowspan": "rowSpan",
  "autofocus": "autoFocus",
  "autocomplete": "autoComplete",
  "autoplay": "autoPlay",
  "contenteditable": "contentEditable",
  "crossorigin": "crossOrigin",
  "enctype": "encType",
  "novalidate": "noValidate",
  "spellcheck": "spellCheck",
  "srcset": "srcSet",
  "usemap": "useMap",
};

const VOID_TAGS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]);

function styleToObject(style: string): string {
  const parts = style.split(";").map((s) => s.trim()).filter(Boolean);
  const obj: string[] = [];
  for (const p of parts) {
    const idx = p.indexOf(":");
    if (idx === -1) continue;
    const key = p.slice(0, idx).trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const val = p.slice(idx + 1).trim();
    obj.push(`${key}: "${val}"`);
  }
  return `{{ ${obj.join(", ")} }}`;
}

function convertAttrs(attrs: string): string {
  const re = /([A-Za-z_:][-A-Za-z0-9_:.]*)(\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(attrs)) !== null) {
    const raw = m[1].toLowerCase();
    const val = m[3] ?? m[4] ?? m[5];
    const name = ATTR_MAP[raw] ?? raw;
    if (val === undefined) { out.push(name); continue; }
    if (raw === "style") out.push(`style=${styleToObject(val)}`);
    else out.push(`${name}="${val.replace(/"/g, "&quot;")}"`);
  }
  return out.length ? " " + out.join(" ") : "";
}

function convert(html: string): string {
  let s = html.replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/<([A-Za-z][A-Za-z0-9-]*)((?:\s[^<>]*)?)(\s*\/?)>/g, (_m, tag, attrs, close) => {
    const name = tag.toLowerCase();
    const converted = convertAttrs(attrs);
    if (VOID_TAGS.has(name) || close.includes("/")) return `<${name}${converted} />`;
    return `<${name}${converted}>`;
  });
  return s;
}

export function HtmlToJsx() {
  const [input, setInput] = useState(`<div class="card" style="padding: 16px; color: #111">\n  <label for="name">Name</label>\n  <input type="text" id="name" tabindex="1" autofocus />\n  <br>\n  <img src="logo.png" alt="Logo" class="h-8" />\n</div>`);
  const [copied, setCopied] = useState(false);

  const out = useMemo(() => convert(input), [input]);

  function copy() {
    navigator.clipboard?.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">HTML</span>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs" />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">JSX</span>
        <textarea readOnly value={out} rows={8} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs bg-slate-50" />
      </label>
      <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
        {copied ? "Copied" : "Copy JSX"}
      </button>
    </div>
  );
}
