export type PredicateObject<T> = T extends object
  ? Partial<T> & Record<string, any>
  : never

export type ArrayIterator<T, R> = (value: T, index: number, array: T[]) => R

export type ArrayReduceIterator<T, R> = (
  accumulator: R,
  currentValue: T,
  currentIndex: number,
  array: T[]
) => R

export type ObjectKey = string | symbol

export type ObjectReduceIterator<T, R> = (
  accumulator: R,
  currentValue: T,
  currentKey: ObjectKey,
  object: Record<ObjectKey, T>
) => R
