import { FC } from "react";
import "./question.css";
import { AnswerItem } from "./index";

interface QuestionProps {
  title: string;
  answers: AnswerItem[];
  setSelectedAnswer: (answerId: string) => void;
  selectedAnswer?: string;
  isVerifyngAnswers: boolean;
  correctAnswer: string;
}

export const Question: FC<QuestionProps> = ({
  title,
  answers,
  setSelectedAnswer,
  selectedAnswer,
  isVerifyngAnswers,
  correctAnswer,
}) => {
  const selectionAnswerStyle = !isVerifyngAnswers ? "answer-selection" : "";

  return (
    <>
      <p>
        <strong>{title}</strong>
      </p>
      <div>
        {answers.map(({ id: answerId, answer }) => {
          const correctAnswerStyle =
            isVerifyngAnswers && answer === correctAnswer
              ? "correct-answer"
              : "";

          return (
            <button
              key={answerId}
              className={
                selectedAnswer === answer
                  ? `answer selected-answer ${correctAnswerStyle} ${selectionAnswerStyle}`
                  : `answer unselected-answer ${correctAnswerStyle} ${selectionAnswerStyle}`
              }
              onClick={() => {
                if (!isVerifyngAnswers) {
                  setSelectedAnswer(answerId);
                }
              }}
            >
              {answer}
            </button>
          );
        })}

        {isVerifyngAnswers && selectedAnswer === correctAnswer && (
          <p className="correct-answer-msg">Your answer was correct</p>
        )}

        {isVerifyngAnswers && selectedAnswer !== correctAnswer && (
          <p className="incorrect-answer-msg">Your answer was incorrect</p>
        )}
      </div>
    </>
  );
};
