import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { getMessagesByRoomQuery } from '../../../../services/Graphql/Messages/Queryes';
import InputArea from './InputArea';
import {
  Container,
  MessageContainer,
  MessageContentContainer,
  EmptyRoom,
} from './styles';

interface Message {
  _id: string;
  author: string;
  room: string;
  text: string;
  created_at: Date;
}

interface ChatProps {
  loggedUser: string;
  room: string;
}

const InitialForm: React.FC<ChatProps> = ({ room, loggedUser = '' }) => {
  const {
    error: queryError,
    loading,
    data,
  } = useQuery(getMessagesByRoomQuery, {
    variables: {
      room,
    },
  });

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (data !== undefined) {
      const formattedData: Message[] = data.messagesByRoom.map(
        (item: Message) => ({
          _id: item._id,
          author: item.author,
          created_at: item.created_at,
          room: item.room,
          text: item.text,
        }),
      );
      setMessages([...formattedData]);
    }
  }, [data]);

  useEffect(() => {
    if (queryError) {
      console.log(queryError);
    }
  }, [queryError]);

  return (
    <Container>
      <MessageContainer>
        {!loading &&
          messages.map(message => (
            <MessageContentContainer
              key={message._id}
              fromLoggedUser={
                message.author.toLowerCase() === loggedUser.toLowerCase()
              }
            >
              <h3>{message.author}</h3>
              <p>{message.text}</p>
            </MessageContentContainer>
          ))}
        {messages.length === 0 && (
          <EmptyRoom>
            <h2>Parece que essa sala não possui mensagens.</h2>
            <p>Seja o primeiro a enviar algo</p>
          </EmptyRoom>
        )}
      </MessageContainer>
      <InputArea room={room} loggedUser={loggedUser} />
    </Container>
  );
};

export default InitialForm;
