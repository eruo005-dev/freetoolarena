"use client";

import { useMemo, useState } from "react";

type Setting = "party" | "work" | "first_date" | "wedding" | "networking" | "family" | "kids";

const POOLS: Record<Setting, string[]> = {
  party: [
    "What's the best thing you've eaten this week?",
    "What's a hobby you picked up in the last year that surprised you?",
    "If money was no object, where would you fly tomorrow?",
    "What show is currently eating your bedtime?",
    "What's the last song you put on repeat?",
    "Who's the most interesting person you've met this year?",
    "What's the smallest thing that's brought you joy lately?",
    "What's a skill you've always wanted to learn but haven't?",
    "What's a recent rabbit hole you fell into online?",
    "What's the best meal you've cooked or ordered recently?",
    "What's something you used to love that you don't anymore?",
    "If you had a free Saturday with no plans, what would you do?",
  ],
  work: [
    "What part of your work has changed most in the last year?",
    "Which project taught you something you didn't expect?",
    "What's a tool or workflow you've adopted recently?",
    "What problem are you most enjoying working on right now?",
    "What's the most useful thing your team has shipped this quarter?",
    "Where do you wish your industry was further along?",
    "What's a book or talk you'd recommend to someone in your role?",
    "What's a conference or event that was actually worth attending?",
    "What's a non-work thing you've been excited about lately?",
    "What's something you're trying to learn outside your comfort zone?",
  ],
  first_date: [
    "What did you do today that you'd actually want to talk about?",
    "What's something you've changed your mind about in the last few years?",
    "What would your perfect Sunday morning look like?",
    "What's a place you've been that lived up to the hype?",
    "What's your hot take on something most people agree on?",
    "What's something you used to be embarrassed about that you now love?",
    "What's the last thing that genuinely surprised you?",
    "What's a small thing you're really good at?",
    "What's a tradition you'd like to start or keep?",
    "What's the best book/movie/show you've taken your time with recently?",
  ],
  wedding: [
    "How do you know the couple?",
    "What's your favorite memory with one of them?",
    "What's the best wedding you've been to and why?",
    "Have you traveled in for this, or are you local?",
    "What dish are you most looking forward to tonight?",
    "Have you caught up with any old friends you haven't seen in a while?",
    "What's the next celebration on your calendar?",
    "How did you decide what to wear today? (Light icebreaker)",
  ],
  networking: [
    "What brought you to this event specifically?",
    "What are you working on that you're most excited about right now?",
    "What kind of people are you hoping to meet here?",
    "Where do you go to keep up with your industry?",
    "What's a problem in your work you'd love to solve in the next year?",
    "Who's someone whose work you admire right now?",
    "What's something most people in your field disagree on?",
    "How can I help, or who else here should I be talking to?",
  ],
  family: [
    "What's something you're proud of from the last month?",
    "What's the best thing you ate this week?",
    "What's a memory we share that you've been thinking about lately?",
    "What are you reading or watching right now?",
    "What's something you want to do more of next year?",
    "What was the hardest thing this year, looking back?",
    "What's a tradition we should keep doing?",
    "If we did one trip together this year, where would you want to go?",
  ],
  kids: [
    "What was the best part of your day?",
    "What was the trickiest part of your day?",
    "If you could invent any food, what would it be?",
    "What's something that made you laugh today?",
    "If our pet could talk, what would it say?",
    "What superpower would you pick today, and why today?",
    "What's a question you have about anything in the world?",
    "If we had a free hour right now, what would we do?",
  ],
};

const SETTING_LABEL: Record<Setting, string> = {
  party: "Party / casual gathering",
  work: "Work / coworkers",
  first_date: "First date",
  wedding: "Wedding / event",
  networking: "Networking event",
  family: "Family dinner",
  kids: "Talking with kids",
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function SmallTalkQuestionGenerator() {
  const [setting, setSetting] = useState<Setting>("party");
  const [seed, setSeed] = useState<number>(0);

  const questions = useMemo(() => {
    void seed;
    return shuffle(POOLS[setting]).slice(0, 5);
  }, [setting, seed]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Setting</span>
          <select
            value={setting}
            onChange={(e) => setSetting(e.target.value as Setting)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            {(Object.keys(POOLS) as Setting[]).map((k) => (
              <option key={k} value={k}>{SETTING_LABEL[k]}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="self-end rounded bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Reshuffle
        </button>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <h4 className="mb-3 text-sm font-semibold text-emerald-900">
          5 questions for: {SETTING_LABEL[setting]}
        </h4>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-emerald-900">
          {questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <h4 className="mb-2 font-semibold text-slate-800">Why these work</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>They&rsquo;re open-ended &mdash; impossible to answer with just &ldquo;yes&rdquo; or &ldquo;no.&rdquo;</li>
          <li>They invite a story, not a fact &mdash; stories are how strangers become acquaintances.</li>
          <li>They scale up: ask the same question back, plus a follow-up about <em>why</em> or <em>how</em>.</li>
          <li>None require political, money, or relationship-status answers &mdash; safe defaults.</li>
        </ul>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong className="text-slate-800">Tip:</strong> the goal isn&rsquo;t to interview anyone.
        Ask one, listen, share something of your own, then maybe ask a follow-up. A 70/30 listen-to-talk
        ratio is the sweet spot for being remembered as &ldquo;great to talk to.&rdquo;
      </div>
    </div>
  );
}
