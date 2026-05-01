import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    DeepSeek pricing in 2026 is the cheapest frontier-class API on the market. V3.2 sits at
    $0.27/$1.10 per 1M tokens; off-peak hours drop to $0.135/$0.55. R1 reasoning sits at
    $0.55/$2.19. Plus the consumer chat is free. Here&rsquo;s the full breakdown.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Consumer chat</h2>
    <ul>
      <li><strong>chat.deepseek.com</strong> &mdash; free. V3.2 + R1 access. No account required for
        light use.</li>
    </ul>

    <h2>API pricing (per 1M tokens, USD)</h2>
    <ul>
      <li><strong>DeepSeek V3.2 (chat):</strong> $0.27 input / $1.10 output. Cache miss; cache hit
        $0.027 (90% off cached).</li>
      <li><strong>DeepSeek V3.2 off-peak (UTC 16:30-00:30):</strong> $0.135 / $0.55. Half off.</li>
      <li><strong>DeepSeek R1 (reasoning):</strong> $0.55 / $2.19. Off-peak: $0.275 / $1.10.</li>
      <li><strong>R1 reasoner output:</strong> includes thinking tokens at output rate &mdash;
        budget for ~5x the visible answer length.</li>
    </ul>

    <h2>What you get</h2>
    <ul>
      <li>OpenAI-compatible SDK &mdash; drop-in replacement (<code>base_url=&quot;https://api.deepseek.com&quot;</code>).</li>
      <li>Tool use, JSON mode, structured outputs.</li>
      <li>128k context window.</li>
      <li>Open weights for self-host.</li>
    </ul>

    <h2>The cost story vs competitors</h2>
    <ul>
      <li>vs Claude Sonnet 4.6 ($3 / $15): <strong>~10x cheaper</strong>.</li>
      <li>vs GPT-5 ($2.50 / $10): <strong>~9x cheaper</strong>.</li>
      <li>vs Gemini 2.5 Pro ($1.25 / $5): <strong>~5x cheaper</strong>.</li>
      <li>R1 vs o-pro reasoning: <strong>~30x cheaper</strong>.</li>
    </ul>

    <h2>Privacy realism</h2>
    <p>
      The DeepSeek cloud API routes through Chinese infrastructure. For most non-sensitive workloads
      this is fine; for regulated data (HIPAA, SOC 2 customers) most teams self-host the open weights
      instead. V3.2 is large (671B MoE) so a Hyperspace pod or rented cloud GPU is needed; smaller
      distilled versions run on commodity hardware.
    </p>

    <h2>When DeepSeek wins</h2>
    <ul>
      <li>High-volume API workloads where total cost matters.</li>
      <li>Agentic loops at scale.</li>
      <li>Embedding pre-processing pipelines.</li>
      <li>Reasoning chains where R1&rsquo;s thinking-token economics make it cheap to over-think.</li>
      <li>Anyone willing to self-host the open weights for privacy.</li>
    </ul>

    <h2>When DeepSeek isn&rsquo;t the right pick</h2>
    <ul>
      <li>The hardest 5% of SWE-bench tasks &mdash; Claude Opus opens a real lead.</li>
      <li>30+ step agents where reliability dominates &mdash; Claude / GPT-5 still meaningfully
        ahead.</li>
      <li>Customer-facing English work where the marginal quality and tone calibration matter.</li>
    </ul>
    <p>
      Compare: <a href="/compare/claude-vs-deepseek">Claude vs DeepSeek</a>,{" "}
      <a href="/compare/deepseek-r1-vs-claude">DeepSeek R1 vs Claude</a>. Cost math:{" "}
      <a href="/tools/claude-vs-deepseek-cost-calculator">cost calculator</a>.
    </p>
  </>
);
