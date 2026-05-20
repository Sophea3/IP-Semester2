import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client/core'

import { GraphQLWsLink } from '@apollo/client/link/subscriptions'

import { createClient } from 'graphql-ws'

import { getMainDefinition } from '@apollo/client/utilities'

// =========================
// HTTP LINK
// =========================
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HASURA_HTTP,

  headers: {
    'x-hasura-role': import.meta.env.VITE_HASURA_ROLE,

    // IMPORTANT
    'x-hasura-admin-secret':
      import.meta.env.VITE_HASURA_ADMIN_SECRET,
  },
})

// =========================
// WEBSOCKET LINK
// =========================
const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_HASURA_WS,

    connectionParams: async () => ({
      headers: {
        'x-hasura-role':
          import.meta.env.VITE_HASURA_ROLE,

        // IMPORTANT
        'x-hasura-admin-secret':
          import.meta.env.VITE_HASURA_ADMIN_SECRET,
      },
    }),
  }),
)

// =========================
// SPLIT LINK
// =========================
const link = split(
  ({ query }) => {
    const def = getMainDefinition(query)

    return (
      def.kind === 'OperationDefinition' &&
      def.operation === 'subscription'
    )
  },

  wsLink,
  httpLink,
)

// =========================
// APOLLO CLIENT
// =========================
export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})