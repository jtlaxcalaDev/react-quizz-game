import { FC } from "react";
import { Link } from "react-router-dom";

export const WelcomeView: FC = () => {
  return (
    <>
      <h2>Quizzical</h2>
      <p>Start playing answering questions</p>
      <Link to="/quiz">Start quiz</Link>
    </>
  );
};
