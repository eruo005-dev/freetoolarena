// Link audit — finds orphans, weak inlinks, and missing related relationships.
// Usage: node scripts/audit-links.mjs
//
// Runs against the raw text of lib/pages.ts (no ts import step needed). We
// parse each `{ slug: "...", ..., related: [...] }` block via regex, since
// the manifest is flat JS and consistent.

import fs from "node:fs";

const src = fs.readFileSync("lib/pages.ts", "utf8");

// Crude but sufficient — grabs each `slug: "..."` and the next `related: [...]`.
// The manifest is deterministic enough that this works across all 550+ entries.
const entries = [];
const slugRe = /\{\s*slug:\s*"([a-z0-9-]+)"[\s\S]*?type:\s*"(tool|article)"[\s\S]*?related:\s*\[([^\]]*)\][\s\S]*?published:\s*(true|false)/g;
let m;
while ((m = slugRe.exec(src)) !== null) {
  const [, slug, type, relatedBlock, published] = m;
  const related = [...relatedBlock.matchAll(/"([a-z0-9-]+)"/g)].map((mm) => mm[1]);
  entries.push({ slug, type, related, published: published === "true" });
}

const publishedMap = new Map(entries.filter((e) => e.published).map((e) => [e.slug, e]));

// Inlink count: for each published page, how many OTHER published pages list it in related[].
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
    broken.push({ slug: e.slug, dead: invalidOut });
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
  console.log(orphans.slice(0, 20).join("\n"));
}

if (broken.length) {
  console.log("\n=== BROKEN RELATED (first 20) ===");
  broken.slice(0, 20).forEach((b) => console.log(`${b.slug}: ${b.dead.join(", ")}`));
}

if (thinOut.length) {
  console.log("\n=== THIN OUTLINKS (first 30) ===");
  thinOut.slice(0, 30).forEach((t) => console.log(`${t.slug}: ${t.outlinks} valid out`));
}

console.log("\n=== WEAK INLINK SAMPLE (first 20, slug / count) ===");
weakInlink
  .sort((a, b) => a.inlinks - b.inlinks)
  .slice(0, 20)
  .forEach((w) => console.log(`${w.slug}: ${w.inlinks}`));
