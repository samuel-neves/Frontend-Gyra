import { gql } from '@apollo/client';

export const getAllMessages = gql`
  query {
    messages {
      author
      room_name
      message_text
      created_at
    }
  }
`;
