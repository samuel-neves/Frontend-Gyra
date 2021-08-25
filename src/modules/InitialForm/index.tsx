import React from 'react';

import DefaultTemplate from '../../template/Default';
import Form from './components/Form';

import { Container } from './styles';

const InitialForm: React.FC = () => {
  return (
    <DefaultTemplate>
      <Container>
        <h1>Mensagens</h1>
        <Form />
      </Container>
    </DefaultTemplate>
  );
};

export default InitialForm;
