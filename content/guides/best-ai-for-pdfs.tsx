import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Three categories of AI handle PDFs in 2026: chat with one PDF (ChatGPT, Claude, Gemini),
    chat with many (NotebookLM, Claude Projects), and structured extraction (DocuPanda,
    LlamaParse). Pick by how many PDFs and how structured the output needs to be.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>By task</h2>
    <ul>
      <li><strong>Chat with 1 PDF:</strong> Claude (1M context fits whole books). Drop a 600-page
        PDF in claude.ai, ask anything.</li>
      <li><strong>Chat with up to 50 PDFs:</strong> NotebookLM (free). Best free tool for
        cross-source synthesis with citations.</li>
      <li><strong>Long-running PDF research project:</strong> Claude Projects ($20/mo). Persistent
        context across all sessions.</li>
      <li><strong>Extract tables / structured data:</strong> DocuPanda, LlamaParse, or Reducto AI.
        Specialized; better than vanilla Claude for messy tables.</li>
      <li><strong>OCR scanned PDFs:</strong> Gemini 2.5 Pro (best OCR among LLMs in 2026), or
        dedicated tools like Mistral OCR.</li>
      <li><strong>Compare PDFs:</strong> Claude with both files in one prompt. Easy.</li>
      <li><strong>Sign / fill PDFs:</strong> AI doesn&rsquo;t add value &mdash; use a PDF editor.
        Try our <a href="/tools/pdf-form-filler">PDF form filler</a> or related tools.</li>
    </ul>

    <h2>Pricing</h2>
    <ul>
      <li>$0: NotebookLM (free, up to 50 sources, citations).</li>
      <li>$20: Claude Pro &mdash; biggest single-PDF context window.</li>
      <li>$0.10-0.50/page: DocuPanda, LlamaParse, Reducto for structured extraction.</li>
    </ul>

    <h2>The honest 2026 workflow for PDF research</h2>
    <p>
      Drop your PDFs into NotebookLM. Ask broad synthesis questions there. For deep analysis on
      one specific paper, switch to Claude Projects with that PDF uploaded. Use the audio
      overview feature in NotebookLM to listen to a summary while commuting. That&rsquo;s the
      $20/mo workflow that beats most paid PDF tools.
    </p>

    <h2>Other useful PDF tools on this site</h2>
    <ul>
      <li><a href="/tools/pdf-merger">PDF merger</a> &mdash; combine PDFs in your browser.</li>
      <li><a href="/tools/pdf-splitter">PDF splitter</a> &mdash; pull pages.</li>
      <li><a href="/tools/pdf-compressor">PDF compressor</a> &mdash; shrink before sharing.</li>
      <li><a href="/tools/pdf-to-text">PDF to text</a> &mdash; extract for AI processing.</li>
    </ul>
  </>
);
