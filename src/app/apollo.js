import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'

import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

import { schema } from './schema'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  if (networkError) console.error(`[Network error]: ${networkError}`)
})
const link = ApolloLink.from([errorLink, new SchemaLink({ schema })])

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})
