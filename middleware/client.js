import apiClient from '../apiClient'
import { addMessage } from '../ducks/main'

const errors = {
  "notoken": "Unauthorized: Not authenticated"
}

const getError = error =>
  errors[error.response.body.error.id] || error.response.body.message

export default function clientMiddleware() {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }

      const { promise, types, initialData, ...rest } = action // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action)
      }
      
      const [REQUEST, SUCCESS, FAILURE] = types
      next({...rest, type: REQUEST})

      const actionPromise = promise(apiClient)
      actionPromise.then(
        result => {
          result.body.message
            && dispatch(addMessage(result.body.message, "success"))
          return next({...rest, result: result.body, type: SUCCESS, initialData})
        },
        error => {
          dispatch(addMessage(getError(error), "error"))
          return next({...rest, error: error.response.body, type: FAILURE})
        }
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error)
        next({...rest, error, type: FAILURE})
      })

      return actionPromise
    }
  }
}
