import {
  isPlainObject,
  isObjectLike,
  isFunction,
  isPromise,
  isBoolean,
  isString,
  isNumber,
  isRegExp,
  isArray,
  isDate,
  isNaN,
  isNil,
} from '..'

describe('isNaN', () => {
  it('should return true for NaN', () => {
    expect(isNaN(0 / 0)).toBe(true)
    expect(isNaN(NaN)).toBe(true)
  })

  it('should return false for non-NaN', () => {
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
  it('should return true for Date', () => {
    expect(isDate(new Date())).toBe(true)
  })

  it('should return false for non-Date', () => {
    expect(isDate(null)).toBe(false)
    expect(isDate(undefined)).toBe(false)
    expect(isDate(123)).toBe(false)
    expect(isDate('2022-01-01')).toBe(false)
    expect(isDate({})).toBe(false)
    expect(isDate([])).toBe(false)
  })
})

describe('isFunction', () => {
  it('should return true for a function', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function a() {})).toBe(true)
  })

  it('should return false for a non-function', () => {
    expect(isFunction('not a function')).toBe(false)
  })
})

describe('isRegExp', () => {
  it('should return true for a RegExp', () => {
    expect(isRegExp(/abc/)).toBe(true)
    expect(isRegExp(new RegExp('abc'))).toBe(true)
  })

  it('should return false for a non-RegExp', () => {
    expect(isRegExp('abc')).toBe(false)
  })

  it('should return false for null', () => {
    expect(isRegExp(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isRegExp(undefined)).toBe(false)
  })
})

describe('isArray', () => {
  it('should return true for an array', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray(['a', 'b', 'c'])).toBe(true)
  })

  it('should return false for non-array', () => {
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray(123)).toBe(false)
    expect(isArray('abc')).toBe(false)
    expect(isArray({})).toBe(false)
    expect(isArray(() => {})).toBe(false)
  })
})

describe('isObjectLike', () => {
  it('should return true for object', () => {
    expect(isObjectLike(new Boolean('abc'))).toBe(true)
    expect(isObjectLike(new String('abc'))).toBe(true)
    expect(isObjectLike(new RegExp('abc'))).toBe(true)
    expect(isObjectLike(new Number('1'))).toBe(true)
    expect(isObjectLike(new Date())).toBe(true)
    expect(isObjectLike(/abc/)).toBe(true)
    expect(isObjectLike({})).toBe(true)
    expect(isObjectLike([])).toBe(true)
  })

  it('should return false for non-object', () => {
    expect(isObjectLike(Symbol('foo'))).toBe(false)
    expect(isObjectLike(BigInt(1n))).toBe(false)
    expect(isObjectLike(undefined)).toBe(false)
    expect(isObjectLike(() => {})).toBe(false)
    expect(isObjectLike(null)).toBe(false)
    expect(isObjectLike(true)).toBe(false)
    expect(isObjectLike(123)).toBe(false)
    expect(isObjectLike('')).toBe(false)
  })
})

describe('isPlainObject', () => {
  it('should return true for plain object', () => {
    expect(isPlainObject(Object.create(null))).toBe(true)
    expect(isPlainObject(new Object({}))).toBe(true)
    expect(isPlainObject(new Object())).toBe(true)
    expect(isPlainObject({})).toBe(true)
  })

  it('should return false for non-object', () => {
    expect(isPlainObject(Symbol('abc'))).toBe(false)
    expect(isPlainObject(undefined)).toBe(false)
    expect(isPlainObject(() => {})).toBe(false)
    expect(isPlainObject('string')).toBe(false)
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject(true)).toBe(false)
    expect(isPlainObject(123)).toBe(false)
    expect(isPlainObject([])).toBe(false)
  })

  it('should return false for object with a prototype', () => {
    function Foo() {
      this.bar = 'baz'
    }
    // @ts-ignore
    expect(isPlainObject(new Foo())).toBe(false)
    expect(isPlainObject(Object.create({}))).toBe(false)
    expect(isPlainObject(new Boolean('abc'))).toBe(false)
    expect(isPlainObject(new String('abc'))).toBe(false)
    expect(isPlainObject(new Number('1'))).toBe(false)
  })
})

describe('isString', () => {
  it('should return true for string', () => {
    expect(isString(new String(1))).toBe(true)
    expect(isString(String(1))).toBe(true)
    expect(isString('string')).toBe(true)
  })

  it('should return false for non-string', () => {
    expect(isString(undefined)).toBe(false)
    expect(isString(() => {})).toBe(false)
    expect(isString(false)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(123)).toBe(false)
    expect(isString({})).toBe(false)
  })
})

describe('isNumber', () => {
  it('should return true for number', () => {
    expect(isNumber(new Number('1'))).toBe(true)
    expect(isNumber(Number('1'))).toBe(true)
    expect(isNumber(1)).toBe(true)
    expect(isNumber(0)).toBe(true)
  })

  it('should return false for non-number', () => {
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(() => {})).toBe(false)
    expect(isNumber('abc')).toBe(false)
    expect(isNumber(false)).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber({})).toBe(false)
  })
})

describe('isBoolean', () => {
  it('should return true for boolean', () => {
    expect(isBoolean(new Boolean('1'))).toBe(true)
    expect(isBoolean(Boolean('1'))).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(true)).toBe(true)
  })

  it('should return false for non-boolean', () => {
    expect(isBoolean(undefined)).toBe(false)
    expect(isBoolean(() => {})).toBe(false)
    expect(isBoolean('abc')).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean({})).toBe(false)
    expect(isBoolean(1)).toBe(false)
  })
})

describe('isNil', () => {
  it('should return true for nil', () => {
    expect(isNil(undefined)).toBe(true)
    expect(isNil(null)).toBe(true)
  })

  it('should return false for non-nil', () => {
    expect(isNil(() => {})).toBe(false)
    expect(isNil('abc')).toBe(false)
    expect(isNil({})).toBe(false)
    expect(isNil(1)).toBe(false)
  })
})

describe('isPromise', () => {
  test('should return true for a valid promise', () => {
    const validPromise = new Promise((resolve) => {
      resolve('Success')
    })
    expect(isPromise(validPromise)).toBe(true)
  })

  test('should return false for a null value', () => {
    expect(isPromise(null)).toBe(false)
  })

  test('should return false for an undefined value', () => {
    expect(isPromise(undefined)).toBe(false)
  })

  test('should return false for a value that does not have a "then" method', () => {
    const noThenValue = 'Not a promise'
    expect(isPromise(noThenValue)).toBe(false)
  })

  test('should return false for a value with a "then" method that is not a function', () => {
    const thenNotFunctionValue = { then: 'not a function' }
    expect(isPromise(thenNotFunctionValue)).toBe(false)
  })
})
