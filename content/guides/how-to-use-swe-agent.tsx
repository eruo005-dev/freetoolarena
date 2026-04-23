import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    SWE-agent is Princeton&rsquo;s autonomous software-engineering agent that takes a GitHub issue and a repo, then writes, runs, and tests a patch end-to-end without human hand-holding.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      SWE-agent is an open-source framework from the Princeton NLP group, built to solve real software-engineering tasks by driving a language model through a specially designed Agent-Computer Interface (ACI). It was the first agent to crack double-digit scores on SWE-bench, a benchmark of unresolved GitHub issues from popular Python repos. Researchers use it to study agent capabilities, teams use it to triage bug backlogs, and CTF players use the EnIGMA spin-off for capture-the-flag challenges. It&rsquo;s MIT-licensed and maintained by the SWE-agent authors.
    </p>

    <h2>What it is</h2>
    <p>
      The core insight is the ACI: instead of giving a model raw shell access, SWE-agent exposes narrow, high-feedback commands (open, goto, edit, find_file, search_dir, submit) that a model can actually use well. It wraps these in a sandboxed Docker environment, runs the agent loop against providers like Claude, GPT, or any LiteLLM-supported model, and emits a patch plus a full trajectory log. Configuration lives in YAML files so you can swap prompts, tools, and models without touching code.
    </p>

    <h2>Install</h2>
    <pre>{`git clone https://github.com/SWE-agent/SWE-agent.git
cd SWE-agent
pip install --editable .
# Docker must be installed and running for sandboxed execution`}</pre>

    <h2>First run</h2>
    <p>
      Point the agent at a live GitHub issue and watch it clone the repo, reproduce the bug, edit files, and emit a patch. Set your API key first.
    </p>
    <pre>{`$ export ANTHROPIC_API_KEY=sk-ant-...
$ sweagent run \\
  --agent.model.name=claude-sonnet-4 \\
  --problem_statement.github_url=https://github.com/pvlib/pvlib-python/issues/1603
[INFO] Cloned repo to /tmp/...
[INFO] Step 1: open pvlib/iotools/psm3.py
[INFO] Step 7: submit
[DONE] Patch written to trajectories/<run-id>/patch.diff`}</pre>

    <h2>Everyday workflows</h2>
    <ul>
      <li>Batch SWE-bench &mdash; run sweagent run-batch against the dataset to reproduce benchmark numbers locally.</li>
      <li>Fix local issues &mdash; pass --problem_statement.path to a text file describing a bug in your own codebase.</li>
      <li>Swap models &mdash; edit the YAML to try Claude, GPT-4o, DeepSeek, or a local model through LiteLLM without changing agent logic.</li>
    </ul>

    <h2>Gotchas and tips</h2>
    <p>
      Cost is real: a single SWE-bench instance can burn 50k&ndash;200k tokens on frontier models, and full-dataset runs get expensive fast. Start with ten instances to calibrate, and cache the Docker environments &mdash; rebuilding them for every task dominates wall-clock time on a cold machine. Trajectories are verbose JSON; browse them with the included inspector_web tool rather than tailing raw files.
    </p>
    <p>
      The agent is tuned for Python repos and pytest-style test suites. Non-Python languages and custom build systems work but often need a custom YAML with the right install and test commands. Pin the SWE-agent version if you&rsquo;re publishing results &mdash; behavior shifts meaningfully between releases as prompts are refined.
    </p>

    <h2>Who it&rsquo;s for</h2>
    <p>
      SWE-agent fits researchers benchmarking agent capabilities and engineering teams curious about autonomous bug-fixing on Python codebases. Read the ACI paper before your first serious run &mdash; understanding why the commands are shaped the way they are will save you from fighting the framework.
    </p>
  </>
);
