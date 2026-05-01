"use client";

const ENGINES = [
  { name: "Perplexity", url: "perplexity.ai", model: "Sonar / GPT-5 / Claude / Grok (pickable)", citations: "Always", deep: "Pro Search", price: "Free + $20/mo Pro", best: "Citation-first research" },
  { name: "ChatGPT Search", url: "chatgpt.com", model: "GPT-5", citations: "When grounded", deep: "Deep Research mode", price: "Free + $20/mo Plus", best: "All-in-one chat + search" },
  { name: "Google AI Overviews", url: "google.com", model: "Gemini", citations: "Optional", deep: "AI Mode", price: "Free", best: "Local + transactional + news" },
  { name: "Bing Copilot", url: "bing.com", model: "GPT-5", citations: "Sometimes", deep: "Multi-step Copilot", price: "Free", best: "Free GPT-5 access without ChatGPT account" },
  { name: "You.com", url: "you.com", model: "Claude / GPT / Gemini", citations: "Always", deep: "Genius Mode", price: "Free + $20/mo", best: "Multi-model picker per query" },
  { name: "Phind", url: "phind.com", model: "Phind-405B fine-tune", citations: "Always", deep: "Pro Search", price: "Free + $20/mo", best: "Developer-flavored answers" },
  { name: "Kagi", url: "kagi.com", model: "Kagi Assistant (Claude / GPT)", citations: "Optional", deep: "Universal Summarizer", price: "$10-25/mo", best: "Privacy + ad-free + custom ranking" },
  { name: "DuckDuckGo AI Chat", url: "duckduckgo.com/aichat", model: "GPT-5 mini / Claude Haiku / Llama / Mixtral", citations: "Optional", deep: "—", price: "Free", best: "Anonymous AI chat" },
];

export function AiSearchEngineComparison() {
  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Engine</th><th>Models</th><th>Citations</th><th>Deep mode</th><th>Pricing</th><th>Best for</th></tr>
          </thead>
          <tbody>
            {ENGINES.map((e) => (
              <tr key={e.name} className="border-t border-slate-100">
                <td className="py-1 font-medium text-slate-800">{e.name}</td>
                <td className="py-1 text-xs text-slate-600">{e.model}</td>
                <td className="py-1 text-slate-600">{e.citations}</td>
                <td className="py-1 text-xs text-slate-600">{e.deep}</td>
                <td className="py-1 text-xs text-slate-600">{e.price}</td>
                <td className="py-1 text-xs text-slate-600">{e.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">Pick by need</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li><strong>Research with sources you can verify:</strong> Perplexity Pro.</li>
          <li><strong>Privacy-first:</strong> Kagi (paid) or DuckDuckGo AI Chat (free).</li>
          <li><strong>Free GPT-5 access:</strong> Bing Copilot — works without a ChatGPT account.</li>
          <li><strong>Developer questions:</strong> Phind — better at code than general engines.</li>
          <li><strong>Local + transactional + news:</strong> Google with AI Overviews.</li>
          <li><strong>Multi-model variety:</strong> You.com — pick per query.</li>
        </ul>
      </div>
    </div>
  );
}
