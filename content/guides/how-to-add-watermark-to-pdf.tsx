import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A watermark on a PDF does two jobs: it tells the reader what state the document is
      in (draft, sample, confidential), and it makes casual redistribution awkward enough
      that most people won&rsquo;t bother. That&rsquo;s it. It&rsquo;s not DRM, it&rsquo;s
      not encryption, and anyone determined can strip it in 30 seconds. This guide covers
      when watermarks are actually worth adding, what to put on them, and how to style
      them so they do the job without wrecking readability.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>When watermarking actually helps</h2>
    <p>
      Three cases earn their keep. <strong>Drafts</strong> circulated internally — a big
      diagonal &ldquo;DRAFT&rdquo; keeps someone from quoting version 3 as final in a
      client meeting. <strong>Work samples</strong> you share before a contract is
      signed — portfolios, sample chapters, proposal decks. The watermark is a gentle
      reminder that this isn&rsquo;t the full deliverable. <strong>Confidential
      documents</strong> with a specific audience — the recipient&rsquo;s name in the
      watermark makes them think twice about forwarding.
    </p>

    <h2>When it&rsquo;s security theater</h2>
    <p>
      If you&rsquo;re watermarking because you&rsquo;re worried about IP theft, stop.
      Anyone with five minutes can re-export the PDF as images, run OCR, and get a clean
      copy. Watermarks deter casual sharing, not motivated actors. If the content
      actually needs protection, use a real solution — view-only document portals,
      expiring links, or proper DRM. The watermark is there to label, not to lock.
    </p>

    <h2>Style: diagonal DRAFT</h2>
    <p>
      For drafts, the convention is large, light gray, diagonal, centered on every
      page. 60-80pt font, 15-20% opacity, rotated 45 degrees. Large enough to read at a
      glance, light enough that body text is still readable through it. &ldquo;DRAFT&rdquo;
      in all caps, nothing else.
    </p>

    <h2>Style: centered CONFIDENTIAL</h2>
    <p>
      For confidential documents, a horizontal centered stamp works better than
      diagonal — it feels more official and less temporary. 40-50pt, dark red or black,
      10-15% opacity if you want it subtle, 40-60% if you want it assertive. Add the
      recipient&rsquo;s name underneath in smaller type; it&rsquo;s the single most
      effective deterrent to forwarding.
    </p>

    <h2>Style: low-opacity company name or logo</h2>
    <p>
      For work samples and portfolios, use your logo or company name, 10% opacity,
      either diagonal-centered or tiled across the page. The goal is that anyone
      looking at a screenshot can identify the source without the watermark getting in
      the way of the work. Keep it gray, not a loud brand color — loud watermarks date
      fast and fight your content for attention.
    </p>

    <h2>Text vs logo</h2>
    <p>
      Text watermarks scale cleanly and are easy to edit per recipient. Logo watermarks
      look more polished but require a clean transparent PNG and can pixelate if the
      source is low-res. Rule of thumb: use a logo for outward-facing samples (clients,
      prospects), use text for internal states (DRAFT, FOR REVIEW, INTERNAL ONLY).
    </p>

    <h2>Font size and opacity rules</h2>
    <p>
      Font size should be 1.5-2x your body copy for readability from across the room.
      On a standard letter or A4 page that&rsquo;s usually 48-72pt. Opacity is the one
      that trips people up: 10% feels invisible on a blank page but reads clearly over
      body text, because the ink is layered on top of black type. 30%+ and you&rsquo;re
      obscuring content. Aim for 12-18% for most cases and test on your densest page.
    </p>

    <h2>Color and contrast</h2>
    <p>
      Default to mid-gray (#808080 or #A0A0A0). It works on white pages, doesn&rsquo;t
      clash with any brand colors in the document, and photocopies legibly. Red reads
      as urgent (good for CONFIDENTIAL, wrong for DRAFT). Avoid anything saturated at
      full opacity — it&rsquo;ll bleed through and make tables unreadable.
    </p>

    <h2>Workflow</h2>
    <p>
      Drop your PDF into <a href="/tools/pdf-watermark">our PDF watermark tool</a>,
      pick the text or upload a logo, set opacity around 15%, position (diagonal-center
      for DRAFT, horizontal-center for CONFIDENTIAL, corner-tile for samples), and
      export. Always re-open the output and scroll every page before sending —
      occasionally a watermark renders over a signature line or a critical table,
      and you want to catch that before the recipient does.
    </p>
  </>
);
