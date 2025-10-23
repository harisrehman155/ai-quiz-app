"use client";

interface HeaderProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
}

export default function Header({ title, currentQuestion, totalQuestions }: HeaderProps) {
  return (
    <header className="w-full p-4 sm:p-6 md:p-8 flex justify-between items-center">
      <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
      <div className="text-lg font-semibold text-gray-300">
        {currentQuestion} / {totalQuestions}
      </div>
    </header>
  );
}
