import { createContext, Dispatch, SetStateAction } from "react";
import { Answer, Question } from "../../interfaces/Question";

interface QuestionContextProps {
  questions: Question[];
  loading: boolean;
  error: string | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}

const QuestionContext = createContext({} as QuestionContextProps);

export default QuestionContext;
