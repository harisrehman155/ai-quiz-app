"use client";

interface HeaderProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
}

export default function Header({ title, currentQuestion, totalQuestions }: HeaderProps) {
  return (
    <header className="w-full p-4 sm:p-6 border-b border-gray-700 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Placeholder for Document Icon */}
        <div className="w-6 h-6 bg-gray-600 rounded"></div>
        <h1 className="text-lg font-semibold text-gray-200">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium text-gray-400">
          {currentQuestion} / {totalQuestions}
        </div>
        {/* Placeholder for Share Icon */}
        <div className="w-6 h-6 bg-gray-600 rounded"></div>
        {/* Placeholder for Close Icon */}
        <div className="w-6 h-6 bg-gray-600 rounded"></div>
      </div>
    </header>
  );
}
