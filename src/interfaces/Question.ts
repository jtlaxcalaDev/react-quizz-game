import { Dispatch, SetStateAction } from "react"

export interface IQuestion {
  id: string
  question: string
  correct_answer: string
  //incorrect_answers: string[]
  options: IOption[]
}

export interface IQuestionState {
  questions: IQuestion[]
  loading: boolean
  error: string
}

export interface IOption {
  id: string
  option: string
}