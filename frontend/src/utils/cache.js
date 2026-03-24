const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Store data in localStorage with a timestamp for TTL checking.
 * @param {string} key - Cache key
 * @param {*} data - Data to cache
 */
export const setCache = (key, data) => {
  try {
    const cacheEntry = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
  } catch (error) {
    // localStorage might be full or disabled — fail silently
    // eslint-disable-next-line no-console
    console.warn('Cache write failed:', error);
  }
};

/**
 * Retrieve cached data if it hasn't expired (1 hour TTL).
 * @param {string} key - Cache key
 * @returns {*|null} Cached data or null if expired/missing
 */
export const getCache = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const cacheEntry = JSON.parse(raw);
    const elapsed = Date.now() - cacheEntry.timestamp;

    if (elapsed > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }

    return cacheEntry.data;
  } catch {
    return null;
  }
};

/**
 * Clear a specific cache key.
 * @param {string} key - Cache key to remove
 */
export const clearCache = (key) => {
  localStorage.removeItem(key);
};

/**
 * Clear all app cache entries.
 */
export const clearAllCache = () => {
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('itx_cache_')) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
};
