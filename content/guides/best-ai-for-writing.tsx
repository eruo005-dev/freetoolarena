import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The best AI for writing in 2026 depends entirely on what you&rsquo;re writing. Marketing copy,
    long-form prose, technical docs, screenplays, and poetry all favor different models. Here&rsquo;s
    the breakdown.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>By writing type</h2>
    <ul>
      <li><strong>Long-form essays / articles:</strong> Claude Sonnet 4.6. Cleaner voice, less
        marketing-flavored, follows tone instructions reliably.</li>
      <li><strong>Marketing copy / ad copy:</strong> ChatGPT Plus (GPT-5). Wider stylistic range,
        better at hitting specific brand voices.</li>
      <li><strong>Technical writing / docs:</strong> Claude. Source-faithful, fewer hallucinations
        on complex topics.</li>
      <li><strong>Email / business writing:</strong> Either flagship; Claude reads more natural
        out-of-the-box.</li>
      <li><strong>Creative fiction:</strong> See <a href="/guides/best-ai-for-creative-writing">best AI for creative writing</a>.</li>
      <li><strong>Cover letters / resumes:</strong> Claude wins on tone calibration.</li>
      <li><strong>Newsletter drafts:</strong> Claude or ChatGPT; both excellent.</li>
      <li><strong>Translations:</strong> GPT-5 (broadest language coverage), Gemini (Asian languages).</li>
    </ul>

    <h2>The honest 2026 picks</h2>
    <ul>
      <li><strong>Default:</strong> Claude Pro at $20/mo. Cleanest output, least &ldquo;AI smell.&rdquo;</li>
      <li><strong>If you also need image gen:</strong> ChatGPT Plus at $20/mo.</li>
      <li><strong>If you need both, often:</strong> Both subscriptions for $40/mo.</li>
      <li><strong>For high-volume writing automation:</strong> DeepSeek V3.2 API. 90% cheaper, ~95%
        the quality.</li>
    </ul>

    <h2>Tools beyond chat</h2>
    <p>
      For writers who want AI integrated into their drafting workflow, look beyond the chat
      interface: Sudowrite for fiction; Notion AI for in-doc editing; Lex for distraction-free
      drafting; Granola for meeting-note-to-draft. These wrap the same models in a
      writing-specific UX.
    </p>

    <h2>Common mistakes</h2>
    <ul>
      <li>Asking for &ldquo;a 1500-word blog post&rdquo; without examples of the voice you want.
        Always paste 2-3 paragraphs of prior writing as the tone reference.</li>
      <li>Letting the AI write the whole piece. The best workflow is human outline &rarr; AI fill
        &rarr; human edit. Three passes minimum.</li>
      <li>Skipping the human edit. AI prose is fluent but predictable; the edit is where personality
        lives.</li>
    </ul>
    <p>
      Compare: <a href="/compare/claude-vs-chatgpt">Claude vs ChatGPT</a>,{" "}
      <a href="/compare/claude-vs-gemini">Claude vs Gemini</a>.
    </p>
  </>
);
