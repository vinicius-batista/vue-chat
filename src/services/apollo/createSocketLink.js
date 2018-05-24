import * as AbsintheSocket from '@absinthe/socket'
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link'
import { ApolloLink } from 'apollo-link'
import { Socket as PhoenixSocket } from 'phoenix'
import store from '../store'
import { equals, prop } from 'ramda'

const createPhoenixSocket = (url, accessToken) =>
  new PhoenixSocket(url, {
    reconnect: true,
    params: {
      Authorization: accessToken
    }
  })

const createAbsSocketLink = (phoenixSocket) => {
  const absintheSocket = AbsintheSocket.create(phoenixSocket)
  return createAbsintheSocketLink(absintheSocket)
}

const createBearerToken = (accessToken) => `Bearer ${accessToken}`

class SocketLink extends ApolloLink {
  constructor ({ url }) {
    super()
    this.url = url

    store
      .accessToken()
      .then(createBearerToken)
      .then(accessToken => {
        this.accessToken = accessToken
        this.socket = createPhoenixSocket(url, accessToken)
        this.link = createAbsSocketLink(this.socket)
      })
  }

  request (operation, forward) {
    const { authorization } = prop('headers', operation.getContext())
    if (equals(authorization, this.accessToken)) {
      return this.link.request(operation, forward)
    }

    this.accessToken = authorization
    this.socket.disconnect()
    this.socket = createPhoenixSocket(this.url, authorization)
    this.link = createAbsSocketLink(this.socket)

    return this.link.request(operation, forward)
  }
}

export const createSocketLink = (url) => new SocketLink({ url })
