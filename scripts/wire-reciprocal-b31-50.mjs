// Append guide slug to target tool's related[] array in lib/pages.ts
import { readFileSync, writeFileSync } from "node:fs";

const pairs = [
  ["markdown-table-generator", "how-to-format-markdown-tables"],
  ["html-to-markdown", "how-to-convert-html-to-markdown"],
  ["lorem-ipsum-generator", "how-to-use-lorem-ipsum"],
  ["html-formatter", "how-to-format-html"],
  ["xml-formatter", "how-to-format-xml"],
  ["yaml-formatter", "how-to-format-yaml"],
  ["diff-checker", "how-to-diff-two-files"],
  ["text-summarizer", "how-to-summarize-long-text"],
  ["readability-score-checker", "how-to-improve-readability-scores"],
  ["keyword-density-checker", "how-to-analyze-keyword-density"],
  ["meta-description-length-checker", "how-to-write-meta-descriptions"],
  ["title-tag-length-checker", "how-to-write-title-tags"],
  ["serp-snippet-preview", "how-to-preview-serp-snippets"],
  ["open-graph-generator", "how-to-configure-open-graph-tags"],
  ["robots-txt-generator", "how-to-write-robots-txt"],
  ["schema-markup-generator", "how-to-add-schema-markup"],
  ["sitemap-url-generator", "how-to-build-an-xml-sitemap"],
  ["utm-builder", "how-to-build-utm-links"],
  ["utm-parser", "how-to-parse-utm-parameters"],
  ["query-string-parser", "how-to-parse-query-strings"],
  ["url-cleaner", "how-to-clean-tracking-urls"],
  ["url-parser", "how-to-parse-urls"],
  ["user-agent-parser", "how-to-parse-user-agents"],
  ["mime-type-lookup", "how-to-look-up-mime-types"],
  ["http-status-code-lookup", "how-to-understand-http-status-codes"],
  ["hash-generator", "how-to-generate-secure-hashes"],
  ["caesar-cipher", "how-to-use-classical-ciphers"],
  ["binary-text-encoder", "how-to-encode-text-to-binary"],
  ["morse-code-translator", "how-to-read-and-send-morse-code"],
  ["roman-numeral-converter", "how-to-read-roman-numerals"],
  ["base64-encoder-decoder", "how-to-use-base64-encoding"],
  ["ratio-calculator", "how-to-calculate-ratios"],
  ["fraction-calculator", "how-to-work-with-fractions"],
  ["average-calculator", "how-to-calculate-averages"],
  ["prime-number-checker", "how-to-check-prime-numbers"],
  ["cron-expression-explainer", "how-to-read-cron-expressions"],
  ["regex-tester", "how-to-test-regex-patterns"],
  ["regex-to-english", "how-to-translate-regex-to-english"],
  ["temperature-converter", "how-to-convert-temperatures"],
  ["length-converter", "how-to-convert-length-units"],
  ["weight-converter", "how-to-convert-weight-units"],
  ["area-converter", "how-to-convert-area-units"],
  ["volume-converter", "how-to-convert-volume-units"],
  ["data-size-converter", "how-to-convert-data-sizes"],
  ["cooking-converter", "how-to-convert-cooking-measurements"],
  ["unix-timestamp-converter", "how-to-work-with-unix-timestamps"],
  ["discord-timestamp", "how-to-use-discord-timestamps"],
  ["image-compressor", "how-to-compress-images"],
  ["image-cropper", "how-to-crop-images-for-web"],
  ["image-border-adder", "how-to-add-image-borders"],
  ["gif-maker", "how-to-create-gifs"],
  ["video-to-gif", "how-to-convert-video-to-gif"],
  ["video-trimmer", "how-to-trim-videos"],
  ["video-mute", "how-to-remove-audio-from-video"],
  ["video-frame-extractor", "how-to-extract-video-frames"],
  ["audio-trimmer", "how-to-trim-audio"],
  ["audio-speed-changer", "how-to-change-audio-speed"],
  ["speech-to-text", "how-to-transcribe-speech-to-text"],
  ["text-to-speech", "how-to-convert-text-to-speech"],
];

const path = "lib/pages.ts";
let src = readFileSync(path, "utf8");
let patched = 0;
let skipped = 0;
let missing = [];

for (const [tool, guide] of pairs) {
  // Find the tool's declaration block — start with { slug: "tool", ...
  const slugRe = new RegExp(`\\{\\s*slug:\\s*"${tool}"[^}]*?related:\\s*\\[([^\\]]*)\\]`, "s");
  const m = src.match(slugRe);
  if (!m) {
    missing.push(tool);
    continue;
  }
  if (m[1].includes(`"${guide}"`)) {
    skipped++;
    continue;
  }
  const newRelated = m[1].trimEnd();
  const hasItems = newRelated.length > 0 && newRelated !== "";
  const sep = hasItems ? (newRelated.endsWith(",") ? " " : ", ") : "";
  const replacement = m[0].replace(
    `related: [${m[1]}]`,
    `related: [${m[1]}${sep}"${guide}"]`,
  );
  src = src.replace(m[0], replacement);
  patched++;
}

writeFileSync(path, src);
console.log(`patched: ${patched}, skipped: ${skipped}, missing: ${missing.length}`);
if (missing.length) console.log("missing tools:", missing.join(", "));
