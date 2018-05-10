import store from '../services/store'

export const setTokens = ({ accessToken, refreshToken }) =>
  Promise.all([
    store.setAccessToken(accessToken),
    store.setRefreshToken(refreshToken)
  ])
