import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon:', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');
    const moreDetails = screen.getByText('More details');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');

    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');

    const favorite = screen.getByRole('checkbox', {
      checked: false,
    });
    userEvent.click(favorite);

    const favoriteImg = screen.getAllByRole('img');
    expect(favoriteImg[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImg[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
