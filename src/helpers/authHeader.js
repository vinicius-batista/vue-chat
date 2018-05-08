import { assocPath, curry } from 'ramda'

export const authHeader = curry((request, token) => assocPath(
  ['headers', 'authorization'],
  `Bearer ${token}`,
  request
))
