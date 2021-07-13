import { SET_DATA, CLOSE } from './actions'

const initialState = {
	data: null,
	type: ''
}

export const reducer = (state = initialState , action) => {
	switch (action.type) {
		case SET_DATA:
			return { type: action.payload.type, data: action.payload.data }
		case CLOSE:
			return { ...state, data: null }
		default:
			return state
		}
}
