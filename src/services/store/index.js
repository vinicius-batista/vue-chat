import localforage from 'localforage'

export default {
  state: {
    accessToken: null
  },
  setAccessToken (accessToken) {
    this.state = { ...this.state, accessToken }
  },
  accessToken () {
    if (this.state.accessToken) {
      return Promise.resolve(this.state.accessToken)
    }

    return localforage.getItem('accessToken')
      .then(accessToken => {
        this.setAccessToken(accessToken)
        return accessToken
      })
  },
  isLogged () {
    return this.accessToken()
      .then(accessToken => {
        if (accessToken) {
          return accessToken
        }

        return Promise.reject(new Error('NO_TOKEN'))
      })
  }
}
