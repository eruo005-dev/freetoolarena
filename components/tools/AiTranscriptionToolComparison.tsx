"use client";

const TOOLS = [
  { name: "Otter.ai", price: "Free + $17-30/mo", accuracy: 92, languages: "37", live: true, speakers: "Auto-detect", best: "Live meeting transcription + summaries" },
  { name: "Whisper API (OpenAI)", price: "$0.006/min", accuracy: 95, languages: "99", live: false, speakers: "No (manual)", best: "Highest accuracy + bring-your-own UI" },
  { name: "Deepgram Nova-3", price: "$0.0043-0.0085/min", accuracy: 96, languages: "36", live: true, speakers: "Yes", best: "Production-grade speed + accuracy" },
  { name: "AssemblyAI Universal-2", price: "$0.12-0.37/hr", accuracy: 95, languages: "26", live: true, speakers: "Yes", best: "API-first; sentiment + summarization built in" },
  { name: "Rev.ai", price: "$0.02-0.25/min", accuracy: 94, languages: "36+", live: true, speakers: "Yes", best: "Human-grade transcription via human option" },
  { name: "Sonix", price: "$10-22/hr", accuracy: 93, languages: "53+", live: false, speakers: "Yes", best: "Pay-per-use; team workspace" },
  { name: "Granola", price: "$14-35/mo", accuracy: 92, languages: "20+", live: true, speakers: "Auto-named", best: "AI notebook with you typing alongside" },
  { name: "Zoom AI Companion", price: "Free with Zoom Pro", accuracy: 90, languages: "20+", live: true, speakers: "Yes", best: "Tightest Zoom workflow" },
  { name: "MacWhisper", price: "$15 one-time", accuracy: 95, languages: "99", live: false, speakers: "No", best: "Privacy-first local Whisper on macOS" },
];

export function AiTranscriptionToolComparison() {
  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Tool</th><th>Pricing</th><th>Accuracy</th><th>Languages</th><th>Live</th><th>Speakers</th><th>Best for</th></tr>
          </thead>
          <tbody>
            {TOOLS.map((t) => (
              <tr key={t.name} className="border-t border-slate-100">
                <td className="py-1 font-medium text-slate-800">{t.name}</td>
                <td className="py-1 text-xs text-slate-600">{t.price}</td>
                <td className="py-1 text-slate-600">{t.accuracy}%</td>
                <td className="py-1 text-slate-600">{t.languages}</td>
                <td className="py-1">{t.live ? <span className="text-emerald-700">&check;</span> : <span className="text-slate-300">&minus;</span>}</td>
                <td className="py-1 text-xs text-slate-600">{t.speakers}</td>
                <td className="py-1 text-xs text-slate-600">{t.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        Accuracy is on standard test sets (LibriSpeech / TED-LIUM); your real-world numbers depend on audio quality, background
        noise, and accents. For production: pilot 2-3 candidates on YOUR audio for a week before committing.
      </div>
    </div>
  );
}
