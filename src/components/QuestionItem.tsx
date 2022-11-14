import { FC, useState } from "react"
import { IOption,IQuestion } from "../interfaces/Question"
import AnswersView from "./AnswersView"
import './styles/QuestionItem.css'

const QuestionItem: FC<Pick<IQuestion, 'question' | 'correct_answer' | 'options'>> = ( {question, correct_answer, options} ) => {
  const [currentSelectedId, setCurrentSelectedId] = useState('')

  function findCurrentOption(): IOption | string {
    return (
      options.find(option => {
        return option.id === currentSelectedId;
      }) || ''
    );
  }

  return (
    <>
      <h4 className="question">{decodeURIComponent(question)}</h4>
      <AnswersView currentOption={findCurrentOption()} setCurrentSelectedId={setCurrentSelectedId} options={options} />
      <hr className="question-separator" />
    </>
  )      
}

export default QuestionItem