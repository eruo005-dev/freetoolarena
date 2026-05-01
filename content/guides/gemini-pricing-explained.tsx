import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Gemini pricing in 2026 spans free Gemini, Gemini Advanced, AI Pro/Ultra, Workspace add-ons,
    and the Gemini API. The splits are confusing on Google&rsquo;s site &mdash; here&rsquo;s the
    plain version.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Consumer plans</h2>
    <ul>
      <li><strong>Free Gemini</strong> &mdash; 2.5 Flash unlimited, 2.5 Pro rate-limited. Best
        free 2M-context tier.</li>
      <li><strong>Gemini Advanced ($20/mo, in Google AI Pro)</strong> &mdash; Gemini 2.5/3 Pro,
        Veo, Imagen, NotebookLM Plus, 2 TB Drive storage.</li>
      <li><strong>Google AI Ultra ($250/mo)</strong> &mdash; everything in Pro, higher Veo caps,
        Project Astra, Deep Research, 30 TB storage. For heavy creative + research users.</li>
    </ul>

    <h2>Workspace integration</h2>
    <ul>
      <li>Gemini in Workspace is bundled with Google Workspace plans (Business Starter $7-Plus
        $22/seat in 2026). Includes Gemini in Gmail, Docs, Sheets, Slides.</li>
      <li>Standalone Gemini for Workspace add-on: ~$20/seat on top of Workspace, for advanced
        features.</li>
    </ul>

    <h2>API pricing (per 1M tokens)</h2>
    <ul>
      <li><strong>Gemini 3 Pro:</strong> $2.50 / $10.</li>
      <li><strong>Gemini 2.5 Pro:</strong> $1.25 / $5 (under 200k context); higher above.</li>
      <li><strong>Gemini 2.5 Flash:</strong> $0.30 / $2.50.</li>
      <li><strong>Gemini 2.5 Flash-Lite:</strong> $0.10 / $0.40.</li>
      <li><strong>Embeddings (text-embedding-005):</strong> $0.025/1M.</li>
      <li><strong>Image gen (Imagen 4):</strong> ~$0.04 per image.</li>
      <li><strong>Video (Veo 3):</strong> ~$0.50 per second of generated video.</li>
      <li><strong>Audio:</strong> bundled in chat; standalone API priced per second.</li>
      <li><strong>Batch (50% off):</strong> async 24h.</li>
      <li><strong>Context caching:</strong> ~25% of standard input price for cached reads.</li>
    </ul>

    <h2>The Gemini gotchas</h2>
    <ul>
      <li>Free API is hard-capped at 5 RPM, 25 requests/day. Forces upgrade fast.</li>
      <li>Long context surcharge: 2.5 Pro doubles input price above 200k tokens.</li>
      <li>Workspace Gemini is bundled but feature-limited &mdash; Veo isn&rsquo;t in Workspace by
        default.</li>
    </ul>

    <h2>When each tier is worth it</h2>
    <ul>
      <li><strong>Free:</strong> 90% of casual users. Genuinely strong.</li>
      <li><strong>Gemini Advanced $20:</strong> daily users wanting Veo + Pro context + NotebookLM
        Plus.</li>
      <li><strong>Ultra $250:</strong> heavy creative or research. Niche.</li>
      <li><strong>API:</strong> cost-sensitive product builds, especially anything multimodal.</li>
    </ul>
    <p>
      Compare: <a href="/compare/gemini-advanced-vs-chatgpt-plus">Gemini Advanced vs ChatGPT
      Plus</a>. Cost math: <a href="/tools/gemini-vs-chatgpt-cost-calculator">Gemini vs ChatGPT
      cost calculator</a>.
    </p>
  </>
);
