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

# 3. Meta-Prompt for the PromptCrafter Agent
prompt_crafter_instructions = """
You are an expert prompt engineer specializing in educational content.
Your task is to take a user's simple quiz request and transform it into a detailed, high-quality prompt for another AI, the "QuizMaster".
The goal is to generate a final prompt that will result in a challenging, accurate, and well-structured quiz.

**User's Request Details:**
- Topic: {topic}
- Number of Questions: {num_questions}
- Question Type: {question_type}
- Source URL: {source_url}

**Your Task:**
Based on the user's request, generate a new, detailed prompt for the QuizMaster. This prompt must instruct the QuizMaster to do the following:

1.  **Enforce Source Material:** If a Source URL is provided, the QuizMaster MUST use it as the primary, and preferably sole, source.
2.  **Question Quality:** Generate questions that are non-trivial and require a genuine understanding of the topic. Avoid simple, surface-level questions.
3.  **Explanation Depth:** Every single answer option, whether correct or incorrect, MUST have a detailed explanation. The explanation for the correct answer should elaborate on why it's right, and the explanations for incorrect answers should clarify the misconceptions.
4.  **Strict JSON Formatting:** The final output from the QuizMaster MUST be a single, raw JSON object string. It must not contain any other text, explanations, or markdown formatting (like ```json). The JSON must be a single object with a "questions" key, which is a list of question objects.

**Example of the output you should generate (this is a prompt for the QuizMaster):**

"You are an expert quiz creator... [Your detailed instructions here]... The JSON object must have a single key: 'questions'..."

**Generate the prompt now.**
"""

prompt_crafter_agent = Agent(
    name="PromptCrafter",
    instructions=prompt_crafter_instructions,
    model=llm_model,
)
