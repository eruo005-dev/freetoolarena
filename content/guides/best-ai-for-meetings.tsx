import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Meeting AI in 2026 has settled into clear leaders: Granola for note-takers, Otter for
    transcripts at scale, Fellow + Gemini for Workspace teams, and Fireflies for cross-platform.
    The right pick depends on whether you record live, want a notebook companion, or need
    enterprise integration.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The 2026 leaders</h2>
    <ul>
      <li><strong>Granola</strong> &mdash; AI notebook for in-meeting note-taking. You jot
        bullets, AI fills the rest from audio. Solo focus.</li>
      <li><strong>Otter.ai</strong> &mdash; transcripts + summaries at scale, integrates with
        Zoom, Teams, Meet. Strong free tier.</li>
      <li><strong>Fireflies.ai</strong> &mdash; cross-platform recorder, big enterprise CRM
        sync (Salesforce, HubSpot).</li>
      <li><strong>Fellow</strong> &mdash; meeting agendas + AI notes. Strong for managers who run
        recurring 1:1s.</li>
      <li><strong>Gemini in Meet / Microsoft Copilot in Teams</strong> &mdash; native, free with
        the suite, basic but improving.</li>
      <li><strong>Read.ai</strong> &mdash; meeting analytics + sentiment.</li>
    </ul>

    <h2>By scenario</h2>
    <ul>
      <li><strong>Solo founder / consultant:</strong> Granola ($14/mo). Best for taking your own
        notes during the call.</li>
      <li><strong>Sales team:</strong> Fireflies or Gong ($60-100/seat). CRM sync, deal
        intelligence.</li>
      <li><strong>Managers running 1:1s + team meetings:</strong> Fellow ($7-15/seat). Agenda +
        action items.</li>
      <li><strong>Workspace team:</strong> Gemini in Meet (included with Workspace). Free, good
        enough.</li>
      <li><strong>Recording everything for self-coaching:</strong> Otter Pro ($17/mo).</li>
    </ul>

    <h2>The privacy reality</h2>
    <p>
      Most meeting AI tools record participants. In two-party-consent jurisdictions (CA, FL, IL,
      WA, MA, MD, MT, NV, NH, PA), you must announce the recording explicitly and get verbal
      consent. The polite version: &ldquo;I&rsquo;ll have AI taking notes &mdash; OK with you?&rdquo;
      at the start of the call.
    </p>

    <h2>Privacy-first picks</h2>
    <ul>
      <li><strong>Local-only:</strong> Granola (transcripts can be local-only on Plus).</li>
      <li><strong>Self-host:</strong> Whisper (OpenAI) running locally + your own summarization
        prompt against any local LLM via <a href="/guides/how-to-use-ollama">Ollama</a>.</li>
    </ul>

    <h2>Pricing</h2>
    <ul>
      <li>$0: Gemini in Meet, Microsoft Copilot in Teams (with Workspace / 365 license).</li>
      <li>$10-20: Otter Pro, Granola Pro.</li>
      <li>$15-25/seat: Fellow, Fireflies for teams.</li>
      <li>$60-100/seat: Gong, Chorus for sales-grade.</li>
    </ul>
  </>
);
