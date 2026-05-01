"use client";

const VOICE_TOOLS = [
  { name: "ChatGPT Advanced Voice", vendor: "OpenAI", access: "Plus $20/mo", latency: "200-400ms", best: "Most expressive + interruptible", note: "GPT-5o under the hood; supports vision" },
  { name: "Gemini Live", vendor: "Google", access: "Free + Advanced $20/mo", latency: "300-500ms", best: "Live screen sharing, multilingual", note: "Most natural multilingual; can see your screen" },
  { name: "Claude Voice", vendor: "Anthropic", access: "Pro $20/mo (mobile)", latency: "350-500ms", best: "Cleanest reasoning by voice", note: "Slower than ChatGPT but better accuracy" },
  { name: "Grok Voice", vendor: "xAI", access: "X Premium $8+", latency: "200-350ms", best: "Looser, less filtered", note: "In X mobile app; tightly tied to account" },
  { name: "Perplexity Voice", vendor: "Perplexity", access: "Free + Pro $20", latency: "300-450ms", best: "Voice-driven research with sources", note: "Spoken citations; rare" },
  { name: "Apple Intelligence (Siri+ChatGPT)", vendor: "Apple", access: "Free with Apple device", latency: "200-300ms on-device, 400ms cloud", best: "On-device privacy; ChatGPT escalation", note: "On-device for short queries, ChatGPT for long" },
  { name: "ElevenLabs Conversational", vendor: "ElevenLabs", access: "API $5+/mo", latency: "150-250ms", best: "Voice cloning + custom personalities", note: "For developers; bring-your-own backend" },
  { name: "Sesame Maya/Miles", vendor: "Sesame", access: "Free demo + API", latency: "Sub-200ms", best: "Most human-feeling cadence", note: "Open-weight CSM-1B model; self-hostable" },
];

export function AiVoiceModeComparison() {
  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Tool</th><th>Vendor</th><th>Access</th><th>Latency</th><th>Best for</th></tr>
          </thead>
          <tbody>
            {VOICE_TOOLS.map((t) => (
              <tr key={t.name} className="border-t border-slate-100">
                <td className="py-1 font-medium text-slate-800">{t.name}</td>
                <td className="py-1 text-slate-600">{t.vendor}</td>
                <td className="py-1 text-xs text-slate-600">{t.access}</td>
                <td className="py-1 text-slate-600">{t.latency}</td>
                <td className="py-1 text-xs text-slate-600">{t.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">When each wins</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li><strong>Most natural feel:</strong> ChatGPT Advanced Voice or Sesame Maya.</li>
          <li><strong>Best for screen-sharing tasks:</strong> Gemini Live (annotates what it sees).</li>
          <li><strong>Most accurate reasoning:</strong> Claude Voice on mobile.</li>
          <li><strong>Privacy-first:</strong> Apple Intelligence on-device; or self-host Sesame.</li>
          <li><strong>Voice cloning / app builders:</strong> ElevenLabs.</li>
        </ul>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <strong>Latency reality:</strong> &ldquo;feels human&rdquo; threshold is around 250ms. ChatGPT, Apple, and Sesame all
        cross that bar in 2026. The rest are usable but you&rsquo;ll feel the pause &mdash; OK for thinking-out-loud
        sessions, distracting in fast back-and-forth.
      </div>
    </div>
  );
}
