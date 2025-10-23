import { Quiz } from "@/types/quiz";

export const generateQuiz = async (topic: string, num_questions: number, source_url: string): Promise<Quiz> => {
  const response = await fetch("http://localhost:8000/api/generate-quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      num_questions,
      source_url,
      question_type: "multiple-choice",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate quiz");
  }

  const data = await response.json();
  return data;
};
