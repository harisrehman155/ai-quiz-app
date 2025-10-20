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

quiz_master_agent = Agent(
    name="QuizMaster",
    instructions="You are an expert quiz creator. Your task is to generate a comprehensive, engaging, and accurate quiz based on the user's topic. The quiz must be in the format of a JSON object with a 'questions' key, which is a list of question objects. Each question object must have 'question_number', 'question', 'options' (a list of objects with 'text' and 'explanation'), and 'correct_answer'. For each option, you MUST provide a clear and concise explanation of why it is correct or incorrect. The explanations are the most important part of the quiz.",
    output_type=Quiz,
    tools=[tavily_search],
    model=llm_model,
)
