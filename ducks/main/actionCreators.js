import {
	PAGE_NOT_FOUND, WELCOME, SET_USER,
	NEXT_MONTH, PREVIOUS_MONTH, NEXT_YEAR, PREVIOUS_YEAR,
	SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL,
	LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
	LOGOUT, NEW_MESSAGE, REMOVE_MESSAGE
} from './actions'

export const pageNotFound = () => ({
	type: PAGE_NOT_FOUND
})

export function sayWelcome(message) {
	return {
		type: WELCOME,
		payload: message
	}
}

export function nextMonth() {
	return {
		type: NEXT_MONTH
	}
}

export function previousMonth() {
	return {
		type: PREVIOUS_MONTH
	}
}

export function nextYear() {
	return {
		type: NEXT_YEAR
	}
}

export function previousYear() {
	return {
		type: PREVIOUS_YEAR
	}
}

export function addMessage(message, severity) {
	return {
		type: NEW_MESSAGE,
		payload: { message, severity }
	}
}

export function removeMessage() {
	return {
		type: REMOVE_MESSAGE,
		payload: ''
	}
}

export function setUser(username) {
	return {
		type: SET_USER,
		payload: { username }
	}
}

export function signup(data) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: client => client.post('/auth/signup', { ...data })
  }
}

export function login(data) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client => client.post('/auth/login', { ...data })
  }
}

export function logout() {
  return {
    type: LOGOUT,
    payload: { username: null }
  }
}