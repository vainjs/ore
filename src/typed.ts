import { isFunction, isNil } from 'lodash'

export function isBrowser() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
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
