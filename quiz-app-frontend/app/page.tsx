"use client";

import { useState } from "react";
import QuizForm from "@/components/QuizForm";
import QuestionCard from "@/components/QuestionCard";
import ScoreSummary from "@/components/ScoreSummary";
import { Question } from "@/types/quiz";
import { generateQuiz } from "@/services/api";

type Status = "idle" | "loading" | "active" | "completed" | "error";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = async (topic: string, numQuestions: number) => {
    setStatus("loading");
    setError(null);
    try {
      const quizData = await generateQuiz(topic, numQuestions);
      if (quizData.length === 0) {
        throw new Error("The generated quiz has no questions.");
      }
      setQuiz(quizData);
      setCurrentQuestionIndex(0);
      setScore(0);
      setStatus("active");
    } catch (err) {
      setError("Failed to start the quiz. Please try again.");
      setStatus("error");
    }
  };

  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quiz.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setStatus("completed");
    }
  };

  const handlePlayAgain = () => {
    setStatus("idle");
    setQuiz([]);
  };

  const renderContent = () => {
    switch (status) {
      case "loading":
        return <div className="text-white text-2xl">Loading Quiz...</div>;
      case "active":
        return (
          <QuestionCard
            question={quiz[currentQuestionIndex]}
            onNextQuestion={handleNextQuestion}
          />
        );
      case "completed":
        return (
          <ScoreSummary
            score={score}
            totalQuestions={quiz.length}
            onPlayAgain={handlePlayAgain}
          />
        );
      case "error":
        return (
          <div className="text-center">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button
              onClick={handlePlayAgain}
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        );
      case "idle":
      default:
        return <QuizForm onStartQuiz={handleStartQuiz} isLoading={status === "loading"} />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gray-900">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">AI Quiz Generator</h1>
      {renderContent()}
    </main>
  );
}
