import { render, screen } from '@testing-library/react';

import StarComponent from './StarComponent';


test('renders StarComponent', () => {
  render(<StarComponent/>);
  const linkElement = screen.getByTestId('st');
  expect(linkElement).toBeInTheDocument();
});
