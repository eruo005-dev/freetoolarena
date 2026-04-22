import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      You have a 120-page PDF and you only need chapter 4. Or a 30-page contract
      where pages 12-13 are the only signed ones and the rest is draft. Or a report
      that&rsquo;s too big to email. Splitting a PDF is usually faster than it looks,
      but only if you know which mode you want and what you&rsquo;re about to lose in
      the process. Here&rsquo;s what actually matters.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The three reasons people split PDFs</h2>
    <p>
      First, extracting one section out of a larger document — a chapter from a
      textbook, an appendix from a report, a statement month from a yearly bundle.
      Second, separating signed pages from drafts, so the countersigned version
      ships clean without the negotiation history. Third, cutting a file down to
      get under an email attachment limit (Gmail&rsquo;s 25MB is the usual wall).
    </p>
    <p>
      Each of these wants a slightly different split mode, which is where people
      trip up.
    </p>

    <h2>Page ranges vs one-per-page</h2>
    <p>
      Most splitters offer two modes. <strong>Page range</strong> extracts specific
      pages (e.g., 12-13, or 40-62) as one new PDF — this is what you want 90% of
      the time. <strong>One-per-page</strong> explodes the file into N separate PDFs,
      one per page, which is almost always overkill unless you&rsquo;re re-ordering
      an entire document or feeding pages into a scanning workflow.
    </p>
    <p>
      Our <a href="/tools/pdf-split">PDF split tool</a> does both in the browser, so
      the file never leaves your device. If you&rsquo;re just pulling one section,
      type the range and move on.
    </p>

    <h2>What splitting preserves</h2>
    <p>
      The page content, embedded fonts, images, and text layer (important for
      searchability) all survive cleanly. Annotations and highlights on the pages
      you keep come with them. Internal links that happen to point within the
      range you kept will still work.
    </p>

    <h2>What you lose</h2>
    <p>
      Global bookmarks — the sidebar table-of-contents that lets you jump to
      chapters — usually get stripped or reduced to only the ones that fall inside
      your range. Internal links that point to pages you cut will turn into dead
      links. Digital signatures on the original file are invalidated the moment you
      split, which is expected; the signed bytes no longer match.
    </p>
    <p>
      If bookmarks matter (textbook, long report you&rsquo;ll keep referencing),
      decide before splitting whether you care. If you do, keep the full file and
      extract a range only when sharing.
    </p>

    <h2>Splitting by bookmark (structured splits)</h2>
    <p>
      A common pro workflow: a book or report with proper bookmarks, and you want
      to split it so each chapter becomes its own file. Basic splitters don&rsquo;t
      do this — they only understand page numbers. For bookmark-aware splits, you
      either need a desktop tool (PDFsam Basic is free and surprisingly good at
      this) or you script it with something like <code>pdftk</code> or{" "}
      <code>qpdf</code>.
    </p>
    <p>
      For most people, this is worth knowing exists but not worth the setup.
      If you split twice a year, a browser tool with page ranges is fine.
    </p>

    <h2>Splitting for email size</h2>
    <p>
      If your goal is &ldquo;fit under 25MB,&rdquo; splitting is the second-best
      answer. The first: compress the file. Scanned PDFs are often 80-90% air —
      a compressor can easily halve them. Try that first. If the file is genuinely
      too large even after compression (long scanned contracts, image-heavy
      portfolios), split into two roughly equal parts and send as a pair with
      clear names: <code>report-part-1-of-2.pdf</code>.
    </p>

    <h2>A quick workflow for one-off splits</h2>
    <p>
      Open the PDF, note the page range you actually need, drop it into a splitter,
      enter the range, and save with a filename that reflects the contents —{" "}
      <code>contract-signature-pages.pdf</code> beats{" "}
      <code>document(2)-split.pdf</code> every time. Spot-check the first and last
      page of the output before you close the source file. Forty-five seconds,
      and you&rsquo;ve got exactly the subset you needed.
    </p>
  </>
);
