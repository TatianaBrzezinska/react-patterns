export const createGlobalStore = <T>(value: T) => {
  const store = {
    value: value as T,

    listeners: [] as (() => void)[],
    getSnapshot: () => {
      return store.value;
    },
    subscribe: (callback: () => void): (() => void) => {
      store.listeners.push(callback);
      return () => {
        store.listeners = store.listeners.filter(
          (listener) => listener !== callback
        );
      };
    },

    set: (value: T) => {
      store.value = value;
      store.listeners.forEach((listener) => listener());
    },
  };

  return store;
};
