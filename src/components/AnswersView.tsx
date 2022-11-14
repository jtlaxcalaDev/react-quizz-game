import { IOption } from '../interfaces/Question'
import './styles/AnswersView.css'

const AnswersView = ({options, setCurrentSelectedId, currentOption}: any) => {
  
  return (
    <div className="answers">
      {
        options.map((option: IOption) => (
          <div
          className={`option ${
            option.id === currentOption.id ? "selected-option" : ""
          }`}
          key={option.id} 
          onClick={()=> setCurrentSelectedId(option.id)}
          >{option.option}</div>
        ))
      }
    </div>
  )
}

export default AnswersView