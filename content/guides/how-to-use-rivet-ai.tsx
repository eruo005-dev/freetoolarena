import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Rivet is Ironclad&rsquo;s open-source visual IDE for LLM graphs &mdash; build prompts as node graphs, then embed them in any JS/TS app.</p>);

export const body: ReactElement = (
  <>
    <p>Rivet treats LLM workflows the way Unreal treats game logic: as a graph of nodes you manipulate visually. You wire prompts, branching, loops, subgraphs, and tool calls on a canvas, debug each execution step by step, and then ship the graph as a file your production app loads at runtime.</p>
    <h2>What it is</h2>
    <p>A desktop app (Electron) for designing graphs plus a headless <code>@ironclad/rivet-node</code> library for running them. Graphs are JSON files you check into git. Nodes cover chat, text, code, data, logic, and I/O. The debugger steps through each node, showing inputs and outputs so you can inspect why a branch fired or didn&rsquo;t.</p>
    <h2>Install / set up</h2>
    <pre>{`# desktop app
# download from https://rivet.ironcladapp.com
# node runtime
npm install @ironclad/rivet-node`}</pre>
    <h2>First run</h2>
    <p>Open Rivet, create a new project, and drop a Chat node onto the canvas. Wire a Text node into its prompt input, put &ldquo;Say hello&rdquo; in the text, and hit Run. The execution log on the right shows each node&rsquo;s input, output, and token usage.</p>
    <pre>{`$ node
const { runGraphInFile } = require('@ironclad/rivet-node');
await runGraphInFile('./graph.rivet-project', {
  graph: 'Main', openAiKey: process.env.OPENAI_API_KEY
});`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>Prototype a multi-step agent visually, then check the <code>.rivet-project</code> file into git like any other source artifact.</li>
      <li>Use subgraphs to package reusable logic (retrieval, formatting, guardrails) and call them from a parent graph.</li>
      <li>Embed the graph in a Node backend with <code>runGraphInFile</code> so product code stays thin and prompt logic stays in Rivet.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>Rivet is JS/TS first. The Node runtime is solid; Python users have to call the headless runner as a subprocess or reimplement the graph, because there is no official Python SDK. If your backend is Python-heavy, weigh this before adopting.</p>
    <p>Graph files merge poorly in git. Two people editing the same graph will produce conflicts in the JSON that are hard to resolve by hand. Coordinate on who edits which graph, lean on subgraphs to split ownership, and review diffs in Rivet itself rather than in GitHub&rsquo;s line-by-line view.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>JS/TS developers who want a designer-grade IDE for prompts, and teams where a PM or designer co-authors logic with an engineer. If you&rsquo;ve outgrown plain LangChain code but don&rsquo;t want a hosted platform, Rivet is the local-first sweet spot.</p>
  </>
);
