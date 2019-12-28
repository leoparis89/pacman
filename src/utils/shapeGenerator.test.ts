import {
  createRoomOnDirection,
  enoughSpace,
  getPossibleDirections,
  roomReducer,
  roomToPointMap,
} from './shapeGenerator'

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
  it('should add rooms to level (case 1)', () => {
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

  // it('should add rooms to level (case 2)', () => {
  //   const rooms: IRoom[] = [
  //     { height: 4, width: 4, coords: [0, 0] },
  //     { height: 4, width: 4, coords: [0, 5] },
  //   ]

  //   const result = new Map([
  //     // ['[9,9]', true],
  //     // ['[9,10]', true],
  //     // ['[4,3]', true],
  //     // ['[4,4]', true],
  //     // ['[5,3]', true],
  //     // ['[5,4]', true],
  //   ])
  //   expect(roomReducer(rooms, new Map())).toEqual(result)
  // })
})

describe('hasRoom function', () => {
  it('should return false if there is no room', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [0, 0] },
      { height: 4, width: 4, coords: [0, 5] },
    ]
    const level = roomReducer(rooms)

    expect(enoughSpace(level, { coords: [0, 4], dir: 'down' })).toEqual(false)

    expect(enoughSpace(level, { coords: [4, 0], dir: 'left' })).toEqual(false)
  })

  it('should return false if there is no room (edge case)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [0, 0] },
      { height: 4, width: 4, coords: [0, 5] },
    ]
    const level = roomReducer(rooms)

    expect(
      enoughSpace(
        level,
        { coords: [0, 4], dir: 'down' },
        { width: 8, height: 2 },
      ),
    ).toEqual(false)
  })

  it('should return true if there is room', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [0, 0] },
      { height: 4, width: 4, coords: [0, 5] },
    ]
    const level = roomReducer(rooms)

    expect(enoughSpace(level, { coords: [4, 0], dir: 'right' })).toEqual(true)
  })

  it('should return true if there is room (edge case)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [0, 0] },
      { height: 4, width: 4, coords: [0, 5] },
    ]
    const level = roomReducer(rooms)

    expect(
      enoughSpace(
        level,
        { coords: [0, 4], dir: 'down' },
        { width: 8, height: 1 },
      ),
    ).toEqual(true)
  })
})

describe('getPossibleDirections function', () => {
  it('should return the right value', () => {
    expect(
      getPossibleDirections({ height: 2, width: 2, coords: [0, 0] }),
    ).toEqual([
      { coords: [0, 0], dir: 'left' },
      { coords: [0, 0], dir: 'up' },
      { coords: [0, 1], dir: 'left' },
      { coords: [0, 1], dir: 'down' },
      { coords: [1, 0], dir: 'right' },
      { coords: [1, 0], dir: 'up' },
      { coords: [1, 1], dir: 'right' },
      { coords: [1, 1], dir: 'down' },
    ])
  })
})

describe('createRoomOnDIrection function', () => {
  it('should create room (case up)', () => {
    expect(
      createRoomOnDirection(
        { dir: 'up', coords: [10, 10] },
        { height: 2, width: 2 },
      ),
    ).toEqual({ coords: [9, 12], height: 2, width: 2 })
  })
})
