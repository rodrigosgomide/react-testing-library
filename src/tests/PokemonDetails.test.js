import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste PokemonDetails', () => {
  it('', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);

    const pokemonDetails = screen.getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });
    const moreDetailsCheck = screen.queryByText('More details');

    expect(pokemonDetails).toBeInTheDocument();
    expect(moreDetailsCheck).toBe(null);

    const summary = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    const summaryParagraph = screen.getAllByText(/This intelligent Pokémon/i);

    expect(summary).toBeInTheDocument();
    expect(summaryParagraph.length).toBe(1);

    const locationHeading = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    let images = screen.getAllByRole('img');
    const location1 = screen.getByText('Kanto Viridian Forest');
    const location2 = screen.getByText('Kanto Power Plant');

    expect(locationHeading).toBeInTheDocument();
    expect(images[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(location1).toBeInTheDocument();
    expect(images[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[2]).toHaveAttribute('alt', 'Pikachu location');
    expect(location2).toBeInTheDocument();

    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    images = screen.getAllByRole('img');
    const isFavorite = 4;
    expect(images.length).toBe(isFavorite);

    userEvent.click(favorite);
    images = screen.getAllByRole('img');
    const isNotFavorite = 3;

    expect(images.length).toBe(isNotFavorite);

    const labelFavorite = screen.getByText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
  });
});
