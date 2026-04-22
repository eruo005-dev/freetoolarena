"use client";

import { useState } from "react";
import { SITE_EMAIL } from "@/lib/pages";

type Topic = "bug" | "request" | "correction" | "other";

interface TopicMeta {
  id: Topic;
  label: string;
  blurb: string;
  subject: string;
  placeholder: string;
}

const TOPICS: TopicMeta[] = [
  {
    id: "bug",
    label: "Something's broken",
    blurb: "A calculator gives wrong numbers, a button doesn't work, etc.",
    subject: "Bug report",
    placeholder:
      "What did you do, what did you expect, what actually happened? Browser + device helps.",
  },
  {
    id: "request",
    label: "Requesting a new tool",
    blurb: "Describe what the tool should do and how you'd use it.",
    subject: "Tool request",
    placeholder:
      "What should the tool calculate or convert? Who's it for? Where do existing tools fall short?",
  },
  {
    id: "correction",
    label: "Fact/content correction",
    blurb: "A number is wrong, a claim is outdated, a link is broken.",
    subject: "Content correction",
    placeholder:
      "Which sentence is wrong? What's the correct version? A source link helps.",
  },
  {
    id: "other",
    label: "Something else",
    blurb: "General feedback, press, partnerships we'd actually want.",
    subject: "Feedback",
    placeholder: "Tell us what's on your mind.",
  },
];

/**
 * Client-side feedback form. Because this site has no backend, submit
 * opens the user's email client with a pre-filled subject and body using
 * a mailto: link. That's deliberate:
 *
 *  - no third-party form service (no PII leaves the user's browser until
 *    they explicitly hit send in their mail app)
 *  - no spam-prone API endpoint to monitor
 *  - no GDPR data-processor agreement required
 *  - the reply goes straight to their real inbox so threading "just works"
 *
 * Trade-off: users on devices without a mail client see a fallback copy-to-
 * clipboard button with the same pre-filled content.
 */
export function FeedbackForm() {
  const [topic, setTopic] = useState<Topic>("bug");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const meta = TOPICS.find((t) => t.id === topic) ?? TOPICS[0];

  const body = buildBody({ topic: meta, url, message });

  const mailto = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
    `[${meta.subject}] ${url || "freetoolarena.com"}`,
  )}&body=${encodeURIComponent(body)}`;

  async function handleCopy() {
    const full = `To: ${SITE_EMAIL}\nSubject: [${meta.subject}] ${
      url || "freetoolarena.com"
    }\n\n${body}`;
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // older browsers — fall back to a prompt the user can copy from
      // eslint-disable-next-line no-alert
      window.prompt("Copy and email to " + SITE_EMAIL, full);
    }
  }

  return (
    <form
      aria-labelledby="feedback-heading"
      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
      onSubmit={(e) => {
        // Let the browser follow the mailto href naturally via the submit
        // button's href=… anchor — we don't need to prevent default here
        // because there's no button submitting the form itself.
        e.preventDefault();
      }}
    >
      <h2
        id="feedback-heading"
        className="mb-1 text-xl font-semibold text-slate-900"
      >
        Send us feedback
      </h2>
      <p className="mb-5 text-sm text-slate-600">
        Opens your email app with the details pre-filled — nothing is
        submitted through this page.
      </p>

      <fieldset className="mb-5">
        <legend className="mb-2 text-sm font-semibold text-slate-900">
          What's this about?
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {TOPICS.map((t) => (
            <label
              key={t.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition ${
                topic === t.id
                  ? "border-brand bg-brand/5 ring-1 ring-brand"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="topic"
                value={t.id}
                checked={topic === t.id}
                onChange={() => setTopic(t.id)}
                className="mt-0.5 h-4 w-4 border-slate-300 text-brand focus:ring-brand"
              />
              <span>
                <span className="block font-medium text-slate-900">
                  {t.label}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  {t.blurb}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-semibold text-slate-900">
          Page URL{" "}
          <span className="font-normal text-slate-500">(if applicable)</span>
        </span>
        <input
          type="text"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://freetoolarena.com/tools/..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </label>

      <label className="mb-5 block">
        <span className="mb-1 block text-sm font-semibold text-slate-900">
          Details
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={meta.placeholder}
          rows={5}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={mailto}
          className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
        >
          Open in email app →
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-brand hover:text-brand"
        >
          {copied ? "Copied ✓" : "Copy as email"}
        </button>
        <span className="text-xs text-slate-500">
          Goes to {SITE_EMAIL}
        </span>
      </div>
    </form>
  );
}

function buildBody({
  topic,
  url,
  message,
}: {
  topic: TopicMeta;
  url: string;
  message: string;
}): string {
  const parts: string[] = [];
  parts.push(`Topic: ${topic.label}`);
  if (url.trim()) parts.push(`Page: ${url.trim()}`);
  parts.push("");
  parts.push(message.trim() || "(no details provided)");
  parts.push("");
  parts.push("—");
  parts.push("Sent via the feedback form at /contact");
  return parts.join("\n");
}
