import { setContext } from 'apollo-link-context'
import localforage from 'localforage'
import { checkTokenExpired } from '@/helpers/checkTokenExpired'
import { graphqlRequest } from '@/helpers/request'
import { getData } from '@/helpers/getData'
import newAccessTokenQuery from './newAccessTokenQuery'
import { authHeader } from '@/helpers/authHeader'

let accessToken = null

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
