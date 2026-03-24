import { useState, useMemo } from 'react';
import useCart from '../../hooks/useCart.js';
import './ProductActions.css';

export default function ProductActions({ product }) {
  const { handleAddToCart, loading, error, success } = useCart();

  const storageOptions = useMemo(() => product.internalMemory || [], [product.internalMemory]);
  const colorOptions = useMemo(() => product.colors || [], [product.colors]);

  // Auto-select first option by default (spec: if only one option, it must be pre-selected)
  const [selectedStorage, setSelectedStorage] = useState(
    () => storageOptions[0]?.code?.toString() || ''
  );
  const [selectedColor, setSelectedColor] = useState(
    () => colorOptions[0]?.code?.toString() || ''
  );

  const onAddToCart = () => {
    if (!selectedStorage || !selectedColor) return;

    handleAddToCart({
      id: product.id,
      colorCode: parseInt(selectedColor, 10),
      storageCode: parseInt(selectedStorage, 10),
    });
  };

  return (
    <div className="product-actions" id="product-actions">
      <h2 className="product-actions__title">Options</h2>

      {/* Storage Selector */}
      <div className="product-actions__field">
        <label htmlFor="storage-select" className="product-actions__label">
          Storage
        </label>
        <select
          id="storage-select"
          className="product-actions__select"
          value={selectedStorage}
          onChange={(e) => setSelectedStorage(e.target.value)}
        >
          {storageOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
          {storageOptions.length === 0 && (
            <option value="">No options available</option>
          )}
        </select>
      </div>

      {/* Color Selector */}
      <div className="product-actions__field">
        <label htmlFor="color-select" className="product-actions__label">
          Color
        </label>
        <select
          id="color-select"
          className="product-actions__select"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {colorOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
          {colorOptions.length === 0 && (
            <option value="">No options available</option>
          )}
        </select>
      </div>

      {/* Add to Cart Button */}
      <button
        className={`product-actions__btn ${success ? 'product-actions__btn--success' : ''}`}
        onClick={onAddToCart}
        disabled={loading || !selectedStorage || !selectedColor}
        id="add-to-cart-btn"
      >
        {loading && <span className="product-actions__spinner" />}
        {success ? '✓ Added!' : loading ? 'Adding...' : 'Add to Cart'}
      </button>

      {error && (
        <p className="product-actions__error" role="alert">{error}</p>
      )}
    </div>
  );
}
