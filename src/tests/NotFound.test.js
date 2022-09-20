import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Teste NotFound', () => {
  it(
    'Verifica se a mensagem "Page requested not found" é renderizada juntamente da img',
    () => {
      render(<NotFound />);
      const heading = screen.getByRole('heading', {
        name: 'Page requested not found',
        level: 2,
      });

      expect(heading).toBeInTheDocument();

      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    },
  );
});
