export type CachedItem = {
  value: any;
  expiry?: number;
};

export function createLocalStorageCache() {
  const get = (key: string) => {
    const item = localStorage.getItem(key);

    if (!item) return null;

    const parsedItem: CachedItem = JSON.parse(item);

    if (parsedItem.expiry && Date.now() > parsedItem.expiry) {
      localStorage.removeItem(key);

      return null;
    }

    return parsedItem.value;
  };

  const set = (key: string, value: any, ttl?: number) => {
    const item = {
      value: value,
      expiry: ttl ? Date.now() + ttl : null,
    };

    localStorage.setItem(key, JSON.stringify(item));
  };

  const has = (key: string) => get(key) !== null;

  return {
    get,
    set,
    has,
  };
}
