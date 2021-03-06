import { addMessage } from './ducks/main'
import { setCurrentLobby, addLobby, addPlayer, answerQuestion, resetPlayers } from './ducks/lobby'
import { setLevel } from './ducks/game'
import config from './config'

const messageTypes = {
  GAME_STARTED: (data, dispatch) => {
    dispatch(addMessage("Game have started !"))
    dispatch(setLevel(data))
  },
  IN_PROGRESS: (data, dispatch) => {
    dispatch(addMessage("New question !"))
    dispatch(setLevel(data))
    dispatch(resetPlayers())
  },
  GAME_ENDED: (data, dispatch) => {
    dispatch(addMessage("End of game !"))
    dispatch(setLevel({ level: 0,  }))
  },
  LOBBY_CREATED: (data, dispatch) => {
    dispatch(addMessage(`Lobby ${data.lobby.id} created`))
    dispatch(setCurrentLobby(data.lobby.id))
    dispatch(addLobby(data.lobby))
    dispatch(addPlayer([data.lobby.owner]))
  },
  LOBBY_JOINED: (data, dispatch) => {
    dispatch(addMessage(`Joined lobby ${data.lobby.id}`))
    dispatch(setCurrentLobby(data.lobby.id))
    dispatch(addPlayer(data.players))
  },
  PLAYER_JOINED: (data, dispatch) => {
    dispatch(addMessage(`Player ${data.username} joined the lobby`))
    dispatch(addPlayer([data.username]))
  },
  GAME_STARTING: (data, dispatch) => {
    dispatch(addMessage("Game is starting soon !"))
  },
  PLAYER_ANSWERED: (data, dispatch) => {
    dispatch(answerQuestion(data))
  }
}

export let ws = null

const createWebsocket = (token, dispatch) => {
  document.cookie = `authorization=${token}`
  ws = new WebSocket(`ws://${config.apiUrl}:8081`)

  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data)
    if (msg.error) return dispatch(addMessage(msg.error, "error"))
    if (msg.type && messageTypes[msg.type]) return messageTypes[msg.type](msg, dispatch)
    dispatch(addMessage(`Joined lobby ${msg.id}`))
    dispatch(setCurrentLobby(msg.id))
  }

  return ws
}

export default createWebsocket