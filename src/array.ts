import type { ArrayIterator, CallbackObject } from './type'
import { isArray, isFunction, isPlainObject } from './typed'

export function compact<T>(value: T[]) {
  if (!isArray(value)) return []
  return value.filter(Boolean)
}

export function filter<T>(value: T[], callback: ArrayIterator<T, boolean>): T[]
export function filter<T>(value: T[], callback: CallbackObject<T>): T[]
export function filter<T>(
  value: T[],
  callback: CallbackObject<T> | ArrayIterator<T, boolean>
) {
  if (!isArray(value)) return []
  if (isFunction(callback)) return value.filter(callback)
  if (isPlainObject(callback)) {
    return value.filter((item) => {
      if (!isPlainObject(item)) return false
      return Object.keys(callback).every(
        (key) => (item as any)[key] === callback[key]
      )
    })
  }
  return []
}

export function find<T>(
  value: T[],
  callback: ArrayIterator<T, boolean>
): T | undefined
export function find<T>(value: T[], callback: CallbackObject<T>): T | undefined
export function find<T>(
  value: T[],
  callback: CallbackObject<T> | ArrayIterator<T, boolean>
) {
  if (!isArray(value)) return
  if (isFunction(callback)) return value.find(callback)
  if (isPlainObject(callback)) {
    return value.find((item) => {
      if (!isPlainObject(item)) return false
      return Object.keys(callback).every(
        (key) => (item as any)[key] === callback[key]
      )
    })
  }
}
