import pytest
from unittest.mock import AsyncMock, patch
from agents import Runner
from prompt_crafter import prompt_crafter_agent, prompt_crafter_instructions

@pytest.mark.asyncio
@patch("agents.Runner.run", new_callable=AsyncMock)
async def test_prompt_crafter_agent(mock_run):
    """
    Tests that the PromptCrafter agent returns a non-empty string
    that looks like a valid set of instructions for the QuizMaster agent.
    """
    # Arrange
    user_request = {
        "topic": "The history of the internet",
        "complexity": "hard",
        "source_url": "https://example.com/internet-history"
    }

    initial_prompt = prompt_crafter_instructions.format(
        topic=user_request["topic"],
        complexity=user_request["complexity"],
        source_url=user_request["source_url"]
    )

    # Mock the agent's output
    mock_run.return_value = AsyncMock(final_output="Use the provided URL as the exclusive source. Create challenging, hard-difficulty questions.")

    # Act
    result = await Runner.run(prompt_crafter_agent, initial_prompt)
    instructions = result.final_output.strip()

    # Assert
    assert isinstance(instructions, str)
    assert len(instructions) > 20
    assert "URL as the exclusive source" in instructions
    assert "hard-difficulty" in instructions
