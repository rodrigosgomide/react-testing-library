import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste Pokedex', () => {
  it('Verifica se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo pokémon da lista quando o botão é clicado:', () => {
    renderWithRouter(<App />);

    const button = screen.getByTestId('next-pokemon');
    expect(button).toBeInTheDocument();

    const pokemon = screen.getByRole('img');
    expect(pokemon.alt).toBe('Pikachu sprite');

    userEvent.click(button);
    expect(pokemon.alt).toBe('Charmander sprite');

    const pokemons = screen.getAllByRole('img');
    expect(pokemons.length).toBe(1);
  });

  it('Deve existir um botão de filtragem para cada tipo de pokémon', () => {
    renderWithRouter(<App />);
    const BUTTONS_NUMBER = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');

    expect(buttons.length).toBe(BUTTONS_NUMBER);
  });

  it('A Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });

    const buttonFilter = screen.getByRole('button', {
      name: 'Fire',
    });
    userEvent.click(buttonFilter);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(buttonAll).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Fire');

    const buttonNext = screen.getByTestId('next-pokemon');
    userEvent.click(buttonNext);

    expect(buttonAll).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Fire');

    userEvent.click(buttonAll);

    expect(pokemonType).toHaveTextContent('Electric');

    userEvent.click(buttonNext);

    expect(pokemonType).toHaveTextContent('Fire');
  });
});
