import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';

const mockProduct = {
  id: '0001',
  brand: 'Apple',
  model: 'iPhone 15 Pro',
  price: '1199',
  imgUrl: 'https://example.com/phone.png',
};

describe('ProductCard', () => {
  it('should render product brand and model', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
  });

  it('should render product price', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText('1199 €')).toBeInTheDocument();
  });

  it('should render product image', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    const img = screen.getByAltText('Apple iPhone 15 Pro');
    expect(img).toHaveAttribute('src', 'https://example.com/phone.png');
  });

  it('should link to the product detail page', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/0001');
  });

  it('should handle missing price gracefully', () => {
    const noPrice = { ...mockProduct, price: '' };
    render(
      <MemoryRouter>
        <ProductCard product={noPrice} />
      </MemoryRouter>
    );
    expect(screen.getByText('Price unavailable')).toBeInTheDocument();
  });
});
