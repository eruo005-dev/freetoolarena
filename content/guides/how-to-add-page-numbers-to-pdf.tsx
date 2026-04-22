import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Page numbers feel trivial until you&rsquo;re staring at a 60-page contract that
      references &ldquo;the indemnity clause on page 12&rdquo; and realize the whole
      document is unnumbered. Then it&rsquo;s an hour of hunting. This guide covers when
      page numbers actually matter, the positioning conventions that different document
      types follow, and the small decisions (skip-first, appendix numbering, total-page
      format) that separate a polished PDF from a clearly-amateur one.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>When page numbers matter</h2>
    <p>
      Four cases make them non-negotiable. <strong>Contracts and legal documents</strong> —
      clauses reference other clauses by page; arbitrators and judges flip by page
      number. <strong>Books and long-form reports</strong> over ~20 pages — the reader
      needs a table of contents that actually works. <strong>Print-for-binding</strong>
      — you&rsquo;re physically separating the pages to bind, and unnumbered pages get
      mis-ordered. <strong>Sworn statements, affidavits, and depositions</strong> —
      often required by the court, along with line numbering.
    </p>
    <p>
      For a short memo, a one-page invoice, or a slide export, skip page numbers. They
      add visual noise without solving a real problem.
    </p>

    <h2>Positioning: bottom center</h2>
    <p>
      The default for most business documents. Reports, whitepapers, proposals,
      contracts. Bottom center is neutral — it doesn&rsquo;t compete with headers, it
      doesn&rsquo;t shift when the content reflows, and it works for both single-sided
      and double-sided printing. If you&rsquo;re not sure which convention to use, this
      is the right answer.
    </p>

    <h2>Positioning: top outer (books)</h2>
    <p>
      For books and long-form publications, numbers go in the top outer corner — top
      right on odd (recto) pages, top left on even (verso) pages. This puts the number
      where a reader&rsquo;s thumb naturally flips, so they can scan to a page quickly.
      It requires mirrored layouts, which most PDF page-number tools support as a
      &ldquo;facing pages&rdquo; or &ldquo;mirror margins&rdquo; option.
    </p>

    <h2>Positioning: bottom outer (reports with headers)</h2>
    <p>
      If your document already has running headers (chapter name, section title),
      putting the page number at the bottom outer corner keeps the top clean and makes
      the number easy to find during a flip-through. Corporate annual reports and
      academic theses use this layout.
    </p>

    <h2>&ldquo;Page X of Y&rdquo; vs plain numerals</h2>
    <p>
      Use <em>Page X of Y</em> whenever the reader might receive the document out of
      order — faxed contracts, emailed scans, printed-and-re-scanned packets. The
      &ldquo;of Y&rdquo; tells them at a glance whether they have the whole thing.
      Use plain numerals for books, bound reports, and anything with a table of
      contents — the reader already knows how long it is.
    </p>
    <p>
      One edge case: if your document will be signed and has variable-length
      attachments, &ldquo;Page X of Y&rdquo; on the main body but plain numerals on
      exhibits is the cleanest convention.
    </p>

    <h2>Skip-first: when the first page is a title or cover</h2>
    <p>
      Cover pages, title pages, and legal caption pages don&rsquo;t get numbered.
      Start numbering on page 2, but the convention varies: books traditionally
      number the title page as &ldquo;i&rdquo; (hidden) and start arabic numerals at
      the first chapter. For most business documents, skip the cover entirely and
      start at &ldquo;1&rdquo; on what the reader considers the first real page.
      Most tools offer a &ldquo;skip first N pages&rdquo; option — use it instead of
      manually cropping.
    </p>

    <h2>Appendices and restart conventions</h2>
    <p>
      Long documents often restart numbering for appendices: <code>A-1, A-2, A-3</code>
      for appendix A, <code>B-1, B-2</code> for appendix B. This makes it easy to
      reference &ldquo;see A-7&rdquo; without ambiguity about whether you mean the
      main body or an attachment. If your tool doesn&rsquo;t support prefixed
      numbering, splitting into separate PDFs per appendix and merging is sometimes
      simpler.
    </p>

    <h2>Workflow</h2>
    <p>
      Open your PDF in <a href="/tools/pdf-page-numbers">our PDF page number tool</a>,
      pick position (bottom center is the safe default), pick format (<em>Page X of Y</em>
      for anything that might travel, plain numerals otherwise), set skip-first if you
      have a cover, and export. Spot-check the first, middle, and last pages — if your
      document has landscape pages or inserted scans, the number may end up in a
      different spot than you expect, and it&rsquo;s easier to fix now than after
      signatures.
    </p>
  </>
);
