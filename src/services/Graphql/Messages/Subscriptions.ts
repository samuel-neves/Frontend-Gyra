import { gql } from '@apollo/client';

export const getMessagesSubscription = gql`
  subscription {
    messageCreated {
      _id
      author
      room
      text
      created_at
    }
  }
`;
