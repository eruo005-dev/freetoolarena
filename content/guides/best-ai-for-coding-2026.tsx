import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The honest answer in 2026 is that no single AI model is best at coding for every job &mdash;
    but a handful clearly lead for specific kinds of work. Here&rsquo;s the breakdown of which AI
    actually wins where, with the cost-quality math that matters.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The current leaders by task</h2>
    <ul>
      <li><strong>Multi-file refactors + agentic work:</strong> Claude Opus 4.7 / Sonnet 4.6 via{" "}
        <a href="/guides/how-to-set-up-a-hyperspace-pod">Claude Code</a>. Top SWE-bench scores; most reliable on long horizons.</li>
      <li><strong>Inline autocomplete:</strong> GitHub Copilot or Cursor (Tab). Latency-tuned, hard to beat for &ldquo;finish this line.&rdquo;</li>
      <li><strong>Cheap high-volume coding:</strong> DeepSeek V3.2 ($0.27/$1.10) or Qwen 3.5 72B (open-weights). 90% off Claude pricing at ~95% the quality.</li>
      <li><strong>Reasoning-heavy debugging:</strong> Claude Opus 4.7 or DeepSeek R1. Both shine on hard logic + math.</li>
      <li><strong>Multi-language / non-English code:</strong> Qwen 3.5 (best open-weight on Chinese), GPT-5 (broadest coverage).</li>
      <li><strong>Vibe-coding / GUI app prototyping:</strong> Cursor + Claude Sonnet, or Bolt.new for one-shot full-stack.</li>
    </ul>

    <h2>Tools, not just models</h2>
    <p>
      The model is half the answer. The harness around the model is the other half. In 2026 the
      stack that matters:
    </p>
    <ul>
      <li><strong><a href="/compare/claude-code-vs-cursor">Claude Code</a></strong> &mdash; terminal agent, best for refactors. Bundled with Claude Pro.</li>
      <li><strong><a href="/compare/cursor-vs-github-copilot">Cursor</a></strong> &mdash; AI IDE, best autocomplete + agent. $20-200/mo.</li>
      <li><strong>GitHub Copilot</strong> &mdash; cheapest premium ($10/mo), works in every IDE.</li>
      <li><strong>Windsurf</strong> &mdash; Cascades agent flows, $15/mo. Quietly excellent.</li>
      <li><strong>Continue.dev</strong> &mdash; OSS plugin, BYO API key. Right for cost-sensitive teams.</li>
    </ul>

    <h2>Pricing in plain numbers</h2>
    <ul>
      <li>Solo dev wanting good autocomplete: <strong>Copilot Pro at $10/mo</strong>.</li>
      <li>Solo dev wanting best agent + best autocomplete: <strong>Cursor Pro $20/mo + Claude Pro $20/mo = $40/mo</strong>.</li>
      <li>Teams of 5+: <strong>Cursor Business or Copilot Business at $19-25/seat</strong>.</li>
      <li>Heavy agentic users: <strong>Claude Max $100/mo</strong> or <strong>Cursor Ultra $200/mo</strong>.</li>
    </ul>
    <p>
      Use the <a href="/tools/ai-coding-tool-cost-comparison">AI coding tool cost comparison</a> to
      run your team size against all 9 plans.
    </p>

    <h2>By language</h2>
    <ul>
      <li><strong>Python:</strong> Claude Sonnet edges out, Qwen 3.5 strong on cheap.</li>
      <li><strong>JavaScript / TypeScript:</strong> All frontier models are excellent. Claude leads on framework knowledge (Next.js, etc.).</li>
      <li><strong>Rust:</strong> Claude Sonnet + GPT-5 best; smaller open-weights still trail.</li>
      <li><strong>Go:</strong> Claude wins consistently on idiomatic code.</li>
      <li><strong>SQL / database:</strong> Gemini 2.5 Pro and GPT-5 lead on schema reasoning.</li>
      <li><strong>Embedded / C++:</strong> Claude Opus is the safest pick; output is more conservative.</li>
    </ul>

    <h2>The 2026 default stack</h2>
    <p>
      For most professional developers in 2026: Cursor Pro or Copilot in your IDE for inline edits,
      plus Claude Code for refactors and multi-file work, plus DeepSeek V3.2 for high-volume
      automation that doesn&rsquo;t need flagship quality. That&rsquo;s ~$40/mo and covers 95% of
      coding workflows.
    </p>
    <p>
      Compare specific pairs head-to-head:{" "}
      <a href="/compare/claude-code-vs-cursor">Claude Code vs Cursor</a>,{" "}
      <a href="/compare/cursor-vs-github-copilot">Cursor vs Copilot</a>,{" "}
      <a href="/compare/claude-vs-deepseek">Claude vs DeepSeek</a>.
    </p>
  </>
);
