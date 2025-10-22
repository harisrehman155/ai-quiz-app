# AI Quiz Application

This is a full-stack application that uses a Large Language Model (LLM) to generate interactive quizzes on any topic. The backend is built with Python and FastAPI, and the frontend is a modern web application built with Next.js and React.

## Project Overview

### Features
- **Dynamic Quiz Generation**: Create quizzes from any user-provided topic.
- **AI-Powered**: Uses Google's Gemini Pro to generate high-quality questions, answer options, and detailed explanations.
- **Interactive Frontend**: A clean, responsive, and user-friendly interface for taking quizzes and viewing results.
- **Immediate Feedback**: Users receive instant feedback on their answers, with clear explanations to facilitate learning.

### How it Works
1.  The user enters a topic on the Next.js frontend.
2.  The frontend sends a request to the FastAPI backend.
3.  The backend uses an AI agent (powered by `openai-agents-sdk` and Gemini) to generate a structured quiz.
4.  The complete quiz is sent back to the frontend.
5.  The frontend displays the quiz one question at a time, manages the user's score, and shows the final results.

---

## Getting Started

To run the full application, you will need to start both the backend and frontend servers simultaneously.

### Prerequisites
- Python 3.12+
- Node.js 18.17+
- `uv` (can be installed with `pip install uv`)

### 1. Run the Backend Server

First, set up and run the FastAPI backend.

1.  **Open a new terminal window.**
2.  Navigate to the backend directory:
    ```bash
    cd quiz-app-backend
    ```
3.  Set up the Python environment and install dependencies (only needs to be done once):
    ```bash
    # Create and activate a virtual environment
    uv venv
    source .venv/bin/activate  # Use `.venv\Scripts\activate` on Windows

    # Install dependencies
    uv pip install -r requirements.txt
    ```
4.  Configure your API keys:
    - Make a copy of the example environment file: `cp .env.example .env`
    - Open the newly created `.env` file and add your actual API keys.
5.  **Start the backend server**:
    ```bash
    uvicorn main:app --reload
    ```
The backend will now be running on `http://localhost:8000`. Leave this terminal window open.

### 2. Run the Frontend Server

Next, set up and run the Next.js frontend.

1.  **Open a second terminal window.**
2.  Navigate to the frontend directory:
    ```bash
    cd quiz-app-frontend
    ```
3.  Install the Node.js dependencies (only needs to be done once):
    ```bash
    npm install
    ```
4.  **Start the frontend development server**:
    ```bash
    npm run dev
    ```
The frontend will now be running on `http://localhost:3000`.

---

## How to Use the Application

1.  **Open the App**: With both servers running, open your web browser and navigate to **[http://localhost:3000](http://localhost:3000)**.
2.  **Create a Quiz**: Enter a topic, select the number of questions, and click "Start Quiz".
3.  **Take the Quiz**: Answer each question. You'll get immediate feedback and explanations.
4.  **See Your Score**: After the last question, your final score will be displayed. Click "Play Again" to start over.

## Development

-   **Backend Testing**: To run the Python unit tests, navigate to the `quiz-app-backend` directory and run `python -m pytest`.
-   **Frontend Linting**: To check for code quality issues, navigate to the `quiz-app-frontend` directory and run `npm run lint`.
