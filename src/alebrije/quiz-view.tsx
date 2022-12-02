import { FC, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Question } from "./question";
import { AnswerItem } from "./index";
import "./quiz-view.css";

interface Result {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface QuestionsResponseApi {
  response_code: number;
  results: Result[];
}

interface QuestionItem {
  id: string;
  question: string;
  answers: AnswerItem[];
  correctAnswer: string;
  selectedAnswer?: string;
}

const getQuestionsUrl =
  "https://opentdb.com/api.php?amount=5&category=10&difficulty=medium&type=multiple";

export const QuizView: FC = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [isVerifyngAnswers, setIsVerifyingAnswers] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const response = await fetch(getQuestionsUrl);
    const data: QuestionsResponseApi = await response.json();
    const { results } = data;

    const questionItems = results.map(mapResultToQuestionItem);

    setQuestions(questionItems);
  };

  const setSelectedAnswer = (selectedAnswerId: string) => {
    setQuestions((currentQuestions) => {
      // new state
      const newQuestions: QuestionItem[] = [];

      // iterate every question to find for the answer selected
      currentQuestions.forEach((question) => {
        // find the selected answer
        const answerItemFound = question.answers.find(
          (answer) => answer.id === selectedAnswerId
        );

        // if found
        if (answerItemFound) {
          // update the selected answer for the corresponding question
          newQuestions.push({
            ...question,
            selectedAnswer: answerItemFound.answer,
          });
        } else {
          // if not found
          // leave the previous content as it was in the past
          newQuestions.push(question);
        }
      });

      return newQuestions;
    });
  };

  const getCorrectAnswersCount = () => {
    let count = 0;

    questions.forEach((question) => {
      count =
        question.selectedAnswer === question.correctAnswer ? count + 1 : count;
    });

    return count;
  };

  return (
    <>
      <h2>Quiz</h2>

      <p>
        {isVerifyngAnswers
          ? "See your results"
          : "Answer the following questions"}
      </p>

      {questions.map((question) => (
        <Question
          key={question.id}
          title={question.question}
          answers={question.answers}
          setSelectedAnswer={setSelectedAnswer}
          selectedAnswer={question.selectedAnswer}
          isVerifyngAnswers={isVerifyngAnswers}
          correctAnswer={question.correctAnswer}
        />
      ))}

      {isVerifyngAnswers && (
        <h3>
          Total score: {getCorrectAnswersCount()}/{questions.length}
        </h3>
      )}

      {isVerifyngAnswers ? (
        <button
          onClick={() => {
            setQuestions([]);
            setIsVerifyingAnswers(false);
            loadQuestions();
          }}
          className="footer-btn"
        >
          Play again
        </button>
      ) : (
        <button
          onClick={() => {
            setIsVerifyingAnswers(true);
          }}
          className="footer-btn"
        >
          Verify answers
        </button>
      )}
    </>
  );
};

function mapResultToQuestionItem(result: Result): QuestionItem {
  return {
    id: nanoid(),
    question: decodeString(result.question),
    answers: [
      ...result.incorrect_answers.map((answer) => {
        return {
          id: nanoid(),
          answer: decodeString(answer),
        };
      }),
      {
        id: nanoid(),
        answer: result.correct_answer,
      },
    ].sort(() => Math.random() - 0.5),
    correctAnswer: result.correct_answer,
    selectedAnswer: undefined,
  };
}

function decodeString(str: string): string {
  return str
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}
