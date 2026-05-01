"use client";

import { useMemo, useState } from "react";

type Style = "photo" | "cinematic" | "anime" | "illustration" | "3d" | "logo";
type Light = "natural" | "studio" | "golden" | "moody" | "neon";
type Cam = "wide" | "portrait" | "macro" | "aerial" | "fisheye";

const STYLE_PREFIX: Record<Style, string> = {
  photo: "professional photograph, sharp focus, high detail",
  cinematic: "cinematic still, anamorphic lens, color graded",
  anime: "anime illustration, cel-shaded, vibrant",
  illustration: "editorial illustration, clean line art, flat colors",
  "3d": "3D render, octane, soft global illumination",
  logo: "minimalist logo, vector, flat shapes, centered",
};

const LIGHT_TEXT: Record<Light, string> = {
  natural: "natural daylight",
  studio: "softbox studio lighting",
  golden: "golden hour, warm side light",
  moody: "low-key dramatic lighting, deep shadows",
  neon: "neon-lit, magenta and cyan rim light",
};

const CAM_TEXT: Record<Cam, string> = {
  wide: "wide-angle 24mm",
  portrait: "85mm portrait lens, shallow depth of field",
  macro: "macro lens, extreme close-up",
  aerial: "aerial drone perspective",
  fisheye: "fisheye distortion",
};

export function AiImagePromptHelper() {
  const [subject, setSubject] = useState<string>("a dog wearing a tiny astronaut helmet");
  const [style, setStyle] = useState<Style>("photo");
  const [light, setLight] = useState<Light>("golden");
  const [cam, setCam] = useState<Cam>("portrait");
  const [extras, setExtras] = useState<string>("dust particles in the air, eye contact");
  const [aspect, setAspect] = useState<string>("16:9");
  const [neg, setNeg] = useState<string>("blurry, lowres, deformed, watermark, text");

  const prompt = useMemo(() => {
    const parts = [
      STYLE_PREFIX[style],
      subject.trim(),
      LIGHT_TEXT[light],
      CAM_TEXT[cam],
      extras.trim(),
      `--ar ${aspect}`,
    ].filter(Boolean);
    return parts.join(", ");
  }, [subject, style, light, cam, extras, aspect]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium text-slate-700">Subject</span>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Style</span>
          <select value={style} onChange={(e) => setStyle(e.target.value as Style)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="photo">Photo</option><option value="cinematic">Cinematic</option><option value="anime">Anime</option><option value="illustration">Illustration</option><option value="3d">3D render</option><option value="logo">Logo</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Lighting</span>
          <select value={light} onChange={(e) => setLight(e.target.value as Light)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="natural">Natural</option><option value="studio">Studio</option><option value="golden">Golden hour</option><option value="moody">Moody</option><option value="neon">Neon</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Camera</span>
          <select value={cam} onChange={(e) => setCam(e.target.value as Cam)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="wide">Wide 24mm</option><option value="portrait">85mm portrait</option><option value="macro">Macro</option><option value="aerial">Aerial</option><option value="fisheye">Fisheye</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Aspect ratio</span>
          <select value={aspect} onChange={(e) => setAspect(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="16:9">16:9 (cinematic)</option><option value="1:1">1:1 (square)</option><option value="9:16">9:16 (vertical)</option><option value="4:3">4:3</option><option value="3:2">3:2</option>
          </select>
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium text-slate-700">Extra details</span>
          <input value={extras} onChange={(e) => setExtras(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium text-slate-700">Negative prompt (Stable Diffusion)</span>
          <input value={neg} onChange={(e) => setNeg(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <h4 className="text-sm font-semibold text-emerald-900">Generated prompt</h4>
          <button onClick={() => navigator.clipboard?.writeText(prompt)} className="text-xs text-emerald-800 underline">Copy</button>
        </div>
        <pre className="whitespace-pre-wrap font-mono text-xs text-emerald-900">{prompt}</pre>
        {neg.trim() && <pre className="mt-2 whitespace-pre-wrap font-mono text-xs text-rose-900">--no {neg}</pre>}
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        Works for Midjourney, DALL-E 4, FLUX, Imagen, Stable Diffusion 3.5. The <code>--ar</code> and <code>--no</code> flags
        are Midjourney syntax; for Stable Diffusion, paste the negative prompt in the dedicated negative field.
      </div>
    </div>
  );
}
