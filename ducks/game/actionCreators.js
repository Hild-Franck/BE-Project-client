import {
  SET_LEVEL, SET_PAUSE
} from './actions'

export const setLevel = data => ({
  type: SET_LEVEL,
  payload: data
})

export const setPause = data => ({
  type: SET_PAUSE,
  payload: data
})