// Redistribute internal links so every weak-inlink page (≤1 in) gets at least
// 2 more inbound links from same-category published pages. Works by appending
// the weak slug into the related[] array of chosen donor pages.
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync("lib/pages.ts", "utf8");

// --- parse PAGES body ---
const m = /export\s+const\s+PAGES\s*:\s*Page\[\]\s*=\s*\[/.exec(src);
const start = m.index + m[0].length;
let depth = 1, i = start, inStr = false, q = "", esc = false;
while (i < src.length && depth > 0) {
  const c = src[i];
  if (inStr) {
    if (esc) esc = false;
    else if (c === "\\") esc = true;
    else if (c === q) inStr = false;
  } else if (c === '"' || c === "'" || c === "`") { inStr = true; q = c; }
  else if (c === "[") depth++;
  else if (c === "]") depth--;
  i++;
}
const body = src.slice(start, i - 1);

// --- split entries ---
const entries = [];
let d = 0, s = -1, isS = false, qq = "", ee = false;
for (let j = 0; j < body.length; j++) {
  const c = body[j];
  if (isS) {
    if (ee) ee = false;
    else if (c === "\\") ee = true;
    else if (c === qq) isS = false;
    continue;
  }
  if (c === '"' || c === "'" || c === "`") { isS = true; qq = c; continue; }
  if (c === "{") { if (d === 0) s = j + 1; d++; }
  else if (c === "}") { d--; if (d === 0 && s !== -1) { entries.push({ text: body.slice(s, j), startAbs: start + s, endAbs: start + j }); s = -1; } }
}

const parsed = entries.map((e) => {
  const t = e.text;
  const slug = /slug\s*:\s*"([a-z0-9-]+)"/.exec(t)?.[1];
  const type = /type\s*:\s*"(tool|article)"/.exec(t)?.[1];
  const cat = /category\s*:\s*"([^"]+)"/.exec(t)?.[1];
  const relMatch = /related\s*:\s*\[([\s\S]*?)\]/.exec(t);
  const relBlock = relMatch?.[1] ?? "";
  const relBlockStartInEntry = relMatch ? relMatch.index + relMatch[0].indexOf("[") + 1 : -1;
  const related = [...relBlock.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
  const pub = /published\s*:\s*true\b/.test(t);
  return { slug, type, cat, related, pub, relBlockAbsStart: e.startAbs + relBlockStartInEntry, relBlockLen: relBlock.length, relBlockText: relBlock };
}).filter((e) => e.slug && e.pub);

const pubSet = new Set(parsed.map((e) => e.slug));
const inlinks = new Map(parsed.map((e) => [e.slug, 0]));
for (const e of parsed) for (const r of e.related) if (pubSet.has(r)) inlinks.set(r, (inlinks.get(r) || 0) + 1);

const byCat = {};
for (const e of parsed) { (byCat[e.cat] = byCat[e.cat] || []).push(e); }

// Plan: for each weak page, pick 2 same-category donors with smallest current related[] length
// that don't already link to it. Record (donor-slug, weak-slug) pairs.
const weak = parsed.filter((e) => (inlinks.get(e.slug) ?? 0) <= 1);
console.log(`Weak pages to fix: ${weak.length}`);

const additions = new Map(); // donor-slug -> [weak-slug, ...]
const bumps = new Map(parsed.map((e) => [e.slug, e.related.length]));

for (const w of weak) {
  const pool = (byCat[w.cat] || []).filter((p) =>
    p.slug !== w.slug && !p.related.includes(w.slug) && bumps.get(p.slug) < 8
  );
  // Prefer pages that don't already have a queued addition for this weak, and
  // that have fewer current related to keep sizes balanced.
  pool.sort((a, b) => bumps.get(a.slug) - bumps.get(b.slug));
  const picks = pool.slice(0, 2);
  for (const p of picks) {
    if (!additions.has(p.slug)) additions.set(p.slug, []);
    additions.get(p.slug).push(w.slug);
    bumps.set(p.slug, (bumps.get(p.slug) || 0) + 1);
  }
}

// --- apply additions by rewriting each donor's related[] block ---
let srcOut = src;
let applied = 0;
// We must sort donors by file offset DESCENDING so we can rewrite tail-first and preserve earlier offsets.
const donorEntries = parsed.filter((p) => additions.has(p.slug)).sort((a, b) => b.relBlockAbsStart - a.relBlockAbsStart);

for (const d of donorEntries) {
  const adds = additions.get(d.slug);
  const block = d.relBlockText;
  const trimmed = block.trimEnd();
  const needsComma = trimmed.length > 0 && !trimmed.endsWith(",");
  const addStr = adds.map((s) => `"${s}"`).join(", ");
  const sep = trimmed.length === 0 ? "" : (needsComma ? ", " : " ");
  const newBlock = trimmed + sep + addStr;
  srcOut = srcOut.slice(0, d.relBlockAbsStart) + newBlock + srcOut.slice(d.relBlockAbsStart + d.relBlockLen);
  applied += adds.length;
}

writeFileSync("lib/pages.ts", srcOut);
console.log(`Applied ${applied} new related-list entries across ${donorEntries.length} donor pages`);
