import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    GPT-5 (released August 2025) is the biggest practical leap from GPT-4o. Beyond the headline benchmarks, the
    real changes that affect day-to-day use are the reasoning router, voice + multimodal, and the API restructure.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The headline changes</h2>
    <ul>
      <li><strong>Reasoning router:</strong> GPT-5 picks fast vs slow thinking automatically. You don&rsquo;t need to flip a model.</li>
      <li><strong>400k context:</strong> 4x GPT-4o, smaller than Claude (1M) and Gemini (2M) but plenty for most.</li>
      <li><strong>Pricing drop:</strong> $2.50/$10 per 1M tokens vs GPT-4o&rsquo;s same price &mdash; but with reasoning routed automatically.</li>
      <li><strong>Mini + nano tiers:</strong> $0.25/$2 and $0.05/$0.40 dramatically expand cheap-tier usage.</li>
      <li><strong>Atlas + Operator:</strong> agentic browsing built in.</li>
      <li><strong>Sora 2:</strong> video generation rolled into ChatGPT for Plus / Pro.</li>
    </ul>

    <h2>What got better in practice</h2>
    <ul>
      <li>Fewer obvious hallucinations on factual queries.</li>
      <li>More consistent instruction-following on long prompts.</li>
      <li>Voice mode (Advanced Voice) now feels conversational, not turn-based.</li>
      <li>Vision: better at reading dense text (PDFs, screenshots).</li>
    </ul>

    <h2>What didn&rsquo;t change as much as marketing implied</h2>
    <ul>
      <li>Coding: still trails Claude Sonnet/Opus on SWE-bench. Solid for autocomplete, second to Claude on agents.</li>
      <li>Memory: still has cross-session leakage if not pruned.</li>
      <li>Long context: 400k is generous but not always reliable past ~200k.</li>
    </ul>

    <p>
      Run the cost math at the <a href="/tools/gemini-vs-chatgpt-cost-calculator">Gemini vs ChatGPT cost
      calculator</a>. Compare to Claude at <a href="/compare/claude-vs-chatgpt">Claude vs ChatGPT</a>.
    </p>
  </>
);
