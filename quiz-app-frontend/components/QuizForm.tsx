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
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
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
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 disabled:bg-gray-500"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Start Quiz"}
      </button>
    </form>
  );
}
