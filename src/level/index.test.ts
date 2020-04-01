import { LevelMutator } from '.'
import { roomsToPointMap } from '../world/transformations'

describe('level accessor', () => {
  test('get/set smoke test', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new LevelMutator(pointMap)
    level.set([1, 2], 88)
    expect(level.get([1, 2])).toEqual(88)
  })

  test('isFloor should return true if tile is floor', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new LevelMutator(pointMap)
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
    const level = new LevelMutator(pointMap)
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
    const level = new LevelMutator(pointMap)
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
    const level = new LevelMutator(pointMap)
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
    const level = new LevelMutator(pointMap)
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
    const level = new LevelMutator(pointMap)
    expect(level._isEmpty([5, 0])).toEqual(true)
  })

  test('isEmpty should return false if tile is not empty', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new LevelMutator(pointMap)
    expect(level._isEmpty([0, 0])).toEqual(false)
  })

  test('isEmpty should return true if tile is empty (case array)', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new LevelMutator(pointMap)
    expect(
      level.isEmpty([
        [5, 0],
        [6, 0],
        [6, 6],
      ]),
    ).toEqual(true)
  })

  test('isEmpty should return false if tile is not empty (case array)', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const pointMap = roomsToPointMap([room])
    const level = new LevelMutator(pointMap)
    expect(
      level.isEmpty([
        [5, 0],
        [1, 0],
        [6, 6],
      ]),
    ).toEqual(false)
  })
})
