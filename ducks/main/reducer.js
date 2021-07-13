import { combineReducers } from 'redux'

import {
	PAGE_NOT_FOUND, WELCOME, SET_USER,
	NEXT_MONTH, PREVIOUS_MONTH, NEXT_YEAR, PREVIOUS_YEAR,
	SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL,
	LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
	LOGOUT, NEW_MESSAGE, REMOVE_MESSAGE
} from './actions'

// only used in SSR to know if NotFoundPage is reached
const appStatus = (state = 200, action) => {
	switch (action.type) {
	case PAGE_NOT_FOUND:
		return 404
	default:
		return state
	}
}

const welcomeReducer = (state = { message: 'Test' }, action) => {
	switch (action.type) {
	case WELCOME:
		return {
			...state,
			message: action.payload
		}
	default:
		return state
	}
}

const notificationReducer = (state = { message: '' }, action) => {
	switch (action.type) {
		case NEW_MESSAGE:
			return {
				...state,
				message: action.payload.message,
				severity: action.payload.severity || 'success'
			}
		case REMOVE_MESSAGE:
			return {
				...state,
				message: '',
				severity: 'success'
			}
		default:
			return state
	}
}

const dateReducer = (state = (new Date()), action) => {
	switch (action.type) {
		case PREVIOUS_MONTH: {
			const date = new Date(state)
			const month = date.getMonth()
			if (month == 0) {
				date.setMonth(11)
				date.setFullYear(date.getFullYear()-1)
				return date
			}
			date.setMonth(date.getMonth()-1)
			return date
		}
		case NEXT_MONTH: {
			const date = new Date(state)
			const month = date.getMonth()
			if (month == 11) {
				date.setMonth(0)
				date.setFullYear(date.getFullYear()+1)
				return date
			}
			date.setMonth(date.getMonth()+1)
			return date
		}
		case PREVIOUS_YEAR: {
			const date = new Date(state)
			date.setFullYear(date.getFullYear()-1)
			return date
		}
		case NEXT_YEAR: {
			const date = new Date(state)
			date.setFullYear(date.getFullYear()+1)
			return date
		}
		default:
			return state
	}
}

const authReducer = (state = { username: null }, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				username: action.payload.username
			}
		case SIGNUP:
      return {
        ...state,
        signingUp: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
				signupError: null
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        signingUp: false,
        signupError: action.error
			}
			case LOGIN:
				return {
					...state,
					loginUp: true
				}
			case LOGIN_SUCCESS:
				return {
					...state,
					loginUp: false,
					username: action.result.username,
					loginError: null
				}
			case LOGIN_FAIL:
				return {
					...state,
					loginUp: false,
					username: null,
					loginError: action.error
				}
				case LOGOUT:
					localStorage.removeItem('user')
					return {
						...state,
						loggingOut: false,
						username: null,
						logoutError: null
					}
		default:
			return state
	}
}

export const reducer = combineReducers({
	status: appStatus,
	welcome: welcomeReducer,
	date: dateReducer,
	auth: authReducer,
	notification: notificationReducer
})
