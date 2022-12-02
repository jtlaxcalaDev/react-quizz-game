export interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  selectedAnswer?: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  content: string;
}


export interface QuestionState {
  questions: Question[];
  loading: boolean;
  error: string;
}
