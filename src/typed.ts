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
