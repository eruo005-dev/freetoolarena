import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Five image-generation models matter in 2026: Midjourney v7, FLUX 1.1 Pro Ultra, DALL-E 4,
    Imagen 4, and Stable Diffusion 3.5 Large. Each leads in a different niche &mdash; pick by what
    you&rsquo;re generating, not by which is &ldquo;best.&rdquo;
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The leaders by use case</h2>
    <ul>
      <li><strong>Marketing-grade hero images:</strong> Midjourney v7. Most consistent style, best
        prompt understanding, gold standard for ad creative.</li>
      <li><strong>Photorealism:</strong> FLUX 1.1 Pro Ultra (4MP). Beats DALL-E and Imagen on
        skin texture, lighting realism.</li>
      <li><strong>Text in images:</strong> Imagen 4 + DALL-E 4 both excellent. FLUX is competitive
        but loses on multi-line layouts.</li>
      <li><strong>Free / open-weight:</strong> Stable Diffusion 3.5 Large or FLUX dev. Run on
        ComfyUI / Automatic1111 / DiffusionBee.</li>
      <li><strong>Iterative editing:</strong> DALL-E 4 in ChatGPT. Inpaint by typing.</li>
      <li><strong>Speed:</strong> FLUX Schnell or SDXL Turbo &mdash; sub-second on a decent GPU.</li>
    </ul>

    <h2>Pricing</h2>
    <ul>
      <li><strong>Midjourney:</strong> $10-120/mo. v7 in Pro+ tiers.</li>
      <li><strong>ChatGPT Plus ($20/mo):</strong> includes DALL-E 4 + Sora.</li>
      <li><strong>Gemini Advanced ($20/mo):</strong> includes Imagen 4 + Veo.</li>
      <li><strong>Replicate / fal.ai (FLUX API):</strong> ~$0.05 per image.</li>
      <li><strong>Self-host SD 3.5:</strong> $0 (electricity).</li>
    </ul>

    <h2>The honest 2026 stack</h2>
    <ul>
      <li>Marketing / brand work: <strong>Midjourney</strong> ($10-30/mo).</li>
      <li>Daily knowledge work + occasional image: <strong>ChatGPT Plus or Gemini Advanced</strong>
        ($20/mo) &mdash; you&rsquo;re paying for chat anyway.</li>
      <li>Heavy generation / iteration: add Replicate or self-host FLUX.</li>
    </ul>

    <h2>What to avoid</h2>
    <ul>
      <li>Real human faces of people who didn&rsquo;t consent. Easy to do, ethically and often
        legally wrong.</li>
      <li>Generating brand logos for trademarked companies for client work without checking IP.</li>
      <li>Skipping the prompt-engineering phase &mdash; one good prompt outproduces 30 lazy ones.</li>
    </ul>
    <p>
      Compare: <a href="/compare/chatgpt-vs-gemini">ChatGPT vs Gemini</a>.
    </p>
  </>
);
