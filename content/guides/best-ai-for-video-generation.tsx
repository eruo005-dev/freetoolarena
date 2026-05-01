import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    AI video in 2026 matured fast. Sora 2 (OpenAI), Veo 3 (Google), Runway Gen-4, Kling 2.5, and
    Pika 2.5 each lead a niche. Picking the right one depends on length, style, control, and
    cost.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The leaders by use case</h2>
    <ul>
      <li><strong>Cinematic / film-look:</strong> Sora 2 (in ChatGPT Plus / Pro). Best motion
        coherence and cinematography.</li>
      <li><strong>Realistic + controllable:</strong> Veo 3 (in Gemini Advanced). Strong physics,
        predictable outputs.</li>
      <li><strong>Director-control workflows:</strong> Runway Gen-4. Camera control, motion brush,
        and Director Mode.</li>
      <li><strong>Fast-iterating short-form:</strong> Pika 2.5 + Kling 2.5. Cheap, quick, social-ready.</li>
      <li><strong>Lip-sync + character consistency:</strong> Hedra Character-2 + Higgsfield.</li>
      <li><strong>Open-weight self-host:</strong> CogVideoX, HunyuanVideo. Quality is closing on
        proprietary, latency is much higher.</li>
    </ul>

    <h2>Pricing</h2>
    <ul>
      <li><strong>ChatGPT Plus ($20):</strong> Sora limited; Pro ($200) for unlimited.</li>
      <li><strong>Gemini Advanced ($20):</strong> Veo limited; Ultra ($250) for higher caps.</li>
      <li><strong>Runway Standard ($15-95):</strong> credits-based, Director Mode.</li>
      <li><strong>Pika / Kling / Higgsfield:</strong> $10-60/mo with credit packs.</li>
    </ul>

    <h2>Real-world workflow</h2>
    <p>
      Pros aren&rsquo;t generating ads end-to-end with one tool. The 2026 workflow is:
      Midjourney for the keyframe &rarr; Runway for image-to-video on that keyframe &rarr; Sora or
      Veo for the long shots &rarr; Topaz Video AI for upscale &rarr; Premiere / Resolve for the
      cut. Each tool does one thing well.
    </p>

    <h2>Limits to know</h2>
    <ul>
      <li>Most tools cap at 8-15 seconds per shot in 2026. You stitch in post.</li>
      <li>Faces of real people are restricted across all major providers.</li>
      <li>Music + audio sync is improving but still spotty &mdash; generate audio separately
        (Suno, Udio).</li>
      <li>Watermarks are mandatory in some jurisdictions. Check before commercial use.</li>
    </ul>
    <p>
      Compare: <a href="/compare/chatgpt-vs-gemini">ChatGPT vs Gemini</a>.
    </p>
  </>
);
