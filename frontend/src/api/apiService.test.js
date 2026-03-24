import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProducts, getProductById, addToCart } from './apiService.js';

// Mock the cache module
vi.mock('../utils/cache.js', () => ({
  getCache: vi.fn(() => null),
  setCache: vi.fn(),
}));

describe('API Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  describe('getProducts', () => {
    it('should fetch products from /api/product', async () => {
      const mockProducts = [
        { id: '0001', brand: 'Apple', model: 'iPhone 15' },
      ];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      });

      const result = await getProducts();
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/product',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(result).toEqual(mockProducts);
    });

    it('should throw on API error', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(getProducts()).rejects.toThrow('API Error: 500');
    });
  });

  describe('getProductById', () => {
    it('should fetch a product by ID from /api/product/:id', async () => {
      const mockProduct = { id: '0001', brand: 'Apple', model: 'iPhone 15' };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      });

      const result = await getProductById('0001');
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/product/0001',
        expect.any(Object)
      );
      expect(result).toEqual(mockProduct);
    });
  });

  describe('addToCart', () => {
    it('should POST to /api/cart with correct body', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ count: 1 }),
      });

      const result = await addToCart({
        id: '0001',
        colorCode: 1,
        storageCode: 2,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/cart',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ id: '0001', colorCode: 1, storageCode: 2 }),
        })
      );
      expect(result).toEqual({ count: 1 });
    });
  });
});
