import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }): void => {
      alert(`API Error ${message}`);
      return;
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: 'http://localhost:3333' })]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default apolloClient;
