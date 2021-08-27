import styled from 'styled-components';

interface InputAreaProps {
  isFocused: boolean;
}

export const Container = styled.div<InputAreaProps>`
  display: grid;
  grid-template-columns: 75% 25%;
  margin: 8px 0;

  input {
    border: 1px solid;
    border-color: ${({ isFocused }) => (isFocused ? '#ff9000' : '#000000')};
    border-radius: 4px;
    padding: 4px;
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: #ff9000;
    }
  }

  button {
    background-color: transparent;
    border: 1px solid;
    border-color: ${({ isFocused }) => (isFocused ? '#ff9000' : '#000000')};
    border-radius: 4px;
    margin-left: 8px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #ff9000;
      border-color: transparent;
      color: #ffffff;
    }
  }
`;
