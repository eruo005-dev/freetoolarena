import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Picking AI for a team in 2026 is bigger than picking AI for yourself. The wrong choice locks
    in seat costs, training overhead, and integration debt for at least a year. Here&rsquo;s the
    playbook that gets it right the first time.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The 4-week selection process</h2>

    <h3>Week 1: define the use cases</h3>
    <p>
      Survey the team. List the top 5-10 jobs they want AI to do (drafting, coding, research,
      meetings, customer support, etc). Rank by frequency and impact. Most teams discover 2-3
      jobs cover 80% of usage.
    </p>

    <h3>Week 2: shortlist 3 candidates</h3>
    <p>
      For most teams in 2026, the shortlist is some subset of: ChatGPT Team, Claude Team, Gemini
      in Workspace (if already on Google), Microsoft 365 Copilot (if already on Microsoft).
      Don&rsquo;t boil the ocean &mdash; pick 3 max.
    </p>

    <h3>Week 3: pilot with 5 people</h3>
    <p>
      Get 5 actual users on each of the 3 plans for a week. Have them tackle their real top-3
      jobs from the survey. Track time saved, output quality (subjective), and frustration moments.
    </p>

    <h3>Week 4: decide + roll out</h3>
    <p>
      Pick the winner based on actual data, not vibes. Roll out across the team with a 30-minute
      kickoff session, a shared prompt library, and one champion per department.
    </p>

    <h2>The big-picture defaults</h2>
    <ul>
      <li><strong>Workspace shop (Google):</strong> Gemini Advanced (bundled or $20/seat). Path of
        least resistance.</li>
      <li><strong>Microsoft 365 shop:</strong> Copilot for M365 ($30/seat). Excel Copilot alone
        often justifies it.</li>
      <li><strong>Engineering-heavy team:</strong> Claude Team ($25-30/seat) for everyone +
        Cursor or Copilot for devs.</li>
      <li><strong>Mixed knowledge work:</strong> ChatGPT Team ($25-30/seat). Broadest feature
        surface; lowest training cost.</li>
      <li><strong>Privacy-sensitive (regulated industries):</strong> Mistral / on-prem self-host
        + Anthropic for analyses where data residency matters.</li>
    </ul>

    <h2>The team-cost math</h2>
    <ul>
      <li>10 seats &times; $25/mo = $250/mo, $3000/yr.</li>
      <li>50 seats &times; $25/mo = $1250/mo, $15k/yr.</li>
      <li>200 seats &times; $30/mo = $6000/mo, $72k/yr &mdash; budget time for an enterprise contract.</li>
    </ul>
    <p>
      Most teams underestimate adoption: only 30-50% of seats actually use the AI weekly in the
      first 90 days. Plan training. Pick a champion per team.
    </p>

    <h2>What to negotiate at scale</h2>
    <ul>
      <li>Minimum-seat commitment (lower than the public min).</li>
      <li>SOC 2 / privacy reviews delivered upfront, not in the trial.</li>
      <li>Custom retention windows (some industries require 0-day).</li>
      <li>Annual prepay discounts (typically 10-20%).</li>
      <li>Dedicated CSM for 100+ seat deals.</li>
    </ul>

    <h2>What to skip</h2>
    <ul>
      <li>Don&rsquo;t buy &ldquo;all 4&rdquo; Team plans &mdash; pick one as the standard,
        let power users pay personally for a second.</li>
      <li>Don&rsquo;t require AI use. Mandates produce malicious compliance, not adoption.</li>
      <li>Don&rsquo;t standardize on a single model that&rsquo;s already a year old. Refresh
        annually.</li>
    </ul>
    <p>
      Compare individual plans:{" "}
      <a href="/compare/chatgpt-plus-vs-claude-pro">ChatGPT Plus vs Claude Pro</a>,{" "}
      <a href="/compare/anthropic-api-vs-openai-api">Anthropic API vs OpenAI API</a>. Run team
      cost: <a href="/tools/ai-coding-tool-cost-comparison">coding tool comparison</a>,{" "}
      <a href="/tools/ai-monthly-cost-budgeter">monthly budgeter</a>.
    </p>
  </>
);
