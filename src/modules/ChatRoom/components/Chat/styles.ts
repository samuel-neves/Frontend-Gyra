import styled from 'styled-components';

interface MessageContainerProps {
  fromLoggedUser: boolean;
}

export const Container = styled.div``;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow: auto;
`;

export const MessageContentContainer = styled.div<MessageContainerProps>`
  width: fit-content;
  max-width: 272px;
  text-align: ${({ fromLoggedUser }) => (fromLoggedUser ? 'right' : 'left')};
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #000000;
  border-radius: 8px;
  align-self: ${({ fromLoggedUser }) =>
    fromLoggedUser ? 'flex-end' : 'flex-start'};

  h3 {
    text-decoration: underline;
  }

  p {
    margin-top: 4px;
  }
`;

export const EmptyRoom = styled.div`
  width: 100%;
  border: 2px solid black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  text-align: center;

  p {
    margin-top: 8px;
  }
`;
