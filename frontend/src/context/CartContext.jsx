import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CART_STORAGE_KEY = 'itx_cart_count';

const CartContext = createContext({
  cartCount: 0,
  setCartCount: () => {},
});

/**
 * CartProvider persists the cart count across page reloads
 * using localStorage, and exposes it via React Context.
 */
export function CartProvider({ children }) {
  const [cartCount, setCartCountState] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  const setCartCount = useCallback((count) => {
    setCartCountState(count);
    try {
      localStorage.setItem(CART_STORAGE_KEY, String(count));
    } catch {
      // Fail silently
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, String(cartCount));
    } catch {
      // Fail silently
    }
  }, [cartCount]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook to access the cart context.
 * @returns {{ cartCount: number, setCartCount: (count: number) => void }}
 */
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
