"use client";

import { useState, useEffect } from "react";
import { Question, Option } from "@/types/quiz";

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

  const getButtonClass = (option: Option) => {
    let classes = "bg-white/5 border border-white/20 hover:bg-white/10";
    if (!isAnswered) {
      return classes;
    }

    const isCorrect = option.text === question.correct_answer;
    const isSelected = selectedOption?.text === option.text;

    if (isCorrect) {
      return "bg-teal-500/50 border-teal-500";
    }
    if (isSelected && !isCorrect) {
      return "bg-red-500/50 border-red-500";
    }
    return "bg-white/5 border-white/20 opacity-50";
  };

  return (
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{`Question ${question.question_number}`}</h2>
        <span className="text-lg font-semibold text-gray-400">
          {currentQuestion} / {totalQuestions}
        </span>
      </div>
      <p className="text-xl mb-6 text-gray-300">{question.question}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`text-left p-4 rounded-xl transition duration-300 ${getButtonClass(option)}`}
            disabled={isAnswered}
          >
            <p className="font-semibold text-white">{option.text}</p>
            {isAnswered && (
              <p className="text-sm mt-2 text-gray-200">{option.explanation}</p>
            )}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="text-right mt-6">
          <button
            onClick={() => onNextQuestion(selectedOption?.text === question.correct_answer)}
            className="bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}
