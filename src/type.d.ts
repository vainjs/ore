export type PredicateObject<T> = T extends object
  ? Partial<T> & Record<string, any>
  : never

export type ArrayIterator<T, R> = (value: T, index: number, array: T[]) => R

export type ListIterator<T, R, TList> = (
  prev: R,
  curr: T,
  index: number,
  collection: TList
) => R

export type ObjectIterator<T, R, TList> = (
  prev: R,
  curr: T,
  key: string,
  collection: TList
) => R
