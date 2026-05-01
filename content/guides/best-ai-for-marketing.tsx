import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Marketers in 2026 are using AI for ad copy, social posts, SEO content, image generation,
    video, and customer research. No single model wins everything &mdash; but a small stack
    covers 95% of the work.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The 2026 marketing AI stack</h2>
    <ul>
      <li><strong>ChatGPT Plus</strong> &mdash; ad copy, social posts, brand voice exploration,
        Sora for video, DALL-E for images. The generalist marketing tool.</li>
      <li><strong>Claude Pro</strong> &mdash; long-form blog posts, white papers, case studies.
        Cleaner output for thought-leadership content.</li>
      <li><strong>Perplexity Pro</strong> &mdash; competitive research, customer pain-point research,
        trending topics with citations.</li>
      <li><strong>Midjourney</strong> &mdash; the gold standard for marketing-grade image generation.
        $10-60/mo.</li>
      <li><strong>Runway / Veo / Sora</strong> &mdash; AI video for ad creatives.</li>
      <li><strong>Jasper / Copy.ai</strong> &mdash; if you want a marketing-specific UX wrapping the
        underlying models. Worthwhile for teams that don&rsquo;t want to manage prompts.</li>
    </ul>

    <h2>By marketing task</h2>
    <ul>
      <li><strong>Ad headlines:</strong> ChatGPT Plus. Run 20 variants in 30 seconds.</li>
      <li><strong>Long-form SEO blog posts:</strong> Claude Sonnet for the draft, human edit for
        voice + facts. Use <a href="/guides/seo-basics-for-beginners">SEO basics</a> first.</li>
      <li><strong>Email sequences:</strong> Claude for tone, ChatGPT for variant generation.</li>
      <li><strong>Social calendar (LinkedIn / X / Instagram):</strong> Either flagship + a tone
        prompt with 5 example posts.</li>
      <li><strong>Customer research / surveys:</strong> Perplexity Pro for trend research, Claude
        for survey design + analysis.</li>
      <li><strong>Image creative:</strong> Midjourney for hero images, ChatGPT&rsquo;s image gen for
        social-fast variants.</li>
      <li><strong>Video creative:</strong> Sora (in ChatGPT Plus) or Runway (~$15-95/mo).</li>
      <li><strong>Landing-page copy:</strong> Claude for clarity, ChatGPT for conversion-flavored
        framings.</li>
    </ul>

    <h2>What about Gemini for marketing?</h2>
    <p>
      Gemini Advanced shines if your marketing stack lives in Google Workspace &mdash; Docs for
      drafts, Sheets for campaign tracking, Slides for pitch decks. The native Workspace AI is
      fast and contextual. For non-Google teams, ChatGPT + Claude usually edges out.
    </p>

    <h2>The $50/mo marketing stack</h2>
    <ul>
      <li>ChatGPT Plus ($20) &mdash; ad copy, social, image gen.</li>
      <li>Claude Pro ($20) &mdash; long-form + thought leadership.</li>
      <li>Midjourney Basic ($10) &mdash; brand-grade image generation.</li>
    </ul>
    <p>
      Add Perplexity Pro ($20) for serious competitive research. Compare:{" "}
      <a href="/compare/claude-vs-chatgpt">Claude vs ChatGPT</a>,{" "}
      <a href="/compare/chatgpt-vs-perplexity">ChatGPT vs Perplexity</a>.
    </p>
  </>
);
