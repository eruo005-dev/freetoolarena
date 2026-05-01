import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    ChatGPT Atlas is OpenAI&rsquo;s standalone agentic browser &mdash; a Chromium-based browser with GPT-5
    and Operator built in. It&rsquo;s the cleanest path to letting an AI actually <em>do</em> things on
    the web on your behalf. Here&rsquo;s how to get value from it without breaking your workflow.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Atlas is good at</h2>
    <ul>
      <li><strong>Cross-tab summarization:</strong> highlight 6 open tabs, get a synthesis.</li>
      <li><strong>Form filling:</strong> &ldquo;fill this with my work address&rdquo; just works.</li>
      <li><strong>Multi-step research:</strong> &ldquo;find me 5 SaaS competitors with funding under $5M&rdquo;.</li>
      <li><strong>Booking flows:</strong> Operator handles flights, hotels, restaurant reservations.</li>
      <li><strong>Shopping comparison:</strong> &ldquo;cheapest version of this jacket in my size&rdquo;.</li>
    </ul>

    <h2>What it&rsquo;s NOT good at (yet)</h2>
    <ul>
      <li>Tasks that require login flows on bank-grade auth (you&rsquo;ll have to step in for 2FA).</li>
      <li>Long-running background agents &mdash; Operator session caps in 2026.</li>
      <li>Highly-custom enterprise SaaS UIs that aren&rsquo;t in its training distribution.</li>
    </ul>

    <h2>Privacy notes</h2>
    <p>
      Browsing data routes through OpenAI by default. For sensitive sessions, switch to incognito (Operator
      can&rsquo;t run in incognito) or use a separate browser entirely. Atlas asks before completing
      irreversible actions (purchases, sends).
    </p>

    <h2>Setup</h2>
    <ol>
      <li>Download from chatgpt.com/atlas (macOS, Windows, Linux).</li>
      <li>Sign in with ChatGPT Plus or Pro.</li>
      <li>Open the AI sidebar with Cmd/Ctrl + K. Try &ldquo;summarize my tabs&rdquo; on day one.</li>
      <li>Enable Operator in Settings &rarr; Agents (Pro tier required).</li>
    </ol>

    <p>
      Compare with alternatives at <a href="/tools/agentic-browser-comparison">the agentic browser comparison</a>.
      For more on AI agents broadly, see <a href="/guides/best-ai-for-agents">best AI for agents</a>.
    </p>
  </>
);
