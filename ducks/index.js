import { reducer as mainReducer } from './main'
import { reducer as modalReducer } from './modal'
import { reducer as lobbyReducer } from './lobby'
import { reducer as gameReducer } from './game'

export const reducers = {
  main: mainReducer,
  modal: modalReducer,
  lobby: lobbyReducer,
  game: gameReducer,
}