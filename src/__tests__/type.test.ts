import {
  isPlainObject,
  isFunction,
  isRegExp,
  isArray,
  isDate,
  isNaN,
} from '../type'

describe('isNaN', () => {
  test('should return true for NaN values', () => {
    expect(isNaN(0 / 0)).toBe(true)
    expect(isNaN(NaN)).toBe(true)
  })

  test('should return false for non-NaN values', () => {
    expect(isNaN(-Infinity)).toBe(false)
    expect(isNaN(Infinity)).toBe(false)
    expect(isNaN(-1)).toBe(false)
    expect(isNaN(1)).toBe(false)
    expect(isNaN(-0)).toBe(false)
    expect(isNaN(0)).toBe(false)
    expect(isNaN('abc')).toBe(false)
    expect(isNaN('1')).toBe(false)
    expect(isNaN(false)).toBe(false)
    expect(isNaN(true)).toBe(false)
    expect(isNaN({})).toBe(false)
    expect(isNaN([])).toBe(false)
  })
})

describe('isDate', () => {
  test('should return true for Date objects', () => {
    expect(isDate(new Date())).toBe(true)
  })

  test('should return false for non-Date objects', () => {
    expect(isDate(null)).toBe(false)
    expect(isDate(undefined)).toBe(false)
    expect(isDate(123)).toBe(false)
    expect(isDate('2022-01-01')).toBe(false)
    expect(isDate({})).toBe(false)
    expect(isDate([])).toBe(false)
  })
})

describe('isFunction', () => {
  test('should return true for a function', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function test() {})).toBe(true)
  })

  test('should return false for a non-function', () => {
    expect(isFunction('not a function')).toBe(false)
  })
})

describe('isRegExp', () => {
  test('should return true for a RegExp object', () => {
    expect(isRegExp(/test/)).toBe(true)
    expect(isRegExp(new RegExp('test'))).toBe(true)
  })

  test('should return false for a non-RegExp object', () => {
    expect(isRegExp('test')).toBe(false)
  })

  test('should return false for null', () => {
    expect(isRegExp(null)).toBe(false)
  })

  test('should return false for undefined', () => {
    expect(isRegExp(undefined)).toBe(false)
  })
})

describe('isArray', () => {
  test('should return true for an array', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray(['a', 'b', 'c'])).toBe(true)
  })

  test('should return false for non-array values', () => {
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray(123)).toBe(false)
    expect(isArray('abc')).toBe(false)
    expect(isArray({})).toBe(false)
    expect(isArray(() => {})).toBe(false)
  })
})

describe('isPlainObject', () => {
  test('should return true for plain objects', () => {
    expect(isPlainObject(Object.create(null))).toBe(true)
    expect(isPlainObject(new Object())).toBe(true)
    expect(isPlainObject({})).toBe(true)
  })

  test('should return false for non-objects', () => {
    expect(isPlainObject(Symbol('test'))).toBe(false)
    expect(isPlainObject(undefined)).toBe(false)
    expect(isPlainObject(() => {})).toBe(false)
    expect(isPlainObject('string')).toBe(false)
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject(true)).toBe(false)
    expect(isPlainObject(123)).toBe(false)
    expect(isPlainObject([])).toBe(false)
  })

  test('should return false for objects with a prototype', () => {
    function Foo() {
      this.bar = 'baz'
    }
    // @ts-ignore
    expect(isPlainObject(new Foo())).toBe(false)
    expect(isPlainObject(Object.create({}))).toBe(false)
  })
})
