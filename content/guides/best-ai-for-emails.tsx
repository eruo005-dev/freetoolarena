import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    AI for email in 2026 splits into in-inbox tools (Superhuman AI, Shortwave, Gemini in Gmail)
    and on-the-side tools (ChatGPT, Claude). The right pick depends on how much you want the AI
    inside your inbox vs out of it.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>By workflow</h2>
    <ul>
      <li><strong>Gmail users:</strong> Gemini in Gmail (free with Gemini Advanced or Workspace).
        Native, fast, learns your voice.</li>
      <li><strong>Power-user inbox:</strong> Superhuman AI ($30-40/mo). Drafts replies, summarizes
        threads, snoozes intelligently.</li>
      <li><strong>Apple Mail / Outlook:</strong> Shortwave ($35/mo) or Apple Intelligence (free
        with M-series Macs). Both add summarize + reply assist.</li>
      <li><strong>Long emails / careful drafting:</strong> Claude Pro on the side. Best at tone
        calibration when the stakes matter.</li>
      <li><strong>Bulk outreach (sales / cold):</strong> Lavender, Smartlead AI, or Instantly.
        Personalization at scale.</li>
    </ul>

    <h2>What works in practice</h2>
    <ul>
      <li><strong>Summarize a long thread:</strong> &ldquo;TL;DR + action items&rdquo; prompt to
        any flagship works perfectly.</li>
      <li><strong>Match a colleague&rsquo;s tone:</strong> paste 3 of their prior emails as
        examples, then ask for a reply. Claude wins on this consistently.</li>
      <li><strong>Difficult email (firing, conflict, hard ask):</strong> draft with Claude or
        ChatGPT, then sit on it for an hour and re-edit. Don&rsquo;t send AI&rsquo;s first draft.</li>
      <li><strong>Newsletter triage:</strong> Shortwave or Superhuman bundle them into one digest.</li>
    </ul>

    <h2>What doesn&rsquo;t work</h2>
    <ul>
      <li>Auto-replying to every email. AI can&rsquo;t reliably tell when a casual line was actually
        important.</li>
      <li>Letting the AI send without your review. Embarrassing mistakes are cheap to prevent.</li>
      <li>Asking for an &ldquo;email&rdquo; without context. AI emails read generic without
        examples and constraints.</li>
    </ul>

    <h2>Pricing</h2>
    <ul>
      <li>$0: Gemini in Gmail with free Gmail account; ChatGPT free; Claude free.</li>
      <li>$20: ChatGPT Plus, Claude Pro, or Gemini Advanced.</li>
      <li>$30-40: Superhuman or Shortwave for inbox-native.</li>
    </ul>
    <p>
      Related: <a href="/guides/how-to-write-professional-emails">how to write professional emails</a>.
    </p>
  </>
);
