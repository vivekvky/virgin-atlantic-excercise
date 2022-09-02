import { render, screen } from '@testing-library/react';

import About from './About';


test('renders about', () => {
  render(<About/>);
  const linkElement = screen.getByText(/About Virgin Atlantic/i);
  expect(linkElement).toBeInTheDocument();
});
