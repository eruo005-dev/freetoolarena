"use client";

const TOOLS = [
  { name: "Suno v4.5", vendor: "Suno", price: "Free + $10-30/mo", best: "Best vocals + production polish", licenses: "Personal / Pro / Premier", note: "Default pick for full songs" },
  { name: "Udio", vendor: "Uncharted Labs", price: "Free + $10-30/mo", best: "Most stylistically diverse", licenses: "Personal / Pro", note: "Stronger genre coverage; tighter creative control" },
  { name: "Riffusion FUZZ", vendor: "Riffusion", price: "$10/mo", best: "Most consistent stems separation", licenses: "Personal / Pro", note: "Comes with stem export — useful for editing" },
  { name: "ElevenLabs Music", vendor: "ElevenLabs", price: "API $5+/mo", best: "Programmatic generation", licenses: "API only", note: "Built for products; not a consumer UX" },
  { name: "Sonauto v2", vendor: "Sonauto", price: "Free + $10/mo", best: "Best lyrics-to-song fidelity", licenses: "Personal / Pro", note: "If you have lyrics already, start here" },
  { name: "Stable Audio 2.5", vendor: "Stability AI", price: "Free + $12/mo", best: "Open source friendly + 3-min outputs", licenses: "Personal / Pro / Open", note: "Self-hostable weights for indie use" },
  { name: "MusicLM (research)", vendor: "Google", price: "Research preview", best: "Not consumer-ready", licenses: "—", note: "Academic only; no production access" },
  { name: "AIVA", vendor: "AIVA", price: "Free + $11-33/mo", best: "Classical / orchestral focus", licenses: "Standard / Pro", note: "MIDI export; right for film score work" },
];

export function AiMusicToolComparison() {
  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Tool</th><th>Vendor</th><th>Pricing</th><th>Best for</th><th>Notes</th></tr>
          </thead>
          <tbody>
            {TOOLS.map((t) => (
              <tr key={t.name} className="border-t border-slate-100">
                <td className="py-1 font-medium text-slate-800">{t.name}</td>
                <td className="py-1 text-slate-600">{t.vendor}</td>
                <td className="py-1 text-xs text-slate-600">{t.price}</td>
                <td className="py-1 text-xs text-slate-600">{t.best}</td>
                <td className="py-1 text-xs text-slate-600">{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">By use case</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li><strong>Full songs (default):</strong> Suno v4.5 Pro &mdash; best vocals + production polish.</li>
          <li><strong>Stylistic experimentation:</strong> Udio &mdash; broader genre range.</li>
          <li><strong>You have lyrics:</strong> Sonauto v2 &mdash; lyrics-fidelity optimized.</li>
          <li><strong>Indie producers:</strong> Riffusion FUZZ + Stable Audio &mdash; stems + open weights.</li>
          <li><strong>Orchestral / film score:</strong> AIVA &mdash; classical training, MIDI export.</li>
          <li><strong>Programmatic / app builder:</strong> ElevenLabs Music API.</li>
        </ul>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <strong>Licensing:</strong> commercial-use rights vary by tier. Personal-tier songs from Suno/Udio cannot be used in
        ads, films, or sold without a Pro+ license. Always check before using AI music in client work.
      </div>
    </div>
  );
}
