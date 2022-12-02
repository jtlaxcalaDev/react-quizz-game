import { QuestionState } from "../../interfaces/Question";
import { GET_QUESTIONS, SET_LOADING, SET_ERROR } from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: QuestionState, action: any): QuestionState => {
  const { payload, type } = action;

  switch (type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
