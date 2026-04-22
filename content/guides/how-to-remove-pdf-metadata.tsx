import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Every PDF you create carries a silent passenger: metadata. Your name, the software
      you used, the exact time you saved it, sometimes the full file path on your
      machine including your username. Open a PDF you sent last month and check its
      properties — you&rsquo;ll probably be surprised what&rsquo;s in there. This guide
      covers what metadata is actually stored, when stripping it matters, what to strip,
      and how to verify you got it all.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What&rsquo;s actually hidden in a PDF</h2>
    <p>
      The standard metadata fields in every PDF are Title, Author, Subject, Keywords,
      Creator (the application that made the source document — e.g. &ldquo;Microsoft
      Word&rdquo;), Producer (the library that produced the PDF — e.g. &ldquo;Acrobat
      Distiller 15.0&rdquo;), Creation Date, and Modification Date.
    </p>
    <p>
      On top of that, PDFs can contain XMP metadata (a more extensible block), embedded
      file attachments, form field defaults with your name still in them, and
      occasionally — this is the one that catches people — the full file path of the
      source document. Export a Word doc from <code>C:\Users\jsmith\Desktop\confidential.docx</code>
      and that path can end up in the PDF&rsquo;s XMP block.
    </p>

    <h2>When it matters: journalism and source protection</h2>
    <p>
      If you&rsquo;re a journalist and a source sends you a leaked document as a PDF,
      the metadata may identify them before you&rsquo;ve even read the contents. The
      Reality Winner case is the textbook example — printer tracking dots and metadata
      helped narrow the leak to one person. Always strip and re-export before
      publication, and ideally before opening the file on a networked machine.
    </p>

    <h2>When it matters: job searches and anonymization</h2>
    <p>
      You export your resume from Word. The Author field reads &ldquo;Jane Doe&rdquo;
      and the Creator reads &ldquo;Microsoft Word 2019 for Mac.&rdquo; Fine. But if
      you&rsquo;re submitting anonymous writing samples, pseudonymous portfolios, or
      applying to a company where you already work and want a quiet parallel search,
      that metadata breaks the anonymization you thought your filename provided.
    </p>

    <h2>When it matters: litigation and discovery</h2>
    <p>
      In legal discovery, metadata is evidence. Modification dates can contradict
      claims about when a document was authored. Author fields can suggest who actually
      wrote something despite the byline. If you&rsquo;re producing documents under a
      protective order, check whether metadata is in scope — sometimes you must
      preserve it, sometimes you must strip it. Get this wrong and you&rsquo;re
      in trouble either way.
    </p>

    <h2>The field list to strip</h2>
    <p>
      At minimum, clear these: <code>Title</code>, <code>Author</code>, <code>Subject</code>,
      <code>Keywords</code>, <code>Creator</code>, <code>Producer</code>, <code>CreationDate</code>,
      <code>ModDate</code>. Also strip the XMP packet entirely if your tool offers it,
      and check for embedded files and form field defaults. A quick pass in{" "}
      <a href="/tools/pdf-metadata-remover">our PDF metadata remover</a> handles the
      standard fields; verify with a separate viewer afterward.
    </p>

    <h2>What stripping metadata does NOT do</h2>
    <p>
      Stripping metadata does not redact visible content. If your name is typed in the
      document body, on a signature line, in a header, or embedded in an image, it&rsquo;s
      still there. Metadata removal is about hidden fields only. For visible content,
      you need actual redaction — blacking out text at the pixel level, not just drawing
      a black box on top of it (which anyone can remove).
    </p>
    <p>
      Similarly, metadata removal doesn&rsquo;t touch tracked changes, comments,
      embedded fonts (which can carry identifying info), or form field values. Many
      &ldquo;stripped&rdquo; PDFs still leak identity through one of these channels.
    </p>

    <h2>How to verify you scrubbed it</h2>
    <p>
      Don&rsquo;t trust a single tool&rsquo;s &ldquo;cleaned&rdquo; confirmation.
      Re-open the output in <a href="/tools/pdf-metadata-viewer">our PDF metadata
      viewer</a> or any other inspector and look at all fields. The XMP block is the
      one most tools forget. On Linux or Mac, <code>exiftool</code> dumps everything
      including custom fields. On Windows, right-click properties shows the standard
      fields but not XMP.
    </p>
    <p>
      A belt-and-braces approach for sensitive releases: strip metadata, then print the
      PDF to a new PDF (which re-generates the file and drops most remaining fields),
      then verify again. It&rsquo;s the closest thing to a clean slate without
      re-creating the source document from scratch.
    </p>
  </>
);
