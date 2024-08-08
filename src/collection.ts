import type {
  ArrayReduceIterator,
  ObjectReduceIterator,
  ObjectKey,
} from './type'
import {
  isPlainObject,
  isObjectLike,
  isPrimitive,
  isFunction,
  isBoolean,
  isRegExp,
  isString,
  isNumber,
  isArray,
  getTag,
  isDate,
  isNil,
  isInt,
} from './typed'

const hasOwnProperty = Object.prototype.hasOwnProperty

export function has(value: object, key: string) {
  return !isNil(value) && hasOwnProperty.call(value, key)
}

export function isEqual<T>(target: T, other: T) {
  if (Object.is(target, other)) return true
  if (getTag(target) !== getTag(other)) return false
  if (isNumber(target) || isBoolean(target) || isString(target)) {
    // both are `new Primitive()`s
    if (typeof target === 'object' && typeof other === 'object') {
      return (target as object).valueOf() === (other as object).valueOf()
    }
  }
  if (isRegExp(target) && isRegExp(other)) {
    return target.toString() === other.toString()
  }
  if (isDate(target) && isDate(other)) {
    return target.getTime() === other.getTime()
  }
  // the parameter of the ownKeys method must be an object.
  if (!isObjectLike(target) || !isObjectLike(other)) return false
  const targetKeys = Reflect.ownKeys(target as unknown as object) as Array<
    keyof typeof target
  >
  const otherKeys = Reflect.ownKeys(other as unknown as object)
  if (targetKeys.length !== otherKeys.length) return false

  for (const key of targetKeys) {
    if (!Reflect.has(other as unknown as object, key)) return false
    if (!isEqual(target[key], other[key])) return false
  }
  return true
}

export function isEmpty<T>(value: T) {
  if (isPrimitive(value)) return !value
  if (isFunction(value) || isDate(value)) return false
  const length = (value as any).length
  if (isInt(length)) return length === 0
  const size = (value as any).size
  if (isInt(size)) return size === 0
  const keys = Object.keys(value!).length
  if (isInt(keys)) return keys === 0
  return false
}

export function get() {}

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
  const initialized = arguments.length >= 3

  if (isArray(value)) {
    if (value.length === 0 && !initialized) {
      throw new TypeError('Reduce of empty array with no initial value')
    }
    return value.reduce(
      callback as ArrayReduceIterator<T, R>,
      (initialized ? initialValue : value[0]) as R
    )
  }
  if (isPlainObject(value)) {
    const keys = Object.keys(value).concat(
      Object.getOwnPropertySymbols(value) as unknown as string[]
    )
    if (keys.length === 0 && !initialized) {
      throw new TypeError('Reduce of empty object with no initial value')
    }
    let result = (initialized ? initialValue : value[keys[0]]) as R
    for (let i = initialized ? 0 : 1; i < keys.length; i++) {
      const key = keys[i]
      result = (callback as ObjectReduceIterator<T, R>)(
        result,
        value[key],
        key,
        value
      )
    }
    return result
  }
  throw new TypeError('The value must be an array or object')
}

export function map() {}

export function find() {}
