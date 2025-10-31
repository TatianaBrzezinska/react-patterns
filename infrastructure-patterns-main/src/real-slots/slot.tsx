/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Children,
  createContext,
  isValidElement,
  useContext,
} from "react";

type SlotsContext = Record<string, unknown>;

const slotContext = createContext({} as SlotsContext);

function Slot({
  name,
  children,
  ...props
}: {
  name: string;
  children?: React.ReactNode;
}) {
  const slot = useContext(slotContext)[name];
  if (!slot) {
    return children;
  }

  if (Object.keys(props).length > 0) {
    const renderSlot = slot as unknown as (props: any) => React.ReactNode;
    return <>{renderSlot(props)}</>;
  }

  return <>{slot}</>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Template(_: { name: string; children: React.ReactNode }) {
  return null;
}

export const configureSlots = <
  T extends string,
  C extends Partial<Record<T, Record<string, unknown>>> = Record<never, unknown>
>() => ({
  Slot: Slot as {
    <K extends T>(
      props: {
        name: K;
        children?: React.ReactNode;
      } & C[K]
    ): React.ReactNode;
  },
  Template: Template as {
    <const K extends T>(props: {
      name: K;
      children: K extends keyof C
        ? (props: C[K]) => React.ReactNode
        : React.ReactNode;
    }): React.ReactNode;
  },
  withSlot,
});

export function withSlot<P>(Component: React.ComponentType<P>) {
  return function WrappedComponent({
    children,
    ...props
  }: P & { children?: React.ReactNode }) {
    const slots = Children.toArray(children)
      .filter(
        (el): el is React.ReactElement<React.ComponentProps<typeof Template>> =>
          isValidElement(el) && el.type === Template
      )
      .reduce((acc, el) => {
        const { name, children } = el.props;
        if (name) {
          acc[name] = children;
        }
        return acc;
      }, {} as SlotsContext);

    return (
      <slotContext.Provider value={slots}>
        <Component {...(props as P & React.JSX.IntrinsicAttributes)} />
      </slotContext.Provider>
    );
  };
}
