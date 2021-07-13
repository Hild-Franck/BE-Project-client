import { SET_DATA, CLOSE } from './actions'

export const setData = (type, data) => ({
	type: SET_DATA, payload: { type, data }
})

export const close = data => ({
	type: CLOSE, payload: data
})