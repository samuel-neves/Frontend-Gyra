import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';

import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }): void => {
      alert(`API Error ${message}`);
      return;
    });
  }
});

const httpLink = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:4000/graphql' }),
]);

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
