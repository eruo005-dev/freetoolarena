import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Image prompt quality is the difference between &ldquo;mediocre AI slop&rdquo; and &ldquo;people genuinely
    can&rsquo;t tell.&rdquo; Here&rsquo;s how to write prompts that work across Midjourney, DALL-E 4, FLUX, Imagen,
    and Stable Diffusion 3.5 in 2026.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The 5-part structure</h2>
    <p>
      Stack <strong>style + subject + lighting + camera + extras + flags</strong>. A simple working prompt:
    </p>
    <pre className="rounded bg-slate-900 p-3 text-xs text-slate-100"><code>{`cinematic still, anamorphic lens, color graded,
a labrador wearing a tiny astronaut helmet,
golden hour warm side light,
85mm portrait lens shallow depth of field,
dust particles in the air, eye contact,
--ar 16:9`}</code></pre>

    <h2>What each piece does</h2>
    <ul>
      <li><strong>Style:</strong> &ldquo;photo&rdquo;, &ldquo;cinematic still&rdquo;, &ldquo;3D render&rdquo;, &ldquo;anime&rdquo; sets the broad aesthetic.</li>
      <li><strong>Subject:</strong> describe what the picture IS in plain language.</li>
      <li><strong>Lighting:</strong> golden hour, studio softbox, neon, moody low-key &mdash; the single biggest quality lever.</li>
      <li><strong>Camera:</strong> 24mm wide / 85mm portrait / macro / fisheye dictates composition feel.</li>
      <li><strong>Extras:</strong> texture, atmosphere, mood notes (e.g., &ldquo;dust particles&rdquo;, &ldquo;eye contact&rdquo;).</li>
      <li><strong>Flags:</strong> Midjourney <code>--ar</code>, <code>--no</code>, <code>--style raw</code>; SD&rsquo;s separate negative prompt.</li>
    </ul>

    <h2>Common mistakes</h2>
    <ul>
      <li>Asking for &ldquo;a photo of a man&rdquo; with no other detail. Models default to generic &mdash; you get slop.</li>
      <li>Stacking too many adjectives. After ~30-40 tokens, models trail off on detail adherence.</li>
      <li>Putting subject last. Most models weight earlier tokens more heavily.</li>
      <li>Using artist names without checking copyright comfort &mdash; commercial use risk.</li>
    </ul>

    <p>
      Build prompts faster with the <a href="/tools/ai-image-prompt-helper">AI image prompt helper</a>. For full
      tool comparison see <a href="/guides/best-ai-for-image-generation">best AI for image generation</a>.
    </p>
  </>
);
