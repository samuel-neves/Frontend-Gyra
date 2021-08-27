import React, { useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';

import { getMessagesByRoomQuery } from '../../../../services/Graphql/Messages/Queryes';
import { getMessagesSubscription } from '../../../../services/Graphql/Messages/Subscriptions';
import { Capitalize } from '../../../../utils/string';
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
  const { data: newData, loading: newLoading } = useSubscription(
    getMessagesSubscription,
  );
  const {
    error: queryError,
    loading,
    data: queryData,
  } = useQuery(getMessagesByRoomQuery, {
    variables: {
      room,
    },
  });

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (newData !== undefined) {
      if (newData.messageCreated.room === room) {
        const formattedData: Message = {
          _id: newData.messageCreated._id,
          author: newData.messageCreated.author,
          created_at: newData.messageCreated.created_at,
          room: newData.messageCreated.room,
          text: newData.messageCreated.text,
        };
        setMessages([...messages, formattedData]);
      }
    }
  }, [newData]);

  useEffect(() => {
    if (queryData !== undefined) {
      const formattedData: Message[] = queryData.messagesByRoom.map(
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
  }, [queryData]);

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
              <h3>{Capitalize(message.author)}</h3>
              <p>{message.text}</p>
            </MessageContentContainer>
          ))}
        {!loading && messages.length === 0 && (
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
