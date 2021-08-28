import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiUser, FiMessageSquare } from 'react-icons/fi';
import { useMutation } from '@apollo/client';

import Input from '../Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { setLocalStorage } from '../../../../utils/localStorage';
import { userEnteredMutation } from '../../../../services/Graphql/Room/Mutations';
import { Trim } from '../../../../utils/string';

import { Container, Button } from './styles';

interface FormData {
  name: string;
  room: string;
}

const Form: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [userEntered] = useMutation(userEnteredMutation);

  const handleSubmitForm = async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome de usuário obrigatório'),
        room: Yup.string().required('Nome da sala obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, room } = data;

      setLocalStorage(Trim(name.toLowerCase()));

      userEntered({
        variables: {
          author: name.toLowerCase(),
          name: room.toLowerCase(),
        },
      });

      history.push(`/chats/${Trim(room.toLowerCase())}`);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  };

  return (
    <Container ref={formRef} onSubmit={handleSubmitForm}>
      <Input name="name" icon={FiUser} placeholder="Seu nome" />
      <Input name="room" icon={FiMessageSquare} placeholder="Nome da sala" />

      <Button type="submit">Entrar</Button>
    </Container>
  );
};

export default Form;
