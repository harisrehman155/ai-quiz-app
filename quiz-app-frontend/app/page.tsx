"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import QuizForm from "@/components/QuizForm";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import { Question } from "@/types/quiz";
import { generateQuiz } from "@/services/api";

type Status = "idle" | "loading" | "active" | "completed" | "error";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = async (topic: string, numQuestions: number, sourceUrl: string) => {
    setStatus("loading");
    setError(null);
    try {
      const quizData = await generateQuiz(topic, numQuestions, sourceUrl);
      if (quizData.length === 0) {
        throw new Error("The generated quiz has no questions.");
      }
      // Ensure any previous user_answer fields are cleared
      setQuiz(quizData.map(q => ({ ...q, user_answer: undefined })));
      setCurrentQuestionIndex(0);
      setScore(0);
      setStatus("active");
    } catch (err) {
      setError("Failed to start the quiz. Please try again.");
      setStatus("error");
    }
  };

  const handleNextQuestion = (selectedOption: string) => {
    const current = quiz[currentQuestionIndex];
    const alreadyAnswered = current.user_answer !== undefined;
    const isCorrect = selectedOption === current.correct_answer;

    // Persist selection directly on the question in the quiz array
    setQuiz((prev) =>
      prev.map((q, idx) =>
        idx === currentQuestionIndex ? { ...q, user_answer: selectedOption } : q
      )
    );

    // Only calculate score the first time an answer is submitted for this question
    if (!alreadyAnswered && isCorrect) {
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

  const handleSegmentClick = (index: number) => {
    // Allow navigation only to answered questions
    if (quiz[index]?.user_answer !== undefined) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleBackQuestion = () => {
    const prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
    }
  };

  const renderContent = () => {
    if (status === "loading") return null;

    if (status === "active" || status === "completed") {
      const questionStates = quiz.map((q, index) => {
        if (index === currentQuestionIndex) return 'active';
        if (q.user_answer !== undefined) return 'answered';
        return 'unanswered';
      });

      return (
        <div>
          <ProgressBar
            totalQuestions={quiz.length}
            currentQuestionIndex={currentQuestionIndex}
            questionStates={questionStates}
            onSegmentClick={handleSegmentClick}
          />
          <QuestionCard
            question={quiz[currentQuestionIndex]}
            userAnswer={quiz[currentQuestionIndex]?.user_answer}
            onNextQuestion={handleNextQuestion}
            onBackQuestion={handleBackQuestion}
            onPlayAgain={handlePlayAgain}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={quiz.length}
            status={status}
            score={score}
          />
        </div>
      );
    }
    return <QuizForm onStartQuiz={handleStartQuiz} isLoading={status === "loading"} />;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {status === 'loading' && <Loader />}
      <div className="w-full max-w-2xl mx-auto">
        {renderContent()}

        {status === 'error' && (
          <div className="text-center mt-4 p-6 bg-gray-800 rounded-lg">
            <p className="text-red-400 text-xl mb-4">{error}</p>
            <button
              onClick={handlePlayAgain}
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
