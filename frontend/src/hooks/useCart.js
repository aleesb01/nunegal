import { useState, useCallback } from 'react';
import { addToCart } from '../api/apiService.js';
import { useCartContext } from '../context/CartContext.jsx';

/**
 * Custom hook for adding products to cart.
 * @returns {{ handleAddToCart: Function, loading: boolean, error: string|null, success: boolean }}
 */
export default function useCart() {
  const { setCartCount } = useCartContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddToCart = useCallback(async ({ id, colorCode, storageCode }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await addToCart({ id, colorCode, storageCode });
      setCartCount(result.count);
      setSuccess(true);

      // Reset success after 2 seconds
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err.message || 'Error adding to cart');
    } finally {
      setLoading(false);
    }
  }, [setCartCount]);

  return { handleAddToCart, loading, error, success };
}
