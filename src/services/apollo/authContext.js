import { setContext } from 'apollo-link-context'
import { checkTokenExpired } from '@/helpers/checkTokenExpired'
import { graphqlRequest } from '@/helpers/request'
import { getData } from '@/helpers/getData'
import newAccessTokenQuery from './newAccessTokenQuery'
import { authHeader } from '@/helpers/authHeader'
import store from '../store'
import { prop } from 'ramda'

const newAccessToken = (request) =>
  store
    .refreshToken()
    .then(refreshToken => graphqlRequest(newAccessTokenQuery, { refreshToken }))
    .then(getData('newAccessToken'))
    .then(prop('accessToken'))
    .then(accessToken => store.setAccessToken(accessToken))
    .then(accessToken => authHeader(request, accessToken))
    .catch(() => request)

export const withAuthToken = setContext((request) => {
  return store
    .accessToken()
    .then(accessToken => {
      if (accessToken && !checkTokenExpired(accessToken)) {
        return authHeader(request, accessToken)
      }

      return newAccessToken(request)
    })
    .catch(() => request)
})
