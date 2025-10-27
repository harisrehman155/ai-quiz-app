import json
import pytest
from unittest.mock import AsyncMock, patch
from fastapi.testclient import TestClient
from main import app
from models import Quiz, Question

client = TestClient(app)

@pytest.fixture
def mock_runner():
    with patch("main.Runner.run", new_callable=AsyncMock) as mock_run:
        yield mock_run

def test_generate_quiz_success(mock_runner):
    # Arrange
    mock_quiz_data = {
        "questions": [
            {
                "question_number": 1,
                "question": "What is the capital of France?",
                "options": [
                    {"text": "London", "explanation": "Incorrect."},
                    {"text": "Paris", "explanation": "Correct."},
                ],
                "correct_answer": "Paris",
            }
        ]
    }
    # Mock the two-agent chain
    mock_runner.side_effect = [
        AsyncMock(final_output="This is the crafted prompt."), # PromptCrafter output
        AsyncMock(final_output=json.dumps(mock_quiz_data)) # QuizMaster output
    ]

    request_data = {
        "topic": "Capitals",
        "num_questions": 1,
        "question_type": "multiple-choice",
        "complexity": "easy",
    }

    # Act
    response = client.post("/api/generate-quiz", json=request_data)

    # Assert
    assert response.status_code == 200
    assert response.json() == mock_quiz_data["questions"]
    assert mock_runner.call_count == 2

def test_generate_quiz_invalid_json(mock_runner):
    # Arrange
    # Mock the two-agent chain
    mock_runner.side_effect = [
        AsyncMock(final_output="This is the crafted prompt."), # PromptCrafter output
        AsyncMock(final_output="This is not JSON") # QuizMaster output
    ]

    request_data = {
        "topic": "Invalid",
        "num_questions": 1,
        "question_type": "multiple-choice",
        "complexity": "medium",
    }

    # Act
    response = client.post("/api/generate-quiz", json=request_data)

    # Assert
    assert response.status_code == 500
    assert "Failed to generate a valid quiz structure" in response.text
    assert mock_runner.call_count == 2
