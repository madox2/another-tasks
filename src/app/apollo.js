import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'

import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist'

import { schema } from './schema'

const makeErrorLink = ({ showError }) =>
  onError((error) => {
    const { graphQLErrors, networkError } = error
    const handleError = (msg) => {
      console.error(msg)
      showError(msg)
    }
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        handleError(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )

    if (networkError) handleError(`[Network error]: ${networkError}`)
  })

const cache = new InMemoryCache()

persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
})

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
  },
  query: {
    fetchPolicy: 'network-only',
  },
}

export function makeApolloClient({ showError }) {
  const link = ApolloLink.from([
    makeErrorLink({ showError }),
    new SchemaLink({ schema }),
  ])
  return new ApolloClient({
    cache,
    link,
    defaultOptions,
  })
}
