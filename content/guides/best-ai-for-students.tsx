import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Students in 2026 are using AI for studying, paper drafts, problem sets, language learning, and
    research. The right tools depend on what you study and how your school treats AI &mdash; but
    most students find a working stack for under $25/month.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The honest student stack</h2>
    <ul>
      <li><strong>Free tier first:</strong> NotebookLM (free) + ChatGPT free + Perplexity free +
        Claude free. Most homework runs on this.</li>
      <li><strong>If you can pay $20:</strong> Pick one paid plan. ChatGPT Plus is the best
        all-rounder for students &mdash; voice mode, code interpreter, image gen, broadest help.</li>
      <li><strong>If you can pay $25:</strong> Add Cursor Pro for CS students. Bundles Claude + GPT-5
        for coding workflows.</li>
    </ul>

    <h2>By subject</h2>
    <ul>
      <li><strong>STEM problem sets:</strong> ChatGPT Plus or Claude. Both are excellent at
        step-by-step solutions. Use the &ldquo;explain like I&rsquo;m new to this&rdquo; framing.</li>
      <li><strong>Essay drafts:</strong> Claude Pro. Cleaner voice, less &ldquo;AI smell.&rdquo;</li>
      <li><strong>Research papers / lit reviews:</strong> NotebookLM (free) + Perplexity Pro. Upload
        your sources to NotebookLM and chat with them.</li>
      <li><strong>Language learning:</strong> ChatGPT voice mode (best in 2026), or Duolingo Max
        ($14/mo). Real-time pronunciation feedback.</li>
      <li><strong>CS / programming:</strong> Cursor Pro or Claude Code. Free GitHub Copilot via the
        Student Pack.</li>
      <li><strong>Math:</strong> Claude Opus or DeepSeek R1 for hard reasoning. Show working.</li>
      <li><strong>Test prep:</strong> ChatGPT for practice questions, Claude for explanations.</li>
    </ul>

    <h2>Free benefits worth knowing</h2>
    <ul>
      <li><strong>GitHub Student Pack:</strong> free Copilot Pro for verified students.</li>
      <li><strong>NotebookLM:</strong> free, no signup beyond Google account. Best paper-stack tool.</li>
      <li><strong>Claude.ai free tier:</strong> Sonnet access without payment.</li>
      <li><strong>ChatGPT free:</strong> GPT-5 with rate limits.</li>
      <li><strong>Perplexity free:</strong> quick search unlimited; Pro Search rate-limited.</li>
    </ul>

    <h2>The integrity question</h2>
    <p>
      Schools are still figuring out AI rules. Practical norms in 2026: AI for understanding
      concepts, brainstorming, drafting, and editing is widely accepted. AI writing whole essays or
      solving graded problem sets without disclosure is academic dishonesty in most institutions.
      When in doubt, ask the professor &mdash; the explicit answer protects you both ways.
    </p>

    <h2>One workflow that just works</h2>
    <p>
      Read the assignment. Use Perplexity to find 5-10 key sources. Drop them in NotebookLM. Ask
      NotebookLM to summarize each. Draft your outline yourself. Use Claude or ChatGPT to expand
      each section. Edit heavily. Cite real sources from NotebookLM. Done in half the time, with
      better understanding than skipping the AI entirely.
    </p>
    <p>
      Related reads: <a href="/guides/how-to-take-better-notes">how to take better notes</a>,{" "}
      <a href="/guides/how-to-focus-better">how to focus better</a>.
    </p>
  </>
);
