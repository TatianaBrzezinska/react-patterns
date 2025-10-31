export function reorderItemsArray<T>(
  items: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  const newItems = [...items];
  const [movedItem] = newItems.splice(fromIndex, 1);
  newItems.splice(toIndex, 0, movedItem);
  return newItems;
}
