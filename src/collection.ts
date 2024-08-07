// import type { ListIterator, ObjectIterator } from './type'
import {
  // isPlainObject,
  isObjectLike,
  isPrimitive,
  isFunction,
  isBoolean,
  isRegExp,
  isString,
  isNumber,
  // isArray,
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

// export function reduce<T, R>(
//   value: T[],
//   callback: ListIterator<T, R, T[]>,
//   initialValue: R
// ): R

// export function reduce<T extends object, R>(
//   value: T,
//   callback: ObjectIterator<T[keyof T], R, T>,
//   initialValue: R
// ): R

// export function reduce<T, R>(
//   value: T[] | T,
//   callback: (
//     accumulator: R,
//     currentValue: T,
//     currentIndex: string | number,
//     array: T[] | T
//   ) => R,
//   initialValue?: R
// ): R {
//   if (isArray(value)) {
//     return value.reduce(callback, initialValue)
//   }
//   if (isPlainObject(value)) {
//     return Object.keys(value).reduce((prev, key) => {
//       return callback(prev, value[key], key, value)
//     }, initialValue)
//   }

//   return initialValue!
// }

export function map() {}

export function find() {}
