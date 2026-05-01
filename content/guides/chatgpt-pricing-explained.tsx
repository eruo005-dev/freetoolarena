import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    ChatGPT pricing in 2026 has Free, Plus, Pro, Team, Enterprise, plus the OpenAI API tiers.
    Here&rsquo;s the breakdown with the gotchas (rate-limit shifts, model-routing surprises) most
    explainers leave out.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Consumer plans</h2>
    <ul>
      <li><strong>Free</strong> &mdash; GPT-5 with caps (200 messages / 3 hours), reasoning router
        in &ldquo;Auto&rdquo; mode, basic voice mode. Generous starting tier.</li>
      <li><strong>Plus ($20/mo)</strong> &mdash; 5x more usage, Sora video, advanced voice mode,
        Code Interpreter, custom GPTs, image gen. Default paid tier.</li>
      <li><strong>Pro ($200/mo)</strong> &mdash; unlimited GPT-5 reasoning, o-Pro reasoning model,
        higher Sora caps, ChatGPT Atlas. Worth it for power users hammering reasoning daily.</li>
    </ul>

    <h2>Team / Enterprise</h2>
    <ul>
      <li><strong>Team ($25-30/seat/mo)</strong> &mdash; min 2 seats, admin console, no training
        on data, shared workspace.</li>
      <li><strong>Enterprise</strong> &mdash; SSO, SCIM, advanced controls, custom commitments. Sales
        contract.</li>
    </ul>

    <h2>API pricing (per 1M tokens)</h2>
    <ul>
      <li><strong>GPT-5:</strong> $2.50 / $10. Cache reads $1.25.</li>
      <li><strong>GPT-5 mini:</strong> $0.25 / $2.</li>
      <li><strong>GPT-5 nano:</strong> $0.05 / $0.40. Cheapest frontier-adjacent option.</li>
      <li><strong>GPT-4o:</strong> $2.50 / $10 &mdash; same as GPT-5; legacy.</li>
      <li><strong>o-pro reasoning:</strong> premium pricing, ~$15 / $60.</li>
      <li><strong>Embeddings:</strong> text-embedding-3-large $0.13/1M, small $0.02/1M.</li>
      <li><strong>Image gen:</strong> $0.04-0.19 per image.</li>
      <li><strong>Audio (Whisper):</strong> $0.006/min input.</li>
      <li><strong>Sora video:</strong> $0.30-0.50 per 5-second clip.</li>
      <li><strong>Batch (50% off):</strong> async 24h SLA.</li>
    </ul>

    <h2>Rate-limit gotchas</h2>
    <ul>
      <li>Tier 1 (after $5 funded): 30k TPM on GPT-5 &mdash; surprisingly low.</li>
      <li>Tiers auto-promote at $50, $100, $250, $1000 cumulative spend + 7 days.</li>
      <li>Plus daily caps tighten when servers are busy. Pro caps don&rsquo;t.</li>
    </ul>

    <h2>When each tier is worth it</h2>
    <ul>
      <li><strong>Free:</strong> light, casual users.</li>
      <li><strong>Plus $20:</strong> daily users; the value plan.</li>
      <li><strong>Pro $200:</strong> power users hammering GPT-5 reasoning + Sora.</li>
      <li><strong>API:</strong> any product or automated workflow.</li>
    </ul>
    <p>
      Compare: <a href="/compare/chatgpt-plus-vs-claude-pro">ChatGPT Plus vs Claude Pro</a>. Run
      cost math: <a href="/tools/gemini-vs-chatgpt-cost-calculator">Gemini vs ChatGPT</a>.
    </p>
  </>
);
