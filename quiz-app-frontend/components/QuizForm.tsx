"use client";

import { useState } from "react";

interface QuizFormProps {
  onStartQuiz: (topic: string, numQuestions: number) => void;
  isLoading: boolean;
}

export default function QuizForm({ onStartQuiz, isLoading }: QuizFormProps) {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }
    onStartQuiz(topic, numQuestions);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Your Quiz</h2>
      <div className="mb-4">
        <label htmlFor="topic" className="block text-gray-300 mb-2">
          Topic
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., The History of Ancient Rome"
          className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={isLoading}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="numQuestions" className="block text-gray-300 mb-2">
          Number of Questions
        </label>
        <select
          id="numQuestions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
          }}
          disabled={isLoading}
        >
          <option className="bg-gray-800" value={5}>5</option>
          <option className="bg-gray-800" value={10}>10</option>
          <option className="bg-gray-800" value={15}>15</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300 disabled:bg-teal-500/50"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Start Quiz"}
      </button>
    </form>
  );
}
