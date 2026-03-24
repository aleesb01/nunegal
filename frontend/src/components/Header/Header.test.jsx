import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext.jsx';
import Header from './Header.jsx';

const renderWithProviders = (ui) => {
  return render(
    <CartProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </CartProvider>
  );
};

describe('Header', () => {
  it('should render the logo text', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('MobileStore')).toBeInTheDocument();
  });

  it('should have a link to the homepage', () => {
    renderWithProviders(<Header />);
    const logoLink = screen.getByLabelText('Go to homepage');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should render the cart indicator', () => {
    renderWithProviders(<Header />);
    const cart = screen.getByLabelText(/Cart:/);
    expect(cart).toBeInTheDocument();
  });

  it('should show breadcrumbs', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
