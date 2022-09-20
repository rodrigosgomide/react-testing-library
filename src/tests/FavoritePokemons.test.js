import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste FavoritesPokemons', () => {
  it('Verifica se o texto "No favorite pokemon found" é exibido na tela', () => {
    render(<FavoritePokemons />);
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  it(
    'Verifica se ao adcionar um pokemon aos favoritos ele aparece na tela de favoritos',
    () => {
      renderWithRouter(<App />);
      const details = screen.getByText(/more details/i);
      userEvent.click(details);

      const favorite = screen.getByRole('checkbox', {
        checked: false,
      });
      userEvent.click(favorite);

      const favorites = screen.getByText('Favorite Pokémons');
      userEvent.click(favorites);

      const favoritesPokemons = screen.getAllByText(/more details/i);
      expect(favoritesPokemons.length).toBe(1);
    },
  );
});
