import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Customer support AI in 2026 means three things: agent assistants (Intercom Fin, Zendesk AI),
    knowledge-grounded bots (Kapa.ai, Inkeep), and full autonomous resolution (Decagon, Sierra).
    The right pick depends on volume, channel, and how much you want the AI to act vs assist.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The 2026 customer support stack</h2>
    <ul>
      <li><strong>Intercom Fin</strong> &mdash; agent assistant + autonomous resolution. The
        incumbent in B2B SaaS support.</li>
      <li><strong>Zendesk AI Agent</strong> &mdash; tight integration with Zendesk ticketing.
        Strong for established support teams.</li>
      <li><strong>Decagon</strong> &mdash; autonomous-first resolution agent for tier-1 tickets.</li>
      <li><strong>Sierra</strong> &mdash; voice-first AI agents from former Salesforce execs.</li>
      <li><strong>Kapa.ai / Inkeep</strong> &mdash; docs-grounded chatbots embedded in your product.</li>
    </ul>

    <h2>Build vs buy</h2>
    <p>
      For most support teams, <strong>buy</strong>. Intercom Fin or Zendesk AI deploy in days; a
      custom Claude/GPT-5 RAG bot takes weeks plus ongoing maintenance. Build only if you have
      unusual privacy requirements, very specific tooling needs, or you&rsquo;re a developer-tools
      company where the support flow is your IP.
    </p>

    <h2>Underlying models</h2>
    <p>
      Most CS AI tools route to Claude Sonnet, GPT-5, or Gemini under the hood. Quality differences
      between them are smaller than the differences between the products built on them &mdash; pick
      based on the integration / UX, not the model.
    </p>

    <h2>Realistic expectations</h2>
    <ul>
      <li><strong>Tier-1 tickets:</strong> AI can autonomously resolve 30-60% of common questions
        with knowledge-grounded RAG.</li>
      <li><strong>Tier-2:</strong> Best as agent-assist (drafts replies, suggests next steps).</li>
      <li><strong>Edge cases / churn-risk:</strong> Always human. AI can summarize the context for
        the human agent.</li>
    </ul>

    <h2>Pricing</h2>
    <ul>
      <li>Intercom Fin / Zendesk AI: $0.25-1 per resolution.</li>
      <li>Decagon / Sierra: enterprise pricing, $50k+/yr.</li>
      <li>DIY (Claude API + RAG): $50-500/mo depending on volume.</li>
    </ul>
    <p>
      Use the <a href="/tools/ai-cost-estimator">AI cost estimator</a> to budget a DIY setup.
    </p>
  </>
);
