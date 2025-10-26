import pytest
from unittest.mock import AsyncMock, patch
from agents import Runner
from prompt_crafter import prompt_crafter_agent, prompt_crafter_instructions

@pytest.mark.asyncio
@patch("agents.Runner.run", new_callable=AsyncMock)
async def test_prompt_crafter_agent(mock_run):
    """
    Tests that the PromptCrafter agent returns a non-empty string
    that looks like a valid prompt for the QuizMaster agent.
    """
    # Arrange
    user_request = {
        "topic": "The history of the internet",
        "num_questions": 5,
        "question_type": "multiple-choice",
        "source_url": "https://example.com/internet-history"
    }

    initial_prompt = prompt_crafter_instructions.format(
        topic=user_request["topic"],
        num_questions=user_request["num_questions"],
        question_type=user_request["question_type"],
        source_url=user_request["source_url"]
    )

    # Mock the agent's output
    mock_run.return_value = AsyncMock(final_output="You are an expert quiz creator... JSON... The history of the internet")

    # Act
    result = await Runner.run(prompt_crafter_agent, initial_prompt)
    crafted_prompt = result.final_output.strip()

    # Assert
    assert isinstance(crafted_prompt, str)
    assert len(crafted_prompt) > 50
    assert "You are an expert quiz creator" in crafted_prompt
    assert "JSON" in crafted_prompt
    assert user_request["topic"] in crafted_prompt
