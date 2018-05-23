import * as AbsintheSocket from '@absinthe/socket'
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link'
import { ApolloLink } from 'apollo-link'
import { Socket as PhoenixSocket } from 'phoenix'
import store from '../store'

const createPhoenixSocket = (url) =>
  store
    .accessToken()
    .then(accessToken =>
      new PhoenixSocket(url, {
        reconnect: true,
        params: {
          Authorization: `Bearer ${accessToken}`
        }
      }))

const createAbsSocketLink = (phoenixSocket) => {
  const absintheSocket = AbsintheSocket.create(phoenixSocket)
  return createAbsintheSocketLink(absintheSocket)
}

class SocketLink extends ApolloLink {
  constructor ({ url }) {
    super()
    createPhoenixSocket(url)
      .then(phoenixSocket => {
        this.socket = phoenixSocket
        this.link = createAbsSocketLink(phoenixSocket)
      })
  }

  request (operation, forward) {
    return this.link.request(operation, forward)
  }
}

export const createSocketLink = (url) => new SocketLink({ url })
