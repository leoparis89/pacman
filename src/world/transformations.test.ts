import { roomToPointMap } from './transformations'

describe('roomToPointMap function', () => {
  it('should return the right value', () => {
    const expected = new Map([
      ['[3,4]', true],
      ['[3,5]', true],
      ['[4,4]', true],
      ['[4,5]', true],
    ])
    expect(roomToPointMap({ height: 2, width: 2, coords: [3, 4] })).toEqual(
      expected,
    )
  })
})
