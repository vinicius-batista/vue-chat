import { assocPath } from 'ramda'

export const authHeader = (request, token) => assocPath(
  ['headers', 'authorization'],
  `Bearer ${token}`,
  request
)
