import React, { useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';

import { getMessagesByRoomQuery } from '../../../../services/Graphql/Messages/Queryes';
import { getMessagesSubscription } from '../../../../services/Graphql/Messages/Subscriptions';
import {
  getUserEnteredSubscription,
  getUserExitedSubscription,
} from '../../../../services/Graphql/Room/Subscriptions';
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
  const { data: newMessage } = useSubscription(getMessagesSubscription);
  const { data: userEntered } = useSubscription(getUserEnteredSubscription);
  const { data: userExited } = useSubscription(getUserExitedSubscription);
  const { loading, data: queryData } = useQuery(getMessagesByRoomQuery, {
    variables: {
      room,
    },
  });

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (newMessage !== undefined) {
      if (newMessage.messageCreated.room === room) {
        const formattedData: Message = {
          _id: newMessage.messageCreated._id,
          author: newMessage.messageCreated.author,
          created_at: newMessage.messageCreated.created_at,
          room: newMessage.messageCreated.room,
          text: newMessage.messageCreated.text,
        };
        setMessages([...messages, formattedData]);
      }
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

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
    if (userEntered !== undefined) {
      if (
        userEntered.userEnteredSubscription.name === room &&
        userEntered.userEnteredSubscription.author !== loggedUser
      ) {
        alert(
          `Usuário ${userEntered.userEnteredSubscription.author} entrou na conversa`,
        );
      }
    }
    return;
  }, [userEntered, loggedUser, room]);

  useEffect(() => {
    if (userExited !== undefined) {
      if (
        userExited.userExitedSubscription.name === room &&
        userExited.userExitedSubscription.author !== loggedUser
      ) {
        alert(
          `Usuário ${userExited.userExitedSubscription.author} saiu da conversa`,
        );
      }
    }
    return;
  }, [userExited, loggedUser, room]);

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
