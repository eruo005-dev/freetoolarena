"use client";

import { useState, useMemo } from "react";

export function HtmlToMarkdown() {
  const [html, setHtml] = useState(`<h1>Hello, world</h1>
<p>A <strong>free</strong> HTML to <em>Markdown</em> converter.</p>
<ul>
  <li>Runs in your browser</li>
  <li>No uploads, no ads</li>
  <li>Handles <a href="https://example.com">links</a> and <code>code</code></li>
</ul>
<blockquote>Paste HTML, copy Markdown.</blockquote>`);

  const { md, error } = useMemo(() => {
    try {
      if (typeof DOMParser === "undefined") {
        return { md: "", error: "Browser APIs not available — try reloading." };
      }
      return { md: htmlToMd(html), error: null };
    } catch (e: any) {
      return { md: "", error: e.message || "Parse error" };
    }
  }, [html]);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            HTML input
          </p>
          <button
            type="button"
            onClick={() => setHtml("")}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            Clear
          </button>
        </div>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={10}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Markdown output
          </p>
          <button
            type="button"
            disabled={!md}
            onClick={() => navigator.clipboard?.writeText(md)}
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
            value={md}
            readOnly
            rows={10}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm"
          />
        )}
      </div>
      <p className="text-xs text-slate-500">
        Supports headings (h1–h6), bold, italic, links, images, ordered and
        unordered lists, blockquotes, inline code, code blocks, and horizontal
        rules. Tables and complex nested HTML may need manual cleanup.
      </p>
    </div>
  );
}

function htmlToMd(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const md = render(doc.body).trim();
  // Collapse 3+ blank lines to 2.
  return md.replace(/\n{3,}/g, "\n\n");
}

function render(node: Node, listDepth = 0, orderedIndex?: number): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return (node.textContent || "").replace(/[ \t\r\n]+/g, " ");
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return "";
  const el = node as Element;
  const tag = el.tagName.toLowerCase();
  const children = () =>
    Array.from(el.childNodes).map((c) => render(c, listDepth)).join("");

  switch (tag) {
    case "h1":
      return `\n\n# ${inline(el)}\n\n`;
    case "h2":
      return `\n\n## ${inline(el)}\n\n`;
    case "h3":
      return `\n\n### ${inline(el)}\n\n`;
    case "h4":
      return `\n\n#### ${inline(el)}\n\n`;
    case "h5":
      return `\n\n##### ${inline(el)}\n\n`;
    case "h6":
      return `\n\n###### ${inline(el)}\n\n`;
    case "p":
      return `\n\n${inline(el)}\n\n`;
    case "br":
      return "  \n";
    case "hr":
      return "\n\n---\n\n";
    case "strong":
    case "b":
      return `**${children()}**`;
    case "em":
    case "i":
      return `*${children()}*`;
    case "del":
    case "s":
      return `~~${children()}~~`;
    case "code":
      if (el.parentElement?.tagName.toLowerCase() === "pre") return children();
      return `\`${el.textContent || ""}\``;
    case "pre": {
      const code = el.querySelector("code");
      const lang = code?.className.match(/language-([\w-]+)/)?.[1] || "";
      const text = (code?.textContent || el.textContent || "").replace(/\n+$/, "");
      return `\n\n\`\`\`${lang}\n${text}\n\`\`\`\n\n`;
    }
    case "a": {
      const href = (el as HTMLAnchorElement).getAttribute("href") || "";
      const text = children().trim() || href;
      return href ? `[${text}](${href})` : text;
    }
    case "img": {
      const src = (el as HTMLImageElement).getAttribute("src") || "";
      const alt = (el as HTMLImageElement).getAttribute("alt") || "";
      return src ? `![${alt}](${src})` : "";
    }
    case "ul": {
      const items = Array.from(el.children)
        .filter((c) => c.tagName.toLowerCase() === "li")
        .map((li) => {
          const indent = "  ".repeat(listDepth);
          return `${indent}- ${inline(li, listDepth + 1)}`;
        })
        .join("\n");
      return `\n\n${items}\n\n`;
    }
    case "ol": {
      const items = Array.from(el.children)
        .filter((c) => c.tagName.toLowerCase() === "li")
        .map((li, i) => {
          const indent = "  ".repeat(listDepth);
          return `${indent}${i + 1}. ${inline(li, listDepth + 1)}`;
        })
        .join("\n");
      return `\n\n${items}\n\n`;
    }
    case "li":
      return inline(el, listDepth);
    case "blockquote": {
      const body = children().trim();
      return `\n\n${body.split("\n").map((l) => `> ${l}`).join("\n")}\n\n`;
    }
    case "script":
    case "style":
    case "noscript":
      return "";
    default:
      return children();
  }
}

function inline(el: Element, listDepth = 0): string {
  return Array.from(el.childNodes)
    .map((c) => render(c, listDepth))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}
