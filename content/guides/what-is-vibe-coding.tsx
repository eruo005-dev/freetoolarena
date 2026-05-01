import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    &ldquo;Vibe coding&rdquo; is what Andrej Karpathy named the 2025 shift to writing software by describing
    intent in natural language and letting an AI write, run, and fix the code. By 2026 it&rsquo;s how a lot
    of indie founders, hobbyists, and even pros prototype.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What it actually looks like</h2>
    <p>
      You don&rsquo;t open a file. You open Cursor, Bolt.new, Lovable, v0, or Replit Agent and type
      &ldquo;build me a calendar app with login&rdquo;. The AI generates code, runs it in a sandbox, shows you
      the result, and you iterate by saying &ldquo;make the buttons rounded&rdquo; or &ldquo;add timezone support&rdquo;.
      You barely look at the code.
    </p>

    <h2>What it&rsquo;s good for</h2>
    <ul>
      <li><strong>Prototypes:</strong> validate an idea in an afternoon.</li>
      <li><strong>Internal tools:</strong> 80% of company internal apps don&rsquo;t need craftsmanship, just to work.</li>
      <li><strong>Non-developers:</strong> a marketer can ship a landing-page tool without a dev queue.</li>
      <li><strong>Side projects:</strong> the friction of starting drops to zero.</li>
    </ul>

    <h2>What it&rsquo;s NOT good for</h2>
    <ul>
      <li><strong>Production at scale:</strong> security, perf, observability, edge cases all need code review.</li>
      <li><strong>Mission-critical:</strong> medical, financial, anything where bugs really hurt.</li>
      <li><strong>Long-lived codebases:</strong> AI-generated code accretes inconsistencies.</li>
    </ul>

    <h2>The 2026 toolchain</h2>
    <ul>
      <li><strong>Bolt.new</strong> &mdash; full-stack, in-browser, fastest to a working app.</li>
      <li><strong>Lovable</strong> &mdash; opinionated, ships beautiful UIs.</li>
      <li><strong>v0 (Vercel)</strong> &mdash; UI components + Next.js + deploy.</li>
      <li><strong>Cursor + Claude Code</strong> &mdash; for vibe coding INTO an existing codebase.</li>
      <li><strong>Replit Agent</strong> &mdash; build + host in one place.</li>
    </ul>

    <p>
      Compare them at <a href="/tools/ai-agent-platform-comparison">the agent platform comparison</a>. For deeper
      coding tool picks, see <a href="/guides/best-ai-for-coding-2026">best AI for coding 2026</a>.
    </p>
  </>
);
