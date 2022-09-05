import { render, screen,fireEvent } from '@testing-library/react';

import Search from './Search';


test('renders Search', () => {
  render(<Search/>);
  const linkElement = screen.getByText(/Country/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders submit', () => {
  render(<Search/>);
  const linkElement =screen.getByText(/Submit/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders dropdown', () => {
  render(<Search/>);
  const linkElement = screen.getByTestId('country');
  expect(linkElement).toBeInTheDocument();
});

test('renders date field', () => {
  render(<Search/>);
  const linkElement = screen.getByTestId('start');
  expect(linkElement).toBeInTheDocument();
});
