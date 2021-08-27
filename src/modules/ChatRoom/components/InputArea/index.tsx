import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import { createMessageMutation } from '../../../../services/Graphql/Messages/Mutations';
import { Container } from './styles';

const InputArea: React.FC = () => {
  const [messageValue, setMessageValue] = useState('');
  const [focused, setFocused] = React.useState(false);

  const [createMessage, { error: mutationError }] = useMutation(
    createMessageMutation,
  );

  const handleSendMessage = () => {
    console.log(messageValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (mutationError) {
      console.log(mutationError);
    }
  }, [mutationError]);

  return (
    <Container isFocused={focused}>
      <input
        type="text"
        value={messageValue}
        onChange={e => setMessageValue(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button type="submit" onClick={handleSendMessage}>
        Enviar
      </button>
    </Container>
  );
};

export default InputArea;
