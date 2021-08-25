import React from 'react';
import { render, screen } from '@testing-library/react';
import InitialForm from '../index';

test('renders learn react link', () => {
  render(<InitialForm />);
  const textElement = screen.getByText(/InitialForm page/i);
  expect(textElement).toBeInTheDocument();
});
