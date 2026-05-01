import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Claude pricing is split across consumer plans (Pro, Max), API tiers (Opus, Sonnet, Haiku),
    and team / enterprise plans. Here&rsquo;s every relevant 2026 number, plus when each tier is
    actually worth it.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Consumer plans</h2>
    <ul>
      <li><strong>Free</strong> &mdash; Claude Sonnet 4.6 with daily message cap (~10-30 depending
        on model load). Adequate for casual use.</li>
      <li><strong>Pro ($20/mo)</strong> &mdash; 5x usage vs free, Opus 4.7 access, Claude Code,
        Projects, prompt caching in conversations. Sweet spot for most paying users.</li>
      <li><strong>Max 5x ($100/mo)</strong> &mdash; 5x usage above Pro. Right when Pro caps you
        out daily.</li>
      <li><strong>Max 20x ($200/mo)</strong> &mdash; 20x Pro usage. Right for heavy Claude Code
        users running long agentic tasks.</li>
    </ul>

    <h2>Team / Enterprise</h2>
    <ul>
      <li><strong>Team ($25-30/seat/mo)</strong> &mdash; min 5 seats, admin controls, shared
        Projects, central billing.</li>
      <li><strong>Enterprise</strong> &mdash; SSO, SCIM, audit logs, expanded usage, custom
        contracts. Pricing is &ldquo;contact sales.&rdquo;</li>
    </ul>

    <h2>API pricing (per 1M tokens)</h2>
    <ul>
      <li><strong>Claude Opus 4.7:</strong> $15 input / $75 output. Cache write $18.75; cache read
        $1.50.</li>
      <li><strong>Claude Sonnet 4.6:</strong> $3 / $15. Cache write $3.75; cache read $0.30.</li>
      <li><strong>Claude Haiku 4.5:</strong> $0.80 / $4. Cache read $0.08.</li>
      <li><strong>Batch API (50% off):</strong> async, 24h SLA. Same models.</li>
    </ul>

    <h2>The savings levers</h2>
    <ul>
      <li><strong>Prompt caching</strong> &mdash; 90% off cached input. Use it always.</li>
      <li><strong>Batch API</strong> &mdash; 50% off when latency doesn&rsquo;t matter.</li>
      <li><strong>Sonnet over Opus</strong> &mdash; 5x cheaper at 95% the quality.</li>
      <li><strong>Haiku for routine</strong> &mdash; 4x cheaper than Sonnet for autocomplete /
        classification.</li>
    </ul>

    <h2>When each tier is worth it</h2>
    <ul>
      <li><strong>Free:</strong> casual users testing what Claude is.</li>
      <li><strong>Pro $20:</strong> default for any serious daily user.</li>
      <li><strong>Max $100:</strong> if you hit Pro caps weekly. Common for Claude Code
        power-users.</li>
      <li><strong>API:</strong> when building any product or running automated workflows. Start
        Tier 1 ($5 funded), grow with usage.</li>
    </ul>
    <p>
      Compare to other plans: <a href="/compare/chatgpt-plus-vs-claude-pro">ChatGPT Plus vs
      Claude Pro</a>. Run the API math: <a href="/tools/claude-vs-deepseek-cost-calculator">cost
      calculator</a>,{" "}
      <a href="/tools/prompt-cache-savings-calculator">cache savings</a>.
    </p>
  </>
);
