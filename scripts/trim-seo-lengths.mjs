// Trim titles >65 chars and descriptions >165 chars in lib/pages.ts
// without losing their intent. Rules:
//  - Titles: split on " — " (em-dash + spaces); keep the most informative half.
//  - Descriptions: break at the last period/comma/em-dash before the limit.
import { readFileSync, writeFileSync } from "node:fs";

let src = readFileSync("lib/pages.ts", "utf8");

const MAX_TITLE = 65;
const MAX_DESC = 165;

function smartTrimTitle(t) {
  if (t.length <= MAX_TITLE) return t;
  // If there's an em-dash subtitle, drop the subtitle.
  if (t.includes(" — ")) {
    const head = t.split(" — ")[0];
    if (head.length <= MAX_TITLE && head.length >= 20) return head;
  }
  // Try to cut at the last word boundary before the limit.
  const cutoff = t.lastIndexOf(" ", MAX_TITLE - 1);
  if (cutoff > 20) return t.slice(0, cutoff);
  return t.slice(0, MAX_TITLE - 1);
}

function smartTrimDesc(d) {
  if (d.length <= MAX_DESC) return d;
  // Prefer cutting at period, then em-dash/comma, within the last 30 chars.
  const windowStart = Math.max(0, MAX_DESC - 30);
  const slice = d.slice(0, MAX_DESC);
  // last period in the slice (that ends a sentence)
  for (const terminator of [". ", " — ", ", "]) {
    const idx = slice.lastIndexOf(terminator);
    if (idx >= windowStart && idx < MAX_DESC) {
      return d.slice(0, idx + (terminator === ". " ? 1 : 0)).trim();
    }
  }
  // Fallback: cut at last word boundary.
  const cutoff = slice.lastIndexOf(" ");
  if (cutoff >= windowStart) return d.slice(0, cutoff).trim();
  return d.slice(0, MAX_DESC).trim();
}

let titleTrims = 0;
let descTrims = 0;

// Walk each title: and description: line. Conservative regex that only matches
// single-line "..." strings (which is how every manifest entry is formatted).
src = src.replace(/(title:\s*)"((?:\\"|[^"])+)"/g, (m, pre, val) => {
  const raw = val.replace(/\\"/g, '"');
  if (raw.length <= MAX_TITLE) return m;
  const next = smartTrimTitle(raw);
  if (next === raw) return m;
  titleTrims++;
  return `${pre}"${next.replace(/"/g, '\\"')}"`;
});

src = src.replace(/(description:\s*)"((?:\\"|[^"])+)"/g, (m, pre, val) => {
  const raw = val.replace(/\\"/g, '"');
  if (raw.length <= MAX_DESC) return m;
  const next = smartTrimDesc(raw);
  if (next === raw) return m;
  descTrims++;
  return `${pre}"${next.replace(/"/g, '\\"')}"`;
});

writeFileSync("lib/pages.ts", src);
console.log(`trimmed: ${titleTrims} titles, ${descTrims} descriptions`);
