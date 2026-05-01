import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The two most-discussed open-weight models from China in 2026: Kimi K2 (Moonshot, 1M context, ~1T MoE) and
    DeepSeek V3.2 (671B MoE, top-tier reasoning + coding). Different strengths, different fits.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The headline differences</h2>
    <ul>
      <li><strong>Context:</strong> Kimi K2 = 1M tokens. DeepSeek V3.2 = 128k.</li>
      <li><strong>Best at:</strong> Kimi = long-doc work. DeepSeek = coding + reasoning.</li>
      <li><strong>Pricing:</strong> Kimi $0.60/$2.50. DeepSeek V3.2 $0.27/$1.10. R1 $0.55/$2.19.</li>
      <li><strong>Open weights:</strong> both, with custom licenses (read before commercial use).</li>
    </ul>
    <h2>Pick Kimi K2 for</h2>
    <ul>
      <li>Long-document reasoning (1M context).</li>
      <li>Whole-codebase analysis without sharding.</li>
      <li>Long-running agents that accumulate context.</li>
      <li>Open-weight long-context use cases.</li>
    </ul>
    <h2>Pick DeepSeek V3.2 / R1 for</h2>
    <ul>
      <li>Code generation + agentic SWE.</li>
      <li>High-volume API loops (cheapest frontier-tier).</li>
      <li>Reasoning chains where R1&rsquo;s thinking-token economics make it cheap to over-think.</li>
      <li>OpenAI SDK drop-in replacement.</li>
    </ul>
    <h2>Self-hosting</h2>
    <p>
      Both need serious GPUs. K2 is even larger than V3.2 (~1T vs 671B). For commodity hardware, prefer
      DeepSeek-Distill-Qwen-32B or Qwen 3.5 32B &mdash; competitive on smaller budgets.
    </p>
    <p>
      Track all open-weight options at <a href="/tools/open-source-llm-tracker">open-source LLM tracker</a>.
    </p>
  </>
);
