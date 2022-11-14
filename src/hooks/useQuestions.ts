import { useContext } from 'react';
import QuestionContext from '../Context/questions/QuestionContext';

export const useQuestions = () => {

    const questionContext = useContext( QuestionContext );
    const { questions, error, loading } = questionContext;

    return {
        questions: questions,
        error, 
        loading,
    }
}