// Rewrite titles under 25 chars into keyword-rich 45-58 char titles.
// Uses per-category modifiers to preserve meaning while filling SERP pixels.
import { readFileSync, writeFileSync } from "node:fs";

let src = readFileSync("lib/pages.ts", "utf8");

// Parse PAGES entries to find short titles + their categories.
const pagesMatch = /export\s+const\s+PAGES\s*:\s*Page\[\]\s*=\s*\[/.exec(src);
const start = pagesMatch.index + pagesMatch[0].length;
let depth = 1, i = start, inStr = false, q = "", esc = false;
while (i < src.length && depth > 0) {
  const c = src[i];
  if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === q) inStr = false; }
  else if (c === '"' || c === "'" || c === "`") { inStr = true; q = c; }
  else if (c === "[") depth++;
  else if (c === "]") depth--;
  i++;
}
const body = src.slice(start, i - 1);

const entries = [];
let d = 0, s = -1, iS = false, qq = "", ee = false;
for (let j = 0; j < body.length; j++) {
  const c = body[j];
  if (iS) { if (ee) ee = false; else if (c === "\\") ee = true; else if (c === qq) iS = false; continue; }
  if (c === '"' || c === "'" || c === "`") { iS = true; qq = c; continue; }
  if (c === "{") { if (d === 0) s = j + 1; d++; }
  else if (c === "}") { d--; if (d === 0 && s !== -1) { entries.push({ text: body.slice(s, j), absStart: start + s }); s = -1; } }
}

// For each short-title entry, compute a better title.
// Strategy: map category → modifier templates. Pick one that reads naturally.
const MODIFIERS = {
  money: (title) => `${title} — Free Online Calculator (2026)`,
  automotive: (title) => `${title} — Free Online Auto Tool`,
  home: (title) => `${title} — Free Online Calculator`,
  health: (title) => `${title} — Free Health Calculator Online`,
  parenting: (title) => `${title} — Free Parenting Tool Online`,
  pets: (title) => `${title} — Free Pet Calculator Online`,
  cooking: (title) => `${title} — Free Kitchen Converter Online`,
  dev: (title) => `${title} — Free Developer Tool Online`,
  ai: (title) => `${title} — Free AI Tool Online`,
  gaming: (title) => `${title} — Free Gaming Calculator Online`,
  media: (title) => `${title} — Free Online Media Tool`,
  text: (title) => `${title} — Free Text Utility Online`,
  writing: (title) => `${title} — Free Writing Tool Online`,
  units: (title) => `${title} — Free Unit Converter Online`,
  random: (title) => `${title} — Free Random Generator Online`,
  coding: (title) => `${title} — Free Coding Tool Online`,
  career: (title) => `${title} — Free Career Tool Online`,
  social: (title) => `${title} — Free Online Tool`,
  converters: (title) => `${title} — Free Online Converter`,
  productivity: (title) => `${title} — Free Productivity Tool`,
};

// Shorter modifier fallback if the first-pass rewrite is still > 65 chars.
const SHORT_MOD = {
  money: (t) => `${t} — Free Calculator`,
  automotive: (t) => `${t} — Free Calculator`,
  home: (t) => `${t} — Free Calculator`,
  health: (t) => `${t} — Free Calculator`,
  parenting: (t) => `${t} — Free Calculator`,
  pets: (t) => `${t} — Free Calculator`,
  cooking: (t) => `${t} — Free Online`,
  dev: (t) => `${t} — Free Tool Online`,
  ai: (t) => `${t} — Free AI Tool`,
  gaming: (t) => `${t} — Free Calculator`,
  media: (t) => `${t} — Free Online`,
  text: (t) => `${t} — Free Online`,
  writing: (t) => `${t} — Free Tool`,
  units: (t) => `${t} — Free Converter`,
  random: (t) => `${t} — Free Online`,
  coding: (t) => `${t} — Free Tool`,
  career: (t) => `${t} — Free Tool`,
  social: (t) => `${t} — Free Online`,
  converters: (t) => `${t} — Free Converter`,
  productivity: (t) => `${t} — Free Tool`,
};

function rewrite(title, category) {
  const mod = MODIFIERS[category] ?? MODIFIERS.productivity;
  const shortMod = SHORT_MOD[category] ?? SHORT_MOD.productivity;
  const long = mod(title);
  // Prefer the long version if it fits 40-65; fall back to shorter otherwise.
  if (long.length >= 40 && long.length <= 65) return long;
  const short = shortMod(title);
  if (short.length >= 35 && short.length <= 65) return short;
  return long; // worst case
}

const CAT_RE = /category\s*:\s*"([^"]+)"/;
const TITLE_RE = /title\s*:\s*"([^"]+)"/;
const PUBLISHED_RE = /published\s*:\s*true\b/;
const TYPE_RE = /type\s*:\s*"(tool|article)"/;

// Only rewrite TOOLS, not guide articles (guide titles are usually "How to X" and already informative).
let patched = 0;
// Process entries in reverse order by absStart to preserve offsets when replacing.
const targets = [];
for (const e of entries) {
  const title = TITLE_RE.exec(e.text)?.[1];
  const cat = CAT_RE.exec(e.text)?.[1];
  const type = TYPE_RE.exec(e.text)?.[1];
  const pub = PUBLISHED_RE.test(e.text);
  if (!title || !cat || type !== "tool" || !pub) continue;
  if (title.length >= 25) continue;
  if (title.startsWith("How to")) continue;
  const newTitle = rewrite(title, cat);
  if (newTitle === title) continue;
  targets.push({ oldTitle: title, newTitle, absStart: e.absStart, textLen: e.text.length });
}

console.log(`Found ${targets.length} tools with short titles to rewrite`);

// Sort descending so earlier replacements don't shift later offsets.
targets.sort((a, b) => b.absStart - a.absStart);

for (const t of targets) {
  const entryText = src.slice(t.absStart, t.absStart + t.textLen);
  const newEntryText = entryText.replace(
    `title: "${t.oldTitle}"`,
    `title: "${t.newTitle.replace(/"/g, '\\"')}"`,
  );
  if (newEntryText === entryText) continue;
  src = src.slice(0, t.absStart) + newEntryText + src.slice(t.absStart + t.textLen);
  patched++;
}

writeFileSync("lib/pages.ts", src);
console.log(`rewrote ${patched} titles`);
