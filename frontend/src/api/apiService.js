import { getCache, setCache } from '../utils/cache.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Generic fetch wrapper with caching support.
 * @param {string} endpoint - API path (e.g., '/api/product')
 * @param {Object} options - Fetch options
 * @param {string|null} cacheKey - Cache key (null = no caching)
 * @returns {Promise<*>} Parsed JSON response
 */
const fetchWithCache = async (endpoint, options = {}, cacheKey = null) => {
  // Check cache first
  if (cacheKey) {
    const cached = getCache(cacheKey);
    if (cached) return cached;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Store in cache if cacheKey provided
  if (cacheKey) {
    setCache(cacheKey, data);
  }

  return data;
};

/**
 * Get all products.
 * @returns {Promise<Array>} List of products
 */
export const getProducts = () => {
  return fetchWithCache('/api/product', {}, 'itx_cache_products');
};

/**
 * Get a single product by ID.
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product details
 */
export const getProductById = (id) => {
  return fetchWithCache(`/api/product/${id}`, {}, `itx_cache_product_${id}`);
};

/**
 * Add a product to the cart.
 * @param {Object} payload - { id, colorCode, storageCode }
 * @returns {Promise<Object>} { count: number }
 */
export const addToCart = ({ id, colorCode, storageCode }) => {
  return fetchWithCache(
    '/api/cart',
    {
      method: 'POST',
      body: JSON.stringify({ id, colorCode, storageCode }),
    },
    null, // No caching for cart mutations
  );
};
