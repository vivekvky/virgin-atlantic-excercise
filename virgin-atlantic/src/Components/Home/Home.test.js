import { render, screen } from '@testing-library/react';

import Home from './Home';


test('renders Home', () => {
  render(<Home/>);
  const linkElement = screen.getByText('Country');
  expect(linkElement).toBeInTheDocument();
});

