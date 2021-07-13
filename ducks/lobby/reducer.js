import {
	GET_ALL_LOBBIES, GET_ALL_LOBBIES_SUCCESS, GET_ALL_LOBBIES_FAIL,
  SET_CURRENT_LOBBY, ADD_LOBBY, ADD_PLAYER, QUESTION_ANSWERED, RESET_PLAYERS
} from './actions'

const initialState = {
  loading: false,
  error: null,
  data: [],
  players: {},
  currentLobby: ""
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LOBBIES:
      return {
        ...state,
        loading: true
      }
    case GET_ALL_LOBBIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result
      }
    case GET_ALL_LOBBIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case SET_CURRENT_LOBBY:
      return {
        ...state,
        currentLobby: action.payload
      }
    case ADD_LOBBY:
      return {
        ...state,
        data: [ ...state.data, action.payload ]
      }
    case ADD_PLAYER:
      return {
        ...state,
        players: { ...state.players, ...action.payload.reduce((acc, a) => ({
          ...acc, [a]: { score: 0, currentAnswer: "pending" }
        }), {}) }
      }
    case QUESTION_ANSWERED:
      return {
        ...state,
        players: {
          ...state.players, [action.payload.username]: action.payload.answer
            ? { score: state.players[action.payload.username].score+1, currentAnswer: "right" }
            : { ...state.players[action.payload.username], currentAnswer: "wrong" }
        }
      }
    case RESET_PLAYERS:
      return {
        ...state,
        players: Object.keys(state.players).reduce((acc, player) => ({ ...acc, [player]: { score: state.players[player].score, currentAnswer: "pending" } }), {})
      }
    default:
      return state
  }
}