import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Alt text is the short written description of an image that screen readers announce to blind and low-vision users, that browsers display when an image fails to load, and that search engines use to understand your visual content. Good alt text is specific, short, and written for the context the image lives in; bad alt text is either missing, stuffed with keywords, or bizarrely literal. Getting this right is the single biggest accessibility improvement most websites can make, and it compounds because every image on every page benefits. This guide covers the purpose of alt, when to describe versus caption, the special case of decorative images, length guidance, and how alt text interacts with SEO.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Who actually reads alt text</h2>
    <p>
      Four real audiences consume alt text, not one:
    </p>
    <ul>
      <li><strong>Screen reader users</strong> &mdash; the original and most important audience. The reader announces alt text as part of the page&rsquo;s reading order.</li>
      <li><strong>Users on slow or broken connections</strong> &mdash; when an image fails to load, the browser shows alt text where the image would have been.</li>
      <li><strong>Search engines</strong> &mdash; alt text is one of the signals Google uses to understand image content and page topic.</li>
      <li><strong>Voice assistants and AI agents</strong> &mdash; when summarizing a page, they lean heavily on alt to describe imagery.</li>
    </ul>
    <p>
      Good alt text serves all four at once. You&rsquo;re not writing for a machine or for a specific user group; you&rsquo;re writing for whoever can&rsquo;t see the pixels.
    </p>

    <h2>Describe, don&rsquo;t caption</h2>
    <p>
      A caption is editorial commentary shown to sighted readers: &ldquo;Our founder Jay at the 2026 launch event.&rdquo; Alt text is a functional description: &ldquo;A man in a blue blazer holding a microphone on a small stage with a purple banner behind him.&rdquo;
    </p>
    <p>
      The test: if the image disappeared, would the alt text convey what the image added to the page? If yes, it&rsquo;s good alt. If the alt just says &ldquo;Jay at launch&rdquo; and you&rsquo;d lose the informational value, it&rsquo;s captioning, not describing.
    </p>
    <p>
      When the image truly is just illustrating the caption, you can repeat the caption as alt &mdash; but usually a fuller description is better.
    </p>

    <h2>Length: short but not too short</h2>
    <p>
      Screen readers stop offering shortcut-navigation when alt gets long; users can&rsquo;t skip a rambling description. The pragmatic range is 80 to 150 characters. Longer descriptions (up to 250) are fine for complex images like charts or infographics where the content <em>is</em> the information.
    </p>
    <p>
      Target: one sentence that a screen reader announces in a single breath. If you need more, consider whether a longer text alternative (a paragraph elsewhere on the page, or an <code>aria-describedby</code> reference) is better than stuffing alt.
    </p>

    <h2>Decorative images: empty alt</h2>
    <p>
      Not every image carries information. Decorative images &mdash; background textures, purely aesthetic flourishes, an emoji-like icon beside a label that already names the concept &mdash; should have an explicitly empty alt attribute:
    </p>
    <pre>{`<img src="/decorative-swirl.png" alt="" />`}</pre>
    <p>
      The empty alt tells screen readers to skip the image entirely. Omitting the alt attribute is different &mdash; the reader will announce the filename instead, which is almost always useless. <strong>Always include alt, even if empty.</strong>
    </p>
    <p>
      An icon next to &ldquo;Menu&rdquo; in a nav: decorative (empty alt). An icon that is the only content of a button: functional (<code>alt=&quot;Open menu&quot;</code>).
    </p>

    <h2>Context matters more than the picture</h2>
    <p>
      The same image can deserve different alt text depending on where it appears. A photo of a red dress on a product page needs alt describing the product: &ldquo;Red A-line cotton dress with cap sleeves and a V-neckline.&rdquo; The same photo in a blog post about color theory might need: &ldquo;A saturated red dress against a pale gray wall.&rdquo;
    </p>
    <p>
      Ask: what does this image contribute <em>to this page, at this moment</em>? Write for that.
    </p>

    <h2>Functional images: describe the action</h2>
    <p>
      Images inside links or buttons describe the destination or action, not the pixels. If the link <em>is</em> an image of a magnifying glass, the alt isn&rsquo;t &ldquo;magnifying glass icon&rdquo; &mdash; it&rsquo;s &ldquo;Search.&rdquo;
    </p>
    <pre>{`<a href="/cart">
  <img src="/cart-icon.svg" alt="View shopping cart" />
</a>`}</pre>
    <p>
      Describing pixels here is a classic mistake that leaves screen-reader users lost.
    </p>

    <h2>Complex images: charts, diagrams, infographics</h2>
    <p>
      A data chart can&rsquo;t be summarized in 120 characters. The good-practice pattern:
    </p>
    <ul>
      <li>Short alt naming the chart: <code>alt=&quot;Bar chart: monthly revenue 2025&quot;</code>.</li>
      <li>A longer text alternative nearby &mdash; either a visible caption summarizing the key takeaway (&ldquo;Revenue grew 18% year-over-year, peaking in November&rdquo;) or a hidden longer description linked via <code>aria-describedby</code>.</li>
      <li>If the chart is the primary content, a data table beneath it gives screen-reader users access to every number.</li>
    </ul>

    <h2>Alt text and SEO</h2>
    <p>
      Google has said publicly that alt text helps search engines &ldquo;understand the subject matter of the image.&rdquo; Good descriptive alt &mdash; the same kind that&rsquo;s good for accessibility &mdash; is good for image search and for the broader ranking of the page.
    </p>
    <p>
      Keyword-stuffed alt (&ldquo;cheap red dress buy red dress online red dress sale&rdquo;) is obvious and penalized. Write for a human first and you&rsquo;ll get the SEO value as a byproduct.
    </p>

    <h2>Don&rsquo;t start with &ldquo;image of&rdquo;</h2>
    <p>
      Screen readers already announce &ldquo;image&rdquo; before reading alt text. Starting alt with &ldquo;image of&rdquo; or &ldquo;picture of&rdquo; creates &ldquo;image image of a dog&rdquo; &mdash; redundant and amateur. Just describe the content.
    </p>
    <p>
      Exception: if the <em>fact that it&rsquo;s a particular kind of visual</em> matters &mdash; &ldquo;Painting of a storm at sea&rdquo; versus &ldquo;Photograph of a storm at sea&rdquo; &mdash; name the medium.
    </p>

    <h2>People in images</h2>
    <p>
      Describe what&rsquo;s relevant for the context. Name known people (&ldquo;Jay Smith, founder&rdquo;) when context expects it. For stock photo subjects or unnamed people, describe race, gender, and age only when relevant to the point &mdash; a feature about diversity in hiring benefits from it; a generic blog header does not.
    </p>
    <p>
      When in doubt, err toward describing what&rsquo;s visible without speculation. &ldquo;A smiling woman in a lab coat&rdquo; beats &ldquo;a happy scientist.&rdquo;
    </p>

    <h2>Testing your alt</h2>
    <p>
      Two quick checks:
    </p>
    <ol>
      <li><strong>Read the page without images:</strong> does the content still make sense, relying on the alt text alone? If no, the alts are underwritten.</li>
      <li><strong>Read the alt in isolation:</strong> does it make sense without the surrounding paragraph? If only the context saves it, the alt is fine for this page but can&rsquo;t be reused.</li>
    </ol>

    <h2>Writing alt for a screenshot</h2>
    <p>
      Screenshots of software, error messages, and tutorials need different alt treatment:
    </p>
    <ul>
      <li><strong>Error messages:</strong> transcribe the actual error text. Alt: &ldquo;Error dialog reading &lsquo;Network connection lost. Retry?&rsquo; with Retry and Cancel buttons.&rdquo;</li>
      <li><strong>UI tutorials:</strong> describe the action or location, not every pixel. Alt: &ldquo;Settings menu with &lsquo;Privacy&rsquo; option highlighted.&rdquo;</li>
      <li><strong>Data tables captured as screenshots:</strong> either provide the data in accessible HTML alongside, or give alt a top-line summary (&ldquo;Table of monthly revenue, showing Q4 peak at $48k&rdquo;) and link to the full data.</li>
    </ul>

    <h2>Alt versus title versus caption</h2>
    <p>
      Three attributes that often get confused:
    </p>
    <ul>
      <li><strong><code>alt</code></strong>: announced by screen readers, shown if image fails to load. The primary accessibility attribute.</li>
      <li><strong><code>title</code></strong>: tooltip text on hover for mouse users. Screen readers sometimes read it, sometimes not &mdash; inconsistent. Don&rsquo;t rely on it for accessibility.</li>
      <li><strong><code>&lt;figcaption&gt;</code></strong>: visible caption below an image in a <code>&lt;figure&gt;</code>. Read by screen readers and seen by sighted users.</li>
    </ul>
    <p>
      The pragmatic rule: always set <code>alt</code>. Use <code>figcaption</code> when a visible caption is useful. Skip <code>title</code> unless you have a specific reason.
    </p>

    <h2>Animated GIFs and video posters</h2>
    <p>
      For GIFs, describe the action, not the first frame. An alt of &ldquo;dog sitting&rdquo; on a GIF where the dog then stands up and wags is misleading. Better: &ldquo;A dog stands up from sitting and wags its tail.&rdquo;
    </p>
    <p>
      For video <code>poster</code> images, alt follows the video element&rsquo;s <code>aria-label</code>. The poster itself doesn&rsquo;t typically need separate alt because screen readers treat the video control as the primary element.
    </p>

    <h2>Localization of alt text</h2>
    <p>
      Alt text is content and needs translation when your site is localized. Don&rsquo;t ship English alt on Spanish pages &mdash; screen readers in Spanish will read English words with Spanish phonetics and confuse users. Include alt strings in your translation files alongside button labels and headings.
    </p>
    <p>
      Cultural context can shift descriptions too. A photo of a traditional food, a gesture, or a landmark might need contextual description that isn&rsquo;t obvious to a translator without seeing the image. Provide translators with the image, not just the English alt.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Leaving alt empty when the image carries information, and stuffing keywords into alt when it doesn&rsquo;t. Starting with &ldquo;image of.&rdquo; Using the same alt for every image in a gallery (&ldquo;Our team&rdquo; on 12 headshots &mdash; name the people or describe each). Describing the pixels for a functional icon instead of the action. Writing alt as captioning (&ldquo;Jay at the conference&rdquo;) when the reader has no idea who Jay is. Forgetting the alt attribute entirely, which makes screen readers announce the filename &mdash; <code>IMG_8472.jpg</code> is not useful. And skipping alt on complex charts because it&rsquo;s hard &mdash; it&rsquo;s worth the effort.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/alt-text-helper">alt text helper</a> suggests short, descriptive alt for any image and flags common problems like missing alts, duplicate alts, and keyword stuffing. For the broader meta-content pass, pair it with the <a href="/tools/meta-description-length-checker">meta description length checker</a>. And when simplifying alt phrasing for screen reader flow, the <a href="/tools/readability-score-checker">readability score checker</a> keeps your sentences simple.
    </p>
  </>
);
