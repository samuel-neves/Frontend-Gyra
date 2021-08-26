import { gql } from '@apollo/client';

export const createMessage = gql`
  mutation createMessage(
    $author: String!
    $roomName: String!
    $messageText: String!
  ) {
    createMessage(
      message_text: $messageText
      room_name: $roomName
      author: $author
    ) {
      created_at
    }
  }
`;
