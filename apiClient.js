import superagent from 'superagent'

import config from './config'

const methods = ['get', 'post', 'delete']

const apiMethod = method => (path, data) =>
  superagent[method](`${config.apiUrl}${path}`, data).withCredentials()

const apiClient = {}

methods.forEach(method => apiClient[method] = apiMethod(method))

export default apiClient