import { Level } from '.'
import { roomsToPointMap } from '../world/transformations'

describe('level accessor', () => {
  test('isFloor should return true if tile is floor', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new Level(pointMap)
    expect(level._isFloor([0, 0])).toEqual(true)
  })

  test('isFloor should return false if tile is not floor', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new Level(pointMap)
    expect(level._isFloor([5, 0])).toEqual(false)
  })

  test('isFloor should return true if all tiles are floor(case array)', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new Level(pointMap)
    expect(
      level.isFloor([
        [0, 0],
        [1, 2],
      ]),
    ).toEqual(true)
  })

  test('isFloor should return false if not all tiles are floor(case array)', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new Level(pointMap)
    level.set([1, 2], 99999999)
    expect(
      level.isFloor([
        [0, 0],
        [1, 2],
      ]),
    ).toEqual(false)
  })

  test('isFloor should return false if not all tiles are floor(case array 2)', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new Level(pointMap)
    expect(
      level.isFloor([
        [0, 0],
        [5, 0],
        [1, 0],
      ]),
    ).toEqual(false)
  })

  test('isEmpty should return true if tile is empty', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new Level(pointMap)
    expect(level._isEmpty([0, 0])).toEqual(false)
  })

  test('isEmpty should return false if tile is not empty', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new Level(pointMap)
    expect(level._isEmpty([5, 0])).toEqual(true)
  })
})
