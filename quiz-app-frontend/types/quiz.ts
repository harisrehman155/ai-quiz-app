export interface Option {
  text: string;
  explanation: string;
}

export interface Question {
  question_number: number;
  question: string;
  options: Option[];
  correct_answer: string;
  // Populated on the client when the user selects an answer
  user_answer?: string;
}

export type Quiz = Question[];
