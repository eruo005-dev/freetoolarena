import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Picking an AI for research in 2026 is mostly about whether you need to find or to synthesize.
    Find = Perplexity. Synthesize = Claude Projects or NotebookLM. The right answer is usually
    both, used in sequence.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The three research-specific patterns</h2>
    <ul>
      <li><strong>Find with citations:</strong> Perplexity Pro. Default for any question that
        needs current information sourced from the web.</li>
      <li><strong>Synthesize across uploaded sources:</strong> NotebookLM (free, up to 50
        sources) or Claude Projects ($20/mo, 1M context). NotebookLM&rsquo;s citation density is
        higher; Claude&rsquo;s reasoning depth is higher.</li>
      <li><strong>Analyze a single long document:</strong> Claude Sonnet (1M context) or Gemini
        2.5 Pro (2M context).</li>
    </ul>

    <h2>Decision tree</h2>
    <ol>
      <li>Do you have your sources already? <strong>Yes</strong> &rarr; NotebookLM (free) or Claude
        Projects (paid). <strong>No</strong> &rarr; start with Perplexity Pro.</li>
      <li>How long is your single longest source? <strong>Under 200k tokens</strong> &rarr; Claude.
        <strong>200k-1M</strong> &rarr; Claude (1M). <strong>1M+</strong> &rarr; Gemini 2.5/3 Pro
        (2M context).</li>
      <li>Do citations matter? <strong>Yes, with high precision</strong> &rarr; NotebookLM or
        Perplexity. <strong>Yes, but reasoning matters more</strong> &rarr; Claude.</li>
      <li>Does it include audio or video? <strong>Yes</strong> &rarr; Gemini.</li>
    </ol>

    <h2>Why I always start at Perplexity</h2>
    <p>
      Perplexity is fast and cited &mdash; the two qualities a research session needs in the
      first 10 minutes. Even when I plan to do the deep work in Claude, starting at Perplexity
      gets me a curated set of sources to drop into Claude Projects or NotebookLM. The citation
      list becomes my source list.
    </p>

    <h2>The honest verdict by user type</h2>
    <ul>
      <li><strong>Academic researcher:</strong> NotebookLM (free) + Claude Pro ($20).</li>
      <li><strong>Journalist:</strong> Perplexity Pro ($20) primary; Claude or ChatGPT for drafting.</li>
      <li><strong>Market analyst:</strong> Perplexity Pro + Claude Pro &mdash; $40/mo for the
        gold standard.</li>
      <li><strong>Student:</strong> NotebookLM (free) + ChatGPT free or Claude free.</li>
      <li><strong>Lawyer:</strong> See <a href="/guides/best-ai-for-legal-research">best AI for legal research</a> &mdash; vertical legal AI matters here.</li>
    </ul>
    <p>
      Compare: <a href="/compare/claude-vs-perplexity">Claude vs Perplexity</a>,{" "}
      <a href="/compare/chatgpt-vs-perplexity">ChatGPT vs Perplexity</a>.
    </p>
  </>
);
