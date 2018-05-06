import localforage from 'localforage'

export default {
  state: {
    accessToken: null,
    refreshToken: null
  },
  setAccessToken (accessToken) {
    this.state = { ...this.state, accessToken }
    return localforage
      .setItem('accessToken', accessToken)
      .then(() => accessToken)
  },
  setRefreshToken (refreshToken) {
    this.state = { ...this.state, refreshToken }
    return localforage
      .setItem('refreshToken', refreshToken)
      .then(() => refreshToken)
  },
  accessToken () {
    if (this.state.accessToken) {
      return Promise.resolve(this.state.accessToken)
    }

    return localforage
      .getItem('accessToken')
      .then((accessToken) => this.setAccessToken(accessToken))
  },
  refreshToken () {
    if (this.state.refreshToken) {
      return Promise.resolve(this.state.refreshToken)
    }

    return localforage
      .getItem('refreshToken')
      .then((refreshToken) => this.setRefreshToken(refreshToken))
  },
  isLogged () {
    return this
      .refreshToken()
      .then(refreshToken => {
        if (refreshToken) {
          return refreshToken
        }

        return Promise.reject(new Error('NO_TOKEN'))
      })
  }
}
