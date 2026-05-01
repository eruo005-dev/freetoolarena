import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Claude 4 (Opus 4, Sonnet 4, then 4.5, 4.6, 4.7 across 2025-2026) reshaped Anthropic&rsquo;s lineup. The
    headline: better agentic reliability, 1M context across the lineup, prompt caching that actually pays off,
    and Claude Code as a flagship product.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What&rsquo;s new vs Claude 3.7</h2>
    <ul>
      <li><strong>1M context across Sonnet + Opus.</strong> Haiku stays at 200k.</li>
      <li><strong>Prompt caching:</strong> default 5-min, optional 1-hour TTL, 90% off cached input. Industry-leading.</li>
      <li><strong>Top-tier SWE-bench Verified, Aider, Terminal-Bench scores.</strong> Best agentic coder.</li>
      <li><strong>Claude Code:</strong> terminal-first agent, bundled with Pro/Max plans.</li>
      <li><strong>Skills + Hooks:</strong> reusable behavior packages and event listeners.</li>
      <li><strong>Computer Use API:</strong> agents that operate a desktop UI.</li>
    </ul>

    <h2>The model lineup in 2026</h2>
    <ul>
      <li><strong>Opus 4.7</strong> &mdash; top reliability, 5x the cost of Sonnet.</li>
      <li><strong>Sonnet 4.6</strong> &mdash; default daily driver, 95% of Opus quality.</li>
      <li><strong>Haiku 4.5</strong> &mdash; budget tier, fast, full tool surface.</li>
    </ul>

    <h2>What got better in practice</h2>
    <ul>
      <li>Long agentic loops (30+ steps) are far more reliable.</li>
      <li>Output style is cleaner, less marketing-flavored.</li>
      <li>Web search is competent (still behind Perplexity for grounded research).</li>
      <li>Projects (persistent context across conversations) make ongoing work much smoother.</li>
    </ul>

    <h2>Where Claude still loses</h2>
    <ul>
      <li>No native image gen, no Sora-style video, no voice mode equivalent (yet).</li>
      <li>API price slightly higher than GPT-5 ($3/$15 vs $2.50/$10) &mdash; but caching narrows the gap.</li>
      <li>Pro plan ($20) caps tighter than ChatGPT Plus on heavy days.</li>
    </ul>

    <p>
      Compare to alternatives at <a href="/compare/claude-vs-chatgpt">Claude vs ChatGPT</a> and{" "}
      <a href="/compare/claude-vs-gemini">Claude vs Gemini</a>. Pricing breakdown at{" "}
      <a href="/guides/claude-pricing-explained">Claude pricing explained</a>.
    </p>
  </>
);
