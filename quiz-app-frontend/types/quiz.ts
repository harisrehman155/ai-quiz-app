export interface Option {
  text: string;
  explanation: string;
}

export interface Question {
  question_number: number;
  question: string;
  options: Option[];
  correct_answer: string;
}

export type Quiz = Question[];
