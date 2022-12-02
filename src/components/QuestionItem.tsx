import { FC } from "react";
import { Answer } from "../interfaces/Question";
import "./styles/QuestionItem.css";
import { ViewType } from "./Quiz";

interface QuestionItemProps {
  question: string;
  correctAnswer: string;
  selectedAnswer?: string;
  answers: Answer[];
  onSelectAnswer: (answerId: string) => void;
  view: ViewType;
}

const QuestionItem: FC<QuestionItemProps> = ({
  question,
  correctAnswer,
  selectedAnswer,
  answers,
  onSelectAnswer,
  view,
}) => {
  return (
    <>
      <h4 className="question">{decodeURIComponent(question)}</h4>
      <div className="answers">
        {answers.map(({ id, content }) => (
          <div
            className={getAnswerStyle(
              content,
              correctAnswer,
              view,
              selectedAnswer
            )}
            key={id}
            onClick={() => onSelectAnswer(id)}
          >
            {content}
          </div>
        ))}
      </div>
      <hr className="question-separator" />
    </>
  );
};

function getAnswerStyle(
  answer: string,
  correctAnswer: string,
  view: ViewType,
  selectedAnswer?: string
) {
  if (view === "PLAY") {
    if (answer === correctAnswer) {
      return "correct-answer";
    } else {
      return "answer";
    }
  } else {
    return "correct-answer";
  }
}

export default QuestionItem;
