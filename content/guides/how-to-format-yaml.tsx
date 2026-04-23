import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      YAML looks simple until it silently misparses. A stray tab, an unquoted <code>yes</code>
      that becomes a boolean, a number with a leading zero that becomes octal&mdash;YAML has more
      footguns than JSON and more ways to produce output that looks right but is not. Most of the
      DevOps world has standardized on YAML anyway, so CI pipelines, Kubernetes manifests,
      Ansible playbooks, and Docker Compose files all depend on getting the formatting exactly
      right. Readable, consistent YAML also reduces merge conflicts and makes review diffs mean
      something. This guide covers indentation rules, when to quote strings, block versus flow
      style, folded versus literal scalars, key/value alignment, and the difference between a
      formatter and a linter.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Indentation rules</h2>
    <p>
      YAML uses indentation to express structure. Two spaces per level is the universal
      convention. Tabs are not allowed for indentation&mdash;the YAML spec explicitly bans them,
      and every parser will reject a document indented with tabs. Each nested level must be
      indented at least one space more than its parent, and all siblings at the same level must
      share the exact same indentation. The spec does not mandate exactly two spaces, but any
      consistent number works; the community has settled on two.
    </p>
    <pre>{`server:
  host: localhost
  ports:
    - 8080
    - 8443
  tls:
    enabled: true
    cert: /etc/ssl/cert.pem`}</pre>

    <h2>Strings and when to quote them</h2>
    <p>
      YAML tries to infer types from unquoted values, and that is where trouble starts.
      <code>yes</code>, <code>no</code>, <code>true</code>, <code>false</code>, <code>on</code>,
      <code>off</code>, and their capitalized variants all parse as booleans in YAML 1.1.
      <code>null</code>, <code>Null</code>, <code>NULL</code>, <code>~</code>, and an empty value
      all parse as null. A bare <code>12345</code> is an integer. A bare <code>3.14</code> is a
      float. <code>0777</code> is octal (YAML 1.1) or a string (YAML 1.2). The safe rule is to
      quote any string that looks like it could be interpreted as another type&mdash;version
      numbers, country codes, phone numbers, anything that might start with a zero, and any
      literal <code>yes</code>/<code>no</code> that you want to stay strings.
    </p>

    <h2>Single versus double quotes</h2>
    <p>
      Single-quoted strings are literal: no escape sequences, and a literal apostrophe inside the
      string is written as two apostrophes. Double-quoted strings support the full C-style escape
      set: <code>\n</code>, <code>\t</code>, <code>\uXXXX</code>, and so on. For most config-file
      strings, single quotes are safer because you do not have to worry about accidental
      backslash escapes. Use double quotes only when you explicitly need the escape sequences.
    </p>
    <pre>{`message: 'It''s a literal string.'
path: "C:\\\\Users\\\\me\\\\file.txt"
newline: "line one\\nline two"`}</pre>

    <h2>Block style versus flow style</h2>
    <p>
      YAML supports two styles for collections. Block style uses indentation and dashes,
      which is the readable default for config files. Flow style uses braces and brackets like
      JSON, which is compact but harder to diff. Flow style is appropriate for short inline
      collections&mdash;a tag list or small record&mdash;but unreadable when nested. A common
      convention is block style for everything except short arrays that fit on one line.
    </p>
    <pre>{`# Block style
services:
  web:
    image: nginx
    ports:
      - 80
      - 443

# Flow style
services: { web: { image: nginx, ports: [80, 443] } }`}</pre>

    <h2>Folded versus literal scalars</h2>
    <p>
      Long strings can be written as block scalars with a <code>|</code> (literal) or
      <code>&gt;</code> (folded) indicator. Literal preserves every newline exactly. Folded
      converts single newlines to spaces and paragraph breaks (blank lines) to single newlines,
      which is useful for wrapping long prose without committing to the wrap points. Both styles
      accept <code>-</code> to strip the trailing newline, <code>+</code> to keep all trailing
      newlines, or nothing (clip) to keep one trailing newline.
    </p>
    <pre>{`literal: |
  line one
  line two
  line three

folded: >
  these lines will
  all be joined with
  single spaces

  blank line becomes newline

stripped: |-
  no trailing newline`}</pre>

    <h2>Anchors, aliases, and merge keys</h2>
    <p>
      YAML lets you define reusable values with anchors (<code>&amp;name</code>) and reference
      them with aliases (<code>*name</code>). The merge key <code>&lt;&lt;:</code> merges an
      aliased mapping into another. Formatters generally leave these intact because renaming an
      anchor changes every reference. The merge key is a YAML 1.1 feature and not part of YAML
      1.2, so some newer parsers ignore it&mdash;check your target runtime before relying on it.
    </p>

    <h2>Key/value alignment</h2>
    <p>
      Some teams align values vertically for readability: <code>host:      localhost</code>,
      <code>port:      8080</code>. Most formatters do not do this automatically because the
      alignment breaks the moment a new long key is added and every line has to be realigned.
      The cleaner convention is a single space after the colon. Reserve vertical alignment for
      reference tables where the set of keys is stable.
    </p>

    <h2>Formatter versus linter</h2>
    <p>
      A formatter rewrites a YAML document into a consistent layout: indentation, quoting,
      block/flow choice, and blank lines. A linter analyzes a document for style or semantic
      problems without necessarily rewriting: &ldquo;this key has trailing whitespace&rdquo;,
      &ldquo;this line exceeds 120 characters&rdquo;, &ldquo;this value should be a string.&rdquo;
      Prettier formats YAML. <code>yamllint</code> lints it with configurable rules. Most serious
      YAML projects run both, with the formatter on save and the linter in CI.
    </p>

    <h2>Multi-document files</h2>
    <p>
      A single YAML file can contain multiple documents separated by <code>---</code>. Kubernetes
      manifests commonly use this pattern to bundle several resources. Each document is parsed
      independently, so a syntax error in one does not block the others. Formatters should
      respect the document separator and format each document on its own. Optionally, a trailing
      <code>...</code> marks the end of a document explicitly, though it is rarely used.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using tabs for indentation.</strong> Every YAML parser rejects tabs as indentation.
      If your file has a tab anywhere at the start of a line, the parser will error, often with a
      cryptic message about a missing mapping. Configure your editor to use spaces for YAML.
    </p>
    <p>
      <strong>Unquoted Norway.</strong> The country code <code>NO</code> parses as boolean
      <code>false</code> in YAML 1.1. Same trap for <code>yes</code>, <code>on</code>,
      <code>Y</code>. Quote country codes and any other short strings that could be ambiguous.
    </p>
    <p>
      <strong>Leading-zero version strings.</strong> <code>version: 007</code> becomes integer
      <code>7</code> (or octal 7) depending on the parser version. Quote version strings.
    </p>
    <p>
      <strong>Inconsistent indentation across siblings.</strong> All siblings at the same level
      must share exact indentation. Two spaces here and three spaces there produces a structure
      error or, worse, a silently different tree shape.
    </p>
    <p>
      <strong>Trailing whitespace inside strings.</strong> Trailing spaces on a line inside a
      folded block scalar change the folding behavior. A formatter should trim trailing
      whitespace automatically, but not inside a literal block scalar where the spaces are
      meaningful.
    </p>
    <p>
      <strong>Forgetting the document separator.</strong> Concatenating several YAML documents
      into one file without <code>---</code> between them produces one malformed document, not
      a multi-document stream. Always include the separator.
    </p>
    <p>
      <strong>Mixing block and flow inconsistently.</strong> One sublist in block style and the
      next in flow style makes diffs harder to read. Pick one style per nesting level and stay
      with it.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Pretty-print and normalize YAML documents with the{" "}
      <a href="/tools/yaml-formatter">YAML formatter</a>. Pair with the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> when you need to move a config between
      YAML and JSON formats (YAML 1.2 is a strict superset of JSON), and the{" "}
      <a href="/tools/diff-checker">diff checker</a> to compare two YAML versions side-by-side
      before committing a config change.
    </p>
  </>
);
