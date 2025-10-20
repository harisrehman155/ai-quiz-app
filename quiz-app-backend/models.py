from pydantic import BaseModel
from typing import List, Optional

class QuizGenerationRequest(BaseModel):
    topic: str
    source_url: Optional[str] = None
    num_questions: int
    question_type: str

class Option(BaseModel):
    text: str
    explanation: str

class Question(BaseModel):
    question_number: int
    question: str
    options: List[Option]
    correct_answer: str

class Quiz(BaseModel):
    questions: List[Question]
