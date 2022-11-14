import { createContext, Dispatch, SetStateAction } from "react";
import { IOption, IQuestion } from "../../interfaces/Question";

interface QuestionContextProps {
  questions: IQuestion[]
  loading: boolean
  setLoading: any
  error: string | null
  corrects: number
  setCorrects: any
  validateAnswers: boolean,
  setValidateAnswers: any,
  selecteds: IOption[],
  setSelecteds: Dispatch<SetStateAction<IOption[]>>
}

const QuestionContext = createContext({} as QuestionContextProps)

export default QuestionContext;