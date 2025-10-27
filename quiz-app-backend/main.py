import os
import json
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError
from agents import Runner
from models import QuizGenerationRequest, Quiz, Question
from quiz_master import quiz_master_agent, json_prompt_template
from prompt_crafter import prompt_crafter_agent, prompt_crafter_instructions
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# This is a workaround to make the SDK work with custom OpenAI-compatible endpoints
# as it internally uses the 'openai' library which expects OPENAI_API_KEY
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")


app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, this should be a list of allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/generate-quiz", response_model=List[Question])
async def generate_quiz(request: QuizGenerationRequest):
    """
    Generates a quiz using a two-agent chain: a strategist and a creator.
    """
    try:
        # Step 1: Create the input for the PromptCrafter (strategist) agent
        strategist_input = prompt_crafter_instructions.format(
            topic=request.topic,
            complexity=request.complexity,
            source_url=request.source_url or "N/A",
        )

        # Step 2: Run the PromptCrafter to get dynamic instructions
        strategist_result = await Runner.run(prompt_crafter_agent, strategist_input)
        dynamic_instructions = strategist_result.final_output.strip()

        # Step 3: Format the final prompt for the QuizMaster (creator) agent
        final_prompt_for_quiz_master = json_prompt_template.format(
            topic=request.topic,
            num_questions=request.num_questions,
            question_type=request.question_type,
            dynamic_instructions=dynamic_instructions,
        )

        # Step 4: Run the QuizMaster agent with the complete, detailed prompt
        result = await Runner.run(quiz_master_agent, final_prompt_for_quiz_master)

        # Manually parse the JSON string from the agent's final output
        json_string = result.final_output.strip()

        # Clean the string if it's wrapped in markdown
        if json_string.startswith("```json"):
            json_string = json_string[7:-4]

        data = json.loads(json_string)

        # Validate the data with the Pydantic model
        quiz_output = Quiz(**data)

        return quiz_output.questions

    except (json.JSONDecodeError, ValidationError) as e:
        print(f"Error parsing or validating quiz JSON: {e}")
        raise HTTPException(
            status_code=500, detail="Failed to generate a valid quiz structure."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while generating the quiz.",
        )
