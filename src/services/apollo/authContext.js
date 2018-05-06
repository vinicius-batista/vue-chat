import { setContext } from 'apollo-link-context'
import localforage from 'localforage'
import { assocPath, pipe, prop } from 'ramda'
import jwtdecode from 'jwt-decode'
import { isExpired } from '@/helpers/isExpired'
import { graphqlRequest } from '@/helpers/request'
import { getData } from '@/helpers/getData'

const newAccessTokenQuery = `
query ($refreshToken:String!) {
  newAccessToken(refreshToken:$refreshToken) {
    accessToken
  }
}`

let accessToken = null

const authHeader = (request, token) => assocPath(
  ['headers', 'authorization'],
  `Bearer ${token}`,
  request
)

const checkTokenExpired = pipe(
  jwtdecode,
  prop('exp'),
  isExpired
)

const newAccessToken = (request) =>
  localforage.getItem('refreshToken')
    .then(refreshToken =>
      graphqlRequest(newAccessTokenQuery, { refreshToken })
    )
    .then(getData('newAccessToken'))
    .then(data => {
      accessToken = data.accessToken
      return authHeader(request, data.accessToken)
    })
    .catch(() => request)

export const withAuthToken = setContext((request) => {
  if (!accessToken) {
    return localforage.getItem('accessToken')
      .then((token) => {
        if (!checkTokenExpired(token)) {
          accessToken = token
          return authHeader(request, accessToken)
        }

        return newAccessToken(request)
      })
  }

  if (accessToken && !checkTokenExpired(accessToken)) {
    return authHeader(request, accessToken)
  }

  return newAccessToken(request)
})
