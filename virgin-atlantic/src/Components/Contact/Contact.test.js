import { render, screen } from '@testing-library/react';

import Contact from './Contact';


test('renders Contact', () => {
  render(<Contact/>);
  const linkElement = screen.getByText(/Contact Virgin Atlantic/i);
  expect(linkElement).toBeInTheDocument();
});
