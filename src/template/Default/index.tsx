import React from 'react';

import { Container, ContentContainer, ChildrenContainer } from './styles';

interface TemplateProps {
  outside?: React.ReactNode;
}

const DefaultTemplate: React.FC<TemplateProps> = ({ children, outside }) => {
  return (
    <Container>
      <ContentContainer>
        <div>{outside}</div>
        <ChildrenContainer>{children}</ChildrenContainer>
      </ContentContainer>
    </Container>
  );
};

export default DefaultTemplate;
