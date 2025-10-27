import os
from agents import Agent, AsyncOpenAI, OpenAIChatCompletionsModel

# 1. Which LLM Service?
external_client: AsyncOpenAI = AsyncOpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url=os.getenv("GEMINI_LLM_BASE_URL"),
)

# 2. Which LLM Model? Use gemini-1.5-pro for advanced reasoning
llm_model: OpenAIChatCompletionsModel = OpenAIChatCompletionsModel(
    model="gemini-1.5-pro", openai_client=external_client
)

# 3. Meta-Prompt for the PromptCrafter Agent (Research Strategist)
prompt_crafter_instructions = """
You are an expert Research Strategist for an AI Quiz Generator. Your job is to analyze a user's quiz request and generate a concise set of strategic instructions for the "QuizMaster" AI.

**User's Request Analysis:**
- **Topic:** {topic}
- **Complexity:** {complexity}
- **Source URL:** {source_url}

**Your Task:**
Based on your analysis, generate a short, clear set of instructions for the QuizMaster. Your output should be a single block of text.

**Decision Logic:**
1.  **Source Material:**
    - If a Source URL is provided, instruct the QuizMaster to use it as the *exclusive* source.
    - If the topic is very broad (e.g., "History," "Science") and no URL is given, instruct the QuizMaster to perform a web search to gather foundational information.
    - If the topic is specific and well-known (e.g., "The Python Programming Language," "The life of Albert Einstein"), instruct the QuizMaster that a web search is likely unnecessary.
2.  **Question Complexity:**
    - For **'easy'** complexity, instruct the QuizMaster to generate straightforward questions that test foundational knowledge.
    - For **'medium'** complexity, instruct the QuizMaster to create questions that require some inference or connection of concepts.
    - For **'hard'** complexity, instruct the QuizMaster to devise challenging questions that test deep, nuanced understanding and may involve subtle details.

**Example Output:**
"Web search is required to gather information on this broad topic. Focus on creating medium-difficulty questions that require some conceptual understanding."

**Generate the instructions now.**
"""

prompt_crafter_agent = Agent(
    name="PromptCrafter",
    instructions=prompt_crafter_instructions,
    model=llm_model,
)
