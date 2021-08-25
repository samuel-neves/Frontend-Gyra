import React from 'react';
import { render, screen } from '@testing-library/react';
import InitialForm from '../index';

test('renders app title', () => {
  render(<InitialForm />);
  const textElement = screen.getByText(/Mensagens/i);
  expect(textElement).toBeInTheDocument();
});
