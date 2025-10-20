import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from fastapi.testclient import TestClient
from main import app
from models import Question, Quiz

@pytest.fixture
def client():
    return TestClient(app)

@pytest.mark.asyncio
@patch("main.Runner.run")
async def test_generate_quiz_success(mock_runner_run, client):
    # Mock the response from the agent
    mock_questions = [
        Question(
            question_number=1,
            question="What is 2 + 2?",
            options=[
                {"text": "3", "explanation": "Incorrect."},
                {"text": "4", "explanation": "Correct."},
            ],
            correct_answer="4",
        )
    ]
    mock_quiz = Quiz(questions=mock_questions)

    # Mock the result object, which is synchronous
    mock_agent_result = MagicMock()
    mock_agent_result.final_output_as.return_value = mock_quiz

    # The Runner.run function is async, so we set the return_value of the AsyncMock
    mock_runner_run.return_value = mock_agent_result

    # Make the request to the endpoint
    response = client.post(
        "/api/generate-quiz",
        json={"topic": "Math", "num_questions": 1, "question_type": "multiple-choice"},
    )

    # Assert the response
    assert response.status_code == 200
    assert response.json() == [q.model_dump() for q in mock_questions]
    mock_runner_run.assert_called_once()

@pytest.mark.asyncio
@patch("main.Runner.run")
async def test_generate_quiz_error(mock_runner_run, client):
    # Mock the agent to raise an exception
    mock_runner_run.side_effect = Exception("Test error")

    # Make the request to the endpoint
    response = client.post(
        "/api/generate-quiz",
        json={"topic": "Error", "num_questions": 1, "question_type": "multiple-choice"},
    )

    # Assert the response
    assert response.status_code == 500
    assert response.json() == {"detail": "An error occurred while generating the quiz."}
    mock_runner_run.assert_called_once()
