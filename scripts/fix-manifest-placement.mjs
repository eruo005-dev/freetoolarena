// Move the 100 manifest entries currently stranded after PAGES closes into the PAGES array.
import { readFileSync, writeFileSync } from "node:fs";

let src = readFileSync("lib/pages.ts", "utf8");

// 1. Find the stranded block — starts at `  { slug: "how-to-use-ollama",` and ends at the last `];` before the helpers section.
const blockStart = src.indexOf('  { slug: "how-to-use-ollama", type: "article"');
if (blockStart === -1) throw new Error("Stranded block not found");

// Find the end: the next `];` (closing the inserted block before helpers)
// Scan forward character by character to find `];\n` after the block.
let idx = blockStart;
// Forward search for `];` that is aligned to column 0 (no indentation) — means it's a bracket-closing.
const endMatch = src.slice(blockStart).match(/\n\];\n/);
if (!endMatch) throw new Error("End of stranded block not found");
const blockEnd = blockStart + endMatch.index + 1; // position of `];` start

const block = src.slice(blockStart, blockEnd); // includes trailing newline before `];`
console.log("stranded block bytes:", block.length);

// 2. Remove stranded block + its trailing `];`
src = src.slice(0, blockStart) + src.slice(blockEnd + 3); // +3 for `];\n`

// 3. Find PAGES closing `];` — locate via the anchor line before it.
// We'll find `export const PAGES: Page[] = [` and walk brackets.
const pagesStart = src.indexOf("export const PAGES: Page[] = [");
if (pagesStart === -1) throw new Error("PAGES not found");
// Walk forward tracking bracket depth, starting at the `[`.
const openBracket = src.indexOf("[", pagesStart);
let depth = 1, i = openBracket + 1, inStr = false, q = "", esc = false;
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
if (depth !== 0) throw new Error("Unbalanced PAGES brackets");
// i now points to 1 past the `]`. The `;` follows.
const pagesClose = i - 1; // position of `]`
console.log("PAGES closes at offset:", pagesClose, "(char:", src.slice(pagesClose, pagesClose + 3), ")");

// 4. Insert block just before the `]` of PAGES.
src = src.slice(0, pagesClose) + block + src.slice(pagesClose);
writeFileSync("lib/pages.ts", src);
console.log("fixed: stranded block moved into PAGES array");
