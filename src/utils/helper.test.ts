import { reverseGrid } from './helpers'

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
