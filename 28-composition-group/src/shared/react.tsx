import { createContext, useContext } from "react";

export const createStrictContext = <T,>() => {
  const context = createContext<{ value: T } | null>(null);

  function Provider({
    value,
    children,
  }: {
    value: T;
    children: React.ReactNode;
  }) {
    return <context.Provider value={{ value }}>{children}</context.Provider>;
  }

  function useContextStrict() {
    const data = useContext(context);
    if (!data) {
      throw new Error("useContext must be used within a Provider");
    }
    return data.value;
  }

  return {
    Provider,
    use: useContextStrict,
  };
};

export const createHookContext = <T,>(hook: () => T) => {
  const context = createStrictContext<T>();

  function Provider({ children }: { children: React.ReactNode }) {
    const value = hook();
    return <context.Provider value={value}>{children}</context.Provider>;
  }

  return {
    Provider,
    use: context.use,
  };
};
