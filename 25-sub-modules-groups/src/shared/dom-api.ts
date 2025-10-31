import { useEffect, useRef } from "react";

export function useScrollTo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLTableCellElement>(null);
  useEffect(() => {
    if (targetRef.current && containerRef.current) {
      const container = containerRef.current;
      const cell = targetRef.current;
      const containerWidth = container.offsetWidth;
      const cellLeft = cell.offsetLeft;
      const cellWidth = cell.offsetWidth;

      // Center the current day in the container
      container.scrollLeft = cellLeft - containerWidth / 2 + cellWidth / 2;
    }
  }, []);

  return {
    containerRef,
    targetRef,
  };
}
