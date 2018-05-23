import { ApolloClient } from 'apollo-client'
import { createHttpLink } from './createHttpLink'
import { createSocketLink } from './createSocketLink'
import { withAuthToken } from './authContext'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { hasSubscription } from '@jumpn/utils-graphql'

export const createApolloClient = ({ httpEndpoint, socketEndpoint }) => {
  const httpLink = createHttpLink(httpEndpoint)

  const httpAuthLink = ApolloLink.from([
    withAuthToken,
    httpLink
  ])

  const link = ApolloLink.split(
    operation => hasSubscription(operation.query),
    createSocketLink(socketEndpoint),
    httpAuthLink
  )

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache()
  })
}
