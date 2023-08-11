import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
test('renders App jumbotron', () => {
  render(<App />);
  // const linkElement = screen.getByTestId(/learn react/i);
  const linkElement = screen.getByTestId(/jumbotron/i);
  expect(linkElement).toBeInTheDocument();
});
