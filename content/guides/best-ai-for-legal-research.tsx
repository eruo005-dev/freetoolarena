import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Legal-research AI in 2026 splits into three tiers: vertical legal AI (Harvey, Spellbook, Co-Counsel),
    document-review specialists (Hebbia, Kira), and general-purpose models (Claude, GPT-5, Gemini)
    used for legal work. Pick by stakes, jurisdiction, and how much hallucination risk your
    workflow can tolerate.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The verticals (production-grade legal)</h2>
    <ul>
      <li><strong>Harvey</strong> &mdash; the leader for big-law litigation + transactional. RAG
        over case law, contract analysis, drafting. Enterprise pricing.</li>
      <li><strong>Co-Counsel (Thomson Reuters)</strong> &mdash; tight Westlaw integration, paralegal
        tasks at scale.</li>
      <li><strong>Spellbook</strong> &mdash; contract drafting + redlining in Word. Lower-stakes,
        wider userbase.</li>
      <li><strong>Hebbia</strong> &mdash; document-review-grade RAG over private legal
        corpora.</li>
    </ul>

    <h2>General-purpose models for legal work</h2>
    <ul>
      <li><strong>Claude Sonnet/Opus</strong> &mdash; best for long-document analysis (1M context
        fits a 600-page contract). Cleanest output, careful with hedging.</li>
      <li><strong>Gemini 2.5/3 Pro</strong> &mdash; 2M context for the longest docs. Useful
        for due diligence on huge data rooms.</li>
      <li><strong>Perplexity Pro</strong> &mdash; for finding case law and regulatory updates
        with citations. Verify each citation independently &mdash; LLMs still hallucinate cases.</li>
    </ul>

    <h2>What works in practice</h2>
    <ul>
      <li><strong>Contract drafting (template-flavor):</strong> Spellbook in Word. Cuts drafting
        time 40-60% on commodity contracts.</li>
      <li><strong>Contract review / redlines:</strong> Spellbook for low-stakes; Harvey or human
        attorney for high-stakes.</li>
      <li><strong>Long-document summarization (deposition transcripts, regulatory filings):</strong>{" "}
        Claude or Gemini. Confirm everything against the source.</li>
      <li><strong>Statute / case research:</strong> Westlaw / Lexis with Co-Counsel layered on.
        General LLMs are unreliable for citations.</li>
    </ul>

    <h2>The hallucination warning</h2>
    <p>
      Every general-purpose LLM has been caught fabricating case citations in legal contexts. The
      rule: <strong>verify every case citation against an authoritative database</strong> before
      filing or citing in client work. Vertical legal AIs (Harvey, Co-Counsel) ground in
      Westlaw/Lexis to mitigate this; general models do not.
    </p>

    <h2>Pricing</h2>
    <ul>
      <li><strong>$20/mo:</strong> Claude Pro or ChatGPT Plus + Westlaw subscription &mdash; the
        solo / small-firm baseline.</li>
      <li><strong>$50-150/seat:</strong> Spellbook, ContractPodAi.</li>
      <li><strong>Enterprise:</strong> Harvey, Co-Counsel &mdash; six-figure annual contracts.</li>
    </ul>
    <p>
      <em>Not legal advice; for educational purposes.</em> Compare:{" "}
      <a href="/compare/claude-vs-gemini">Claude vs Gemini</a>.
    </p>
  </>
);
