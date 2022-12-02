import { FunctionComponent, useContext, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import QuestionContext from "../Context/questions/QuestionContext";
import QuestionItem from "./QuestionItem";
import "./styles/Quiz.css";
import { Question } from "../interfaces/Question";

export type ViewType = "PLAY" | "RESULTS";

const Quiz: FunctionComponent = () => {
  // LOAD CONTEXT
  const { questions, error, loading, setLoading, setQuestions } =
    useContext(QuestionContext);

  // LOAD STATE
  const [view, setView] = useState<ViewType>("PLAY");

  // HANDLE LOADING STATE
  if (loading) {
    return <Loader />;
  }

  function selectAnswer(questionId: string, answerId: string) {
    // TODO mutation
  }

  return (
    <>
      <div className="root-container">
        <div className="title">Books quiz game</div>
        <ErrorBoundary
          FallbackComponent={() =>
            error ? <ErrorMessage error={error} /> : null
          }
          resetKeys={[error, loading]}
        >
          {questions.map(
            ({ id, question, correctAnswer, answers, selectedAnswer }) => (
              <QuestionItem
                view={view}
                key={id}
                question={question}
                correctAnswer={correctAnswer}
                selectedAnswer={selectedAnswer}
                answers={answers}
                onSelectAnswer={(answerId) => selectAnswer(id, answerId)}
              />
            )
          )}
        </ErrorBoundary>
      </div>

      <button
        onClick={() => {
          switch (view) {
            case "PLAY":
              setView("RESULTS");
              break;
            case "RESULTS":
              setView("PLAY");
              break;
          }
        }}
        className="btn-check-answers"
      >
        {view === "PLAY" ? "Check answers" : "Play again"}
      </button>

      {view === "RESULTS" && (
        <div className="cta-check-retry">
          <span className="score">
            You scored {getCorrectAnswers(questions)}/5 correct answers
          </span>
        </div>
      )}
    </>
  );
};

function getCorrectAnswers(questions: Question[]) {
  // TODO - implement
  return 0;
}

function Loader() {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
}

function ErrorMessage({ error }: { error: string }) {
  return (
    <div role="alert">
      <h2 className="error-msg">There was an error: {`${error}`}</h2>
    </div>
  );
}

export default Quiz;
