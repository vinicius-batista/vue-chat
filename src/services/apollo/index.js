import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from './createClient'

Vue.use(VueApollo)

const options = {
  httpEndpoint: process.env.VUE_APP_GRAPHQL_ENDPOINT || 'http://0.0.0.0:4000/graphql'
}

export const apolloProvider = new VueApollo({
  defaultClient: createApolloClient(options)
})
