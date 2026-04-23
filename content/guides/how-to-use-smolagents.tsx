import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    smolagents is Hugging Face&rsquo;s minimalist agent library that lets a language model write Python code as its primary way of calling tools, in roughly a thousand lines of source.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      smolagents is an open-source Python framework from Hugging Face for building LLM-powered agents that reason by writing and executing code. Instead of the usual JSON-tool-call dance, the default agent &mdash; <code>CodeAgent</code> &mdash; asks the model to emit a Python snippet that calls registered tools, then runs it in a sandbox. Researchers use it to replicate ReAct-style agent papers, startups use it to prototype assistants without pulling in LangChain, and hobbyists use it because the whole library fits in a single afternoon of reading. It&rsquo;s Apache-2.0 licensed and maintained by the Hugging Face team.
    </p>

    <h2>What it is</h2>
    <p>
      The library ships two main classes: <code>CodeAgent</code>, which writes Python to orchestrate tools, and <code>ToolCallingAgent</code>, which uses standard JSON function calls. Models plug in through engines like <code>HfApiEngine</code>, <code>LiteLLMModel</code>, or <code>TransformersModel</code>. Tools are ordinary Python functions decorated with <code>@tool</code>, and execution happens in a restricted local interpreter or an E2B remote sandbox.
    </p>

    <h2>Install</h2>
    <pre>{`pip install smolagents
# optional extras for sandboxed execution and web browsing
pip install "smolagents[e2b,litellm]"`}</pre>

    <h2>First run</h2>
    <p>
      Spin up a code-writing agent against a Hugging Face Inference API model and ask it a multi-step question. The agent will decide on tool calls and print its reasoning as it goes.
    </p>
    <pre>{`$ python -c "
from smolagents import CodeAgent, HfApiEngine, DuckDuckGoSearchTool
agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=HfApiEngine())
agent.run('How tall is the Eiffel Tower in feet?')
"
Thought: I should search the web for the Eiffel Tower&rsquo;s height.
Code: results = web_search(query="Eiffel Tower height")
Final answer: 1,083 feet (330 m)`}</pre>

    <h2>Everyday workflows</h2>
    <ul>
      <li>Wrap a private API &mdash; decorate a function with @tool and pass it in the tools list, done.</li>
      <li>Swap models for cost &mdash; use LiteLLMModel to route the same agent at Claude, GPT-4o, or a local Ollama endpoint.</li>
      <li>Safe execution &mdash; set executor_type=&ldquo;e2b&rdquo; so generated Python runs in a remote sandbox instead of your laptop.</li>
    </ul>

    <h2>Gotchas and tips</h2>
    <p>
      CodeAgent is powerful but dangerous: by default it executes model-generated Python against your environment with a limited allowlist of imports. Treat the local interpreter as &ldquo;safer than exec&rdquo; not &ldquo;safe&rdquo; &mdash; put anything production-facing behind E2B or Docker. Smaller models (&lt;14B) often fail the code-writing format and produce syntax errors; for those, fall back to ToolCallingAgent.
    </p>
    <p>
      Latency stacks up because each step is a full model turn plus a Python exec. Cap max_steps to 6 or 8 for interactive use, and always log the agent&rsquo;s <code>logs</code> attribute after a run &mdash; it&rsquo;s the only way to debug why a trajectory went sideways.
    </p>

    <h2>Who it&rsquo;s for</h2>
    <p>
      smolagents fits Python developers who want to understand their agent loop end-to-end rather than treat it as a black box. Start by reading <code>smolagents/agents.py</code> &mdash; it&rsquo;s short enough to skim in one sitting, and you&rsquo;ll save hours of debugging later.
    </p>
  </>
);
