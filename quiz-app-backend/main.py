import os
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from agents import Runner
from models import QuizGenerationRequest, Quiz, Question
from quiz_master import quiz_master_agent
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
    Generates a quiz based on the user's topic and specifications.
    """
    try:
        prompt = f"Generate a {request.num_questions}-question, {request.question_type} quiz about {request.topic}."
        if request.source_url:
            prompt += f" Use the following URL as a primary source: {request.source_url}"

        result = await Runner.run(quiz_master_agent, prompt)
        quiz_output = result.final_output_as(Quiz)
        return quiz_output.questions

    except Exception as e:
        print(f"Error generating quiz: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while generating the quiz.")
