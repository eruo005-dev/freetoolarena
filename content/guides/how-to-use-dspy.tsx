import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    DSPy is Stanford&rsquo;s framework for <em>programming</em>
    {" "}language models instead of prompting them. You declare what
    inputs and outputs you want; DSPy&rsquo;s optimizers compile
    prompts (and sometimes fine-tunes) from labeled examples.
    It&rsquo;s a mental shift: stop hand-crafting prompt strings,
    start writing typed signatures and letting a compiler tune the
    demonstrations for you.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What DSPy actually is</h2>
    <p>
      DSPy has three pieces. <strong>Signatures</strong> declare the
      input-output contract of a call (&ldquo;question, context
      &rarr; answer&rdquo;). <strong>Modules</strong> wrap signatures
      with a strategy (<code>Predict</code>,
      <code> ChainOfThought</code>, <code>ReAct</code>,
      <code> ProgramOfThought</code>). <strong>Optimizers</strong>
      (teleprompters like <code>BootstrapFewShot</code>,
      <code> MIPROv2</code>, <code>BootstrapFinetune</code>) take a
      small training set plus a metric and search for the
      demonstrations or instructions that maximize the metric on your
      model.
    </p>
    <p>
      The result: the same Python code can target GPT-4o, Claude,
      Llama, or a local model, and each gets its own tuned prompt.
      You never hand-edit a prompt string.
    </p>

    <h2>Installing</h2>
    <pre>{`pip install -U dspy

# If you want evaluation datasets or fine-tuning helpers:
pip install "dspy[anthropic]" datasets`}</pre>
    <p>
      Python 3.9+. DSPy uses LiteLLM under the hood so any model
      LiteLLM supports works out of the box.
    </p>

    <h2>First working example</h2>
    <pre>{`import dspy

lm = dspy.LM("openai/gpt-4o-mini")
dspy.configure(lm=lm)

class Classify(dspy.Signature):
    """Classify the sentiment of a product review."""
    review: str = dspy.InputField()
    sentiment: str = dspy.OutputField(desc="positive, negative, or neutral")
    confidence: float = dspy.OutputField(desc="0.0 to 1.0")

classify = dspy.Predict(Classify)

out = classify(review="Battery lasts two days, screen is gorgeous.")
print(out.sentiment, out.confidence)
# positive 0.92`}</pre>
    <p>
      No prompt written. DSPy builds one from the signature
      docstring, field names, and field descriptions. Swap
      <code> dspy.Predict</code> for <code>dspy.ChainOfThought</code>
      {" "}to get a reasoning field for free.
    </p>

    <h2>A real workflow &mdash; compile with an optimizer</h2>
    <p>
      The power of DSPy is compiling a module against a metric.
      Here&rsquo;s a RAG program optimized with
      <code> BootstrapFewShot</code>:
    </p>
    <pre>{`import dspy

class RAG(dspy.Module):
    def __init__(self, retriever):
        self.retrieve = retriever
        self.generate = dspy.ChainOfThought("context, question -> answer")

    def forward(self, question):
        context = self.retrieve(question, k=5)
        return self.generate(context=context, question=question)

# Training data: a handful of (question, gold_answer) pairs.
trainset = [
    dspy.Example(question=q, answer=a).with_inputs("question")
    for q, a in load_my_qa_pairs()
]

def exact_match(example, pred, trace=None):
    return example.answer.lower() in pred.answer.lower()

optimizer = dspy.BootstrapFewShot(metric=exact_match, max_bootstrapped_demos=4)
compiled_rag = optimizer.compile(RAG(retriever=my_retriever), trainset=trainset)

compiled_rag.save("compiled_rag.json")`}</pre>
    <p>
      The compiler runs your program on the training set, keeps the
      traces where <code>exact_match</code> passes, and bakes them in
      as few-shot demonstrations. Switching models later? Re-run
      <code> compile</code>; the demos that work best for Claude
      aren&rsquo;t the demos that work best for GPT-4o.
    </p>

    <h2>Evaluation</h2>
    <pre>{`evaluator = dspy.Evaluate(devset=devset, num_threads=8, display_progress=True)
score = evaluator(compiled_rag, metric=exact_match)`}</pre>
    <p>
      DSPy treats eval as a first-class citizen. If you&rsquo;re not
      evaluating numerically, you&rsquo;re just hand-waving at
      prompts.
    </p>

    <h2>Gotchas</h2>
    <p>
      <strong>You need labeled data.</strong> Optimizers are only as
      good as your training set and metric. 20&ndash;50 good examples
      beat 500 noisy ones every time.
    </p>
    <p>
      <strong>Compilation calls your model a lot.</strong>
      <code> BootstrapFewShot</code> can make hundreds of calls
      searching for good demos; <code>MIPROv2</code> makes more. Use
      a cheap model for the teacher pass when possible
      (<code>teacher_settings={`{ "lm": cheap_lm }`}</code>).
    </p>
    <p>
      <strong>Saved programs include the model choice.</strong> A
      compiled program optimized for one model may under-perform
      with another. Treat the JSON artifact as model-specific.
    </p>
    <p>
      <strong>Signatures are strict contracts.</strong> If the model
      returns malformed fields, DSPy raises. Use
      <code> dspy.Suggest</code> or <code>dspy.Assert</code> for
      self-repair loops.
    </p>

    <h2>When NOT to use it</h2>
    <p>
      Skip DSPy for one-off extraction scripts, demos, or anything
      you won&rsquo;t evaluate numerically &mdash; the optimizer
      machinery is overkill. Skip it if you need tight streaming UX
      (DSPy&rsquo;s sweet spot is batch-style reasoning and RAG).
      Reach for DSPy when you&rsquo;re shipping a classifier,
      extractor, or RAG system you&rsquo;ll iterate on for months
      and care about measurable quality gains.
    </p>
    <p>
      Map your module graph with the{" "}
      <a href="/tools/flowchart-maker">flowchart maker</a>, inspect
      compiled program JSON with the{" "}
      <a href="/tools/json-formatter">JSON formatter</a>, and budget
      optimizer runs with the{" "}
      <a href="/tools/token-counter">token counter</a> before you
      kick off an overnight compile.
    </p>
  </>
);
