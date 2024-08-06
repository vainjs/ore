import { isArray, isFunction, isPlainObject } from './typed'

type PredicateCallback<T> = (value: T, index: number, array: T[]) => boolean
type PredicateObject<T> = T extends object
  ? Partial<T> & { [key: string]: any }
  : never

export function filter<T>(value: T[], predicate: PredicateCallback<T>): T[]

export function filter<T extends object>(
  value: T[],
  predicate: PredicateObject<T> | PredicateCallback<T>
): T[]

export function filter<T>(
  value: T[],
  predicate: PredicateObject<T> | PredicateCallback<T>
) {
  if (!isArray(value)) return []
  if (isFunction(predicate)) return value.filter(predicate)
  if (isPlainObject(predicate)) {
    return value.filter((item) => {
      if (!isPlainObject(item)) return false
      return Object.keys(predicate).every(
        (key) => (item as any)[key] === predicate[key]
      )
    })
  }
  return []
}

export function compact<T>(value: T[]) {
  if (!isArray(value)) return []
  return value.filter(Boolean)
}
