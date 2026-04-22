"use client";

import { useMemo, useState } from "react";

type Style = { name: string; category: string; snippet: string };

const STYLES: Style[] = [
  { name: "Photorealistic", category: "Photo", snippet: "photorealistic, sharp focus, natural skin texture, depth of field, shot on Canon EOS R5, 50mm f/1.4" },
  { name: "Cinematic", category: "Photo", snippet: "cinematic lighting, anamorphic lens, shallow depth of field, film grain, teal and orange color grading, wide screen" },
  { name: "Film noir", category: "Photo", snippet: "black and white film noir, high contrast, venetian blind shadows, 1940s aesthetic, moody chiaroscuro" },
  { name: "Polaroid", category: "Photo", snippet: "instant polaroid photograph, white border, slight color shift, faded vintage film look, casual snapshot" },
  { name: "Fashion editorial", category: "Photo", snippet: "high fashion editorial photography, Vogue-style, dramatic pose, studio softbox lighting, 85mm portrait lens" },
  { name: "Wildlife photo", category: "Photo", snippet: "national geographic wildlife photography, 600mm telephoto lens, golden hour, natural habitat, pin-sharp eyes" },

  { name: "Oil painting", category: "Painterly", snippet: "classical oil painting, visible brush strokes, impasto texture, rich color palette, canvas grain, Rembrandt-style lighting" },
  { name: "Watercolor", category: "Painterly", snippet: "watercolor painting, soft wet-on-wet bleeds, loose brush strokes, visible paper texture, pastel palette" },
  { name: "Gouache", category: "Painterly", snippet: "gouache painting, flat opaque colors, matte finish, mid-century illustration feel, painted-paper texture" },
  { name: "Impressionist", category: "Painterly", snippet: "impressionist painting in the style of Monet, loose dabs of color, dappled light, outdoor plein air scene" },
  { name: "Surrealist", category: "Painterly", snippet: "surrealist painting, dreamlike scene, melting forms, impossible architecture, Salvador Dalí influence" },
  { name: "Ukiyo-e", category: "Painterly", snippet: "ukiyo-e Japanese woodblock print, flat color planes, bold outlines, Hokusai / Hiroshige composition" },

  { name: "Pencil sketch", category: "Drawn", snippet: "graphite pencil sketch, fine cross-hatching, rough paper texture, loose construction lines, sketchbook feel" },
  { name: "Ink drawing", category: "Drawn", snippet: "black ink drawing, stippled shading, clean line weight variation, technical pen, high contrast" },
  { name: "Charcoal", category: "Drawn", snippet: "charcoal drawing, smudged shadows, dramatic tonal range, expressive mark-making, newsprint texture" },
  { name: "Concept art", category: "Drawn", snippet: "concept art, professional digital painting, dramatic lighting, ArtStation trending, high detail, 4k" },
  { name: "Storyboard", category: "Drawn", snippet: "rough storyboard panel, loose marker sketch, action-focused, minimal color, film-pre-production style" },
  { name: "Comic book", category: "Drawn", snippet: "american comic book illustration, heavy black inks, ben-day dot halftones, bold flat colors, superhero-style dynamic pose" },

  { name: "Anime (90s)", category: "Anime", snippet: "1990s anime cel animation style, hand-painted backgrounds, limited color palette, film grain, Akira / Ghost in the Shell influence" },
  { name: "Modern anime", category: "Anime", snippet: "modern anime illustration, clean line art, vibrant cel shading, large expressive eyes, KyoAni-style polish" },
  { name: "Studio Ghibli", category: "Anime", snippet: "Studio Ghibli style, soft watercolor backgrounds, warm nostalgic lighting, cozy detailed environments, Miyazaki charm" },
  { name: "Chibi", category: "Anime", snippet: "chibi style, oversized head, tiny body, cute soft colors, flat cel shading, sticker-ready proportions" },

  { name: "3D render", category: "3D", snippet: "octane 3d render, physically based materials, soft global illumination, studio HDRI, subsurface scattering, product shot" },
  { name: "Low-poly", category: "3D", snippet: "low-poly 3d render, flat shaded triangular facets, limited color palette, geometric minimalism, indie game aesthetic" },
  { name: "Pixar 3D", category: "3D", snippet: "pixar-style 3d character, rounded shapes, expressive face, warm cinematic lighting, family-film polish" },
  { name: "Voxel art", category: "3D", snippet: "voxel art, cube-based 3d, MagicaVoxel aesthetic, chunky blocky forms, isometric perspective, saturated colors" },
  { name: "Clay render", category: "3D", snippet: "clay render, monochrome gray matte material, ambient occlusion, simple 3-point lighting, modeling-only look" },

  { name: "Pixel art", category: "Retro", snippet: "16-bit pixel art, limited palette, SNES era, crisp hard edges, dithered shading, side-view" },
  { name: "Vaporwave", category: "Retro", snippet: "vaporwave aesthetic, hot pink and cyan neon, 90s windows UI, grid floor, roman busts, VHS artifacts" },
  { name: "Synthwave", category: "Retro", snippet: "synthwave, neon grid horizon, chrome sun, 1980s sci-fi movie poster, magenta and purple gradient sky" },
  { name: "Retro poster", category: "Retro", snippet: "1960s screen-printed travel poster, limited spot colors, halftone texture, bold typography, mid-century modern" },
  { name: "Y2K", category: "Retro", snippet: "early 2000s Y2K aesthetic, chrome and bubble shapes, holographic textures, translucent plastic, MSN-messenger era" },

  { name: "Cyberpunk", category: "Sci-fi", snippet: "cyberpunk, rain-slick neon streets, holographic billboards, blade runner atmosphere, wet reflections, dense detail" },
  { name: "Steampunk", category: "Sci-fi", snippet: "steampunk, brass gears, riveted copper, Victorian goggles, steam pipes, sepia tones, aether-powered machines" },
  { name: "Biopunk", category: "Sci-fi", snippet: "biopunk, organic machinery, fleshy cables, glowing veins, wet textures, body horror aesthetic" },
  { name: "Solarpunk", category: "Sci-fi", snippet: "solarpunk, lush vertical gardens on architecture, art-nouveau clean tech, warm sunlight, hopeful green-and-gold palette" },

  { name: "Flat vector", category: "Graphic", snippet: "flat vector illustration, solid geometric shapes, limited palette, no gradients, editorial illustration style" },
  { name: "Isometric", category: "Graphic", snippet: "isometric illustration, 30-degree projection, flat colors, clean thin outlines, infographic-ready composition" },
  { name: "Line art", category: "Graphic", snippet: "minimal line art, single weight black line on white, no fill, continuous-line drawing, elegant and airy" },
  { name: "Risograph", category: "Graphic", snippet: "risograph print, 2-color overprint (pink + teal), grainy halftone, slight misregistration, indie zine aesthetic" },
  { name: "Blueprint", category: "Graphic", snippet: "technical blueprint, white line drawing on blue grid, orthographic projection, dimension callouts, engineering-document style" },
];

const CATEGORIES = Array.from(new Set(STYLES.map((s) => s.category)));

export function AiArtStylePicker() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return STYLES.filter((s) =>
      (cat === "all" || s.category === cat) &&
      (!q || s.name.toLowerCase().includes(q) || s.snippet.toLowerCase().includes(q)),
    );
  }, [query, cat]);

  function copy(s: string, i: number) {
    navigator.clipboard?.writeText(s);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search styles…" className="flex-1 min-w-[200px] rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="text-xs text-slate-500">{filtered.length} style{filtered.length === 1 ? "" : "s"} — click to copy snippet</div>

      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((s, i) => (
          <button key={s.name} onClick={() => copy(s.snippet, i)} className="text-left rounded-xl bg-slate-50 hover:bg-slate-100 p-4 border border-slate-200 transition">
            <div className="flex items-center justify-between mb-1">
              <div className="font-semibold text-sm">{s.name}</div>
              <div className="text-[10px] uppercase tracking-wide text-brand font-semibold">{copiedIdx === i ? "Copied" : s.category}</div>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">{s.snippet}</div>
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500">Pair these snippets with your subject in any image model: Midjourney, DALL·E, Stable Diffusion, Flux, etc.</p>
    </div>
  );
}
