import {
  SET_LEVEL, SET_PAUSE
} from './actions'

const initialState = {
  level: 0,
  proposition: null,
  answer: ""
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return {
        ...state,
        level: action.payload.level,
        proposition: action.payload.proposition,
        answer: "",
        end: action.payload.end
      }
    case SET_PAUSE:
      return {
        ...state,
        answer: action.payload.answer,
        end: action.payload.end
      }
    default:
      return state
  }
}