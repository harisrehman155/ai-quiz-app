"use client";

import { useState, useEffect } from "react";
import { Question, Option } from "@/types/quiz";
import Header from "./Header";

interface QuestionCardProps {
  question: Question;
  onNextQuestion: (isCorrect: boolean) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  onNextQuestion,
  currentQuestion,
  totalQuestions,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [question]);

  const handleOptionClick = (option: Option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
  };

  const isCorrect = selectedOption?.text === question.correct_answer;

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-900 bg-opacity-50 backdrop-blur-lg">
      <Header
        title="AI Communication Exam L1: Part 2"
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-3xl">
          <p className="text-xl sm:text-2xl font-semibold text-gray-200 mb-8 text-center">
            {question.question}
          </p>
          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedOption?.text === option.text;
              const isTheCorrectAnswer = option.text === question.correct_answer;

              let buttonClass = "w-full text-left p-4 rounded-lg transition-all duration-300 bg-gray-800 bg-opacity-50 border border-gray-700 hover:bg-gray-700 hover:border-blue-500 shadow-lg";

              if (isAnswered) {
                if (isTheCorrectAnswer) {
                  buttonClass += " border-green-500 bg-green-500/20 ring-2 ring-green-500 shadow-green-500/50";
                } else if (isSelected) {
                  buttonClass += " border-red-500 bg-red-500/20 ring-2 ring-red-500 shadow-red-500/50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={buttonClass}
                  disabled={isAnswered}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + index)}</span>
                  {option.text}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className={`mt-6 p-4 rounded-lg bg-opacity-50 backdrop-blur-md ${isCorrect ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'}`}>
              <h3 className="font-bold text-lg mb-2">{isCorrect ? "That's right!" : "Not quite..."}</h3>
              <p className="text-gray-300">{selectedOption?.explanation}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-3xl mx-auto py-4 flex justify-between items-center px-4 sm:px-6 md:px-8">
        <button
          className="bg-gray-700 bg-opacity-50 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 border border-gray-600 shadow-md"
          onClick={() => { /* Implement back functionality if needed */ }}
        >
          Back
        </button>
        <button
          onClick={() => onNextQuestion(isCorrect)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/50 disabled:bg-gray-500 disabled:shadow-none"
          disabled={!isAnswered}
        >
          {currentQuestion === totalQuestions ? "Done" : "Next"}
        </button>
      </div>
    </div>
  );
}
