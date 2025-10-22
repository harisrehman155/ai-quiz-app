"use client";

interface ScoreSummaryProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

export default function ScoreSummary({ score, totalQuestions, onPlayAgain }: ScoreSummaryProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="w-full max-w-md text-center bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-white">Quiz Completed!</h2>
      <p className="text-xl text-gray-300 mb-6">
        You scored {score} out of {totalQuestions} ({percentage}%)
      </p>
      <button
        onClick={onPlayAgain}
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-300"
      >
        Play Again
      </button>
    </div>
  );
}
