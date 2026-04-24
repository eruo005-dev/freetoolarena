import { type ReactElement } from "react";

export const intro: ReactElement = (<p>AI won&rsquo;t save your small business on its own &mdash; but used in one clear workflow with one clear metric, it quietly pays for itself inside 30 days.</p>);

export const body: ReactElement = (
  <>
    <p>Most small-business owners either ignore AI entirely or try to &ldquo;AI everything&rdquo; in a weekend and burn out. Both approaches fail. The teams getting real results pick one high-pain workflow, assign one person to own it, and measure hours saved each week. This guide is for owners and solo founders who want a realistic adoption plan &mdash; not another hype article about agents taking over.</p>

    <h2>Start with one high-pain workflow</h2>
    <p>Don&rsquo;t roll AI out across your whole company. Pick the single task that bleeds the most hours and has low customer-harm risk if it&rsquo;s 80% right. The three winners for most SMBs are customer support triage (drafting first replies, summarizing tickets), content production (blog drafts, social captions, product descriptions), and sales outreach (cold email variants, meeting recaps, proposal drafts). Win one of these, then move to the next.</p>

    <h2>Three free tiers to test with first</h2>
    <ul>
      <li>ChatGPT free &mdash; broad, fast, best general-purpose starting point.</li>
      <li>Claude.ai free &mdash; strongest at long-form writing, nuanced tone, and document analysis.</li>
      <li>Gemini free &mdash; tightly integrated with Google Workspace, handy if your team already lives in Gmail and Docs.</li>
    </ul>

    <h2>What to automate vs keep human</h2>
    <p>Automate drafting, summarizing, tagging, translating, and formatting &mdash; anything where a human still reviews the output before it reaches a customer. Keep humans firmly in charge of final approval on anything legal, financial, medical, or emotional (refunds, complaints, layoffs, health claims). A safe rule: AI drafts, humans ship.</p>

    <h2>Privacy: read the TOS before pasting anything</h2>
    <p>Never paste customer names, emails, phone numbers, health details, or payment info into a free consumer tier without checking the terms. Free tiers often use your inputs for model training. For anything touching customer PII, use the paid or business plans (ChatGPT Team, Claude for Work, Gemini Business) which explicitly exclude your data from training. If in doubt, redact the names first.</p>

    <h2>Cost per employee and expected ROI</h2>
    <p>Budget roughly $20&ndash;30 per user per month for ChatGPT Team, about $25/month for Claude Pro, and $20/month for Gemini Business. For a 5-person team, that&rsquo;s $100&ndash;150/month all-in. If each person saves even 2 hours a week at a $40/hour loaded cost, you&rsquo;re netting around $1,500/month back. Track hours saved weekly for the first two months &mdash; that&rsquo;s your ROI proof.</p>

    <h2>Common mistakes</h2>
    <p>Three mistakes sink most rollouts. First, treating AI as a staff replacement instead of a staff multiplier &mdash; people disengage the moment they sense it. Second, skipping training; assuming everyone can &ldquo;just use ChatGPT&rdquo; leaves 80% of the value on the table. Third, no review workflow &mdash; AI-generated emails going straight to customers with hallucinated facts will cost you more than the tool saves.</p>

    <h2>Bottom line</h2>
    <p>Pick one workflow, pick one tool, pay for the business tier the moment customer data is involved, and measure hours saved. Small businesses that do these four things see compounding returns. The ones chasing shiny agents and autonomous everything are still paying full price and getting nothing.</p>
  </>
);
