import {FunctionComponent, useContext, useEffect, useState} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import QuestionContext from '../Context/questions/QuestionContext';
import QuestionItem from './QuestionItem';
import './styles/Quiz.css';

const Quiz: FunctionComponent = () => {
  const [result, setResult] = useState<number>(0);
  //const [check, setCheck] = useState<boolean>(false);
  const {
    questions, 
    error, 
    loading, 
    setLoading, 
    corrects, 
    validateAnswers, 
    setValidateAnswers,
  } = useContext(QuestionContext);

  const ItemsView: any /* ¿Que tipo de dato seria? */ = () => {
    if (error) {
      return <h3>{error}</h3>;
    } else {
      return questions.map(item => (
        <QuestionItem
          key={item.id}
          question={item.question}
          correct_answer={item.correct_answer}
          options={item.options}
        />
      ));
    }
  };

  const ErrorFallback: FunctionComponent = () => {
    return (
      <div role='alert'>
        <h2 style={{color: '#E0E1DD', width: '16em'}}>
          There was an error: {`${error}`}
        </h2>
      </div>
    );
  };

  const VerifyAnswers: any = () => {
    return (
      questions.length > 0 && (
        <div className='cta-check-retry'>
          {validateAnswers && (
            <span className='score'>
              You scored {corrects}/5 correct answers
            </span>
          )}
          {
            !loading &&
            <button
              onClick={() => handleClick(validateAnswers)}
              className='btn-check-answers'>
              {!validateAnswers ? 'Check answers' : 'Play again'}
            </button>
          }
        </div>
      )
    );
  };

  /* una sola funte de verdad, un solo estado que controle : video 31 scrimba */
  function handleClick(validate: boolean) {
    if(validateAnswers){
      setValidateAnswers(false)
      setLoading(true);
    }else{
      setValidateAnswers(!validate)
    }
  }

  const Loader = () => {
    return (
      <div className="lds-ripple"><div></div><div></div></div>
    )
  }

  return (
    <>
      <div className='items-list-container'>
        <div className='title'>Books quiz game</div>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          resetKeys={[error, loading]}>
          { loading ? <Loader /> : <ItemsView /> }
        </ErrorBoundary>
      </div>
      <VerifyAnswers />
    </>
  );
};

export default Quiz;
