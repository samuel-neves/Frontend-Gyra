import { gql } from '@apollo/client';

export const createMessageMutation = gql`
  mutation createMessage($author: String!, $room: String!, $text: String!) {
    createMessage(data: { text: $text, room: $room, author: $author }) {
      _id
      created_at
    }
  }
`;
