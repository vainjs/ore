import {
  getTag,
  isDate,
  isNumber,
  isRegExp,
  isBoolean,
  isString,
  isObjectLike,
} from './type'

export function isEqual<T = any>(target: T, other: T) {
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
