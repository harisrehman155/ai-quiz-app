"use client";

import { useState, useEffect } from "react";
import { Question, Option } from "@/types/quiz";
import Header from "./Header";

type OptionState = 'default' | 'selected' | 'correct' | 'incorrect';

interface QuestionCardProps {
  question?: Question; // Make question optional for the completed state
  userAnswer?: string;
  onNextQuestion: (selectedOption: string) => void;
  onBackQuestion: () => void;
  onPlayAgain: () => void;
  currentQuestion: number;
  totalQuestions: number;
  status: 'active' | 'completed';
  score: number;
}

export default function QuestionCard({
  question,
  userAnswer,
  onNextQuestion,
  onBackQuestion,
  onPlayAgain,
  currentQuestion,
  totalQuestions,
  status,
  score,
}: QuestionCardProps) {
  // The local selected option is kept to provide immediate feedback
  const [localSelected, setLocalSelected] = useState<string | null>(null);

  useEffect(() => {
    // Reset local selection when the question changes
    setLocalSelected(null);
  }, [question]);

  // An answer is considered submitted if it exists in the parent state
  const isAnswered = userAnswer !== undefined;

  const handleOptionClick = (option: Option) => {
    if (isAnswered) return;
    setLocalSelected(option.text);
  };

  const handleSubmit = () => {
    if (localSelected) {
      onNextQuestion(localSelected);
    }
  };

  const selectedAnswer = isAnswered ? userAnswer : localSelected;

  return (
    <div className="bg-[#1e293b] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
      <Header
        title="AI Communication Exam L1: Part 2"
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />

      <div className="p-6 md:p-8">
        {status === 'completed' ? (
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
            <p className="text-xl text-gray-300 mb-6">
              Your final score is: <span className="font-bold text-blue-400">{score} / {totalQuestions}</span>
            </p>
            <button
              onClick={onPlayAgain}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Play Again
            </button>
          </div>
        ) : question && (
          <div>
            <p className="text-lg font-medium text-gray-300 mb-6">
              {question.question_number}. {question.question}
            </p>
            <div className="space-y-4">
              {question.options.map((option, index) => {
                const isCorrectAnswer = option.text === question.correct_answer;
                const isSelected = selectedAnswer === option.text;

            let optionState: OptionState = 'default';
                if (isAnswered) {
                  if (isCorrectAnswer) optionState = 'correct';
                  else if (isSelected) optionState = 'incorrect';
                } else if (isSelected) {
                  optionState = 'selected';
                }

                const stateStyles = {
                  default: 'border-gray-600 bg-gray-700 hover:bg-gray-600',
                  selected: 'border-blue-400 bg-blue-500/50',
                  correct: 'border-green-500 bg-green-500/20',
                  incorrect: 'border-red-500 bg-red-500/20',
                };

                return (
                  <div key={index}>
                    <button
                      onClick={() => handleOptionClick(option)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors flex justify-between items-start ${stateStyles[optionState]}`}
                      disabled={isAnswered}
                    >
                      <div>
                        <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                        {option.text}
                      </div>
                    </button>
                    {(optionState === 'correct' || optionState === 'incorrect') && (
                      <div className="mt-2 pl-4">
                        <div className="flex items-start gap-2 text-sm">
                          {optionState === 'correct' ? (
                            <div className="w-5 h-5 bg-green-500 rounded-full mt-1 flex-shrink-0"></div> // Checkmark Placeholder
                          ) : (
                            <div className="w-5 h-5 bg-red-500 rounded-full mt-1 flex-shrink-0"></div> // X Placeholder
                          )}
                          <div>
                            <p className={`font-semibold ${optionState === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                              {optionState === 'correct' ? 'Right answer' : 'Not quite'}
                            </p>
                            <p className="text-gray-400">{option.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className={`px-6 md:px-8 py-4 bg-gray-900/50 border-t border-gray-700 flex ${status === 'completed' ? 'justify-end' : 'justify-between'} items-center`}>
        {status !== 'completed' && (
          <>
            <button
              onClick={onBackQuestion}
              disabled={currentQuestion === 1}
              className="text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={!localSelected || isAnswered}
            >
              {currentQuestion === totalQuestions ? "Done" : "Next"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
