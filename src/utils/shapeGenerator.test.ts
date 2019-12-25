import { roomReducer, roomToPointMap } from './shapeGenerator'

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

describe('roomReducer', () => {
  it('should add rooms to level', () => {
    const rooms: IRoom[] = [
      { height: 2, width: 1, coords: [9, 9] },
      { height: 2, width: 2, coords: [4, 3] },
    ]

    const result = new Map([
      ['[9,9]', true],
      ['[9,10]', true],
      ['[4,3]', true],
      ['[4,4]', true],
      ['[5,3]', true],
      ['[5,4]', true],
    ])
    expect(roomReducer(rooms, new Map())).toEqual(result)
  })
})
