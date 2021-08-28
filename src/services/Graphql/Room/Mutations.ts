import { gql } from '@apollo/client';

export const userEnteredMutation = gql`
  mutation userEntered($author: String!, $name: String!) {
    userEntered(data: { name: $name, author: $author }) {
      _id
    }
  }
`;

export const userExitedMutation = gql`
  mutation userExited($author: String!, $name: String!) {
    userExited(data: { name: $name, author: $author }) {
      author
    }
  }
`;
