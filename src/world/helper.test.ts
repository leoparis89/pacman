import {
  normalizeArray,
  reverseGrid,
  shiftPointMapOutOfNegative,
} from './helpers'

test('reverse grid should return the right value', () => {
  const input = [
    [undefined, 3, 3, undefined],
    [undefined, undefined, 3, undefined],
    [undefined, 3, 3, undefined],
  ]

  expect(reverseGrid(input, 8)).toEqual([
    [8, undefined, undefined, 8],
    [8, 8, undefined, 8],
    [8, undefined, undefined, 8],
  ])
})

describe('NormalizeArray function', () => {
  it('should return the right value', () => {
    const input = [[2], [undefined, undefined, 4, undefined]]
    expect(normalizeArray(input)).toEqual([
      [2, undefined, undefined, undefined],
      [undefined, undefined, 4, undefined],
    ])
  })
})

// describe('mergeMaps', () => {
//   it('should return the right value', () => {
//     const m1: PointMap = new Map([
//       ['[3, 4]', 'x'],
//       ['[3, 5]', 'x'],
//     ])
//     const m2: PointMap = new Map([['[1, 1]', 'x']])
//     const expected = new Map([
//       ['[3, 4]', 'x'],
//       ['[3, 5]', 'x'],
//       ['[1, 1]', 'x'],
//     ])
//     expect(mergeMaps(m1, m2)).toEqual(expected)
//   })

//   it('should return the right value (case overriding)', () => {
//     const m1: PointMap = new Map([
//       ['[3, 4]', 'x'],
//       ['[3, 5]', 'x'],
//     ])
//     const m2: PointMap = new Map([
//       ['[3, 4]', 'o'],
//       ['[1, 1]', 'o'],
//     ])
//     const expected = new Map([
//       ['[3, 4]', 'o'],
//       ['[3, 5]', 'x'],
//       ['[1, 1]', 'o'],
//     ])
//     expect(mergeMaps(m1, m2)).toEqual(expected)
//   })
// })

describe('shifPointMapOutOfNegative function', () => {
  it('should shift point map so that it has no negative coordinates', () => {
    const input: PointMap = new Map([
      ['[-3,-2]', true],
      ['[-1,-1]', true],
      ['[4,6]', true],
    ])

    const expected: PointMap = new Map([
      ['[0,0]', true],
      ['[2,1]', true],
      ['[7,8]', true],
    ])
    expect(shiftPointMapOutOfNegative(input)).toEqual(expected)
  })
})
