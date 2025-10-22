# AI Quiz Application Backend

This is the backend service for the AI Quiz Application. It is a FastAPI-based server that leverages a Large Language Model (LLM) to generate quizzes on any given topic.

## Overview

The application exposes a single API endpoint that accepts a topic and other parameters (like the number of questions) and returns a complete, structured quiz. The quiz includes multiple-choice questions, answer options, and detailed explanations for why each option is correct or incorrect.

### Features

- **Dynamic Quiz Generation**: Create quizzes from any user-provided topic.
- **LLM-Powered**: Uses Google's Gemini Pro via the `openai-agents-sdk` to generate high-quality questions and explanations.
- **Web-Informed**: Integrated with the Tavily Search API to gather up-to-date information for quiz content.
- **Robust & Typed**: Built with FastAPI and Pydantic for a high-performance, type-safe, and self-documenting API.
- **Tested**: Includes a suite of unit tests to ensure reliability.

## Technology Stack

- **Framework**: FastAPI
- **LLM SDK**: `openai-agents-sdk`
- **LLM**: Google Gemini Pro (`gemini-2.5-flash`)
- **Web Search**: Tavily Search API
- **Package Manager**: `uv`
- **Testing**: `pytest`

## Getting Started

Follow these instructions to set up and run the application on your local machine.

### 1. Prerequisites

- Python 3.12+
- `uv` (can be installed with `pip install uv`)

### 2. Setup and Installation

1.  **Navigate to the Backend Directory**:
    ```bash
    cd quiz-app-backend
    ```

2.  **Create and Activate a Virtual Environment**:
    ```bash
    # Create the virtual environment
    uv venv

    # Activate on macOS/Linux
    source .venv/bin/activate

    # Activate on Windows
    # .venv\Scripts\activate
    ```

3.  **Install Dependencies**:
    With the virtual environment active, install all required packages from the `requirements.txt` file.
    ```bash
    uv pip install -r requirements.txt
    ```

4.  **Configure Environment Variables**:
    The application requires API keys to function.
    - Make a copy of the example environment file: `cp .env.example .env`
    - Open the newly created `.env` file and add your actual API keys.

### 3. Running the Application

Once the setup is complete, you can start the development server.

```bash
uvicorn main:app --reload
```

The server will be running on `http://127.0.0.1:8000`. The `--reload` flag enables hot-reloading, so the server will automatically restart when you make code changes.

You can interact with the API through the automatically generated documentation at **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**.

## Running Tests

To verify that the application is working correctly and that all tests pass, run the following command from the `quiz-app-backend` directory (with your virtual environment activated):

```bash
python -m pytest
```

This will discover and run all the unit tests in the `tests/` directory.
