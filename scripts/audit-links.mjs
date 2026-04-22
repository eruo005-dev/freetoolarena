// Link audit — finds orphans, weak inlinks, broken related refs, thin outlinks.
// Usage: node scripts/audit-links.mjs  [--verbose]
//
// Parses lib/pages.ts by scanning the PAGES array region only, then splitting
// each entry on its outer braces. Previous versions used a single greedy regex
// that silently skipped entries missing the optional `published` field, which
// produced false-positive broken refs (e.g., tip-calculator) and orphans (e.g.,
// GUIDE_CATEGORIES.ai). This one extracts the array body first, then walks
// entry-by-entry via depth-1 brace tracking, so optional fields can't break it.

import fs from "node:fs";
import path from "node:path";

const args = new Set(process.argv.slice(2));
const VERBOSE = args.has("--verbose");

const src = fs.readFileSync(path.resolve("lib/pages.ts"), "utf8");

/**
 * Extract the substring between `export const PAGES: Page[] = [` (or similar)
 * and its closing `];`. Returns the contents without the outer brackets.
 */
function extractPagesArrayBody(source) {
  const m = /export\s+const\s+PAGES\s*:\s*Page\[\]\s*=\s*\[/.exec(source);
  if (!m) throw new Error("Could not find `export const PAGES: Page[] = [`");
  const start = m.index + m[0].length;
  // Walk forward tracking bracket depth starting at 1 (we're inside [ ).
  let depth = 1;
  let i = start;
  let inString = false;
  let quote = "";
  let escape = false;
  while (i < source.length && depth > 0) {
    const ch = source[i];
    if (inString) {
      if (escape) escape = false;
      else if (ch === "\\") escape = true;
      else if (ch === quote) inString = false;
    } else if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      quote = ch;
    } else if (ch === "[") depth++;
    else if (ch === "]") depth--;
    i++;
  }
  if (depth !== 0) throw new Error("Unbalanced brackets in PAGES array");
  return source.slice(start, i - 1);
}

/**
 * Split a flat list of `{...}, {...}, ...` into an array of entry bodies
 * (the stuff between { and } for each top-level object). Honors string
 * literals and nested brackets so arrays inside entries don't confuse it.
 */
function splitEntries(body) {
  const entries = [];
  let depth = 0;
  let start = -1;
  let inString = false;
  let quote = "";
  let escape = false;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (inString) {
      if (escape) escape = false;
      else if (ch === "\\") escape = true;
      else if (ch === quote) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === "{") {
      if (depth === 0) start = i + 1;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && start !== -1) {
        entries.push(body.slice(start, i));
        start = -1;
      }
    }
  }
  return entries;
}

/**
 * Parse a single entry body into a minimal record. Missing `published` defaults
 * to false (matching the TypeScript reality — only entries that explicitly say
 * published: true are live).
 */
function parseEntry(entry) {
  const slug = /slug\s*:\s*"([a-z0-9-]+)"/.exec(entry)?.[1] ?? null;
  const type = /type\s*:\s*"(tool|article)"/.exec(entry)?.[1] ?? null;
  const relBlock = /related\s*:\s*\[([\s\S]*?)\]/.exec(entry)?.[1] ?? "";
  const related = [...relBlock.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
  const published = /published\s*:\s*true\b/.test(entry);
  return { slug, type, related, published };
}

const entries = splitEntries(extractPagesArrayBody(src))
  .map(parseEntry)
  .filter((e) => e.slug && e.type);

const allMap = new Map(entries.map((e) => [e.slug, e]));
const publishedMap = new Map(entries.filter((e) => e.published).map((e) => [e.slug, e]));

// Inlink count: for each published page, how many OTHER published pages
// list it in related[].
const inlinks = new Map();
for (const e of publishedMap.values()) inlinks.set(e.slug, 0);
for (const e of publishedMap.values()) {
  for (const r of e.related) {
    if (publishedMap.has(r)) {
      inlinks.set(r, (inlinks.get(r) || 0) + 1);
    }
  }
}

// 1. Orphans: pages with 0 inlinks AND 0 outlinks to published pages.
const orphans = [];
// 2. Weak: pages with ≤1 inlink.
const weakInlink = [];
// 3. Thin-out: pages with <3 valid published outlinks.
const thinOut = [];
// 4. Broken: related entries pointing at unknown or unpublished slugs.
const broken = [];

for (const e of publishedMap.values()) {
  const validOut = e.related.filter((r) => publishedMap.has(r));
  const invalidOut = e.related.filter((r) => !publishedMap.has(r));
  if (invalidOut.length) {
    // Classify further: does the slug exist but is unpublished, or is it
    // entirely unknown? Unknown is a typo; unpublished-ref is a cleanup.
    const classified = invalidOut.map((r) =>
      allMap.has(r) ? `${r}(unpublished)` : `${r}(missing)`,
    );
    broken.push({ slug: e.slug, dead: classified });
  }
  if (validOut.length === 0 && inlinks.get(e.slug) === 0) orphans.push(e.slug);
  if (inlinks.get(e.slug) <= 1) weakInlink.push({ slug: e.slug, inlinks: inlinks.get(e.slug) });
  if (validOut.length < 3) thinOut.push({ slug: e.slug, outlinks: validOut.length });
}

console.log(`Total parsed: ${entries.length}`);
console.log(`Published: ${publishedMap.size}`);
console.log(`Pure orphans (0 in, 0 out): ${orphans.length}`);
console.log(`Weak inlinks (≤1 in): ${weakInlink.length}`);
console.log(`Thin outlinks (<3 valid out): ${thinOut.length}`);
console.log(`Pages with broken related refs: ${broken.length}`);

if (orphans.length) {
  console.log("\n=== ORPHANS ===");
  console.log((VERBOSE ? orphans : orphans.slice(0, 30)).join("\n"));
}

if (broken.length) {
  console.log(`\n=== BROKEN RELATED (${VERBOSE ? broken.length : Math.min(30, broken.length)} of ${broken.length}) ===`);
  (VERBOSE ? broken : broken.slice(0, 30)).forEach((b) =>
    console.log(`${b.slug}: ${b.dead.join(", ")}`),
  );
}

if (thinOut.length) {
  console.log(`\n=== THIN OUTLINKS (${VERBOSE ? thinOut.length : Math.min(30, thinOut.length)} of ${thinOut.length}) ===`);
  (VERBOSE ? thinOut : thinOut.slice(0, 30)).forEach((t) =>
    console.log(`${t.slug}: ${t.outlinks} valid out`),
  );
}

const weakSorted = weakInlink.sort((a, b) => a.inlinks - b.inlinks);
console.log(`\n=== WEAK INLINK (${VERBOSE ? weakSorted.length : Math.min(40, weakSorted.length)} of ${weakSorted.length}, slug / count) ===`);
(VERBOSE ? weakSorted : weakSorted.slice(0, 40)).forEach((w) =>
  console.log(`${w.slug}: ${w.inlinks}`),
);
