import { Dispatch, SetStateAction, useEffect, useState } from "react";

import QuestionContext from "./QuestionContext";
import { nanoid } from "nanoid";
import { Answer, Question } from "../../interfaces/Question";

const endpoint =
  "https://opentdb.com/api.php?amount=5&category=10&difficulty=medium&type=multiple";

interface QuestionsProviderProps {
  children: React.ReactNode;
}

const QuestionsProvider = ({ children }: QuestionsProviderProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getQuestions();
  }, [loading]);

  const getQuestions = async () => {
    if (loading) {
      try {
        const res = await fetch(endpoint);
        if (res.ok) {
          const { results } = await res.json();
          const data = results.map(mapApiQuestion);
          setQuestions(data);
          setError(null);
          setLoading(false);
        } else {
          setError("Has a error to get data");
          setLoading(false);
        }
      } catch (error) {
        setError("Has a problem to get data");
        setLoading(false);
      }
    }
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        loading,
        setLoading,
        error,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

interface ApiQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function mapApiQuestion({
  question,
  correct_answer,
  incorrect_answers,
}: ApiQuestion): Question {
  const answers = [...incorrect_answers, correct_answer];

  return {
    id: nanoid(),
    question,
    correctAnswer: correct_answer,
    selectedAnswer: undefined,
    answers: answers
      .map((answer) => {
        return {
          id: nanoid(),
          content: answer,
        };
      })
      .sort(() => Math.random() - 0.5),
  };
}

export default QuestionsProvider;
