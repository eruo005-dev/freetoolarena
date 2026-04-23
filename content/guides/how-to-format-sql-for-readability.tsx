import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A 300-line SELECT crammed onto three lines is the SQL
      equivalent of unreadable code. Format it — indent joins, align
      columns, uppercase keywords, break at logical boundaries — and
      the same query tells its story at a glance. This guide covers
      the conventions teams actually agree on, the stylistic
      decisions worth having an opinion about (leading comma vs
      trailing, river vs indent), auto-formatters, style guides from
      major projects, and the small rules that keep PRs readable a
      year from now.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Why SQL formatting matters more than most code formatting</h2>
    <p>
      SQL is declarative and often nested. A single query can be the
      logic of an entire business report. Unlike Python or
      JavaScript, linters and auto-formatters were uncommon in SQL
      workflows for years — teams picked up habits that clash.
    </p>
    <p>
      Poorly formatted SQL hides: duplicate joins, wrong filter
      placement (WHERE vs HAVING vs ON), missed NULL handling, and
      unintended cross joins. Formatting exposes these by making the
      shape of the query readable.
    </p>

    <h2>The core rules most teams agree on</h2>
    <p>
      <strong>Keywords uppercase.</strong> SELECT, FROM, WHERE, JOIN,
      GROUP BY, ORDER BY — all caps. Table and column names stay
      lowercase (or follow your DB&rsquo;s case convention).
    </p>
    <p>
      <strong>One column per line in SELECT lists.</strong> Easier
      to add, remove, and comment individual columns in diffs.
    </p>
    <p>
      <strong>One join per line.</strong> Each JOIN clause on its
      own line with the ON condition either inline or indented.
    </p>
    <p>
      <strong>Logical indentation.</strong> Subqueries and CTEs
      indented from their parent; related clauses aligned.
    </p>
    <p>
      <strong>Trailing commas.</strong> (Or leading — opinions
      differ; see below.) Consistent within your codebase.
    </p>

    <h2>Leading comma vs trailing comma — pick one</h2>
    <p>
      <strong>Trailing comma style</strong> (more common):
    </p>
    <p>
      <code>SELECT id, name, email, created_at FROM users</code>
      with each column on a new line and the comma at the end.
    </p>
    <p>
      <strong>Leading comma style</strong> (catches bugs, polarizing):
    </p>
    <p>
      <code>SELECT id , name , email , created_at FROM users</code>
      with each column on a new line and the comma at the start.
    </p>
    <p>
      <strong>The argument for leading comma:</strong> the last line
      doesn&rsquo;t end with a comma, so you don&rsquo;t forget to
      remove it when commenting out the last column. Also, the
      visual alignment makes it easy to see which columns are
      selected.
    </p>
    <p>
      <strong>The argument against:</strong> looks odd compared to
      other languages. Modern SQL formatters handle trailing-comma
      commenting automatically.
    </p>
    <p>
      Pick one, write it in your style guide, enforce it with a
      formatter.
    </p>

    <h2>The &ldquo;river&rdquo; style</h2>
    <p>
      Classic SQL formatting puts each major clause keyword on its
      own line, right-aligned to create a visual &ldquo;river&rdquo;
      of whitespace down the left edge:
    </p>
    <p>
      <code>   SELECT id, name FROM users WHERE active = true
      ORDER BY created_at DESC</code>
    </p>
    <p>
      (With SELECT, FROM, WHERE, ORDER BY right-aligned in a column.)
    </p>
    <p>
      <strong>Pros:</strong> very scannable; clauses jump out.
    </p>
    <p>
      <strong>Cons:</strong> painful to maintain manually; not well
      supported by modern formatters.
    </p>
    <p>
      In 2026, most teams use indent-based style (keywords
      left-aligned, arguments indented under them) because it
      auto-formats cleanly.
    </p>

    <h2>JOIN formatting</h2>
    <p>
      Every JOIN on its own line. ON condition either:
    </p>
    <p>
      <strong>Inline</strong> when short: <code>JOIN orders ON
      orders.user_id = users.id</code>
    </p>
    <p>
      <strong>Below with indentation</strong> when long or multi-
      condition:
    </p>
    <p>
      <code>JOIN orders ON orders.user_id = users.id AND
      orders.status = &apos;active&apos; AND orders.created_at &gt;=
      &apos;2026-01-01&apos;</code>
    </p>
    <p>
      Always use explicit JOIN syntax (INNER JOIN, LEFT JOIN) —
      never comma joins with WHERE conditions. Old syntax mixes
      filters and join conditions, hiding bugs.
    </p>

    <h2>CTEs (WITH clauses) — the readability superpower</h2>
    <p>
      Break complex queries into named CTEs. Each CTE is a
      labeled, reusable subquery. Even if the query planner doesn&rsquo;t
      need it, humans do.
    </p>
    <p>
      <code>WITH active_users AS (SELECT id FROM users WHERE active),
      recent_orders AS (SELECT user_id, SUM(total) FROM orders
      WHERE created_at &gt; CURRENT_DATE - 30) SELECT au.id,
      ro.total FROM active_users au LEFT JOIN recent_orders ro ON
      au.id = ro.user_id</code>
    </p>
    <p>
      Indentation rule: each CTE body indented two spaces from the
      CTE name; CTEs separated by a blank line (or at least the
      closing paren + comma on its own line).
    </p>
    <p>
      <strong>Rule:</strong> if a subquery is referenced twice or is
      more than 5-6 lines, promote it to a CTE. Queries with 3-5
      named CTEs read like a paragraph; inline nested subqueries
      read like a regex.
    </p>

    <h2>WHERE clause formatting</h2>
    <p>
      Short WHERE: single line. <code>WHERE active = true</code>.
    </p>
    <p>
      Multi-condition WHERE: each condition on its own line with AND
      or OR at the start. Makes it easy to comment individual
      conditions.
    </p>
    <p>
      <code>WHERE active = true AND created_at &gt; &apos;2026-01-01&apos;
      AND role IN (&apos;admin&apos;, &apos;member&apos;)</code>
    </p>
    <p>
      <strong>Parens for OR logic:</strong> always parenthesize mixed
      AND/OR to make precedence explicit. <code>WHERE (a = 1 OR b =
      2) AND c = 3</code>, not <code>WHERE a = 1 OR b = 2 AND c = 3</code>
      (which means <code>a = 1 OR (b = 2 AND c = 3)</code> — surprise).
    </p>

    <h2>Naming — the unwritten part of formatting</h2>
    <p>
      <strong>snake_case for identifiers.</strong> user_id, not
      userId. SQL is case-insensitive for unquoted identifiers; stick
      to snake_case for consistency across engines.
    </p>
    <p>
      <strong>Singular or plural tables?</strong> Pick one. &ldquo;
      users&rdquo; or &ldquo;user&rdquo; — both work, but don&rsquo;t
      mix. Most teams use plural (&ldquo;users&rdquo;, &ldquo;orders
      &rdquo;) because they&rsquo;re collections.
    </p>
    <p>
      <strong>Aliases are short and meaningful.</strong> <code>FROM
      users u JOIN orders o ON o.user_id = u.id</code>. Avoid
      single-letter aliases on long queries where context is lost.
    </p>
    <p>
      <strong>Qualify columns when more than one table is
      involved.</strong> <code>u.email</code>, not bare <code>email</code>.
      Makes queries survive when tables are renamed or columns
      added.
    </p>

    <h2>Auto-formatters</h2>
    <p>
      Don&rsquo;t format by hand. Pick a tool:
    </p>
    <p>
      <strong>sql-formatter (npm):</strong> open-source, dialect-aware
      (Postgres, MySQL, Snowflake, BigQuery, etc.). Configurable
      line width, keyword case, comma position. Widely used.
    </p>
    <p>
      <strong>SQLFluff:</strong> Python-based, opinionated,
      production-grade. Dialect-aware, configurable rules. Integrates
      with dbt. Standard in data-engineering shops.
    </p>
    <p>
      <strong>DataGrip / SQL Developer / pgAdmin:</strong> IDE-level
      formatters, varying quality.
    </p>
    <p>
      <strong>Prettier SQL plugin:</strong> if your team uses
      Prettier for other languages, add the SQL plugin for
      consistency.
    </p>
    <p>
      <strong>dbt users:</strong> SQLFluff with dbt-specific rules
      is the standard. Runs as a pre-commit hook.
    </p>

    <h2>Style guides worth reading</h2>
    <p>
      <strong>GitLab data team style guide:</strong> well-known,
      detailed, opinionated. CTE-first, leading comma, lowercase
      keywords (yes, they buck the trend).
    </p>
    <p>
      <strong>Mozilla SQL style guide:</strong> short, practical.
    </p>
    <p>
      <strong>Matt Mazur&rsquo;s SQL style guide:</strong> written
      from analytics-engineering perspective; readable.
    </p>
    <p>
      <strong>dbt Labs blog:</strong> ongoing discussion of SQL style
      in the modern data stack.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Mixing uppercase and lowercase keywords
      inconsistently.</strong> Pick one. Most teams: UPPERCASE for
      keywords.
    </p>
    <p>
      <strong>SELECT *.</strong> Fine in ad-hoc queries, bad in
      production. Lists of explicit columns survive schema changes
      and show intent.
    </p>
    <p>
      <strong>Nested subqueries instead of CTEs.</strong> Hard to
      read, hard to test. Unwrap into CTEs; query planner usually
      treats them equivalently.
    </p>
    <p>
      <strong>No explicit JOIN type.</strong> <code>JOIN</code>
      defaults to INNER JOIN in most engines, but being explicit
      makes it obvious.
    </p>
    <p>
      <strong>Formatting only the final query.</strong> If you ship
      SQL in a migration, a dbt model, or a report config, it gets
      read repeatedly. Format once, save the team hours later.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Paste SQL and get a cleanly formatted version with the{" "}
      <a href="/tools/sql-formatter">SQL formatter</a>. Pair with
      the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> when your
      query returns JSON that needs cleaning up, and the{" "}
      <a href="/tools/case-converter">case converter</a> to
      normalize identifier casing in bulk.
    </p>
  </>
);
