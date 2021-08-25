import React from 'react';

import { Container, ChildrenContainer } from './styles';

const DefaultTemplate: React.FC = ({ children }) => {
  return (
    <Container>
      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  );
};

export default DefaultTemplate;
