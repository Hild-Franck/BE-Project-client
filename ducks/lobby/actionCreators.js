import {
	GET_ALL_LOBBIES, GET_ALL_LOBBIES_SUCCESS, GET_ALL_LOBBIES_FAIL,
  SET_CURRENT_LOBBY, ADD_LOBBY, ADD_PLAYER, QUESTION_ANSWERED, RESET_PLAYERS
} from './actions'

export const getAllLobbies = () => ({
  types: [ GET_ALL_LOBBIES, GET_ALL_LOBBIES_SUCCESS, GET_ALL_LOBBIES_FAIL ],
  promise: client => client.get("/lobby/getall")
})

export const setCurrentLobby = id => ({
  type: SET_CURRENT_LOBBY,
  payload: id
})

export const addLobby = lobby => ({
  type: ADD_LOBBY,
  payload: lobby
})

export const addPlayer = username => ({
  type: ADD_PLAYER,
  payload: username
})

export const answerQuestion = data => ({
  type: QUESTION_ANSWERED,
  payload: data
})

export const resetPlayers = () => ({
  type: RESET_PLAYERS
})