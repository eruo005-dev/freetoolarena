import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Griptape is a modular Python framework for building AI agents and pipelines with strong guardrails, off-prompt data handling, and reusable Tasks.</p>);

export const body: ReactElement = (
  <>
    <p>Griptape takes a pragmatic stance: keep sensitive data out of the prompt, enforce rules with structured Rulesets, and separate what the agent reasons about (Tasks) from what it remembers (Memory). It&rsquo;s designed for teams that want agent behaviour they can actually reason about in production.</p>
    <h2>What it is</h2>
    <p>The core building blocks are Structures (Agent, Pipeline, Workflow), Tasks (prompt, tool, code-exec), Tools (callable integrations), Rulesets (constraints), and Drivers (pluggable model/storage backends). Its signature feature is &ldquo;off-prompt&rdquo; data: large tool outputs land in Task Memory, and the model references them by handle instead of stuffing them back into context.</p>
    <h2>Install / sign up</h2>
    <pre>{`# Python 3.9+
pip install griptape

# Set a model provider key
export OPENAI_API_KEY=sk-...
# or ANTHROPIC_API_KEY, or configure any Driver

# Optional hosted platform: https://cloud.griptape.ai`}</pre>
    <h2>First session</h2>
    <p>Instantiate an Agent, give it tools, and run a prompt. Griptape handles the tool-calling loop, memory, and rule enforcement for you.</p>
    <pre>{`$ python
from griptape.structures import Agent
from griptape.tools import WebScraperTool, FileManagerTool
from griptape.rules import Ruleset, Rule

agent = Agent(
    tools=[WebScraperTool(off_prompt=True), FileManagerTool()],
    rulesets=[Ruleset("safety", rules=[Rule("Never fetch URLs outside example.com")])],
)
agent.run("Summarise https://example.com/pricing into pricing.md")`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>1. Build a Pipeline where each Task&rsquo;s output feeds the next &mdash; handy for scrape to summarise to email flows.</li>
      <li>2. Use Workflow (DAG-style) when Tasks can run in parallel, like fanning out research over multiple sources.</li>
      <li>3. Store large artifacts in Task Memory so subsequent Tasks can reference them without the model ever seeing the raw bytes.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>The off-prompt pattern is the headline feature and also the easiest thing to misconfigure &mdash; set off_prompt=True on any tool whose output could blow up your context window or leak PII. Rulesets are soft constraints enforced through prompting, so combine them with hard guardrails (allowlists, sandboxing) for anything safety-critical.</p>
    <p>Drivers make it easy to swap OpenAI for Anthropic or a local model, but embedding and vector store Drivers must be configured consistently across a pipeline &mdash; mismatched dims will silently degrade retrieval. The Griptape Cloud hosted runner is useful for long-running jobs you don&rsquo;t want on your laptop.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Python teams building agents that touch real data &mdash; scraping, ETL, customer comms &mdash; and need composition, rules, and off-prompt memory more than a sprawling plugin ecosystem.</p>
  </>
);
