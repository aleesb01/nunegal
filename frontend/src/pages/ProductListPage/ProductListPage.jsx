import { useState, useMemo } from 'react';
import useProducts from '../../hooks/useProducts.js';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import './ProductListPage.css';

export default function ProductListPage() {
  const { products, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by brand or model (case-insensitive, real-time)
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase().trim();
    return products.filter(
      (product) =>
        (product.brand && product.brand.toLowerCase().includes(query)) ||
        (product.model && product.model.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);

  if (error) {
    return (
      <div className="container">
        <div className="plp__error">
          <h2>Error loading products</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="plp">
        <div className="plp__header animate-fade-in">
          <h1 className="plp__title">Explore Our Devices</h1>
          <p className="plp__subtitle">
            Find the perfect mobile phone for you
          </p>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {loading ? (
          <div className="plp__grid" id="product-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="plp__skeleton">
                <div className="skeleton plp__skeleton-image" />
                <div className="plp__skeleton-info">
                  <div className="skeleton plp__skeleton-brand" />
                  <div className="skeleton plp__skeleton-model" />
                  <div className="skeleton plp__skeleton-price" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="plp__empty">
            <p className="plp__empty-text">
              {searchQuery
                ? `No products matching "${searchQuery}"`
                : 'No products available'}
            </p>
          </div>
        ) : (
          <>
            <p className="plp__count">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
            <div className="plp__grid" id="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
