import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste App', () => {
  it('Verifica o link Home', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const linkHome = links[0];

    expect(linkHome).toHaveTextContent('Home');
    userEvent.click(linkHome);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('Verifica o link About', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const linkAbout = links[1];

    expect(linkAbout).toHaveTextContent('About');
    userEvent.click(linkAbout);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('Verifica o link Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const linkFavorite = links[2];

    expect(linkFavorite).toHaveTextContent('Favorite Pokémons');
    userEvent.click(linkFavorite);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('Verifica a pargina Not Found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/page-not-found');
    });

    const notFoundTitle = screen.getByRole('heading', {
      name: 'Page requested not found',
      level: 2,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });
});
