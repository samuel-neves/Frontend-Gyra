import { gql } from '@apollo/client';

export const getUserEnteredSubscription = gql`
  subscription {
    userEnteredSubscription {
      author
      name
    }
  }
`;

export const getUserExitedSubscription = gql`
  subscription {
    userExitedSubscription {
      author
      name
    }
  }
`;
