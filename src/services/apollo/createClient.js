import { ApolloClient } from 'apollo-client'
import { createHttpLink } from './createHttpLink'
import { withAuthToken } from './authContext'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const createApolloClient = ({ httpEndpoint }) => {
  const httpLink = createHttpLink(httpEndpoint)

  const link = ApolloLink.from([
    withAuthToken,
    httpLink
  ])

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache()
  })
}
