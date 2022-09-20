import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../pages/About';

describe('Teste About', () => {
  it('Verifica se o componente possui um heading com o texto "About Pokédex"', () => {
    render(<About />);
    const headerAbout = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(headerAbout).toBeInTheDocument();
  });

  it('Verifica se o componente possuiu dois paragrafos sobre a Pokedex', () => {
    render(<About />);
    const pokedexParagraph = screen.getAllByText(/Pokémons/i);
    expect(pokedexParagraph.length).toBe(2);
  });

  it('Verifica se o componente possui a imagem determianda', () => {
    render(<About />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
