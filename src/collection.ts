import type {
  ObjectReduceIterator,
  ArrayReduceIterator,
  ObjectIterator,
  ArrayIterator,
  ObjectKey,
} from './type'
import { isPlainObject, isFunction, isString, isArray } from './typed'

export function reduce<T>(
  value: Record<ObjectKey, T>,
  callback: ObjectReduceIterator<T, T>
): T
export function reduce<T>(value: T[], callback: ArrayReduceIterator<T, T>): T
export function reduce<T, R>(
  value: Record<ObjectKey, T>,
  callback: ObjectReduceIterator<T, R>,
  initialValue?: R
): R
export function reduce<T, R>(
  value: T[],
  callback: ArrayReduceIterator<T, R>,
  initialValue?: R
): R
export function reduce<T, R>(
  value: T[] | Record<ObjectKey, T>,
  callback: ObjectReduceIterator<T, R> | ArrayReduceIterator<T, R>,
  initialValue?: R
) {
  const isObj = isPlainObject(value)
  if (!isObj && !isArray(value)) return initialValue
  const initialized = arguments.length >= 3
  const keys = Object.keys(value)
  if (keys.length === 0 && !initialized) {
    throw new TypeError(
      `Reduce of empty ${isObj ? 'object' : 'array'} with no initial value`
    )
  }
  let result = initialized ? initialValue : (value as any)[keys[0]]
  let i = initialized ? 0 : 1
  for (i; i < keys.length; i++) {
    const key = keys[i]
    result = (callback as any)(result, (value as any)[key], key, value)
  }
  return result
}

export function map<T, R>(value: T[], callback: ArrayIterator<T, R>): R[]
export function map<T extends object, K extends keyof T>(
  value: T[],
  callback: K
): T[K][]
export function map<T, R>(
  value: Record<ObjectKey, T>,
  callback: ObjectIterator<T, R>
): R[]
export function map<T, R>(
  value: T[] | Record<ObjectKey, T>,
  callback: ArrayIterator<T, R> | ObjectIterator<T, R> | ObjectKey
): R[] {
  const isObj = isPlainObject(value)
  if (!isObj && !isArray(value)) return []
  const isFn = isFunction(callback)
  if (isObj) {
    return Object.keys(value).map((key) =>
      isFn
        ? (callback as ObjectIterator<T>)(
            (value as Record<ObjectKey, T>)[key],
            key,
            value as Record<ObjectKey, T>
          )
        : null
    )
  }
  if (isFn) return (value as T[]).map(callback as ArrayIterator<T>)
  if (isString(callback) || typeof callback === 'symbol') {
    return (value as T[]).map((item) =>
      !isPlainObject(item) ? null : (item as any)[callback]
    )
  }
  return []
}
