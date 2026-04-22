"use client";

import { useMemo, useState } from "react";

const STYLES = ["photorealistic", "cinematic", "oil painting", "watercolor", "pencil sketch", "anime", "3D render", "low-poly", "cyberpunk", "studio ghibli", "isometric", "pixel art", "flat vector", "pencil doodle", "polaroid photo", "film grain"];
const CAMERAS = ["35mm lens", "85mm portrait lens", "wide-angle lens", "macro lens", "drone shot", "overhead view", "low angle", "eye-level", "dutch angle"];
const LIGHTING = ["golden hour", "soft morning light", "overcast daylight", "studio softbox", "rim lighting", "neon glow", "candlelight", "harsh midday sun", "blue hour", "backlit silhouette"];
const MODELS = [
  { id: "midjourney", label: "Midjourney", build: (p: any) => `${p.subject}, ${p.style}, ${p.lighting}, ${p.camera}${p.details ? ", " + p.details : ""} --ar ${p.aspect} --stylize 250${p.negative ? ` --no ${p.negative}` : ""}` },
  { id: "dalle", label: "DALL·E / ChatGPT", build: (p: any) => `${p.subject}. Rendered in ${p.style} style, ${p.lighting}, shot with ${p.camera}${p.details ? ". " + p.details : ""}. Aspect ratio: ${p.aspect}.` },
  { id: "sd", label: "Stable Diffusion", build: (p: any) => {
    const pos = [`(${p.subject})`, p.style, p.lighting, p.camera, p.details].filter(Boolean).join(", ");
    const neg = p.negative || "blurry, low quality, watermark, text, deformed, extra limbs";
    return `positive:\n${pos}\n\nnegative:\n${neg}\n\nsize: ${p.aspect === "16:9" ? "1024×576" : p.aspect === "9:16" ? "576×1024" : p.aspect === "1:1" ? "1024×1024" : "1024×1024"}`;
  } },
];

export function AiImagePromptBuilder() {
  const [subject, setSubject] = useState("a lone astronaut sitting on a moss-covered rock in a ruined cathedral");
  const [style, setStyle] = useState(STYLES[0]);
  const [camera, setCamera] = useState(CAMERAS[1]);
  const [lighting, setLighting] = useState(LIGHTING[0]);
  const [details, setDetails] = useState("reflection in the helmet visor, shafts of dust-lit sunlight");
  const [aspect, setAspect] = useState("16:9");
  const [negative, setNegative] = useState("text, logo, watermark, extra fingers");
  const [model, setModel] = useState("midjourney");
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    const m = MODELS.find((x) => x.id === model)!;
    return m.build({ subject, style, camera, lighting, details, aspect, negative });
  }, [model, subject, style, camera, lighting, details, aspect, negative]);

  function copy() {
    navigator.clipboard?.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Subject</span><input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Style</span>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            {STYLES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Camera</span>
          <select value={camera} onChange={(e) => setCamera(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            {CAMERAS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Lighting</span>
          <select value={lighting} onChange={(e) => setLighting(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            {LIGHTING.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Aspect ratio</span>
          <select value={aspect} onChange={(e) => setAspect(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="1:1">1:1 square</option><option value="16:9">16:9 landscape</option><option value="9:16">9:16 portrait / phone</option><option value="3:2">3:2 classic photo</option><option value="4:5">4:5 Instagram</option>
          </select>
        </label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Extra details</span><input value={details} onChange={(e) => setDetails(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Negative prompt (things to avoid)</span><input value={negative} onChange={(e) => setNegative(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
      </div>

      <div className="flex gap-2 flex-wrap">
        {MODELS.map((m) => (
          <button key={m.id} onClick={() => setModel(m.id)} className={`text-xs px-3 py-1 rounded-full border ${model === m.id ? "bg-brand text-white border-brand" : "bg-white text-slate-700 border-slate-300"}`}>
            {m.label}
          </button>
        ))}
      </div>

      <pre className="rounded-xl bg-slate-900 text-slate-100 p-4 text-xs font-mono whitespace-pre-wrap">{prompt}</pre>
      <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">{copied ? "Copied" : "Copy prompt"}</button>
    </div>
  );
}
