import type { ArrayIterator, CallbackObject, CallbackArray } from './type'
import { isArray, isFunction, isPlainObject } from './typed'

export function compact<T>(value: T[]) {
  if (!isArray(value)) return []
  return value.filter(Boolean)
}

function createMatcher<T>(
  callback: ArrayIterator<T, boolean> | CallbackObject<T> | CallbackArray<T>
): ArrayIterator<T, boolean> {
  if (isFunction(callback)) return callback
  if (isArray(callback) && callback.length === 2) {
    callback = { [callback[0]]: callback[1] } as CallbackObject<T>
  }
  if (isPlainObject(callback)) {
    return (item) => {
      if (!isPlainObject(item)) return false
      return Object.keys(callback).every(
        (key) => (item as any)[key] === (callback as any)[key]
      )
    }
  }
  return () => false
}

export function filter<T>(value: T[], callback: ArrayIterator<T, boolean>): T[]
export function filter<T>(value: T[], callback: CallbackObject<T>): T[]
export function filter<T>(value: T[], callback: CallbackArray<T>): T[]
export function filter<T>(
  value: T[],
  callback: ArrayIterator<T, boolean> | CallbackObject<T> | CallbackArray<T>
) {
  if (!isArray(value)) return []
  return value.filter(createMatcher(callback))
}

export function find<T>(
  value: T[],
  callback: ArrayIterator<T, boolean>
): T | undefined
export function find<T>(value: T[], callback: CallbackObject<T>): T | undefined
export function find<T>(value: T[], callback: CallbackArray<T>): T | undefined
export function find<T>(
  value: T[],
  callback: ArrayIterator<T, boolean> | CallbackObject<T> | CallbackArray<T>
) {
  if (!isArray(value)) return
  return value.find(createMatcher(callback))
}
