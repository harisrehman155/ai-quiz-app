"use client";

import { useState } from "react";

interface QuizFormProps {
  onStartQuiz: (topic: string, numQuestions: number, sourceUrl: string) => void;
  isLoading: boolean;
}

export default function QuizForm({ onStartQuiz, isLoading }: QuizFormProps) {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [sourceUrl, setSourceUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() && !sourceUrl.trim()) {
      alert("Please enter a topic or provide a source URL.");
      return;
    }
    onStartQuiz(topic, numQuestions, sourceUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-gray-900 bg-opacity-50 backdrop-blur-lg">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          AI Quiz Generator
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Enter a topic or paste a URL to generate a quiz.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., The Renaissance period, quantum physics, etc."
            className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none shadow-lg"
            rows={4}
            disabled={isLoading}
          />
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="Or paste a URL..."
            className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-lg"
            disabled={isLoading}
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto flex-grow">
              <label htmlFor="numQuestions" className="sr-only">
                Number of Questions
              </label>
              <select
                id="numQuestions"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-lg"
                disabled={isLoading}
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed shadow-lg shadow-blue-500/50"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
