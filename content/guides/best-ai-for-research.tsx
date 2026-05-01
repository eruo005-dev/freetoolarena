import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The best AI for research in 2026 isn&rsquo;t a single tool &mdash; it&rsquo;s a stack of
    three: Perplexity for grounded web answers, NotebookLM for synthesis across uploaded
    sources, and Claude or Gemini for analysis on long documents. Used together, they
    replace most of what scholars and analysts used to spend hours doing.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The 2026 research stack</h2>
    <ul>
      <li><strong>Perplexity Pro</strong> &mdash; AI-first search. Cited answers, real-time web,
        Pro Search runs deeper multi-step queries. $20/mo. The default starting point for any
        question that needs current information.</li>
      <li><strong>NotebookLM (Google, free)</strong> &mdash; upload up to 50 PDFs / Docs / sites
        and get cited answers grounded entirely in those sources. Audio overviews, mind maps,
        timelines. Best free tool of 2026 for paper-stack synthesis.</li>
      <li><strong>Claude Projects (Anthropic)</strong> &mdash; persistent context for ongoing
        research. 1M token window fits most book-length corpora. Strong for analysis.</li>
      <li><strong>Gemini 2.5/3 Pro</strong> &mdash; 2M context window, native multimodal (audio,
        video). Best when sources include audio interviews or video lectures.</li>
    </ul>

    <h2>By research type</h2>
    <ul>
      <li><strong>Lit review:</strong> NotebookLM + Perplexity Pro Search. Upload the canonical papers,
        use Perplexity to scan recent literature.</li>
      <li><strong>Journalism / fact-checking:</strong> Perplexity Pro. The citation density wins.</li>
      <li><strong>Market research / competitive intel:</strong> Perplexity Pro Search +{" "}
        <a href="/compare/perplexity-vs-google-search">Google</a> for transactional queries.</li>
      <li><strong>Legal research:</strong> Claude (best on long-document reasoning) + Perplexity
        for current case law. See <a href="/guides/best-ai-for-legal-research">best AI for legal research</a>.</li>
      <li><strong>Academic deep work:</strong> Claude Projects + NotebookLM. Upload the corpus,
        chat with both for different angles.</li>
      <li><strong>Patent search:</strong> Perplexity Pro + Claude for analysis.</li>
    </ul>

    <h2>What about ChatGPT and Grok?</h2>
    <p>
      ChatGPT (Plus) is competent but secondary for research. Its web search is improving, but
      Perplexity wins on citation density and Claude wins on long-document analysis. Grok&rsquo;s
      edge is real-time X data &mdash; useful for breaking news + social sentiment.
    </p>

    <h2>The two-tab workflow</h2>
    <p>
      The pattern most researchers settle on: Perplexity for &ldquo;find the answer&rdquo;, Claude
      Project / NotebookLM for &ldquo;analyze what we found.&rdquo; Use Perplexity to discover and
      cite sources; use Claude/NotebookLM to synthesize across them. The combination is much
      stronger than either tool alone.
    </p>

    <h2>Pricing for research-heavy users</h2>
    <ul>
      <li><strong>$0:</strong> NotebookLM (free) + Perplexity (free tier with quick search). Good for
        light use.</li>
      <li><strong>$20/mo:</strong> Perplexity Pro alone. Solid baseline for any researcher.</li>
      <li><strong>$40/mo:</strong> Perplexity Pro + Claude Pro. The standard serious stack.</li>
      <li><strong>$60/mo:</strong> Perplexity Pro + Claude Pro + Gemini Advanced. Adds 2M context +
        multimodal.</li>
    </ul>
    <p>
      Compare research-focused tools head-to-head:{" "}
      <a href="/compare/claude-vs-perplexity">Claude vs Perplexity</a>,{" "}
      <a href="/compare/chatgpt-vs-perplexity">ChatGPT vs Perplexity</a>,{" "}
      <a href="/compare/perplexity-vs-google-search">Perplexity vs Google</a>.
    </p>
  </>
);
