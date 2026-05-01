import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    An agentic browser doesn&rsquo;t just show you the web &mdash; it acts on it. ChatGPT Atlas, Comet,
    Dia, and Microsoft Copilot in Edge let an AI fill forms, book travel, summarize tabs, and chain
    tasks across sites. Here&rsquo;s the 2026 lineup, what they actually do well, and which one
    fits your workflow.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What &ldquo;agentic&rdquo; means in a browser</h2>
    <p>
      Three capability levels: <strong>Sidebar AI</strong> (chat aware of the current tab), <strong>cross-tab agent</strong>
      (knows what&rsquo;s open in other tabs and can summarize across them), and <strong>full agent</strong> (clicks, types,
      navigates on your behalf, multi-step). Most current browsers do level 1; ChatGPT Atlas and Operator do level 3.
    </p>

    <h2>The 2026 lineup</h2>
    <ul>
      <li><strong>ChatGPT Atlas (OpenAI)</strong> &mdash; standalone Chromium browser. Best autonomy. GPT-5 + Operator integrated.</li>
      <li><strong>Comet (Perplexity)</strong> &mdash; cited answers as default UX. Pro Search runs deep multi-step research.</li>
      <li><strong>Dia (Browser Company)</strong> &mdash; post-Arc, AI sidebar with Skills (custom mini-agents). macOS first.</li>
      <li><strong>Microsoft Copilot in Edge</strong> &mdash; tightest M365 integration; free tier strong.</li>
      <li><strong>Chrome (Gemini)</strong> &mdash; address-bar Gemini, Workspace integration, biggest install base.</li>
      <li><strong>Brave with Leo</strong> &mdash; privacy-first, runs Llama / Mixtral.</li>
    </ul>

    <h2>Pick by what you do most</h2>
    <ul>
      <li><strong>Multi-step web tasks (book flights, fill forms, shop):</strong> ChatGPT Atlas + Operator.</li>
      <li><strong>Research with sources:</strong> Comet.</li>
      <li><strong>Day-to-day browsing with AI assist:</strong> Dia or Copilot in Edge.</li>
      <li><strong>Live in Workspace:</strong> Chrome with Gemini.</li>
      <li><strong>Privacy first:</strong> Brave + Leo.</li>
    </ul>

    <p>
      Compare them side-by-side at <a href="/tools/agentic-browser-comparison">the agentic browser comparison</a> tool.
      For agent platforms beyond browsers, see <a href="/tools/ai-agent-platform-comparison">the agent platform comparison</a>.
    </p>
  </>
);
