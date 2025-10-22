"use client";

import { useState } from "react";
import { Question, Option } from "@/types/quiz";

interface QuestionCardProps {
  question: Question;
  onNextQuestion: (isCorrect: boolean) => void;
}

export default function QuestionCard({ question, onNextQuestion }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (option: Option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
  };

  const getButtonClass = (option: Option) => {
    if (!isAnswered) {
      return "bg-gray-700 hover:bg-gray-600";
    }
    const isCorrect = option.text === question.correct_answer;
    if (selectedOption?.text === option.text) {
      return isCorrect ? "bg-green-600" : "bg-red-600";
    }
    return isCorrect ? "bg-green-600" : "bg-gray-700";
  };

  return (
    <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">{`Question ${question.question_number}`}</h2>
      <p className="text-xl mb-6 text-gray-300">{question.question}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`text-left p-4 rounded-lg transition duration-300 ${getButtonClass(option)}`}
            disabled={isAnswered}
          >
            <p className="font-semibold text-white">{option.text}</p>
            {isAnswered && (
              <p className="text-sm mt-2 text-gray-400">{option.explanation}</p>
            )}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="text-right mt-6">
          <button
            onClick={() => onNextQuestion(selectedOption?.text === question.correct_answer)}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-300"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}
