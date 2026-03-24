import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setCache, getCache, clearCache, clearAllCache } from './cache.js';

describe('Cache utility', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should store and retrieve data', () => {
    const data = { id: '1', name: 'test' };
    setCache('itx_cache_test', data);
    const result = getCache('itx_cache_test');
    expect(result).toEqual(data);
  });

  it('should return null for missing keys', () => {
    const result = getCache('itx_cache_nonexistent');
    expect(result).toBeNull();
  });

  it('should return null for expired data (> 1 hour)', () => {
    const data = { id: '1' };
    setCache('itx_cache_expired', data);

    // Mock Date.now to simulate 2 hours later
    const original = Date.now;
    vi.spyOn(Date, 'now').mockReturnValue(original() + 2 * 60 * 60 * 1000);

    const result = getCache('itx_cache_expired');
    expect(result).toBeNull();
  });

  it('should return data within 1 hour TTL', () => {
    const data = { id: '1' };
    setCache('itx_cache_valid', data);

    // Mock 30 minutes later
    const original = Date.now;
    vi.spyOn(Date, 'now').mockReturnValue(original() + 30 * 60 * 1000);

    const result = getCache('itx_cache_valid');
    expect(result).toEqual(data);
  });

  it('clearCache should remove a specific key', () => {
    setCache('itx_cache_to_clear', { foo: 'bar' });
    clearCache('itx_cache_to_clear');
    expect(getCache('itx_cache_to_clear')).toBeNull();
  });

  it('clearAllCache should remove all itx_cache_ keys', () => {
    setCache('itx_cache_a', { a: 1 });
    setCache('itx_cache_b', { b: 2 });
    localStorage.setItem('other_key', 'keep');

    clearAllCache();

    expect(getCache('itx_cache_a')).toBeNull();
    expect(getCache('itx_cache_b')).toBeNull();
    expect(localStorage.getItem('other_key')).toBe('keep');
  });
});
