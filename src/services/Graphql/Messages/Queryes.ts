import { gql } from '@apollo/client';

export const getMessagesQuery = gql`
  query {
    messages {
      _id
      author
      room
      text
      created_at
    }
  }
`;

export const getMessagesByRoomQuery = gql`
  query messagesByRoom($room: String!) {
    messagesByRoom(room: $room) {
      _id
      author
      room
      text
      created_at
    }
  }
`;
