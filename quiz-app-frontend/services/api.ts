import { Question } from "@/types/quiz";

export const generateQuiz = async (
  topic: string,
  num_questions: number,
  source_url: string,
  complexity: "easy" | "medium" | "hard"
): Promise<Question[]> => {
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
      complexity,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to generate quiz");
  }

  return await response.json();
};
