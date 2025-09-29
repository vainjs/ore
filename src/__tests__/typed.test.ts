import { isPrimitive, isPromise, isBrowser } from '..'

describe('isPrimitive', () => {
  it('should return true for primitive values', () => {
    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive(undefined)).toBe(true)
    expect(isPrimitive(42)).toBe(true)
    expect(isPrimitive('string')).toBe(true)
    expect(isPrimitive(true)).toBe(true)
    expect(isPrimitive(Symbol('test'))).toBe(true)
    expect(isPrimitive(BigInt(123))).toBe(true)
  })

  it('should return false for non-primitive values', () => {
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive([])).toBe(false)
    expect(isPrimitive(() => {})).toBe(false)
    expect(isPrimitive(new Date())).toBe(false)
    expect(isPrimitive(/regex/)).toBe(false)
  })
})

describe('isPromise', () => {
  it('should return true for Promise-like objects', () => {
    expect(isPromise(Promise.resolve(1))).toBe(true)
    expect(isPromise(Promise.reject('test').catch(() => {}))).toBe(true)
    expect(isPromise({ then: () => {} })).toBe(true)
  })

  it('should return false for non-Promise objects', () => {
    expect(isPromise(null)).toBe(false)
    expect(isPromise(undefined)).toBe(false)
    expect(isPromise({})).toBe(false)
    expect(isPromise([])).toBe(false)
    expect(isPromise('string')).toBe(false)
    expect(isPromise(42)).toBe(false)
    expect(isPromise(() => {})).toBe(false)
  })
})

describe('isBrowser', () => {
  it('should return false', () => {
    expect(isBrowser()).toBe(false)
  })
})
