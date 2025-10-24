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

# New, detailed prompt for generating a raw JSON string
json_prompt = """
You are an expert quiz creator. Your task is to generate a comprehensive, engaging, and accurate quiz based on the user's topic.

If the user provides a source URL, you MUST use the content from that URL as the primary, and preferably sole, source for generating the quiz questions. Only use a general web search if the URL is inaccessible or lacks sufficient information.

You MUST format your output as a single, raw JSON object string. Do not include any other text, explanations, or markdown formatting (like ```json) before or after the JSON object.

The JSON object must have a single key: "questions".
The "questions" key must be a list of question objects.
Each question object must contain the following keys:
- "question_number": An integer representing the question number.
- "question": A string containing the question text.
- "options": A list of option objects.
- "correct_answer": A string that exactly matches the text of the correct option.

Each option object within the "options" list must contain the following keys:
- "text": A string for the answer option.
- "explanation": A clear and concise explanation for why this option is correct or incorrect.
"""

quiz_master_agent = Agent(
    name="QuizMaster",
    instructions=json_prompt,
    tools=[tavily_search],
    model=llm_model,
)
