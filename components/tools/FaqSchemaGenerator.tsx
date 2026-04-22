"use client";

import { useMemo, useState } from "react";

type QA = { id: number; q: string; a: string };

let NEXT_ID = 3;

export function FaqSchemaGenerator() {
  const [items, setItems] = useState<QA[]>([
    {
      id: 1,
      q: "What is a FAQ schema?",
      a: "FAQ schema is JSON-LD structured data that tells Google the questions and answers on your page, enabling rich-result snippets in search.",
    },
    {
      id: 2,
      q: "Where do I paste the code?",
      a: "Paste the generated <script> tag into the <head> of the page that contains the visible FAQ content.",
    },
  ]);
  const [copied, setCopied] = useState(false);

  function update(id: number, patch: Partial<QA>) {
    setItems((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function add() {
    setItems((rows) => [...rows, { id: NEXT_ID++, q: "", a: "" }]);
  }

  function remove(id: number) {
    setItems((rows) => (rows.length > 1 ? rows.filter((r) => r.id !== id) : rows));
  }

  const jsonLd = useMemo(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items
        .filter((it) => it.q.trim() && it.a.trim())
        .map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
    };
    return JSON.stringify(data, null, 2);
  }, [items]);

  const scriptBlock = `<script type="application/ld+json">\n${jsonLd}\n</script>`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(scriptBlock);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  function download() {
    const html = `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8" />\n<title>FAQ Schema</title>\n${scriptBlock}\n</head>\n<body>\n</body>\n</html>\n`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "faq-schema.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        {items.map((it, i) => (
          <div key={it.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                Q&amp;A {i + 1}
              </p>
              <button
                type="button"
                onClick={() => remove(it.id)}
                disabled={items.length <= 1}
                className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                Remove
              </button>
            </div>
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Question
              </span>
              <input
                type="text"
                value={it.q}
                onChange={(e) => update(it.id, { q: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                Answer
              </span>
              <textarea
                value={it.a}
                onChange={(e) => update(it.id, { a: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </label>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
      >
        + Add question
      </button>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            JSON-LD script
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copy}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              onClick={download}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Download .html
            </button>
          </div>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">
          {scriptBlock}
        </pre>
      </div>
    </div>
  );
}
