import { render, screen } from '@testing-library/react';

import Search from './Search';


test('renders Search', () => {
  render(<Search/>);
  const linkElement = screen.getByText(/Country/i);
  expect(linkElement).toBeInTheDocument();
});
