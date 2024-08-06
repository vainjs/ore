import { compact, filter } from '..'

describe('filter', () => {
  it('should return an empty array if value is not an array', () => {
    expect(filter(123 as unknown as [], Boolean)).toEqual([])
    expect(filter(undefined!, Boolean)).toEqual([])
    expect(filter({} as [], Boolean)).toEqual([])
    expect(filter(null!, Boolean)).toEqual([])
  })

  it('should filter array with predicate function', () => {
    const array = [1, 2, 3, 4, 5]
    const result = filter(array, (item) => item > 2)
    expect(result).toEqual([3, 4, 5])
  })

  it('should filter array with predicate object', () => {
    const array = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 35 },
    ]
    const result = filter(array, { age: 30 })
    expect(result).toEqual([{ name: 'Bob', age: 30 }])
  })

  it('should filter array with multiple predicate properties', () => {
    const array = [
      { name: 'Alice', age: 25, gender: 'female' },
      { name: 'Bob', age: 30, gender: 'male' },
      { name: 'Charlie', age: 35, gender: 'male' },
    ]
    const result = filter(array, { gender: 'male', age: 30 })
    expect(result).toEqual([{ name: 'Bob', age: 30, gender: 'male' }])
  })
})

describe('compact', () => {
  it('should return an empty array when input is not an array', () => {
    expect(compact('not an array' as unknown as [])).toEqual([])
    expect(compact(undefined!)).toEqual([])
    expect(compact({} as [])).toEqual([])
    expect(compact(null!)).toEqual([])
  })

  it('should return a new array with only truthy values', () => {
    expect(compact([1, 2, '', null, undefined, 0, false])).toEqual([1, 2])
    expect(compact([true, false, 'compact', '', [], {}])).toEqual([
      true,
      'compact',
      [],
      {},
    ])
  })
})
