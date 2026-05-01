import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Every frontier AI model&rsquo;s pricing in one page. Consumer plans, API rates, hidden caps,
    and the 5 levers that change the bill. Updated for 2026 Q1.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Consumer monthly plans (USD)</h2>
    <ul>
      <li><strong>Claude Pro / Max:</strong> $20 / $100 / $200.</li>
      <li><strong>ChatGPT Plus / Pro:</strong> $20 / $200.</li>
      <li><strong>Gemini Advanced / Ultra:</strong> $20 / $250.</li>
      <li><strong>Perplexity Pro / Max:</strong> $20 / $200.</li>
      <li><strong>Grok (X Premium / Premium+):</strong> $8 / $40.</li>
      <li><strong>NotebookLM:</strong> Free (Plus included with Gemini Advanced).</li>
      <li><strong>Microsoft Copilot Pro:</strong> $20.</li>
    </ul>

    <h2>API pricing (per 1M tokens)</h2>
    <table className="my-3 w-full text-left text-sm">
      <thead className="text-xs uppercase tracking-wide text-slate-500">
        <tr><th>Model</th><th>Input</th><th>Output</th></tr>
      </thead>
      <tbody>
        <tr><td>Claude Opus 4.7</td><td>$15</td><td>$75</td></tr>
        <tr><td>Claude Sonnet 4.6</td><td>$3</td><td>$15</td></tr>
        <tr><td>Claude Haiku 4.5</td><td>$0.80</td><td>$4</td></tr>
        <tr><td>GPT-5</td><td>$2.50</td><td>$10</td></tr>
        <tr><td>GPT-5 mini</td><td>$0.25</td><td>$2</td></tr>
        <tr><td>GPT-5 nano</td><td>$0.05</td><td>$0.40</td></tr>
        <tr><td>Gemini 3 Pro</td><td>$2.50</td><td>$10</td></tr>
        <tr><td>Gemini 2.5 Pro</td><td>$1.25</td><td>$5</td></tr>
        <tr><td>Gemini 2.5 Flash</td><td>$0.30</td><td>$2.50</td></tr>
        <tr><td>DeepSeek V3.2</td><td>$0.27</td><td>$1.10</td></tr>
        <tr><td>DeepSeek R1</td><td>$0.55</td><td>$2.19</td></tr>
        <tr><td>Kimi K2</td><td>$0.60</td><td>$2.50</td></tr>
        <tr><td>Grok 4</td><td>$3</td><td>$15</td></tr>
        <tr><td>Mistral Large 3</td><td>$2</td><td>$6</td></tr>
      </tbody>
    </table>

    <h2>The 5 levers that cut your bill</h2>
    <ol>
      <li><strong>Prompt caching</strong> &mdash; 90% off cached input on Anthropic / Google.
        Always on for stable system prompts.</li>
      <li><strong>Batch API (50% off)</strong> &mdash; for any async work with 24h SLA.</li>
      <li><strong>Right-sized model</strong> &mdash; Haiku not Sonnet, Sonnet not Opus, Flash not
        Pro for routine work.</li>
      <li><strong>Off-peak DeepSeek</strong> &mdash; 50% off again UTC 16:30-00:30.</li>
      <li><strong>Open weights / self-host</strong> &mdash; for sustained workloads with consistent
        load. See the <a href="/tools/local-vs-api-breakeven-calculator">break-even calculator</a>.</li>
    </ol>

    <h2>Multimodal surcharges</h2>
    <ul>
      <li><strong>Image:</strong> ~$0.04 per image (Imagen 4, DALL-E 4).</li>
      <li><strong>Video:</strong> $0.30-0.50 per 5-10 sec clip (Sora, Veo).</li>
      <li><strong>Audio in:</strong> ~$0.006/min (Whisper); native bundled in chat plans.</li>
      <li><strong>Image in (vision):</strong> ~1500 tokens per image at flagship rates.</li>
      <li><strong>Video in:</strong> ~250 tokens per second @ 1fps (Gemini).</li>
    </ul>

    <h2>Other 2026 tools worth knowing</h2>
    <ul>
      <li><strong>GitHub Copilot Pro / Business:</strong> $10 / $19.</li>
      <li><strong>Cursor Pro / Ultra:</strong> $20 / $200.</li>
      <li><strong>Windsurf Pro:</strong> $15.</li>
      <li><strong>Midjourney:</strong> $10-120 across tiers.</li>
      <li><strong>Perplexity Spaces / API:</strong> Sonar API ~$5 / 1M tokens.</li>
    </ul>

    <p>
      Run the math against your actual volume:{" "}
      <a href="/tools/ai-cost-estimator">AI cost estimator</a>,{" "}
      <a href="/tools/ai-monthly-cost-budgeter">monthly budgeter</a>,{" "}
      <a href="/tools/local-vs-api-breakeven-calculator">local vs API break-even</a>.
    </p>
  </>
);
