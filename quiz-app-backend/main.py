import os
import json
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError
from agents import Runner
from models import QuizGenerationRequest, Quiz, Question
from quiz_master import quiz_master_agent
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
    Generates a quiz based on the user's topic and specifications using a two-agent chain.
    """
    try:
        # Step 1: Format the initial user request for the PromptCrafter agent
        initial_prompt_for_crafter = prompt_crafter_instructions.format(
            topic=request.topic,
            num_questions=request.num_questions,
            question_type=request.question_type,
            source_url=request.source_url or "N/A",
        )

        # Step 2: Run the PromptCrafter agent to generate the detailed prompt
        crafted_prompt_result = await Runner.run(prompt_crafter_agent, initial_prompt_for_crafter)
        crafted_prompt = crafted_prompt_result.final_output.strip()

        # Step 3: Run the QuizMaster agent with the enhanced prompt
        result = await Runner.run(quiz_master_agent, crafted_prompt)

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
