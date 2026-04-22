"use client";

import { useMemo, useState } from "react";

type Prompt = { category: string; title: string; body: string };

const PROMPTS: Prompt[] = [
  { category: "Writing", title: "Shorten without losing meaning", body: "Rewrite the following text to be 30% shorter while keeping every concrete fact, number, and name. Remove adjectives, hedging, and repetition. Do not add new ideas. Return only the rewrite.\n\nText:\n{paste here}" },
  { category: "Writing", title: "Expand a bullet into a paragraph", body: "Turn this single bullet into one tight paragraph (3–5 sentences). Keep the voice matter-of-fact. No intro phrases like 'Here is…'\n\nBullet:\n- {paste here}" },
  { category: "Writing", title: "Email: say no politely", body: "Write a 4-sentence email declining the request below. Be warm, specific about why not, and offer one concrete alternative.\n\nSituation:\n{paste here}" },
  { category: "Writing", title: "Rewrite for clarity", body: "Rewrite this paragraph so a smart reader outside the field can follow it. Define the first use of each specialized term in 5 words or fewer. Keep sentences short.\n\nText:\n{paste here}" },
  { category: "Writing", title: "Blog post outline", body: "Create an H1, three H2 sections, and 2-3 H3 bullets per section for a blog post about: {topic}. Audience: {reader}. Angle: {angle}. Each H3 should hint at a specific example, not a generic subheading." },
  { category: "Coding", title: "Explain this diff", body: "Explain this git diff. For each changed hunk: (1) what the change does in plain English, (2) why someone might make this change, (3) one thing that could go wrong.\n\n```diff\n{paste diff}\n```" },
  { category: "Coding", title: "Unit test generator", body: "Write unit tests (framework: {jest/vitest/pytest}) for the function below. Cover: happy path, empty input, boundary values, error conditions. Each test should have a descriptive name.\n\n```\n{paste function}\n```" },
  { category: "Coding", title: "Error message → fix", body: "Here is an error message and the smallest snippet of code where it happens. Explain the root cause in 2–3 sentences, then show the corrected snippet with only the needed changes.\n\nError:\n{paste}\n\nCode:\n```\n{paste}\n```" },
  { category: "Coding", title: "Regex builder", body: "Write a regex that matches {describe}. Include: (1) the regex itself, (2) a one-line explanation, (3) three matching examples and three non-matching examples." },
  { category: "Coding", title: "Refactor for readability", body: "Refactor this function for readability, not performance. Name things well, remove nested conditionals, and keep behavior identical. Output only the refactored code plus a 2-line summary of what changed.\n\n```\n{paste}\n```" },
  { category: "Marketing", title: "Headlines, 10 variations", body: "Write 10 headlines for: {product or article}. Mix these styles: direct benefit, curiosity gap, contrarian, numbered, how-to, and social proof. No clickbait. Each under 70 characters." },
  { category: "Marketing", title: "Cold email (warm tone)", body: "Write a 90-word cold email. Recipient: {role at company}. Hook: {their recent thing}. Offer: {what I bring}. Ask: one 15-minute call. No 'hope this finds you well'. First line must name something specific and true about them." },
  { category: "Marketing", title: "Landing page hero", body: "Write 3 hero-section variants for the landing page of {product}. Each variant: 1 headline (≤10 words), 1 subhead (≤25 words), 1 CTA button text (≤3 words). Avoid hype words." },
  { category: "Marketing", title: "Social post from article", body: "Turn this article into: (a) 1 LinkedIn post (~150 words, first-person, one concrete example), (b) 1 Twitter/X thread of 5–7 tweets. No emojis unless absolutely needed.\n\nArticle:\n{paste}" },
  { category: "Research", title: "5-minute primer", body: "I have 5 minutes to understand {topic}. Explain: (1) what problem this solves, (2) the main approaches and how they differ, (3) the sharpest open question. Assume I'm smart but have no background in this field." },
  { category: "Research", title: "Compare X vs Y", body: "Compare {X} and {Y} across: typical use cases, cost, learning curve, ceiling of capability, and one-thing-each-is-bad-at. Return a markdown table. No hedging — pick a clear winner per row when one exists." },
  { category: "Research", title: "Steelman the opposing view", body: "I believe: {my position}. Steelman the strongest counter-position. Present 3 arguments a thoughtful critic would make, and for each: one piece of evidence and one concession I should make if I still disagree." },
  { category: "Career", title: "Resume bullet rewrite", body: "Rewrite this resume bullet using the format 'Action verb + what + measurable impact'. Remove buzzwords. Keep under 20 words.\n\nBullet:\n{paste}" },
  { category: "Career", title: "Interview answer scaffold", body: "I'm prepping for the question: '{question}'. Draft a 90-second STAR-format answer based on this situation: {context}. End with the lesson learned in one sentence." },
  { category: "Career", title: "Salary negotiation script", body: "Write a negotiation response. Offer I got: {offer}. My target: {target}. My leverage: {reason}. Keep it warm, firm, and under 100 words. End with a clear ask, not a question." },
  { category: "Learning", title: "Explain it like I'm 12", body: "Explain {concept} as if I'm 12. One analogy, one real-world example, and one common misconception — in that order. Max 150 words." },
  { category: "Learning", title: "Flashcards from notes", body: "Turn the notes below into 10 Anki-style Q/A flashcards. Make each question specific enough that guessing is impossible. Front: question. Back: answer + one-line 'why it matters'.\n\nNotes:\n{paste}" },
  { category: "Learning", title: "Socratic tutor mode", body: "Act as a Socratic tutor on {topic}. Don't explain directly — ask me questions one at a time to guide me toward understanding. Start with the most basic one. Wait for my answer before moving on." },
  { category: "Meetings", title: "Meeting notes → action items", body: "From these raw notes, extract: (1) decisions made, (2) action items in the format 'Owner — action — due date', (3) open questions with nobody assigned. Skip small talk.\n\nNotes:\n{paste}" },
  { category: "Meetings", title: "Agenda for a hard conversation", body: "Help me build an agenda for a 20-minute conversation with {person}. The hard topic: {topic}. Give me: (1) opening line, (2) 3 questions to understand their side, (3) the one truth I need to say, (4) a good exit line." },
];

const CATEGORIES = Array.from(new Set(PROMPTS.map((p) => p.category)));

export function AiPromptLibrary() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return PROMPTS.filter((p) =>
      (cat === "all" || p.category === cat) &&
      (!q || p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)),
    );
  }, [query, cat]);

  function copy(body: string, idx: number) {
    navigator.clipboard?.writeText(body);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search prompts…" className="flex-1 min-w-[200px] rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="text-xs text-slate-500">{filtered.length} prompt{filtered.length === 1 ? "" : "s"}</div>

      <div className="space-y-3">
        {filtered.map((p, i) => (
          <div key={i} className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-wide font-semibold text-brand">{p.category}</div>
                <div className="text-sm font-semibold">{p.title}</div>
              </div>
              <button onClick={() => copy(p.body, i)} className="text-xs bg-brand text-white rounded-lg px-3 py-1 hover:bg-brand-dark">
                {copiedIdx === i ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed bg-white rounded-lg border border-slate-200 p-3">{p.body}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
