import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';

import apolloClient from './services/Graphql';

import GlobalStyle from './styles/GlobalStyle';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <GlobalStyle />
        <Routes />
      </Router>
    </ApolloProvider>
  );
};

export default App;
