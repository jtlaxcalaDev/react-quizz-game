import {  Dispatch, SetStateAction, useEffect, useState } from "react";

import QuestionContext  from "./QuestionContext";
import { nanoid } from "nanoid";
import { IOption, IQuestion } from "../../interfaces/Question";

const QuestionProvider = ({children}: any) => {
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null);
  const [corrects, setCorrects] = useState<number>(0);
  const [validateAnswers, setValidateAnswers] = useState<boolean>(false)
  const [selecteds, setSelecteds] = useState<IOption[]>([])

  useEffect(() => {
    getQuestions()
  }, [loading])

  const getQuestions = async (): Promise<void> => {
    if(loading) {
      try {
        const res: Response = await fetch('https://opentdb.com/api.php?amount=5&category=10&difficulty=medium&type=multiple')
        if (res.ok) {
          const { results } = await res.json();

          const data: IQuestion[] = []
  
          results.map((item: any) => {
            data.push({
              id: nanoid(),
              question: item.question,
              correct_answer: item.correct_answer,
              options: getOptions(item.correct_answer, item.incorrect_answers)
            })
          })
  
          setQuestions(data);
          setError(null);
          setLoading(false);
        } else {
          setError('Has a error to get data')
        }
      }catch (error) {
        setError('Has a problem to get data')
      }
    }
  };

  function getOptions(correct: string, incorrects: string[]): IOption[] {
    const optionsTemp: IOption[] = [
      {
        id: nanoid(),
        option: correct
      }
    ]
  
    incorrects.map( item => {
      optionsTemp.push({
        id: nanoid(),
        option: item,
      })
    })
    
    optionsTemp.sort(() => Math.random() - .5)

    return optionsTemp
  }

  return (
    <QuestionContext.Provider
      value={{
        questions,
        loading,
        setLoading,
        error,
        corrects,
        setCorrects,
        validateAnswers,
        setValidateAnswers,
        selecteds,
        setSelecteds
      }}
    >
      { children }
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;