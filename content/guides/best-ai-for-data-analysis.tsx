import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    AI for data analysis in 2026 splits into three categories: chat-with-spreadsheet (ChatGPT
    Code Interpreter, Gemini in Sheets), in-IDE notebooks (Cursor + Claude on Jupyter), and
    autonomous agents (DataChef, Julius AI). The right pick depends on dataset size and how
    much you need to control.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>By task</h2>
    <ul>
      <li><strong>Spreadsheet exploration:</strong> ChatGPT Plus + Code Interpreter. Drop a CSV,
        ask plain-English questions, get charts back. Best for ad-hoc analysis.</li>
      <li><strong>Sheets-native:</strong> Gemini in Workspace. Tight integration, formulas
        suggested in-cell.</li>
      <li><strong>Pandas / Jupyter / pro analysis:</strong> Claude Code or Cursor + Claude. Both
        write idiomatic pandas + matplotlib quickly.</li>
      <li><strong>SQL queries:</strong> GPT-5 or Gemini for schema reasoning. DBT + Cursor a strong
        combo.</li>
      <li><strong>Long-table multi-file analysis:</strong> Claude Sonnet 4.6 (1M context) handles a
        whole CSV directory in one prompt.</li>
      <li><strong>Reporting / dashboards:</strong> ChatGPT Pro + Code Interpreter for one-off
        reports. Hex / Mode for productionized dashboards.</li>
    </ul>

    <h2>Specialty tools</h2>
    <ul>
      <li><strong>Julius AI</strong> &mdash; CSV-first chat. Polished UX for non-technical
        analysts.</li>
      <li><strong>DataChef</strong> &mdash; agentic data prep. Cleans messy CSVs autonomously.</li>
      <li><strong>Hex</strong> &mdash; notebook with built-in AI assistant. Strong for teams.</li>
      <li><strong>Tableau Pulse / Power BI Copilot</strong> &mdash; for BI workflows.</li>
    </ul>

    <h2>Pricing</h2>
    <ul>
      <li>$20: ChatGPT Plus (Code Interpreter included). 90% of analysis for most users.</li>
      <li>$20-$40: Add Claude Pro for the long-context wins.</li>
      <li>$50-$100/mo: Hex / Mode for serious team-grade analysis.</li>
    </ul>
    <p>
      Compare: <a href="/compare/claude-vs-gemini">Claude vs Gemini</a>,{" "}
      <a href="/compare/chatgpt-vs-gemini">ChatGPT vs Gemini</a>.
    </p>
  </>
);
