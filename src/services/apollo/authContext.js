import { setContext } from 'apollo-link-context'
import localforage from 'localforage'

let accessToken = null

const authHeader = (previousHeaders, token) => ({
  headers: {
    ...previousHeaders,
    authorization: `Bearer ${token}`
  }
})

export const withAuthToken = setContext(({ headers = {} }) => {
  if (accessToken) { return authHeader(headers, accessToken) }

  return localforage.getItem('accessToken')
    .then((token) => {
      accessToken = token
      return authHeader(headers, accessToken)
    })
})
