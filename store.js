import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import {createWrapper, HYDRATE} from 'next-redux-wrapper'

import clientMiddleware from './middleware/client'
import { reducers } from './ducks'

const reducer = (state = {tick: 'init'}, action) => {
  switch (action.type) {
      case HYDRATE:
          return {...state, ...action.payload};
      case 'TICK':
          return {...state, tick: action.payload};
      default:
          return state
  }
}

export const makeStore = context => createStore(
  combineReducers({ ...reducers, form: formReducer, reducer }),
  {},
  composeWithDevTools(applyMiddleware(thunkMiddleware, clientMiddleware()))
)

export const wrapper = createWrapper(makeStore, {debug: true})