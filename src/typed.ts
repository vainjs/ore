export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export function getTag(value: unknown) {
  return Object.prototype.toString.call(value)
}

export function isNaN(value: unknown) {
  return Number.isNaN(value)
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime())
}

export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}

export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp
}

export function isArray(value: unknown): value is Array<any> {
  return Array.isArray(value)
}

export function isObjectLike(value: unknown) {
  return value !== null && typeof value === 'object'
}

export function isPlainObject(value: unknown): value is object {
  if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
    return false
  }
  if (Object.getPrototypeOf(value) === null) return true
  return Object.getPrototypeOf(value) === Object.prototype
}

export function isString(value: unknown): value is string {
  return getTag(value) === '[object String]'
}

export function isNumber(value: unknown): value is number {
  return getTag(value) === '[object Number]'
}

export function isBoolean(value: unknown): value is boolean {
  return getTag(value) === '[object Boolean]'
}

export function isNil(value: unknown): boolean {
  return value === undefined || value === null
}

export function isPromise(value: any): value is Promise<any> {
  return !!(value && value.then && isFunction(value.then))
}

/**
 * Primitive types: number , string , boolean , symbol, bigint, undefined, null
 */
export function isPrimitive(value: unknown) {
  return (
    isNil(value) || (typeof value !== 'object' && typeof value !== 'function')
  )
}

export const isInt = (value: unknown): value is number => {
  return isNumber(value) && value % 1 === 0
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
