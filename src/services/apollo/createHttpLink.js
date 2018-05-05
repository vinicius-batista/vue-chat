import { HttpLink } from 'apollo-link-http'

export const createHttpLink = (uri) => new HttpLink({ uri })
