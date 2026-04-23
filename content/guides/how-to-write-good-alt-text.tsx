import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Alt text is the invisible label that makes images accessible to
      screen readers, searchable to Google, and visible when the
      image fails to load. Good alt text is specific and functional;
      bad alt text is either missing, overly verbose, or just
      repeats the filename. This guide covers what alt text should
      and shouldn&rsquo;t say, when images are decorative (empty alt
      is correct), alt text for complex graphics and infographics,
      SEO implications, WCAG requirements, and common patterns that
      get flagged by accessibility audits.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What alt text is for</h2>
    <p>
      Alt text serves three audiences:
    </p>
    <p>
      <strong>Screen reader users:</strong> blind and low-vision
      users hear alt text instead of seeing the image. Without it,
      they hear nothing — or worse, the filename.
    </p>
    <p>
      <strong>Search engines:</strong> Google uses alt text as a
      signal for image search and page relevance.
    </p>
    <p>
      <strong>Users with images disabled or broken links:</strong>{" "}
      alt text renders as fallback text when the image fails to
      load.
    </p>
    <p>
      Every <code>&lt;img&gt;</code> tag needs an <code>alt</code>
      {" "}attribute. Always. The value can be empty for decorative
      images (<code>alt=&quot;&quot;</code>), but the attribute must
      be present.
    </p>

    <h2>The functional-equivalent rule</h2>
    <p>
      Good alt text describes what the image <em>does</em> in
      context, not every visual detail.
    </p>
    <p>
      Example: an image of a chef cooking, used in an article about
      recipes.
    </p>
    <p>
      <strong>Bad:</strong> <code>alt=&quot;image&quot;</code> —
      useless.
    </p>
    <p>
      <strong>Bad:</strong>{" "}
      <code>alt=&quot;A photo of a chef wearing a white hat and
      apron stirring a pot on a gas stove with wooden utensils in the
      foreground&quot;</code> — overly verbose.
    </p>
    <p>
      <strong>Good:</strong>{" "}
      <code>alt=&quot;Chef stirring pasta sauce on a stove&quot;</code>
      {" "}— specific, functional, under 125 characters.
    </p>

    <h2>Decorative images — empty alt</h2>
    <p>
      Not every image conveys information. Purely decorative images —
      background patterns, dividers, stock filler — should have{" "}
      <code>alt=&quot;&quot;</code> so screen readers skip them.
    </p>
    <p>
      <strong>Indicators of decorative:</strong> image is background
      or texture; adjacent text already fully describes it; image
      conveys no meaning without the surrounding context.
    </p>
    <p>
      <strong>Indicators of informative:</strong> image shows data;
      image is the only source of information about something; image
      is the link&rsquo;s target (icon-only button, for instance).
    </p>
    <p>
      Never use <code>alt=&quot;decorative&quot;</code> or{" "}
      <code>alt=&quot;spacer&quot;</code>. Screen readers announce
      those words. Empty is correct.
    </p>

    <h2>Alt text length</h2>
    <p>
      <strong>125 characters</strong> is the commonly cited limit.
      It&rsquo;s not an HTML or ARIA rule — it comes from older JAWS
      screen reader behavior. Aim for this length.
    </p>
    <p>
      <strong>Under 50 characters:</strong> ideal for simple images.
    </p>
    <p>
      <strong>50-125 characters:</strong> fine for most informative
      images.
    </p>
    <p>
      <strong>Over 125 characters:</strong> consider a{" "}
      <code>longdesc</code>, an adjacent paragraph, or splitting the
      image concept.
    </p>

    <h2>Complex images — charts, diagrams, infographics</h2>
    <p>
      A single alt attribute can&rsquo;t describe a bar chart
      effectively. Use layered text:
    </p>
    <p>
      <strong>Short alt:</strong> identifies the image —{" "}
      <code>alt=&quot;Bar chart: Revenue by quarter, 2020-2024&quot;</code>.
    </p>
    <p>
      <strong>Adjacent text or caption:</strong> summarizes the data
      — &ldquo;Revenue grew from $12M in 2020 to $31M in 2024, with
      the biggest jump in Q3 2022.&rdquo;
    </p>
    <p>
      <strong>Data table below the image:</strong> for accessibility,
      include the raw data in an HTML table that screen readers can
      navigate.
    </p>
    <p>
      <strong>Linked full description:</strong> if the image is
      complex (flowchart, architecture diagram), link to a text
      page with the full explanation.
    </p>

    <h2>Alt text for images that are links</h2>
    <p>
      When an image is the only content inside an{" "}
      <code>&lt;a&gt;</code> tag, the alt text is what screen readers
      announce as the link&rsquo;s destination.
    </p>
    <p>
      <strong>Bad:</strong>{" "}
      <code>&lt;a href=&quot;/profile&quot;&gt;&lt;img alt=&quot;icon&quot;&gt;&lt;/a&gt;</code>
      {" "}— screen reader says &ldquo;icon link&rdquo;.
    </p>
    <p>
      <strong>Good:</strong>{" "}
      <code>&lt;a href=&quot;/profile&quot;&gt;&lt;img alt=&quot;View your profile&quot;&gt;&lt;/a&gt;</code>.
    </p>
    <p>
      Describe the destination/action, not the icon itself.
    </p>

    <h2>Images with text</h2>
    <p>
      If an image is mostly text (a quote card, a promo graphic), the
      alt text should repeat the text.
    </p>
    <p>
      Example: a promotional graphic reading{" "}
      <code>&quot;50% off sale — ends Friday&quot;</code>. Alt text:{" "}
      <code>alt=&quot;50% off sale — ends Friday&quot;</code>. Not
      &ldquo;promotional image with text&rdquo;.
    </p>
    <p>
      <strong>Better yet:</strong> avoid text in images when possible.
      Real HTML text is indexable, translatable, resizable, and
      accessible without alt text hacks.
    </p>

    <h2>Redundancy — don&rsquo;t repeat context</h2>
    <p>
      If the surrounding text already names the image, alt text
      should stay brief. Example:
    </p>
    <p>
      Body: &ldquo;Our founder, Jane Doe, started the company in
      2018.&rdquo;
      <br />
      Image: Jane at a podium.
    </p>
    <p>
      <strong>Bad:</strong>{" "}
      <code>alt=&quot;Jane Doe, our founder, speaking at a
      podium&quot;</code> — duplicates &ldquo;Jane Doe, our
      founder&rdquo; already in body.
    </p>
    <p>
      <strong>Good:</strong>{" "}
      <code>alt=&quot;Jane speaking at a podium&quot;</code>. Reader
      gets fresh information.
    </p>

    <h2>Never start with &ldquo;Image of&rdquo; or &ldquo;Picture of&rdquo;</h2>
    <p>
      Screen readers already announce that it&rsquo;s an image.
      &ldquo;Image of a dog&rdquo; becomes &ldquo;Image, image of a
      dog&rdquo;.
    </p>
    <p>
      Skip the prefix. Start with the subject: &ldquo;Golden retriever
      catching a frisbee&rdquo;.
    </p>

    <h2>SEO implications</h2>
    <p>
      Google uses alt text for image search ranking and as a content
      signal. Keyword-stuffed alt text ranks worse, not better.
    </p>
    <p>
      <strong>Write for users first.</strong> Search engines
      rewarding natural language has been consistent for a decade.
    </p>
    <p>
      <strong>Relevant keywords are fine</strong> when they describe
      the image accurately. If your page is about sourdough and the
      image shows a sourdough loaf,{" "}
      <code>alt=&quot;Sourdough bread with a crackled crust&quot;</code>
      {" "}beats <code>alt=&quot;bread&quot;</code>.
    </p>

    <h2>WCAG requirements</h2>
    <p>
      <strong>WCAG 1.1.1 Non-text Content (Level A):</strong> all
      non-text content that conveys information must have text
      alternatives. Legal requirement in many countries.
    </p>
    <p>
      <strong>Automated testing</strong> (Lighthouse, axe, WAVE)
      catches missing alt attributes but can&rsquo;t judge quality.
      Manual review needed for the tricky cases.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Leaving alt missing.</strong> Screen readers read the
      filename. <code>DSC_00123.jpg</code> becomes
      &ldquo;D-S-C-zero-zero-one-two-three-dot-j-p-g&rdquo;.
    </p>
    <p>
      <strong>Using filename as alt.</strong>{" "}
      <code>alt=&quot;hero-bg.png&quot;</code> is worse than nothing.
    </p>
    <p>
      <strong>Copy-pasting the same alt across many images.</strong>
      Each image needs specific alt.
    </p>
    <p>
      <strong>Describing every pixel.</strong> Functional equivalence,
      not photo-realism.
    </p>
    <p>
      <strong>Keyword stuffing.</strong> Google catches it; it hurts
      rankings.
    </p>
    <p>
      <strong>Using title instead of alt.</strong> Title attribute
      shows as tooltip; alt is the accessibility standard. Both can
      coexist but don&rsquo;t substitute.
    </p>
    <p>
      <strong>Forgetting CMS bulk uploads.</strong> WordPress,
      Shopify, etc. add empty alt fields. Audit regularly.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate alt text drafts for your images with the{" "}
      <a href="/tools/alt-text-helper">alt text helper</a>. Pair
      with the{" "}
      <a href="/tools/image-format-converter">image format converter</a>
      {" "}to optimize the image itself, and the{" "}
      <a href="/tools/image-compressor">image compressor</a> before
      you upload.
    </p>
  </>
);
