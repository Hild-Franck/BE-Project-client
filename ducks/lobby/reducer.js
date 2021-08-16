import {
	GET_ALL_LOBBIES, GET_ALL_LOBBIES_SUCCESS, GET_ALL_LOBBIES_FAIL,
  SET_CURRENT_LOBBY, ADD_LOBBY, ADD_PLAYER, REMOVE_PLAYER, QUESTION_ANSWERED,
  RESET_PLAYERS, LIFE_LOST
} from './actions'

const initialState = {
  loading: false,
  error: null,
  data: [],
  players: {},
  currentLobby: "",
  numberOfLives: 0
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
        currentLobby: action.payload.id,
        numberOfLives: Number(action.payload.numberOfLives)
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
          ...acc, [a]: { score: 0, currentAnswer: "pending", lives: state.numberOfLives }
        }), {}) }
      }
    case REMOVE_PLAYER:
      return {
        ...state,
        players: Object.keys(state.players)
          .filter((username) => action.payload.username !== username)
          .reduce((acc, username) => ({ ...acc, [username]: state.players[username] }), {}),
      }
    case QUESTION_ANSWERED:
      return {
        ...state,
        players: {
          ...state.players, [action.payload.username]: action.payload.answer
            ? { ...state.players[action.payload.username], score: state.players[action.payload.username].score+1, currentAnswer: "right" }
            : { ...state.players[action.payload.username], currentAnswer: "wrong", lives: action.payload.lives }
        }
      }
    case RESET_PLAYERS:
      return {
        ...state,
        players: Object.keys(state.players).reduce((acc, player) => ({ ...acc, [player]: { ...state.players[player], score: state.players[player].score, lives: state.players[player].lives, currentAnswer: "pending" } }), {})
      }
    case LIFE_LOST:
      return {
        ...state,
        players: {
          ...state.players, [action.payload.username]: {
            ...state.players[action.payload.username],
            lives: --state.players[action.payload.username].lives
          }
        }
      }
    default:
      return state
  }
}