import {
  isPlainObject,
  isObjectLike,
  isPrimitive,
  isFunction,
  isPromise,
  isBoolean,
  isString,
  isNumber,
  isRegExp,
  isEmpty,
  isEqual,
  isArray,
  isDate,
  isNaN,
  isNil,
  isInt,
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

describe('isPrimitive', () => {
  test('should return true for null', () => {
    expect(isPrimitive(null)).toBe(true)
  })

  test('should return true for undefined', () => {
    expect(isPrimitive(undefined)).toBe(true)
  })

  test('should return true for boolean', () => {
    expect(isPrimitive(true)).toBe(true)
  })

  test('should return true for number', () => {
    expect(isPrimitive(123)).toBe(true)
  })

  test('should return true for bigint', () => {
    expect(isPrimitive(BigInt(1))).toBe(true)
    expect(isPrimitive(1n)).toBe(true)
  })

  test('should return true for string', () => {
    expect(isPrimitive('test')).toBe(true)
  })

  test('should return true for symbol', () => {
    expect(isPrimitive(Symbol('test'))).toBe(true)
  })

  test('should return false for object', () => {
    expect(isPrimitive({})).toBe(false)
  })

  test('should return false for array', () => {
    expect(isPrimitive([])).toBe(false)
  })

  test('should return false for function', () => {
    expect(isPrimitive(() => {})).toBe(false)
  })

  test('should return false for date', () => {
    expect(isPrimitive(new Date())).toBe(false)
  })
})

describe('isInt', () => {
  it('should return true for integer numbers', () => {
    expect(isInt(10)).toBe(true)
    expect(isInt(-5)).toBe(true)
    expect(isInt(0)).toBe(true)
  })

  it('should return false for non-integer numbers', () => {
    expect(isInt(10.5)).toBe(false)
    expect(isInt(-4.2)).toBe(false)
    expect(isInt(3.14)).toBe(false)
  })

  it('should return false for non-number values', () => {
    expect(isInt('10')).toBe(false)
    expect(isInt(true)).toBe(false)
    expect(isInt(undefined)).toBe(false)
    expect(isInt(null)).toBe(false)
    expect(isInt({})).toBe(false)
    expect(isInt([])).toBe(false)
  })
})

describe('isEqual', () => {
  it('should return true for same object', () => {
    const obj = { a: 1, b: 2 }
    expect(isEqual(obj, obj)).toBe(true)
    expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
    expect(isEqual({ a: 1, b: { c: 3 } }, { b: { c: 3 }, a: 1 })).toBe(true)
  })

  it('should return false for different object', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false)
  })

  it('should return true for same array', () => {
    const arr = [1, 2, 3]
    expect(isEqual(arr, arr)).toBe(true)
    expect(isEqual([1, 2, { a: 1 }], [1, 2, { a: 1 }])).toBe(true)
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  it('should return false for different array', () => {
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false)
    expect(isEqual([1, 2, 3], [1, 3, 2])).toBe(false)
  })

  it('should return true for same Date', () => {
    expect(isEqual(new Date(2021, 0, 1), new Date(2021, 0, 1))).toBe(true)
  })

  it('should return false for different Date', () => {
    expect(isEqual(new Date(2021, 0, 1), new Date(2021, 1, 1))).toBe(false)
  })

  it('should return true for same RegExp', () => {
    expect(isEqual(new RegExp('abc', 'g'), new RegExp('abc', 'g'))).toBe(true)
    expect(isEqual(new RegExp('abc'), new RegExp('abc'))).toBe(true)
    expect(isEqual(/abc/g, /abc/g)).toBe(true)
    expect(isEqual(/abc/, /abc/)).toBe(true)
  })

  it('should return false for different RegExp', () => {
    expect(isEqual(new RegExp('abc', 'g'), new RegExp('abc'))).toBe(false)
    expect(isEqual(new RegExp('abc'), new RegExp('def'))).toBe(false)
    expect(isEqual(/abc/, /abc/g)).toBe(false)
    expect(isEqual(/abc/, /def/)).toBe(false)
  })

  it('should return true for same string', () => {
    expect(isEqual('abc', 'abc')).toBe(true)
    expect(isEqual(String('abc'), String('abc'))).toBe(true)
    expect(isEqual(new String('abc'), new String('abc'))).toBe(true)
  })

  it('should return false for different string', () => {
    expect(isEqual('abc', 'abcd')).toBe(false)
    expect(isEqual(String('abc'), String('abcd'))).toBe(false)
    expect(isEqual(new String('abc'), new String('abcd'))).toBe(false)
  })

  it('should return true for same boolean', () => {
    expect(isEqual(true, true)).toBe(true)
    expect(isEqual(Boolean('abc'), Boolean('abc'))).toBe(true)
    expect(isEqual(Boolean('abc'), true)).toBe(true)
    expect(isEqual(new Boolean('abc'), new Boolean('abc'))).toBe(true)
  })

  it('should return false for different boolean', () => {
    expect(isEqual(true, false)).toBe(false)
    expect(isEqual(Boolean('abc'), false)).toBe(false)
    expect(isEqual(new Boolean('abc'), true)).toBe(false)
  })

  it('should return true for same number', () => {
    expect(isEqual(1, 1)).toBe(true)
    expect(isEqual(NaN, NaN)).toBe(true)
    expect(isEqual(Number(1), Number(1))).toBe(true)
    expect(isEqual(Number(1), Number('1'))).toBe(true)
    expect(isEqual(Number(1), 1)).toBe(true)
    expect(isEqual(new Number(1), new Number(1))).toBe(true)
    expect(isEqual(new Number(1), new Number('1'))).toBe(true)
  })

  it('should return false for different number', () => {
    expect(isEqual(+0, -0)).toBe(false)
    expect(isEqual(1, 2)).toBe(false)
    expect(isEqual(Number(1), Number(2))).toBe(false)
    expect(isEqual(Number(1), Number('2'))).toBe(false)
    expect(isEqual(new Number(1), new Number(2))).toBe(false)
    expect(isEqual(new Number(1), new Number('2'))).toBe(false)
    expect(isEqual(Number(1), new Number(1))).toBe(false)
    expect(isEqual(1, new Number(1))).toBe(false)
  })

  it('should return false for different Symbol', () => {
    expect(isEqual(Symbol('a'), Symbol('a'))).toBe(false)
    expect(isEqual(Symbol('a'), Symbol('b'))).toBe(false)
  })

  it('should return true for same BigInt', async () => {
    expect(isEqual(BigInt(1n), BigInt(1n))).toBe(true)
    expect(isEqual(1n, BigInt(1n))).toBe(true)
    expect(isEqual(1n, 1n)).toBe(true)
  })

  it('should return false for different BigInt', async () => {
    expect(isEqual(2n, BigInt(1n))).toBe(false)
    expect(isEqual(1n, 2n)).toBe(false)
  })

  it('should return true for same nil', async () => {
    expect(isEqual(undefined, undefined)).toBe(true)
    expect(isEqual(null, null)).toBe(true)
  })

  it('should return false for different nil', async () => {
    expect(isEqual(null, undefined)).toBe(false)
  })
})

describe('isEmpty', () => {
  test('should return true for empty primitive value', () => {
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty(false)).toBe(true)
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty(0n)).toBe(true)
    expect(isEmpty(0)).toBe(true)
  })

  test('should return false for non-empty primitive value', () => {
    expect(isEmpty(Symbol('isEmpty'))).toBe(false)
    expect(isEmpty('isEmpty')).toBe(false)
    expect(isEmpty(Symbol())).toBe(false)
    expect(isEmpty(true)).toBe(false)
    expect(isEmpty(12n)).toBe(false)
    expect(isEmpty(12)).toBe(false)
  })

  test('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true)
  })

  test('should return false for non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false)
  })

  test('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true)
  })

  test('should return false for non-empty object', () => {
    expect(isEmpty({ key: 'value' })).toBe(false)
  })

  test('should return true for empty Map', () => {
    expect(isEmpty(new Map())).toBe(true)
  })

  test('should return false for non-empty Map', () => {
    expect(isEmpty(new Map([['key', 'value']]))).toBe(false)
  })

  test('should return true for empty Set', () => {
    expect(isEmpty(new Set())).toBe(true)
  })

  test('should return false for non-empty Set', () => {
    expect(isEmpty(new Set([1, 2, 3]))).toBe(false)
  })

  test('should return false for function', () => {
    expect(isEmpty(() => {})).toBe(false)
  })

  test('should return false for Date', () => {
    expect(isEmpty(new Date())).toBe(false)
  })
})
