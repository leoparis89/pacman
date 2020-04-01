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
    expect(level.isFloor([0, 0])).toEqual(true)
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
    expect(level.isFloor([5, 0])).toEqual(false)
  })
})
