const endpoint = process.env.VUE_APP_GRAPHQL_ENDPOINT || 'http://0.0.0.0:4000/graphql'

export const graphqlRequest = (query, variables) =>
  fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables }),
    method: 'POST'
  })
    .then(response => response.json())
