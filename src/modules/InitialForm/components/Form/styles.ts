import styled from 'styled-components';
import { Form as FormComponent } from '@unform/web';

export const Container = styled(FormComponent)`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 8px;
  padding: 8px;
`;

export const Button = styled.button`
  width: 50%;
  margin-top: 16px;
  background-color: transparent;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #232129;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #232129;
    color: #fff;
  }
`;
