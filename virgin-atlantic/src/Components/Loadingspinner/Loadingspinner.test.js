import { render, screen } from '@testing-library/react';

import LoadingSpinner from './Loadingspinner';


test('renders Loadingspinner', () => {
  render(<LoadingSpinner/>);
  const linkElement = screen.getByTestId('spinner');
  expect(linkElement).toBeInTheDocument();
});
