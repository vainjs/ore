import { isNil, isEmpty } from './typed'

const hasOwnProperty = Object.prototype.hasOwnProperty

export function has<T extends object, K extends keyof T>(value: T, key: K) {
  return !isNil(value) && hasOwnProperty.call(value, key)
}

export const get = <T extends object, D>(
  value: T,
  path: string,
  defaultValue?: D
) => {
  if (isEmpty(value)) return defaultValue as D
  if (!path) return
  const paths = path.split(/[\.\[\]]/g)
  let current: any = value
  for (const key of paths) {
    if (key === '') continue
    current = current[key]
    if (isEmpty(current)) return defaultValue as D
  }
  return current
}
