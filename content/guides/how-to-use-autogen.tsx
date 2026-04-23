import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>Microsoft AutoGen is an open-source framework for building multi-agent LLM applications that solve problems through conversation.</p>
);

export const body: ReactElement = (
  <>
    <p>
      AutoGen treats AI workflows as conversations between specialized agents. Instead of chaining prompts, you define
      an AssistantAgent that can write code, a UserProxyAgent that can execute it, and optionally a group-chat manager
      that routes turns between many agents. The loop continues until a termination condition is met &mdash; a regex
      match, a max-turn limit, or a human &ldquo;exit&rdquo;. The result feels less like a pipeline and more like a
      team meeting.
    </p>

    <h2>What it is</h2>
    <p>
      AutoGen is maintained by Microsoft Research and released under the MIT license. The current line is AutoGen 0.4+,
      which splits into three packages: autogen-core (event-driven runtime), autogen-agentchat (the high-level chat API
      most users touch), and autogen-ext (model clients and tools). Python is the primary language; a .NET port exists.
    </p>

    <h2>Install</h2>
    <pre>{`pip install -U "autogen-agentchat" "autogen-ext[openai]"
# or for the classic 0.2 API
pip install pyautogen`}</pre>

    <h2>First run</h2>
    <p>A minimal two-agent assistant that can call tools and stop when it says TERMINATE:</p>
    <pre>{`import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

async def main():
    model = OpenAIChatCompletionClient(model="gpt-4o-mini")
    agent = AssistantAgent("writer", model_client=model)
    result = await agent.run(task="Draft a 3-line product tagline.")
    print(result.messages[-1].content)

asyncio.run(main())`}</pre>

    <h2>Everyday workflows</h2>
    <ul>
      <li>Pair an AssistantAgent with a UserProxyAgent that has code_execution_config set to run Python in Docker.</li>
      <li>Build a RoundRobinGroupChat of planner, coder, and critic agents for harder tasks.</li>
      <li>Wrap the whole thing with AutoGen Studio&rsquo;s web UI to prototype without writing glue code.</li>
    </ul>

    <h2>Gotchas and tips</h2>
    <p>
      The 0.2 to 0.4 jump was a full rewrite &mdash; tutorials you find on blogs may import names that no longer exist.
      Pin to one major line per project. Also watch termination: without a TextMentionTermination or MaxMessageTermination,
      agents can loop politely forever and burn your token budget.
    </p>
    <p>
      Code execution is powerful but dangerous. Always point UserProxyAgent&rsquo;s executor at a sandboxed Docker image,
      not the host shell, and set a working directory outside your repo root so models cannot clobber your code.
    </p>

    <h2>Who it&rsquo;s for</h2>
    <p>
      Researchers and backend engineers exploring agentic patterns beyond a single LLM call. Tip: start with two agents;
      only add a third when you can name a concrete reason the pair cannot solve the task.
    </p>
  </>
);
