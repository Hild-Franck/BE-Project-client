import {
  SET_LEVEL
} from './actions'

const initialState = {
  level: 0,
  proposition: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return {
        ...state,
        level: action.payload.level,
        proposition: action.payload.proposition,
        end: action.payload.end
      }
    default:
      return state
  }
}