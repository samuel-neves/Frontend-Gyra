import React, { useEffect, useState } from 'react';
import { FiLogIn } from 'react-icons/fi';

import { useHistory, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import DefaultTemplate from '../../template/Default';
import Chat from './components/Chat';
import {
  getLocalStorageBoolean,
  removeLocalStorage,
} from '../../utils/localStorage';
import { Capitalize } from '../../utils/string';
import { Container, ExitButton } from './styles';
import { userExitedMutation } from '../../services/Graphql/Room/Mutations';

interface ParamsData {
  roomName: string;
}

const ChatRoom: React.FC = () => {
  const { push } = useHistory();
  const { roomName } = useParams<ParamsData>();
  const [loggedUser, setLoggedUser] = useState('');
  const [userExited] = useMutation(userExitedMutation);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const userName = getLocalStorageBoolean();
    if (!userName) {
      push('/');
      alert('Nome obrigatório para conversa. Informe seu nome novamente');
    } else {
      setLoggedUser(userName);
    }
  });

  const handleExitRoom = () => {
    userExited({
      variables: {
        author: loggedUser.toLowerCase(),
        name: roomName.toLowerCase(),
      },
    });

    removeLocalStorage();

    push('/');
  };

  return (
    <>
      <DefaultTemplate
        outside={
          <ExitButton type="button" onClick={handleExitRoom}>
            Sair
            <FiLogIn />
          </ExitButton>
        }
      >
        <Container>
          <h1>{Capitalize(roomName)}</h1>
          <Chat room={roomName} loggedUser={loggedUser} />
        </Container>
      </DefaultTemplate>
    </>
  );
};

export default ChatRoom;
