import { render, screen } from '@testing-library/react';
import { Index } from 'stock';

describe('Index', () => {
  test('Check for the required elements', () => {
    render(<Index />);
    expect(screen.getByTestId('header-nav')).toBeInTheDocument();
    expect(screen.queryByTestId('input-element')).toBeInTheDocument();
    expect(screen.queryByTestId('submit-button')).toBeInTheDocument();
  });
});
