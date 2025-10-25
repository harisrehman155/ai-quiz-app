// quiz-app-frontend/components/ProgressBar.tsx
"use client";

interface ProgressBarProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  questionStates: ('answered' | 'unanswered' | 'active')[];
  onSegmentClick: (index: number) => void;
}

const ProgressBar = ({
  totalQuestions,
  currentQuestionIndex,
  questionStates,
  onSegmentClick,
}: ProgressBarProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        const state = questionStates[index];
        const isActive = index === currentQuestionIndex;

        let bgColor = "bg-gray-600"; // Unanswered
        if (isActive) {
          bgColor = "bg-blue-500"; // Active
        } else if (state === 'answered') {
          bgColor = "bg-blue-300"; // Answered but not active
        }

        const isClickable = state === 'answered';

        return (
          <div
            key={index}
            onClick={() => isClickable && onSegmentClick(index)}
            className={`h-2 flex-1 rounded-full ${bgColor} ${isClickable ? 'cursor-pointer hover:opacity-80' : ''} transition-colors`}
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;
