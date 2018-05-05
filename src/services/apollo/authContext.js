import { setContext } from 'apollo-link-context'
import localforage from 'localforage'
import { assocPath } from 'ramda'

let accessToken = null

const authHeader = (request, token) => assocPath(
  ['headers', 'authorization'],
  `Bearer ${token}`,
  request
)

export const withAuthToken = setContext((request) => {
  if (accessToken) { return authHeader(request, accessToken) }

  return localforage.getItem('accessToken')
    .then((token) => {
      accessToken = token
      return authHeader(request, accessToken)
    })
})
