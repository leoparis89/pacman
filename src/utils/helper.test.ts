import { normalizeArray, pointMaptoGrid, reverseGrid } from './helpers'

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

describe('pointMapToGrid', () => {
  it('should return the right value !', () => {
    const input: PointMap = new Map()
    input.set('[4, 4]', 'x')
    input.set('[5, 4]', 'x')
    input.set('[6, 4]', 'x')
    input.set('[4, 5]', 'x')
    input.set('[5, 5]', 'x')
    input.set('[6, 5]', 'x')
    input.set('[4, 6]', 'x')
    input.set('[5, 6]', 'x')
    input.set('[6, 6]', 'x')

    expect(pointMaptoGrid(input)).toEqual([
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [undefined, undefined, undefined, undefined, 'x', 'x', 'x'],
      [undefined, undefined, undefined, undefined, 'x', 'x', 'x'],
      [undefined, undefined, undefined, undefined, 'x', 'x', 'x'],
    ])
  })

  it('should return the right value (case with seperated elements)', () => {
    const input: PointMap = new Map()
    input.set('[1, 1]', 'x')
    input.set('[4, 4]', 'x')

    expect(pointMaptoGrid(input)).toEqual([
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, 'x', undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, 'x'],
    ])
  })

  it('should normalize result array', () => {
    const input: PointMap = new Map()
    input.set('[1, 1]', 'x')
    input.set('[4, 4]', 'x')

    expect(pointMaptoGrid(input)[0].length).toEqual(5)
  })
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
