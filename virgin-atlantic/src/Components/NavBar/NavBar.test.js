import { render, screen, fireEvent } from '@testing-library/react';

import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe('RouteNotFound', () => {
    test('renders NavBar', () => {
        render(<NavBar />);
        const linkElement = screen.getByText(/Virgin Atlantic/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('Redirects to correct URL on click of Virgin Atlantic', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>,
        );
        fireEvent.click( screen.getByText(/Virgin Atlantic/i));
        expect(mockHistoryPush).toHaveBeenCalledWith('./home');
    });
    test('Redirects to correct URL on click of About us', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>,
        );
        fireEvent.click( screen.getByText(/About Us/i));
        expect(mockHistoryPush).toHaveBeenCalledWith('./about');
    });
    test('Redirects to correct URL on click of Contact us', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>,
        );
        fireEvent.click( screen.getByText(/Contact/i));
        expect(mockHistoryPush).toHaveBeenCalledWith('./contact');
    });
});
