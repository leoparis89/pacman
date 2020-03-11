import {
  addRoomsToPointMap,
  enoughSpace,
  getPossibleDirections,
  nextRoom,
} from './mazeLogic'

describe('addRoomToPointMap', () => {
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
    expect(addRoomsToPointMap(rooms, new Map())).toEqual(result)
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
  // it('should return false if there is no room', () => {
  //   const rooms: IRoom[] = [
  //     { height: 4, width: 4, coords: [0, 0] },
  //     { height: 4, width: 4, coords: [0, 5] },
  //   ]
  //   const level = roomReducer(rooms)

  //   expect(enoughSpace(level, { coords: [0, 4], dir: 'down' })).toEqual(false)

  //   expect(enoughSpace(level, { coords: [4, 0], dir: 'left' })).toEqual(false)
  // })

  // it('should return false if there is no room (edge case)', () => {
  //   const rooms: IRoom[] = [
  //     { height: 4, width: 4, coords: [0, 0] },
  //     { height: 4, width: 4, coords: [0, 5] },
  //   ]
  //   const level = roomReducer(rooms)

  //   expect(
  //     enoughSpace(
  //       level,
  //       { coords: [0, 4], dir: 'down' },
  //       { width: 8, height: 2 },
  //     ),
  //   ).toEqual(false)
  // })

  it('should return true if there is room (case up)', () => {
    const rooms: IRoom[] = [{ height: 4, width: 4, coords: [4, 4] }]
    const level = addRoomsToPointMap(rooms)

    expect(enoughSpace(level, { coords: [4, 4], dir: 'up' })).toEqual(true)
  })

  it('should return true if there is room (depth case up 2 spaces left)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 2, width: 4, coords: [4, 0] },
    ]
    const level = addRoomsToPointMap(rooms)

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'up' },
        { height: 2, width: 2 },
      ),
    ).toEqual(true)
  })

  it('lego case up (1x1)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = addRoomsToPointMap(rooms)
    level.delete(JSON.stringify([4, 3]))

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'up' },
        { height: 1, width: 1 },
      ),
    ).toEqual(true)

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'up' },
        { height: 2, width: 1 },
      ),
    ).toEqual(false)
  })

  it('lego case up (2x2)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = addRoomsToPointMap(rooms)
    level.delete(JSON.stringify([4, 3]))
    level.delete(JSON.stringify([4, 2]))
    level.delete(JSON.stringify([3, 3]))
    level.delete(JSON.stringify([3, 2]))

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'up' },
        { height: 2, width: 2 },
      ),
    ).toEqual(true)

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'up' },
        { height: 3, width: 2 },
      ),
    ).toEqual(false)
  })

  it('lego case left (1x1)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = addRoomsToPointMap(rooms)
    level.delete(JSON.stringify([3, 4]))

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'left' },
        { height: 1, width: 1 },
      ),
    ).toEqual(true)

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'left' },
        { height: 2, width: 1 },
      ),
    ).toEqual(false)
  })

  it('lego case down (1x1)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = addRoomsToPointMap(rooms)
    level.delete(JSON.stringify([4, 8]))

    expect(
      enoughSpace(
        level,
        { coords: [4, 7], dir: 'down' },
        { height: 1, width: 1 },
      ),
    ).toEqual(true)

    expect(
      enoughSpace(
        level,
        { coords: [4, 7], dir: 'down' },
        { height: 2, width: 1 },
      ),
    ).toEqual(false)

    expect(
      enoughSpace(
        level,
        { coords: [4, 7], dir: 'down' },
        { height: 1, width: 2 },
      ),
    ).toEqual(false)
    // expect(
    //   enoughSpace(
    //     level,
    //     { coords: [4, 7], dir: 'down' },
    //     { height: 2, width: 1 },
    //   ),
    // ).toEqual(false)
  })

  it('lego case right (1x1)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = addRoomsToPointMap(rooms)
    level.delete(JSON.stringify([8, 4]))

    expect(
      enoughSpace(
        level,
        { coords: [7, 4], dir: 'right' },
        { height: 1, width: 1 },
      ),
    ).toEqual(true)

    expect(
      enoughSpace(
        level,
        { coords: [7, 4], dir: 'right' },
        { height: 2, width: 1 },
      ),
    ).toEqual(false)

    expect(
      enoughSpace(
        level,
        { coords: [7, 4], dir: 'right' },
        { height: 1, width: 2 },
      ),
    ).toEqual(false)
  })

  // it('should return true if there is room (edge case)', () => {
  //   const rooms: IRoom[] = [
  //     { height: 4, width: 4, coords: [0, 0] },
  //     { height: 4, width: 4, coords: [0, 5] },
  //   ]
  //   const level = roomReducer(rooms)

  //   expect(
  //     enoughSpace(
  //       level,
  //       { coords: [0, 4], dir: 'down' },
  //       { width: 8, height: 1 },
  //     ),
  //   ).toEqual(true)
  // })
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

describe('next room', () => {
  it('should return the next possible room (case room on right)', () => {
    const currentRoom: IRoom = { height: 4, width: 4, coords: [4, 4] }
    const rooms: IRoom[] = [
      currentRoom,
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = addRoomsToPointMap(rooms)
    level.delete(JSON.stringify([8, 4]))
    expect(nextRoom(level, currentRoom, { height: 1, width: 1 })).toEqual({
      dir: { coords: [7, 4], dir: 'right' },
      height: 1,
      width: 1,
    })
  })

  it('should return the next possible room (case room on top)', () => {
    const currentRoom: IRoom = { height: 4, width: 4, coords: [4, 4] }
    const rooms: IRoom[] = [
      currentRoom,
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = addRoomsToPointMap(rooms)
    level.delete(JSON.stringify([5, 3]))
    expect(nextRoom(level, currentRoom, { height: 1, width: 1 })).toEqual({
      dir: { coords: [5, 4], dir: 'up' },
      height: 1,
      width: 1,
    })
  })

  it('should return null if there is no next possible room', () => {
    const currentRoom: IRoom = { height: 4, width: 4, coords: [4, 4] }
    const rooms: IRoom[] = [
      currentRoom,
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = addRoomsToPointMap(rooms)
    level.delete(JSON.stringify([8, 4]))
    expect(nextRoom(level, currentRoom, { height: 2, width: 1 })).toEqual(null)
    expect(nextRoom(level, currentRoom, { height: 1, width: 2 })).toEqual(null)
  })
})
