import os
from agents import Agent, AsyncOpenAI, OpenAIChatCompletionsModel
from models import Quiz
from tools import tavily_search

# 1. Which LLM Service?
external_client: AsyncOpenAI = AsyncOpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url=os.getenv("GEMINI_LLM_BASE_URL"),
)

# 2. Which LLM Model?
llm_model: OpenAIChatCompletionsModel = OpenAIChatCompletionsModel(
    model="gemini-2.5-flash", openai_client=external_client
)

# 3. Placeholder instructions. The detailed prompt will be provided dynamically.
base_instructions = "You are an expert quiz creator. You will be given a detailed prompt to generate a quiz. Follow the instructions in the prompt precisely."

quiz_master_agent = Agent(
    name="QuizMaster",
    instructions=base_instructions,
    tools=[tavily_search],
    model=llm_model,
)
