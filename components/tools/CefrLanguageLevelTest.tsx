"use client";

import { useMemo, useState } from "react";

type Question = {
  id: string;
  text: string;
  skill: "Listening" | "Reading" | "Speaking" | "Writing";
};

const QUESTIONS: Question[] = [
  { id: "q1", text: "I can understand basic greetings and introductions.", skill: "Listening" },
  { id: "q2", text: "I can read simple signs, menus, and short notices.", skill: "Reading" },
  { id: "q3", text: "I can introduce myself and answer basic personal questions.", skill: "Speaking" },
  { id: "q4", text: "I can write short messages and fill in basic forms.", skill: "Writing" },
  { id: "q5", text: "I can follow a conversation at normal speed on familiar topics.", skill: "Listening" },
  { id: "q6", text: "I can read a newspaper article and grasp the main ideas.", skill: "Reading" },
  { id: "q7", text: "I can discuss abstract topics like politics or philosophy.", skill: "Speaking" },
  { id: "q8", text: "I can write structured essays with arguments and examples.", skill: "Writing" },
  { id: "q9", text: "I can understand fast-paced films and idiomatic speech without subtitles.", skill: "Listening" },
  { id: "q10", text: "I can read literature and specialized texts effortlessly.", skill: "Reading" },
];

const RATING_LABELS = ["Not at all", "With difficulty", "Somewhat", "Comfortably", "Effortlessly"];

type LevelInfo = {
  level: string;
  label: string;
  description: string;
  useCases: string[];
  nextTarget: string;
};

function scoreToLevel(score: number): LevelInfo {
  if (score <= 10) {
    return {
      level: "A1",
      label: "Beginner",
      description: "You can handle very basic everyday expressions and simple phrases.",
      useCases: ["Order a coffee", "Ask for directions", "Exchange greetings"],
      nextTarget: "Practice short dialogues and build a 500-word core vocabulary to reach A2.",
    };
  }
  if (score <= 17) {
    return {
      level: "A2",
      label: "Elementary",
      description: "You can communicate in simple, routine situations on familiar topics.",
      useCases: ["Describe your job and family", "Shop and travel", "Write a short postcard"],
      nextTarget: "Expand past/future tenses and read graded readers to reach B1.",
    };
  }
  if (score <= 24) {
    return {
      level: "B1",
      label: "Intermediate",
      description: "You can deal with most situations while travelling and express opinions on familiar matters.",
      useCases: ["Handle work emails", "Travel independently", "Follow TV shows with subtitles"],
      nextTarget: "Tackle authentic articles and practice extended speaking to reach B2.",
    };
  }
  if (score <= 30) {
    return {
      level: "B2",
      label: "Upper Intermediate",
      description: "You can interact with fluency and spontaneity on a wide range of subjects.",
      useCases: ["Participate in meetings", "Write detailed reports", "Watch films without subtitles"],
      nextTarget: "Refine nuance, idioms, and formal register to reach C1.",
    };
  }
  if (score <= 36) {
    return {
      level: "C1",
      label: "Advanced",
      description: "You use the language flexibly and effectively for social, academic, and professional purposes.",
      useCases: ["Deliver presentations", "Study at university", "Negotiate complex topics"],
      nextTarget: "Focus on literary style and domain-specific precision to reach C2.",
    };
  }
  return {
    level: "C2",
    label: "Mastery",
    description: "You understand virtually everything and express yourself with precision in complex situations.",
    useCases: ["Translate professionally", "Write academic papers", "Appreciate wordplay and literature"],
    nextTarget: "Maintain exposure through reading and native-speaker conversation.",
  };
}

export function CefrLanguageLevelTest() {
  const [answers, setAnswers] = useState<Record<string, number>>(
    Object.fromEntries(QUESTIONS.map((q) => [q.id, 2])),
  );

  const total = useMemo(
    () => QUESTIONS.reduce((sum, q) => sum + (Number.isFinite(answers[q.id]) ? answers[q.id] : 0), 0),
    [answers],
  );
  const info = scoreToLevel(total);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-semibold text-brand mb-3">Self-assessment</h3>
        <p className="text-sm text-slate-600 mb-4">
          Rate each statement from 0 (not at all) to 4 (effortlessly). Your score maps to a CEFR level.
        </p>
        <div className="space-y-4">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="border-b border-slate-100 pb-3 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-slate-800 flex-1">{q.text}</p>
                <span className="ml-3 text-xs font-medium text-brand bg-slate-100 px-2 py-0.5 rounded">
                  {q.skill}
                </span>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setAnswers({ ...answers, [q.id]: n })}
                    className={`flex-1 text-xs py-1.5 rounded border transition ${
                      answers[q.id] === n
                        ? "bg-brand text-white border-brand"
                        : "bg-white text-slate-600 border-slate-300 hover:border-brand"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-1">{RATING_LABELS[answers[q.id] ?? 0]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-4xl font-bold text-brand">{info.level}</span>
          <span className="text-lg text-slate-700">{info.label}</span>
          <span className="ml-auto text-sm text-slate-500">Score: {total} / 40</span>
        </div>
        <p className="text-sm text-slate-700 mb-3">{info.description}</p>
        <div className="mb-3">
          <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Typical use cases</p>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-0.5">
            {info.useCases.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-slate-700">
          <span className="font-semibold">Next target&nbsp;&mdash;&nbsp;</span>
          {info.nextTarget}
        </div>
      </div>
    </div>
  );
}
